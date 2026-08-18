"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import Button from "@/components/common/Button";
import { NAV_ITEMS } from "@/lib/constants";
import { useNavbar } from "@/hooks/useNavbar";
import Link from "next/link";
import { CartTrigger } from "../layout/cart/CartTrigger";

export default function Header() {
  const isScrolled = useNavbar();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      isMenuOpen
    );
  }, [isMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width:900px)"
    );

    const handleResize = () => {
      if (!media.matches) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "orientationchange",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[50] border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-[#0a0a0b]/85 "
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8 py-5 max-[500px]:px-5 max-[500px]:py-[18px]">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-[10px]"
        >
          <Image
            src="/images/paceshift_logo.png"
            alt="PaceShift"
            width={24}
            height={24}
            priority
          />

          <span className="font-display text-[20px] font-bold tracking-[0.02em]">
            <span className="text-[#ec0116]">
              PACE
            </span>

            <span className="bg-gradient-to-b from-[#a8a8aa] to-[#525254] bg-clip-text text-transparent">
              SHIFT
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d6d6d4] transition-colors hover:text-white"
            >
              {item.title}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#ec0116] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-6">

          {/* <div className="hidden lg:block">
            <CartTrigger/>
          </div> */}

          {/* Hamburger */}

          <button
            aria-label="Toggle Menu"
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="relative z-[600] flex h-7 w-7 flex-col justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-[2px] bg-white transition ${
                isMenuOpen
                  ? "translate-y-[7px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-[2px] bg-white transition ${
                isMenuOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`h-[2px] bg-white transition ${
                isMenuOpen
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-[550] flex flex-col items-center justify-center gap-7 bg-[#0a0a0b] transition-transform duration-300 lg:hidden ${
          isMenuOpen
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() =>
              setIsMenuOpen(false)
            }
            className="font-(--font-display) text-[26px] uppercase tracking-[0.05em]"
          >
            {item.title}
          </Link>
        ))}

        {/* <Button
          href="#waitlist"
          className="mt-3"
        >
          Join Waitlist
        </Button> */}
      </div>
    </header>
  );
}