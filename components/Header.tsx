"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" className="shrink-0" aria-label="Real Estate CNX home" onClick={() => setOpen(false)}>
          <Image src="/logo-mark-640.png" alt="Real Estate CNX" width={640} height={323} priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-sm font-bold transition hover:text-crimson ${path.startsWith(item.href) ? "text-crimson" : "text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/connect" className="btn btn-primary !py-2.5 !text-sm">Get connected</Link>
        </nav>
        <button
          className="rounded-md p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-black/5 bg-white md:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="font-display border-b border-black/5 py-3 font-bold">
                {item.label}
              </Link>
            ))}
            <Link href="/connect" onClick={() => setOpen(false)} className="btn btn-primary mt-4">Get connected</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
