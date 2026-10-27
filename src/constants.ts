import {
  Wrench,
  Drop,
  TrashSimple,
  Lightbulb,
  Buildings,
  IdentificationBadge,
  ClipboardText,
} from "@phosphor-icons/react";
import type {
  CategoryDef,
  Priority,
  ReportItem,
  Status,
} from "./types";

export const BRAND_NAME = "MyCommunity Connect";
export const LOCATION_BADGE = "Iyamoye, Ijumu LGA";
export const STATE_CONTEXT = "Kogi State, Nigeria";
export const TAGLINE = "One Community, One Voice, A Better Future";

export const CATEGORIES: CategoryDef[] = [
  {
    id: "roads",
    label: "Damaged Roads",
    icon: Wrench,
    color: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "bg-amber-500",
  },
  {
    id: "drainage",
    label: "Blocked Drainage",
    icon: Drop,
    color: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "bg-sky-500",
  },
  {
    id: "waste",
    label: "Waste Disposal",
    icon: TrashSimple,
    color: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "bg-lime-600",
  },
  {
    id: "streetlights",
    label: "Broken Streetlights",
    icon: Lightbulb,
    color: "bg-yellow-50 text-yellow-800 border-yellow-200",
    accent: "bg-yellow-500",
  },
  {
    id: "facilities",
    label: "Damaged Public Facilities",
    icon: Buildings,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "bg-emerald-600",
  },
  {
    id: "water",
    label: "Water Supply / Borehole",
    icon: IdentificationBadge,
    color: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "bg-cyan-600",
  },
  {
    id: "other",
    label: "Other",
    icon: ClipboardText,
    color: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "bg-slate-500",
  },
];

export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Urgent"];
export const STATUSES: Status[] = [
  "Pending",
  "Under Review",
  "In Progress",
  "Resolved",
];

export const PRIORITY_STYLES: Record<Priority, string> = {
  Low: "bg-slate-100 text-slate-600 border-slate-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Urgent: "bg-red-50 text-red-700 border-red-200",
};

export const STATUS_STYLES: Record<Status, string> = {
  Pending: "bg-slate-100 text-slate-700 border-slate-200",
  "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export const STATUS_DOT: Record<Status, string> = {
  Pending: "bg-slate-400",
  "Under Review": "bg-blue-500",
  "In Progress": "bg-amber-500",
  Resolved: "bg-emerald-500",
};

// Notable quarters, roads and landmarks within Iyamoye, Ijumu LGA.
export const IYAMOYE_LOCATIONS: string[] = [
  "Iluhagba Quarter",
  "Odo-Afin Quarter",
  "Araromi Quarter",
  "Iyah Quarter",
  "Central Market Road",
  "Palace Junction",
  "Community High School Area",
  "Hospital Road",
  "Oke-Oda Quarter",
  "Odo-Eleko Quarter",
  "Okela Road",
  "Iyamoye Stream Side",
];

