import { promises as fs } from "fs";
import path from "path";

import { PRODUCTS, normalizePkPhone } from "@/data/catalogue";
import {
  type AppStore,
  type CustomerAccount,
  type InventoryRow,
  type OrderLine,
  type OrderStatus,
  type StoredOrder,
  buildEventsForStatus,
  nextStatuses,
} from "@/lib/store/types";
import { hashCustomerPassword, verifyCustomerPassword } from "@/lib/store/customer-auth";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

let writeChain: Promise<unknown> = Promise.resolve();

function seedInventory(): InventoryRow[] {
  return PRODUCTS.map((p) => ({
    productId: p.id,
    slug: p.slug,
    name: p.name,
    sku: `CB-${p.id.toUpperCase()}`,
    stockQty: p.fulfilment === "in_stock" ? 10 : 0,
    reservedQty: 0,
    fulfilment: p.fulfilment,
  }));
}

function emptyStore(): AppStore {
  return { inventory: seedInventory(), orders: [], customers: [] };
}

async function ensureStore(): Promise<AppStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as AppStore;
    if (!Array.isArray(parsed.inventory) || !Array.isArray(parsed.orders)) {
      throw new Error("invalid store");
    }
    if (!Array.isArray(parsed.customers)) {
      parsed.customers = [];
    }
    // Merge any new catalogue products into inventory
    const byId = new Map(parsed.inventory.map((r) => [r.productId, r]));
    for (const row of seedInventory()) {
      if (!byId.has(row.productId)) {
        parsed.inventory.push(row);
      }
    }
    return parsed;
  } catch {
    const seeded = emptyStore();
    await fs.writeFile(STORE_PATH, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function persist(store: AppStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function readStore(): Promise<AppStore> {
  return withLock(() => ensureStore());
}

export async function updateStore(mutator: (store: AppStore) => void | Promise<void>): Promise<AppStore> {
  return withLock(async () => {
    const store = await ensureStore();
    await mutator(store);
    await persist(store);
    return store;
  });
}

function karachiDatePlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });
}

export type PlaceOrderInput = {
  phone: string;
  name: string;
  email?: string;
  city: string;
  address: string;
  lines: Array<{
    productId: string;
    slug: string;
    name: string;
    unitPricePkr: number;
    quantity: number;
    colour?: string;
  }>;
  shippingPkr: number;
};

export async function placeOrder(input: PlaceOrderInput): Promise<StoredOrder> {
  return withLock(async () => {
    const store = await ensureStore();
    if (!input.lines.length) {
      throw new Error("Cart is empty");
    }

    const enriched: OrderLine[] = [];
    for (const line of input.lines) {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) throw new Error(`Unknown product ${line.productId}`);
      const inv = store.inventory.find((r) => r.productId === line.productId);
      if (!inv) throw new Error(`No inventory for ${line.productId}`);

      if (product.fulfilment === "in_stock") {
        const available = inv.stockQty - inv.reservedQty;
        if (available < line.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        inv.stockQty -= line.quantity;
      }

      enriched.push({
        productId: line.productId,
        slug: line.slug,
        name: line.name,
        unitPricePkr: line.unitPricePkr,
        quantity: line.quantity,
        colour: line.colour,
        fulfilment: product.fulfilment,
      });
    }

    const subtotalPkr = enriched.reduce((n, l) => n + l.unitPricePkr * l.quantity, 0);
    const createdAt = new Date().toISOString();
    const orderNumber = `CB-${Date.now().toString(36).toUpperCase()}`;
    const maxLead = Math.max(
      ...enriched.map((l) => {
        const p = PRODUCTS.find((x) => x.id === l.productId);
        return p?.leadTimeDaysMax ?? 7;
      }),
    );

    const order: StoredOrder = {
      orderNumber,
      phone: input.phone,
      phoneNormalized: normalizePkPhone(input.phone),
      name: input.name.trim(),
      email: input.email?.trim() || undefined,
      city: input.city,
      address: input.address.trim(),
      lines: enriched,
      subtotalPkr,
      shippingPkr: input.shippingPkr,
      totalPkr: subtotalPkr + input.shippingPkr,
      status: "pending_confirmation",
      events: buildEventsForStatus("pending_confirmation", createdAt),
      promisedDateLabel: karachiDatePlusDays(maxLead),
      createdAt,
      updatedAt: createdAt,
    };

    store.orders.unshift(order);
    await persist(store);
    return order;
  });
}

