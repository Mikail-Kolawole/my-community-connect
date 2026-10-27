import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Camera,
  Check,
  ClipboardText,
  ArrowRight,
  Warning,
} from "@phosphor-icons/react";
import {
  CATEGORIES,
  PRIORITIES,
  IYAMOYE_LOCATIONS,
  PRIORITY_STYLES,
} from "../constants";
import type { Priority, ReportItem } from "../types";

interface ReportFormProps {
  onSubmit: (report: ReportItem) => void;
}

const fieldBase =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-green-600/30";

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [reporter, setReporter] = useState("");
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setErrors((p) => ({ ...p, photo: "Please pick an image under 3MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (title.trim().length < 6)
      next.title = "Give a clear title of at least 6 characters.";
    if (!category) next.category = "Choose the problem category.";
    if (!location) next.location = "Select the Iyamoye quarter or area.";
    if (description.trim().length < 15)
      next.description = "Describe the issue in at least 15 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setTitle("");
    setCategory("");
    setLocation("");
    setLandmark("");
    setDescription("");
    setPriority("Medium");
    setReporter("");
    setPhoto("");
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const nowIso = new Date().toISOString();
    const report: ReportItem = {
      id: `r-${Date.now()}`,
      title: title.trim(),
      category,
      location,
      landmark: landmark.trim(),
      description: description.trim(),
      priority,
      status: "Pending",
      createdAt: nowIso,
      upvotes: 1,
      voted: true,
      photo,
      reporter: reporter.trim() || "Anonymous resident",
      timeline: [
        { label: "Report submitted by resident", date: nowIso, done: true },
        { label: "Awaiting ward verification", date: nowIso, done: false },
      ],
    };
    onSubmit(report);
    reset();
  };

  const err = (k: string) =>
    errors[k] ? "border-red-300" : "border-slate-200 focus:border-green-600";

  return (
    <section id="report" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
            <ClipboardText size={14} weight="fill" />
            Report a problem
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
            Document an issue in your community
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Fill in what you saw, where it is in Iyamoye, and how urgent it is.
            Your report joins the community feed instantly so neighbours and
            leaders can see and act on it.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm sm:p-8"
        >
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-800">
              Issue title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep pothole blocking the Okela Road junction"
              className={`${fieldBase} ${err("title")}`}
            />
            {errors.title && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                <Warning size={13} weight="fill" /> {errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Problem category
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {CATEGORIES.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => {
                      setCategory(c.id);
                      setErrors((p) => ({ ...p, category: "" }));
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all active:scale-[0.98] ${
                      active
                        ? "border-green-700 bg-green-800 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                        active ? "bg-white/15" : c.accent
                      } text-white`}
                    >
                      <c.icon size={17} weight="fill" />
                    </span>
                    <span className="leading-tight">{c.label}</span>
                    {active && <Check size={16} weight="bold" className="ml-auto" />}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                <Warning size={13} weight="fill" /> {errors.category}
              </p>
            )}
          </div>

          {/* Location + Landmark */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-800">
                Quarter / area in Iyamoye
              </label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setErrors((p) => ({ ...p, location: "" }));
                }}
                className={`${fieldBase} ${err("location")}`}
              >
                <option value="">Select a location</option>
                {IYAMOYE_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                  <Warning size={13} weight="fill" /> {errors.location}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-800">
                Nearest landmark{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. opposite the market gate"
                className={`${fieldBase} border-slate-200 focus:border-green-600`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-bold text-slate-800">
              Describe the problem
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What is damaged, since when, and how is it affecting residents?"
              className={`${fieldBase} ${err("description")} resize-none`}
            />
            {errors.description && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                <Warning size={13} weight="fill" /> {errors.description}
              </p>
            )}
          </div>

          {/* Priority */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Urgency level
            </label>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => {
                const active = priority === p;
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition-all active:scale-[0.98] ${
                      active
                        ? "border-green-700 bg-green-800 text-white"
                        : `${PRIORITY_STYLES[p]} hover:brightness-95`
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo + Reporter */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-800">
                Attach a photo{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
                id="photo-input"
              />
              <label
                htmlFor="photo-input"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-600 transition-colors hover:border-green-400 hover:bg-green-50/50"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-green-50 text-green-700">
                  <Camera size={18} weight="fill" />
                </span>
                <span className="font-semibold">
                  {photo ? "Change photo" : "Tap to add a photo"}
                </span>
              </label>
              {photo && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={photo}
                    alt="Preview"
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto("");
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove photo
                  </button>
                </div>
              )}
              {errors.photo && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.photo}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-800">
                Your name{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                placeholder="Leave blank to post anonymously"
                className={`${fieldBase} border-slate-200 focus:border-green-600`}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              Reports are saved on this device and shared with the community feed.
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-900 active:scale-[0.98] sm:w-auto"
            >
              Submit Report
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
