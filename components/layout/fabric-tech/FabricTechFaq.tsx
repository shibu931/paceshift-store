"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why does PaceShift use bamboo viscose?",
    answer:
      "Bamboo viscose makes up the majority of the blend because it provides a soft, breathable feel against the skin and forms the comfort foundation of the sock.",
  },
  {
    question: "Why is nylon added to the blend?",
    answer:
      "Nylon adds structure and durability to the fabric. It helps the sock maintain its shape through repeated wear and washing while complementing the softer bamboo viscose.",
  },
  {
    question: "What does the spandex contribute?",
    answer:
      "Spandex provides elasticity and stretch. It allows the sock to move with your foot while helping maintain a secure, locked-in fit.",
  },
  {
    question: "Why is the composition 70% / 20% / 10%?",
    answer:
      "Each percentage has a specific purpose. Bamboo viscose forms the comfort foundation, nylon contributes structure and durability, and spandex provides the stretch needed for a secure performance fit.",
  },
  {
    question: "Is the fabric suitable for running and training?",
    answer:
      "The blend and sock construction are designed around active use, combining a soft fabric foundation with moisture management, targeted arch support, cushioning and reinforced areas.",
  },
  {
    question: "How should I care for the socks?",
    answer:
      "Machine wash cold with similar colors. Avoid bleach and excessive heat, and air dry when possible to help preserve the fabric and elasticity.",
  },
];

export function FabricTechFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            Frequently Asked
          </p>

          <h2
            className="
              mt-4
              max-w-2xl
              font-heading
              text-4xl
              font-bold
              uppercase
              leading-[0.95]
              tracking-wide
              sm:text-5xl
            "
          >
            Know Your
            <br />
            Fabric.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
            Everything you need to know about the fibers
            behind PaceShift performance socks.
          </p>
        </div>

        {/* FAQ */}
        <div className="border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    py-6
                    text-left
                  "
                >
                  <div className="flex items-start gap-5">
                    <span className="hidden pt-1 text-[10px] font-bold tracking-[0.2em] text-red-500 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-wide
                        text-white
                        transition-colors
                        group-hover:text-red-500
                      "
                    >
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-white/10
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "border-red-500 bg-red-500"
                          : "bg-transparent"
                      }
                    `}
                  >
                    <ChevronDown
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        ${
                          isOpen
                            ? "rotate-180 text-white"
                            : "text-neutral-500"
                        }
                      `}
                      strokeWidth={1.5}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ease-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-0 sm:pl-10">
                      <p className="max-w-2xl text-sm leading-7 text-neutral-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}