export async function findOrder(orderNumber: string, phone: string): Promise<StoredOrder | null> {
  const store = await readStore();
  const o = orderNumber.trim().toUpperCase();
  const p = normalizePkPhone(phone);
  return (
    store.orders.find(
      (ord) =>
        ord.orderNumber.toUpperCase() === o &&
        (ord.phoneNormalized === p ||
          ord.phone.replace(/\D/g, "").endsWith(phone.replace(/\D/g, "").slice(-10))),
    ) ?? null
  );
}

export async function ordersByPhone(phone: string): Promise<StoredOrder[]> {
  const store = await readStore();
  const p = normalizePkPhone(phone);
  const digits = phone.replace(/\D/g, "");
  return store.orders.filter(
    (ord) =>
      ord.phoneNormalized === p ||
      ord.phone.replace(/\D/g, "").endsWith(digits.slice(-10)),
  );
}

export async function transitionOrder(
  orderNumber: string,
  next: OrderStatus,
): Promise<StoredOrder> {
  return withLock(async () => {
    const store = await ensureStore();
    const order = store.orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
    if (!order) throw new Error("Order not found");
    const allowed = nextStatuses(order.status);
    if (!allowed.includes(next)) {
      throw new Error(`Cannot move from ${order.status} to ${next}`);
    }

    // Restock on cancel for in-stock lines
    if (next === "cancelled") {
      for (const line of order.lines) {
        if (line.fulfilment === "in_stock") {
          const inv = store.inventory.find((r) => r.productId === line.productId);
          if (inv) inv.stockQty += line.quantity;
        }
      }
    }

    order.status = next;
    order.updatedAt = new Date().toISOString();
    order.events = buildEventsForStatus(next, order.createdAt);
    await persist(store);
    return order;
  });
}

export async function setStockQty(productId: string, stockQty: number): Promise<InventoryRow> {
  return withLock(async () => {
    const store = await ensureStore();
    const row = store.inventory.find((r) => r.productId === productId);
    if (!row) throw new Error("Product not found in inventory");
    if (!Number.isFinite(stockQty) || stockQty < 0) throw new Error("Invalid stock quantity");
    row.stockQty = Math.floor(stockQty);
    await persist(store);
    return row;
  });
}

export type PublicCustomer = {
  id: string;
  name: string;
  phone: string;
  phoneNormalized: string;
  email?: string;
};

function toPublic(c: CustomerAccount): PublicCustomer {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone,
    phoneNormalized: c.phoneNormalized,
    email: c.email,
  };
}

export async function registerCustomer(input: {
  name: string;
  phone: string;
  email?: string;
  password: string;
}): Promise<PublicCustomer> {
  return withLock(async () => {
    const store = await ensureStore();
    const name = input.name.trim();
    const phoneNormalized = normalizePkPhone(input.phone);
    if (!name || name.length < 2) throw new Error("Enter your full name");
    if (!/^\+923\d{9}$/.test(phoneNormalized)) {
      throw new Error("Enter a valid Pakistan mobile number");
    }
    if (!input.password || input.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (store.customers.some((c) => c.phoneNormalized === phoneNormalized)) {
      throw new Error("An account already exists for this phone. Sign in instead.");
    }
    const customer: CustomerAccount = {
      id: `cust_${Date.now().toString(36)}`,
      name,
      phone: input.phone.trim(),
      phoneNormalized,
      email: input.email?.trim() || undefined,
      passwordHash: hashCustomerPassword(input.password),
      createdAt: new Date().toISOString(),
    };
    store.customers.push(customer);
    await persist(store);
    return toPublic(customer);
  });
}

export async function authenticateCustomer(
  phone: string,
  password: string,
): Promise<PublicCustomer> {
  const store = await readStore();
  const phoneNormalized = normalizePkPhone(phone);
  const customer = store.customers.find(
    (c) =>
      c.phoneNormalized === phoneNormalized ||
      c.phone.replace(/\D/g, "").endsWith(phone.replace(/\D/g, "").slice(-10)),
  );
  if (!customer || !verifyCustomerPassword(customer.passwordHash, password)) {
    throw new Error("Invalid phone or password");
  }
  return toPublic(customer);
}

export async function getCustomerById(id: string): Promise<PublicCustomer | null> {
  const store = await readStore();
  const customer = store.customers.find((c) => c.id === id);
  return customer ? toPublic(customer) : null;
}
