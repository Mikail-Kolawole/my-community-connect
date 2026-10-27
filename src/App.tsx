import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  Megaphone,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ReportForm from "./components/ReportForm";
import ReportsList from "./components/ReportsList";
import AboutSection from "./components/AboutSection";
import {
  INITIAL_REPORTS,
  EMERGENCY_CONTACTS,
  BRAND_NAME,
  LOCATION_BADGE,
  STATE_CONTEXT,
  TAGLINE,
} from "./constants";
import type { ReportItem } from "./types";

const STORAGE_KEY = "mycommunity-iyamoye-reports";

function loadReports(): ReportItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_REPORTS;
    const parsed = JSON.parse(raw) as ReportItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_REPORTS;
    return parsed;
  } catch {
    return INITIAL_REPORTS;
  }
}

export default function App() {
  const [reports, setReports] = useState<ReportItem[]>(loadReports);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch {
      /* storage full or unavailable — keep in-memory state */
    }
  }, [reports]);

  const stats = useMemo(
    () => ({
      total: reports.length,
      resolved: reports.filter((r) => r.status === "Resolved").length,
      review: reports.filter((r) => r.status === "Under Review").length,
      quarters: new Set(reports.map((r) => r.location)).size,
    }),
    [reports],
  );

  const onNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const addReport = (report: ReportItem) => {
    setReports((prev) => [report, ...prev]);
    toast.success("Report submitted", {
      description: `Thank you for helping improve ${report.location}. It is now live in the community feed.`,
    });
    setTimeout(() => onNavigate("reports"), 300);
  };

  const toggleUpvote = (id: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const voted = !r.voted;
        return { ...r, voted, upvotes: r.upvotes + (voted ? 1 : -1) };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onNavigate={onNavigate} />

      <main>
        <Hero onNavigate={onNavigate} stats={stats} />
        <ReportForm onSubmit={addReport} />
        <ReportsList reports={reports} onUpvote={toggleUpvote} />
        <AboutSection onNavigate={onNavigate} />
      </main>

      <Footer onNavigate={onNavigate} />

      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "report", label: "Submit a Report" },
    { id: "reports", label: "Community Reports" },
    { id: "about", label: "About" },
  ];

  return (
    <footer className="bg-green-950 text-green-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 text-green-950">
                <Megaphone size={22} weight="fill" />
              </span>
              <div>
                <div className="text-base font-extrabold tracking-tight text-white">
                  {BRAND_NAME}
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-emerald-300">
                  <MapPin size={12} weight="fill" />
                  {LOCATION_BADGE}, {STATE_CONTEXT}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-green-200/80">
              {TAGLINE}. A resident-powered platform for documenting and
              resolving local infrastructure issues across Iyamoye.
            </p>
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <ShieldCheck size={18} weight="fill" className="mt-0.5 shrink-0 text-emerald-300" />
              <p className="text-xs leading-relaxed text-green-200/80">
                For emergencies such as collapsed structures or flooding, always
                contact the official numbers below first. This platform is for
                documentation and community visibility.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-green-200/80 transition-colors hover:text-white"
                  >
                    <ArrowRight size={13} weight="bold" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              Local Contacts
            </h4>
            <ul className="mt-4 space-y-3">
              {EMERGENCY_CONTACTS.map((c) => (
                <li key={c.label} className="flex items-start gap-2">
                  <Phone size={15} weight="fill" className="mt-0.5 shrink-0 text-emerald-300" />
                  <span className="text-sm leading-tight">
                    <span className="block text-green-200/70">{c.label}</span>
                    <span className="font-bold text-white">{c.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-green-200/60">
            © {new Date().getFullYear()} {BRAND_NAME} · An Iyamoye community
            development initiative.
          </p>
          <p className="text-xs text-green-200/60">
            Built with residents of Ijumu Local Government Area, Kogi State.
          </p>
        </div>
      </div>
    </footer>
  );
}
