import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, MapPin, List, X, Plus } from "@phosphor-icons/react";
import { BRAND_NAME, LOCATION_BADGE } from "../constants";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const LINKS = [
  { id: "home", label: "Home" },
  { id: "report", label: "Submit Report" },
  { id: "reports", label: "Community Reports" },
  { id: "about", label: "About" },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-3 text-left"
          aria-label={`${BRAND_NAME} home`}
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-green-800 text-white shadow-sm transition-transform group-hover:scale-105">
            <Megaphone size={22} weight="fill" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-green-900 sm:text-base">
              {BRAND_NAME}
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <MapPin size={11} weight="fill" />
              {LOCATION_BADGE}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-green-50 hover:text-green-800"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("report")}
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-green-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-900 active:scale-[0.98]"
          >
            <Plus size={16} weight="bold" />
            Report a Problem
          </button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-lg text-green-900 ring-1 ring-green-900/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-green-900/10 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-green-50 hover:text-green-800"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("report")}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-800 px-4 py-3 text-sm font-bold text-white"
              >
                <Plus size={16} weight="bold" />
                Report a Problem
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
