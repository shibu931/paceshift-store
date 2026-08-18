"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import RazorpayCheckout from "./RazorpayCheckout";

interface CartItem {
  variantSku: string;
  quantity: number;
}

interface CheckoutFormProps {
  items: CartItem[];
}

const inputClass =
  "h-12 w-full border border-white/10 bg-[#0d0d0e] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30";

const labelClass =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/50";

function FieldIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25">
      {children}
    </span>
  );
}

export default function CheckoutForm({
  items,
}: CheckoutFormProps) {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
    });

  const [showPayment, setShowPayment] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    if (!items.length) {
      setError(
        "Your cart is empty."
      );

      return;
    }

    setShowPayment(true);
  }

  const checkoutData = {
    customer: {
      name: form.name,
      email: form.email,
      phone: form.phone,
    },

    shippingAddress: {
      addressLine1:
        form.addressLine1,

      addressLine2:
        form.addressLine2,

      city: form.city,

      state: form.state,

      postalCode:
        form.postalCode,

      country: "India",
    },

    items,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-12"
    >
      {/* -------------------------------- */}
      {/* Contact */}
      {/* -------------------------------- */}

      <section>
        <SectionHeading
          number="01"
          title="Contact Information"
          description="We'll use these details to keep you updated about your order."
        />

        <div className="mt-7 space-y-5">
          <div>
            <label className={labelClass}>
              Full Name
            </label>

            <div className="relative">
              <FieldIcon>
                <User size={16} />
              </FieldIcon>

              <input
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Your full name"
                className={`${inputClass} pl-11`}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Email Address
            </label>

            <div className="relative">
              <FieldIcon>
                <Mail size={16} />
              </FieldIcon>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className={`${inputClass} pl-11`}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Phone Number
            </label>

            <div className="flex">
              <div className="flex h-12 items-center border border-r-0 border-white/10 bg-[#151516] px-4 text-xs font-medium text-white/50">
                +91
              </div>

              <div className="relative flex-1">
                <FieldIcon>
                  <Phone size={16} />
                </FieldIcon>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="9876543210"
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* Delivery */}
      {/* -------------------------------- */}

      <section>
        <SectionHeading
          number="02"
          title="Delivery Address"
          description="Where should we deliver your order?"
        />

        <div className="mt-7 space-y-5">
          <div>
            <label className={labelClass}>
              Address
            </label>

            <div className="relative">
              <FieldIcon>
                <MapPin size={16} />
              </FieldIcon>

              <input
                value={
                  form.addressLine1
                }
                onChange={(e) =>
                  updateField(
                    "addressLine1",
                    e.target.value
                  )
                }
                placeholder="House number, street, area"
                className={`${inputClass} pl-11`}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Apartment, Suite, etc.
              <span className="ml-2 font-normal text-white/20">
                OPTIONAL
              </span>
            </label>

            <input
              value={
                form.addressLine2
              }
              onChange={(e) =>
                updateField(
                  "addressLine2",
                  e.target.value
                )
              }
              placeholder="Apartment, floor, landmark"
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                City
              </label>

              <input
                value={form.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
                placeholder="City"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                State
              </label>

              <input
                value={form.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value
                  )
                }
                placeholder="State"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              PIN Code
            </label>

            <input
              value={form.postalCode}
              onChange={(e) =>
                updateField(
                  "postalCode",
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              inputMode="numeric"
              maxLength={6}
              placeholder="800001"
              className={inputClass}
              required
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* -------------------------------- */}
      {/* Payment */}
      {/* -------------------------------- */}

      {!showPayment ? (
        <button
          type="submit"
          className="group relative flex h-14 w-full items-center justify-center overflow-hidden bg-[#f20a18] text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1725]"
        >
          <span className="relative z-10">
            Continue to Payment
          </span>

          <span className="absolute right-5 text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      ) : (
        <RazorpayCheckout
          checkoutData={checkoutData}
        />
      )}

      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-white/25">
        Secure checkout · Your payment
        information is protected
      </p>
    </form>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-white/10 pb-5">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] font-bold text-[#f20a18]">
          {number}
        </span>

        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
          {title}
        </h2>
      </div>

      <p className="mt-2 pl-9 text-xs leading-5 text-white/40">
        {description}
      </p>
    </div>
  );
}