export const EMERGENCY_CONTACTS = [
  { label: "Iyamoye Community Development Union", value: "0803 000 1122" },
  { label: "Ijumu LGA Ward 8 Office", value: "0705 000 3344" },
  { label: "Kogi State Emergency Line", value: "112 / 767" },
  { label: "NEPA / BEDC Fault Report", value: "0700 000 6327" },
];

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString();

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "r-1001",
    title: "Deep pothole cluster on Okela Road after last rains",
    category: "roads",
    location: "Okela Road",
    landmark: "About 40 metres before the Iluhagba junction, near the fuel kiosk",
    description:
      "Three large potholes have formed along Okela Road and motorcyclists swerve into oncoming traffic to avoid them. The situation worsened after the heavy rains last week and one tanker almost overturned.",
    priority: "High",
    status: "In Progress",
    createdAt: daysAgo(2),
    upvotes: 27,
    photo: "",
    reporter: "Daniel A.",
    timeline: [
      { label: "Report submitted by resident", date: daysAgo(2), done: true },
      { label: "Ward leader site inspection", date: daysAgo(1), done: true },
      { label: "Council works team scheduled", date: daysAgo(0.4), done: true },
      { label: "Road patching completed", date: daysAgo(0), done: false },
    ],
  },
  {
    id: "r-1002",
    title: "Blocked drainage gutter flooding Central Market stalls",
    category: "drainage",
    location: "Central Market Road",
    landmark: "Opposite the fish sellers line, next to the primary school fence",
    description:
      "The open gutter along Central Market Road is choked with refuse and stagnant water. When it rains the water floods the market stalls and traders lose their goods. There is also a malaria risk from the standing water.",
    priority: "Urgent",
    status: "Under Review",
    createdAt: daysAgo(4),
    upvotes: 41,
    photo: "",
    reporter: "Mrs. Folasade O.",
    timeline: [
      { label: "Report submitted by trader", date: daysAgo(4), done: true },
      { label: "Market union escalated complaint", date: daysAgo(3), done: true },
      { label: "Sanitation unit review pending", date: daysAgo(1), done: false },
    ],
  },
  {
    id: "r-1003",
    title: "Solar streetlight not working near Palace Junction",
    category: "streetlights",
    location: "Palace Junction",
    landmark: "The two poles at the junction by the palace gate",
    description:
      "Both solar streetlights at Palace Junction stopped charging three weeks ago. The junction is completely dark at night and residents, especially women returning from the farm, feel unsafe passing through.",
    priority: "Medium",
    status: "Pending",
    createdAt: daysAgo(6),
    upvotes: 18,
    photo: "",
    reporter: "Sunday E.",
    timeline: [
      { label: "Report submitted by resident", date: daysAgo(6), done: true },
      { label: "Awaiting ward verification", date: daysAgo(6), done: false },
    ],
  },
  {
    id: "r-1004",
    title: "Burst pipe wasting clean water at Odo-Afin borehole",
    category: "water",
    location: "Odo-Afin Quarter",
    landmark: "The public borehole behind the Odo-Afin water shed",
    description:
      "A pipe at the Odo-Afin community borehole has burst and clean water is gushing to waste. The same pipe is leaking into a nearby gutter. Many households depend on this borehole for drinking water.",
    priority: "High",
    status: "In Progress",
    createdAt: daysAgo(3),
    upvotes: 33,
    photo: "",
    reporter: "Grace I.",
    timeline: [
      { label: "Report submitted by resident", date: daysAgo(3), done: true },
      { label: "Water board notified", date: daysAgo(2), done: true },
      { label: "Plumber dispatched", date: daysAgo(1), done: true },
      { label: "Pipe replacement complete", date: daysAgo(0), done: false },
    ],
  },
  {
    id: "r-1005",
    title: "Illegal refuse dump growing beside Community High School",
    category: "waste",
    location: "Community High School Area",
    landmark: "The empty plot at the school's back gate",
    description:
      "Residents and shops are dumping refuse on the vacant plot behind the school gate. The smell reaches the classrooms and the waste is starting to burn. We need a designated collection point and regular pickup.",
    priority: "Medium",
    status: "Under Review",
    createdAt: daysAgo(8),
    upvotes: 22,
    photo: "",
    reporter: "Teacher Bello",
    timeline: [
      { label: "Report submitted by staff", date: daysAgo(8), done: true },
      { label: "Environmental unit reviewing", date: daysAgo(5), done: false },
    ],
  },
  {
    id: "r-1006",
    title: "Collapsed section of footbridge at Iyamoye Stream Side",
    category: "facilities",
    location: "Iyamoye Stream Side",
    landmark: "The concrete footbridge linking Araromi to the stream",
    description:
      "A section of the footbridge planks has collapsed and women fetching water now cross on a narrow single plank. The bridge needs urgent repair before someone falls into the stream.",
    priority: "Urgent",
    status: "Pending",
    createdAt: daysAgo(9),
    upvotes: 37,
    photo: "",
    reporter: "Mama Ngozi",
    timeline: [
      { label: "Report submitted by resident", date: daysAgo(9), done: true },
      { label: "Awaiting council inspection", date: daysAgo(9), done: false },
    ],
  },
  {
    id: "r-1007",
    title: "Faded zebra crossing and broken sign at Araromi junction",
    category: "roads",
    location: "Araromi Quarter",
    landmark: "The school crossing in front of Araromi junction",
    description:
      "The zebra crossing paint has faded away and the warning sign post is bent to the ground. School children cross here every morning with no visible marking to alert drivers.",
    priority: "Low",
    status: "Resolved",
    createdAt: daysAgo(14),
    upvotes: 12,
    photo: "",
    reporter: "Pa John",
    timeline: [
      { label: "Report submitted by resident", date: daysAgo(14), done: true },
      { label: "Ward works team inspected", date: daysAgo(11), done: true },
      { label: "Crossing repainted and sign fixed", date: daysAgo(6), done: true },
    ],
  },
];
