import Image from "next/image";
import Link from "next/link";

import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";
import { brandName, whatsappHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10">
      <Image
        src={BRAND_BACKGROUNDS.sectionStudio}
        alt=""
        fill
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#3a2430]/82" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1820]/90 via-[#3a2430]/70 to-[#3a2430]/55" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-[#f3dde4]">{brandName}</p>
          <p className="mt-2 text-sm text-white/75">
            Handmade crochet gifts from artisans across Pakistan. Made to order with care.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Delivery</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>Karachi · Lahore · Islamabad</li>
            <li>Rawalpindi · Faisalabad · more</li>
            <li>Cash on delivery available</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Help</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/track" className="hover:text-[#f3dde4]">
                Track order
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#f3dde4]">
                Returns & damage
              </Link>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-[#f3dde4]">
                WhatsApp support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Follow</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>
              <a href="#" className="hover:text-[#f3dde4]">
                Instagram (placeholder)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f3dde4]">
                TikTok (placeholder)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {brandName}. All prices in PKR.
      </div>
    </footer>
  );
}
