"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  CreditCard,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import RazorpayCheckout from "./RazorpayCheckout";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/cart.store";
import { createCodOrderAction } from "@/features/checkout/checkout.action";

interface CheckoutItemPayload {
  productId: string;
  variantSku: string;
  quantity: number;
}

interface CheckoutFormProps {
  items: CheckoutItemPayload[];

  isLoggedIn?: boolean;

  userDefaultData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

type Step = 1 | 2 | 3;

type PaymentMethod = "PREPAID" | "cod";

export default function CheckoutForm({
  items,
  isLoggedIn = false,
  userDefaultData,
}: CheckoutFormProps) {
  const router = useRouter();

  const clearCart = useCartStore((state) => state.clearCart);
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showRazorpay, setShowRazorpay] = useState(false);

  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: userDefaultData?.name || "",
    email: userDefaultData?.email || "",
    phone: userDefaultData?.phone || "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",

    paymentMethod: "PREPAID" as PaymentMethod,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Validation                                                                 */
  /* -------------------------------------------------------------------------- */

  const validateStep1 = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errs.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};

    if (!formData.addressLine1.trim()) {
      errs.addressLine1 = "Street address is required";
    }

    if (!formData.city.trim()) {
      errs.city = "City is required";
    }

    if (!formData.state.trim()) {
      errs.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      errs.postalCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      errs.postalCode = "Enter a valid 6-digit PIN code";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  /* -------------------------------------------------------------------------- */
  /* Navigation                                                                 */
  /* -------------------------------------------------------------------------- */

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = (step: Step) => {
    if (step < currentStep) {
      setCurrentStep(step);
      setShowRazorpay(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Final Checkout                                                             */
  /* -------------------------------------------------------------------------- */

  const handleCodCheckout = async () => {
    if (!items.length) {
      setCheckoutError("Your cart is empty.");

      return;
    }

    try {
      setIsSubmitting(true);
      setCheckoutError(null);

      const result = await createCodOrderAction({
        customer: {
          name: formData.name.trim(),

          email: formData.email.trim(),

          phone: formData.phone.replace(/\D/g, "").trim(),
        },

        shippingAddress: {
          addressLine1: formData.addressLine1.trim(),

          addressLine2: formData.addressLine2.trim(),

          city: formData.city.trim(),

          state: formData.state.trim(),

          postalCode: formData.postalCode.trim(),

          country: "India",
        },

        items,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || "Unable to place your order.");
      }

      /*
       * Order successfully created.
       *
       * Now clear local cart.
       */
      clearCart();

      /*
       * Redirect to success page.
       */
      router.push(
        `/checkout/success?order=${encodeURIComponent(
          result.data.orderNumber,
        )}`,
      );
    } catch (error) {
      console.error("COD checkout failed:", error);

      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Unable to place your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!items.length) {
      return;
    }

    setCheckoutError(null);

    /*
     * PREPAID
     */
    if (formData.paymentMethod === "PREPAID") {
      setShowRazorpay(true);
      return;
    }

    /*
     * CASH ON DELIVERY
     */
    if (formData.paymentMethod === "cod") {
      await handleCodCheckout();
    }
  };

  /*
   * Same payload structure as your old
   * working Razorpay checkout.
   */
  const checkoutData = {
    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },

    shippingAddress: {
      addressLine1: formData.addressLine1,

      addressLine2: formData.addressLine2,

      city: formData.city,

      state: formData.state,

      postalCode: formData.postalCode,

      country: "India",
    },

    items,
  };

  return (
    <div className="space-y-6">
      {/* Progress Stepper */}
      <div className="grid grid-cols-3 border border-white/10 bg-[#0d0d0e]">
        {[
          {
            step: 1,
            label: "Account",
            icon: <User size={14} />,
          },
          {
            step: 2,
            label: "Address",
            icon: <MapPin size={14} />,
          },
          {
            step: 3,
            label: "Payment",
            icon: <CreditCard size={14} />,
          },
        ].map((item) => {
          const isDone = currentStep > item.step;

          const isActive = currentStep === item.step;

          return (
            <button
              key={item.step}
              type="button"
              disabled={item.step > currentStep}
              onClick={() => handleBack(item.step as Step)}
              className={`flex items-center justify-center gap-2 border-r border-white/10 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition last:border-r-0 ${
                isActive
                  ? "bg-white/5 text-[#f20a18]"
                  : isDone
                    ? "cursor-pointer text-white hover:bg-white/5"
                    : "cursor-not-allowed text-white/20"
              }`}
            >
              {isDone ? (
                <Check size={14} className="text-[#f20a18]" />
              ) : (
                item.icon
              )}

              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleFinalSubmit}>
        {/* ================================================================ */}
        {/* STEP 1                                                          */}
        {/* ================================================================ */}

        {currentStep === 1 && (
          <div className="border border-white/10 bg-[#0d0d0e] p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                1. Contact Details
              </h2>

              {isLoggedIn && (
                <span className="border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/50">
                  Logged In
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                />

                {errors.name && (
                  <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />

                  {errors.email && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-[#f20a18] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#ff1725]"
              >
                Continue to Address
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 2                                                          */}
        {/* ================================================================ */}

        {currentStep === 2 && (
          <div className="border border-white/10 bg-[#0d0d0e] p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                2. Shipping Address
              </h2>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-[10px] font-semibold uppercase tracking-wider text-white/40 transition hover:text-white"
              >
                Edit Contact
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                  Street Address
                </label>

                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="House / Flat No., Building, Street"
                  className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                />

                {errors.addressLine1 && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                  Apartment, Suite, Landmark
                  <span className="ml-2 text-white/20">OPTIONAL</span>
                </label>

                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Near City Center"
                  className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />

                  {errors.city && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />

                  {errors.state && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="400001"
                    maxLength={6}
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />

                  {errors.postalCode && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="border border-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition hover:bg-white/5"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#f20a18] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#ff1725]"
                >
                  Proceed to Payment
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3                                                          */}
        {/* ================================================================ */}

        {currentStep === 3 && (
          <div className="border border-white/10 bg-[#0d0d0e] p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                3. Payment Method
              </h2>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-[10px] font-semibold uppercase tracking-wider text-white/40 transition hover:text-white"
              >
                Edit Address
              </button>
            </div>

            {/* Delivery Summary */}

            <div className="mb-6 border border-white/5 bg-[#151516] p-4 text-[11px] text-white/60">
              <p className="font-bold text-white">
                {formData.name} • {formData.phone}
              </p>

              <p className="mt-1 text-white/40">
                {formData.addressLine1}, {formData.city}, {formData.state} -{" "}
                {formData.postalCode}
              </p>
            </div>

            {/* Payment Options */}

            <div className="space-y-3">
              <label
                className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                  formData.paymentMethod === "PREPAID"
                    ? "border-[#f20a18] bg-[#f20a18]/5"
                    : "border-white/10 bg-[#151516] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "PREPAID"}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: "PREPAID",
                      }));

                      setShowRazorpay(false);
                    }}
                    className="accent-[#f20a18]"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                      Online Payment
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      UPI, Cards and Net Banking
                    </p>
                  </div>
                </div>

                <span className="border border-[#f20a18]/30 bg-[#f20a18]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#f20a18]">
                  RECOMMENDED
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                  formData.paymentMethod === "cod"
                    ? "border-[#f20a18] bg-[#f20a18]/5"
                    : "border-white/10 bg-[#151516] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: "cod",
                      }));

                      setShowRazorpay(false);
                    }}
                    className="accent-[#f20a18]"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                      Cash on Delivery
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
              </label>

              {/* ---------------------------------------------------------- */}
              {/* Razorpay Button                                            */}
              {/* ---------------------------------------------------------- */}
              {checkoutError && (
                <div className="mb-4 border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
                  {checkoutError}
                </div>
              )}

              {showRazorpay && formData.paymentMethod === "PREPAID" && (
                <div className="pt-4">
                  <RazorpayCheckout checkoutData={checkoutData} />

                  <button
                    type="button"
                    onClick={() => setShowRazorpay(false)}
                    className="mt-3 w-full text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 hover:text-white"
                  >
                    Change Payment Method
                  </button>
                </div>
              )}

              {/* ---------------------------------------------------------- */}
              {/* Normal Submit Button                                       */}
              {/* ---------------------------------------------------------- */}

              {!showRazorpay && (
                <div className="mt-6 flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="border border-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition hover:bg-white/5"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex flex-1 items-center justify-center gap-2 bg-[#f20a18] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#ff1725] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : formData.paymentMethod === "PREPAID" ? (
                      "Proceed to Payment"
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
