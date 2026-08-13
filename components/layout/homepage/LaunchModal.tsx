"use client";
import { useState, useEffect } from 'react';

export default function LaunchModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');

    const targetDate = new Date("2026-08-19T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/78 backdrop-blur-sm flex items-center justify-center p-6 z-[1200]">
      <div className="w-full max-w-[560px] bg-gradient-to-b from-[#1a1a1ef9] to-[#121214f9] border border-border-subtle border-t-[3px] border-t-red shadow-[0_18px_60px_rgba(0,0,0,0.35)] p-[26px] sm:p-8 relative">
        <button 
          className="absolute top-3.5 right-3.5 w-9 h-9 border border-border-subtle rounded-full grid place-items-center text-white text-[22px] transition-all hover:border-red hover:text-red" 
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        <p className="font-display text-[13px] tracking-[0.28em] uppercase text-red font-semibold inline-flex items-center gap-3 mb-5 before:w-6 before:h-px before:bg-red after:w-6 after:h-px after:bg-red">
          Launch Countdown
        </p>
        <h2 className="font-display uppercase font-semibold leading-[1.05] tracking-[0.01em] text-[clamp(1.8rem,4vw,2.8rem)] my-2.5">
          PACESHIFT LAUNCHES<br /><span className="text-red">19 AUG 2026.</span>
        </h2>
        <p className="text-[15px] text-ink-light mb-[26px]">
          The first drop is almost here. Join the waitlist now and get launch-day pricing first.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white/5 border border-border-subtle py-4 px-2 text-center">
              <span className="block font-display text-[28px] font-bold text-red mb-0.5">
                {value.toString().padStart(2, '0')}
              </span>
              <small className="text-[11px] tracking-[0.18em] uppercase text-muted">{unit}</small>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="inline-flex items-center justify-center font-display text-[13px] tracking-[0.12em] uppercase font-bold py-3.5 px-7 transition-all duration-300 bg-red text-white hover:bg-red-deep [clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)] w-full sm:w-auto" 
            onClick={() => setIsOpen(false)}
          >
            Join Waitlist
          </button>
          <button 
            className="inline-flex items-center justify-center font-display text-[13px] tracking-[0.12em] uppercase font-bold py-3.5 px-7 transition-all duration-300 border border-border-subtle text-white hover:border-red hover:text-red [clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)] w-full sm:w-auto" 
            onClick={() => setIsOpen(false)}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
}