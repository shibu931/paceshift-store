import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "@/components/icons";
import { XIcon } from "@/components/icons";

const footerLinks = [
  { label: "Socks", href: "#socks" },
  { label: "Jersey", href: "#jersey" },
  { label: "Fabric Tech", href: "#fabric" },
  { label: "Story", href: "#story" },
  { label: "Coming Soon", href: "#coming-soon" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0b] mt-10">
      <div className="mx-auto max-w-[1240px] px-8 py-16 max-[500px]:px-5">

        {/* Logo */}

        <div className="mb-12 flex justify-center">
          <Image
            src="/images/paceshift_brand.webp"
            alt="PaceShift — Performance Gear"
            width={220}
            height={90}
            className="h-auto w-auto object-contain"
          />
        </div>

        {/* Navigation */}

        <nav className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-[#8a8a90] transition-colors duration-300 hover:text-[#ec0116]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}

        <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-8 max-[700px]:flex-col">

          <span className="text-sm text-[#8a8a90]">
            © 2026 PaceShift. All rights reserved.
          </span>

          <div className="flex items-center gap-4">

            <Link
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[#ec0116] hover:text-[#ec0116]"
            >
              <InstagramIcon className="h-[16px] w-[16px]" />
            </Link>

            <Link
              href="#"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[#ec0116] hover:text-[#ec0116]"
            >
              <XIcon className="h-[16px] w-[16px]" />
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}