export type AuthSession =
  | { role: "guest" }
  | { role: "admin"; user: { name: string; username?: string } }
  | {
      role: "customer";
      customer: {
        id: string;
        name: string;
        phone: string;
        phoneNormalized: string;
        email?: string;
      };
    };

export async function fetchSession(): Promise<AuthSession> {
  try {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    if (!res.ok) return { role: "guest" };
    return (await res.json()) as AuthSession;
  } catch {
    return { role: "guest" };
  }
}

export async function signOut(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}
