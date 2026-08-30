"use client";

import { useState } from "react";
import { User, MapPin, CreditCard, ChevronRight, Check, Loader2 } from "lucide-react";

interface CheckoutItemPayload {
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
type PaymentMethod = "PREPAID" | "COD";

export default function CheckoutForm({
  items,
  isLoggedIn = false,
  userDefaultData,
}: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  // Step Validations
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
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
    if (!formData.addressLine1.trim()) errs.addressLine1 = "Street address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    if (!formData.postalCode.trim()) {
      errs.postalCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      errs.postalCode = "Enter a valid 6-digit PIN code";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = (step: Step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          line1: formData.addressLine1,
          line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
        items,
      };

      console.log("Submitting Checkout Payload:", payload);
      // Trigger order creation / Razorpay SDK flow here
    } catch (err) {
      console.error("Order processing failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Stepper Bar */}
      <div className="grid grid-cols-3 border border-white/10 bg-[#0d0d0e]">
        {[
          { step: 1, label: "Account", icon: <User size={14} /> },
          { step: 2, label: "Address", icon: <MapPin size={14} /> },
          { step: 3, label: "Payment", icon: <CreditCard size={14} /> },
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
              {isDone ? <Check size={14} className="text-[#f20a18]" /> : item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleFinalSubmit}>
        {/* STEP 1: Account / Contact Info */}
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
                {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
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
                    <p className="mt-1 text-[10px] text-red-500">{errors.email}</p>
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
                    className="w-full border border-white/10 bg-[#151516] px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition focus:border-[#f20a18]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[10px] text-red-500">{errors.phone}</p>
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

        {/* STEP 2: Shipping Address */}
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
                  <p className="mt-1 text-[10px] text-red-500">{errors.addressLine1}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                  Apartment, Suite, Landmark (Optional)
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
                  {errors.city && <p className="mt-1 text-[10px] text-red-500">{errors.city}</p>}
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
                    <p className="mt-1 text-[10px] text-red-500">{errors.state}</p>
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
                    <p className="mt-1 text-[10px] text-red-500">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="border border-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition hover:bg-white/5 hover:text-white"
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

        {/* STEP 3: Payment Selection & Place Order */}
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

            {/* Delivery Summary Brief */}
            <div className="mb-6 border border-white/5 bg-[#151516] p-4 text-[11px] text-white/60">
              <p className="font-bold text-white">{formData.name} • {formData.phone}</p>
              <p className="mt-1 text-white/40">
                {formData.addressLine1}, {formData.city}, {formData.state} - {formData.postalCode}
              </p>
            </div>

            <div className="space-y-3">
              {/* Prepaid Option */}
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
                    value="PREPAID"
                    checked={formData.paymentMethod === "PREPAID"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: "PREPAID" }))
                    }
                    className="accent-[#f20a18]"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                      Online Payment (Prepaid)
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40">
                      UPI, Credit/Debit Cards, NetBanking (Fastest)
                    </p>
                  </div>
                </div>
                <span className="border border-[#f20a18]/30 bg-[#f20a18]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#f20a18]">
                  RECOMMENDED
                </span>
              </label>

              {/* COD Option */}
              <label
                className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                  formData.paymentMethod === "COD"
                    ? "border-[#f20a18] bg-[#f20a18]/5"
                    : "border-white/10 bg-[#151516] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: "COD" }))
                    }
                    className="accent-[#f20a18]"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                      Cash on Delivery (COD)
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40">
                      Pay with cash upon delivery
                    </p>
                  </div>
                </div>
              </label>

              <div className="mt-6 flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="border border-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition hover:bg-white/5 hover:text-white"
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
                    "Proceed to Razorpay"
                  ) : (
                    "Confirm COD Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}