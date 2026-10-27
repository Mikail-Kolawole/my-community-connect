import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardText,
  Users,
  Building,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "@phosphor-icons/react";

interface AboutSectionProps {
  onNavigate: (id: string) => void;
}

const STEPS = [
  {
    title: "Report & Document",
    body: "Any resident describes the issue, picks its category and marks the exact Iyamoye quarter or landmark. A photo can be attached for proof.",
    icon: ClipboardText,
    color: "bg-green-800",
  },
  {
    title: "Community Visibility & Verification",
    body: "Neighbours confirm with an upvote, so the reports that matter most rise to the top and the ward leader can verify them on the ground.",
    icon: Users,
    color: "bg-emerald-600",
  },
  {
    title: "Representative & Council Engagement",
    body: "Verified reports are tracked through a public timeline from Pending to Resolved, giving the ward development association and Ijumu LGA clear evidence to act on.",
    icon: Building,
    color: "bg-amber-500",
  },
];

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800 ring-1 ring-green-100">
            <ShieldCheck size={14} weight="fill" />
            About the platform
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
            How reporting builds a better Iyamoye
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Iyamoye is a close-knit community in Ijumu Local Government Area of
            Kogi State. When problems go unseen, they stay unfixed. MyCommunity
            Connect turns everyday observations into a shared, permanent record
            that community leaders and the local council can plan and act on.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl text-white ${s.color}`}
                >
                  <s.icon size={22} weight="fill" />
                </span>
                <span className="text-xs font-black text-slate-300">
                  STEP {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl bg-green-900 p-7 text-white lg:col-span-2">
            <h3 className="text-xl font-bold tracking-tight">
              Built around community development associations
            </h3>
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-green-50/90">
              In Ijumu LGA, ward development unions and community associations
              are the first bridge between residents and government. This
              platform keeps a transparent, searchable record of local
              infrastructure so those associations can prioritise repairs,
              attract attention to neglected quarters, and follow every report
              from submission to resolution.
            </p>
            <button
              onClick={() => onNavigate("report")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-green-950 transition-all hover:bg-emerald-400 active:scale-[0.98]"
            >
              Add your community report
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-7">
            <div className="flex items-start gap-3">
              <MapPin size={22} weight="fill" className="mt-0.5 text-green-700" />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Covers all Iyamoye quarters
                </div>
                <div className="text-sm text-slate-600">
                  Iluhagba, Odo-Afin, Araromi, Iyah, Okela, market and school
                  areas and more.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} weight="fill" className="mt-0.5 text-green-700" />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Open, honest and local
                </div>
                <div className="text-sm text-slate-600">
                  Reports are visible to the whole community so progress is
                  never hidden.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
