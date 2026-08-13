"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/common/Button";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO:
    // Connect API / EmailJS / Resend / Mailchimp later

    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="bg-[#121214] py-36 max-[900px]:py-24"
    >
      <div className="mx-auto max-w-[760px] px-8 text-center max-[500px]:px-5">
        <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-[#ec0116] before:h-px before:w-6 before:bg-[#ec0116] after:h-px after:w-6 after:bg-[#ec0116]">
          Don't Miss The Drop
        </p>

        <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.3rem)] font-semibold uppercase leading-[1.05]">
          BE FIRST TO SHIFT.
        </h2>

        <p className="mx-auto mb-10 max-w-[560px] text-[#d6d6d4]">
          Reserve your spot for launch-day pricing on the first
          PaceShift collection — performance socks and the race
          jersey.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[640px] gap-4 max-[700px]:flex-col"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="h-14 flex-1 border border-white/10 bg-[#0a0a0b] px-5 text-white outline-none transition focus:border-[#ec0116]"
            />

            <Button href="#" className="h-14 px-8">
              Notify Me
            </Button>
          </form>
        ) : (
          <p className="font-display text-lg font-semibold text-[#ec0116]">
            You're on the list. See you at launch.
          </p>
        )}
      </div>
    </section>
  );
}