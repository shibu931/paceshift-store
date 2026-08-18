import Link from "next/link";
import {
  Check,
  Package,
  Truck,
  MessageCircle,
} from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.order || "—";

  // Format WhatsApp message with the dynamic order ID
  const whatsappNumber = "918076602998";
  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to check the status of my order.\n\nOrder Number: ${orderNumber}`
  );
  const whatsappStatusUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#09090a] text-white">
      <div className="flex min-h-screen container-screen flex-col px-5 sm:px-8 lg:px-10">

        {/* Main */}
        <div className="flex flex-1 items-center justify-center py-16 sm:py-24">
          <div className="w-full max-w-[720px]">

            {/* Success icon */}
            <div className="flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center border border-[#f20a18]/30 bg-[#f20a18]/5">
                <div className="absolute inset-2 border border-[#f20a18]/20" />
                <Check
                  size={30}
                  strokeWidth={2}
                  className="text-[#f20a18]"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-9 text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#f20a18]">
                Payment Successful
              </p>

              <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.03em] sm:text-5xl">
                Order Confirmed.
              </h1>

              <p className="mx-auto mt-5 max-w-[500px] text-sm leading-6 text-white/40">
                Your order has been confirmed and
                we&apos;re getting it ready for the road.
              </p>
            </div>

            {/* Order number */}
            <div className="mt-10 border border-white/10 bg-[#0d0d0e]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Order Number
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-white">
                  {orderNumber}
                </span>
              </div>

              <div className="grid sm:grid-cols-2">
                <div className="border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-r">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Payment
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f20a18]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Paid
                    </span>
                  </div>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Status
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f20a18]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mt-8">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                What Happens Next
              </p>

              <div className="grid border border-white/10 bg-[#0d0d0e] sm:grid-cols-2">
                <Step
                  number="01"
                  icon={<Package size={18} />}
                  title="Order Processing"
                  description="We're preparing your gear for dispatch."
                />
                <Step
                  number="02"
                  icon={<Truck size={18} />}
                  title="On Its Way"
                  description="You'll receive tracking details once shipped."
                />
              </div>
            </div>

            {/* Actions (Check Status on WhatsApp & Back to Home) */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={whatsappStatusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-13 flex-1 items-center justify-center gap-3 bg-[#f20a18] px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1725]"
              >
                <MessageCircle size={15} />
                Check Status
              </Link>

              <Link
                href="/"
                className="flex h-13 flex-1 items-center justify-center border border-white/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Back to Home
              </Link>
            </div>

            {/* Support / Contact on WhatsApp */}
            <p className="mt-8 text-center text-[9px] uppercase tracking-[0.14em] text-white/20">
              Need help with your order?{" "}
              <Link
                href={whatsappStatusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 underline underline-offset-4 transition hover:text-white"
              >
                Contact on WhatsApp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative px-5 py-6">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#f20a18]/20 bg-[#f20a18]/5 text-[#f20a18]">
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] font-bold text-[#f20a18]">
              {number}
            </span>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-[10px] leading-5 text-white/30">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}