import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-8 py-3 text-[13px] uppercase tracking-[0.12em] font-bold font-display transition-all duration-300 [clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)]",
        variant === "primary"
          ? "bg-[#ec0116] text-white hover:bg-[#a8010f] hover:-translate-y-0.5"
          : "border border-white/10 text-white hover:border-[#ec0116] hover:text-[#ec0116]",
        className
      )}
    >
      {children}
    </Link>
  );
}