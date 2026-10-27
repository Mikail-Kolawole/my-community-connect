import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MagnifyingGlass,
  ThumbsUp,
  X,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Warning,
} from "@phosphor-icons/react";
import {
  CATEGORIES,
  STATUSES,
  PRIORITY_STYLES,
  STATUS_STYLES,
  STATUS_DOT,
} from "../constants";
import type { ReportItem } from "../types";

interface ReportsListProps {
  reports: ReportItem[];
  onUpvote: (id: string) => void;
}

const catById = (id: string) => CATEGORIES.find((c) => c.id === id);

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d} day${d > 1 ? "s" : ""} ago`;
  const h = Math.floor(diff / 3600000);
  if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const m = Math.floor(diff / 60000);
  if (m > 0) return `${m} min ago`;
  return "Just now";
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ReportsList({ reports, onUpvote }: ReportsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<ReportItem | null>(null);

  const activeCategories = useMemo(() => {
    const present = new Set(reports.map((r) => r.category));
    return CATEGORIES.filter((c) => present.has(c.id));
  }, [reports]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reports
      .filter((r) => (category === "All" ? true : r.category === category))
      .filter((r) => (status === "All" ? true : r.status === status))
      .filter((r) =>
        q
          ? [r.title, r.description, r.location, r.landmark]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      )
      .sort((a, b) => b.upvotes - a.upvotes);
  }, [reports, category, status, search]);

  return (
    <section id="reports" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800 ring-1 ring-green-100">
              <Users size={14} weight="fill" />
              Community Reports
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
              What Iyamoye is reporting
            </h2>
            <p className="mt-2 max-w-[60ch] text-[15px] text-slate-600">
              Every open and resolved issue from across our quarters. Upvote the
              ones you have also noticed so they rise to the top.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports, places..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-7 flex flex-wrap gap-2">
          <FilterChip
            active={category === "All"}
            onClick={() => setCategory("All")}
            label="All issues"
          />
          {activeCategories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              label={c.label}
              icon={<c.icon size={15} weight="fill" />}
            />
          ))}
        </div>

        {/* Status filter */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Status
          </span>
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                status === s
                  ? "bg-green-800 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-green-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Warning size={28} weight="fill" className="text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">
              No reports match your filters
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Try a different category, status or search term.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => {
              const c = catById(r.category);
              return (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => setSelected(r)}
                    className="text-left"
                    aria-label={`Open details for ${r.title}`}
                  >
                    {r.photo ? (
                      <img
                        src={r.photo}
                        alt={r.title}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`grid h-40 w-full place-items-center ${
                          c ? c.accent : "bg-slate-500"
                        }`}
                      >
                        {c && <c.icon size={44} weight="fill" className="text-white/90" />}
                      </div>
                    )}
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {c && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${c.color}`}
                        >
                          <c.icon size={12} weight="fill" />
                          {c.label}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLES[r.status]}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[r.status]}`}
                        />
                        {r.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelected(r)}
                      className="mt-3 text-left text-[15px] font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-green-800"
                    >
                      {r.title}
                    </button>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {r.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <MapPin size={14} weight="fill" className="text-green-700" />
                      {r.location}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock size={14} />
                        {timeAgo(r.createdAt)}
                      </div>
                      <button
                        onClick={() => onUpvote(r.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                          r.voted
                            ? "bg-green-800 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-green-50 hover:text-green-800"
                        }`}
                      >
                        <ThumbsUp size={14} weight={r.voted ? "fill" : "regular"} />
                        I noticed this · {r.upvotes}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="relative">
                {selected.photo ? (
                  <img
                    src={selected.photo}
                    alt={selected.title}
                    className="h-52 w-full rounded-t-3xl object-cover"
                  />
                ) : (
                  <div
                    className={`grid h-40 w-full place-items-center rounded-t-3xl ${
                      catById(selected.category)?.accent ?? "bg-slate-500"
                    }`}
                  >
                    {catById(selected.category) && (
                      <span className="text-white">
                        {(() => {
                          const Icon = catById(selected.category)!.icon;
                          return <Icon size={52} weight="fill" />;
                        })()}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white"
                  aria-label="Close"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  {catById(selected.category) && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                        catById(selected.category)!.color
                      }`}
                    >
                      {(() => {
                        const Icon = catById(selected.category)!.icon;
                        return <Icon size={12} weight="fill" />;
                      })()}
                      {catById(selected.category)!.label}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLES[selected.status]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[selected.status]}`}
                    />
                    {selected.status}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${PRIORITY_STYLES[selected.priority]}`}
                  >
                    {selected.priority} priority
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-black tracking-tight text-slate-900">
                  {selected.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} weight="fill" className="text-green-700" />
                    {selected.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={15} />
                    {fmtDate(selected.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={15} />
                    {selected.reporter ?? "Anonymous resident"}
                  </span>
                </div>

                {selected.landmark && (
                  <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Landmark: </span>
                    {selected.landmark}
                  </p>
                )}

                <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  {selected.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Resolution timeline
                  </h4>
                  <ol className="mt-3 space-y-3 border-l-2 border-slate-100 pl-4">
                    {selected.timeline.map((t, i) => (
                      <li key={i} className="relative">
                        <span
                          className={`absolute -left-[22px] grid h-4 w-4 place-items-center rounded-full ${
                            t.done ? "bg-green-600" : "bg-slate-300"
                          }`}
                        >
                          {t.done && (
                            <CheckCircle size={16} weight="fill" className="text-white" />
                          )}
                        </span>
                        <div className="text-sm font-semibold text-slate-800">
                          {t.label}
                        </div>
                        <div className="text-xs text-slate-400">{fmtDate(t.date)}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm text-slate-500">
                    {selected.upvotes} residents also noticed this
                  </span>
                  <button
                    onClick={() => {
                      onUpvote(selected.id);
                      setSelected((cur) =>
                        cur
                          ? {
                              ...cur,
                              upvotes: cur.voted
                                ? cur.upvotes - 1
                                : cur.upvotes + 1,
                              voted: !cur.voted,
                            }
                          : cur,
                      );
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${
                      selected.voted
                        ? "bg-green-800 text-white"
                        : "bg-green-50 text-green-800 hover:bg-green-100"
                    }`}
                  >
                    <ThumbsUp size={16} weight={selected.voted ? "fill" : "regular"} />
                    {selected.voted ? "Confirmed" : "I also noticed this"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all active:scale-[0.98] ${
        active
          ? "border-green-800 bg-green-800 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:bg-green-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
