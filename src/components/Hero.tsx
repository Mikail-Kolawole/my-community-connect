import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ClipboardText,
  ShieldCheck,
  Users,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";
import { BRAND_NAME, TAGLINE, STATE_CONTEXT } from "../constants";

interface HeroProps {
  onNavigate: (id: string) => void;
  stats: {
    total: number;
    resolved: number;
    review: number;
    quarters: number;
  };
}

export default function Hero({ onNavigate, stats }: HeroProps) {
  const reduce = useReducedMotion();
  const statItems = [
    { label: "Total Reports", value: stats.total, icon: ClipboardText },
    { label: "Issues Resolved", value: stats.resolved, icon: ShieldCheck },
    { label: "Under Review", value: stats.review, icon: Users },
    { label: "Active Quarters", value: stats.quarters, icon: MapPin },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white"
    >
      {/* soft civic texture */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-white/20">
            <Sparkle size={14} weight="fill" />
            Community-led infrastructure reporting for {STATE_CONTEXT}
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
            {BRAND_NAME}
          </h1>
          <p className="mt-4 text-lg font-semibold text-emerald-100 sm:text-xl">
            {TAGLINE}
          </p>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-green-50/90 sm:text-base">
            A simple, trusted space for the people of Iyamoye to document local
            issues like damaged roads, blocked drainage, waste, broken
            streetlights and failed public facilities, so our community and
            leaders can act on them together.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onNavigate("report")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-green-950 shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-400 active:scale-[0.98]"
            >
              Report a Problem
              <ArrowRight size={18} weight="bold" />
            </button>
            <button
              onClick={() => onNavigate("reports")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              View Active Reports
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {statItems.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur sm:p-5"
            >
              <s.icon size={20} weight="duotone" className="text-emerald-200" />
              <div className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs font-medium text-green-50/80 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative h-6 bg-gradient-to-b from-transparent to-slate-50/40" />
    </section>
  );
}
