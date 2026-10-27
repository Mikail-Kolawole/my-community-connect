import type { ComponentType } from "react";

export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "Pending" | "Under Review" | "In Progress" | "Resolved";

export type IconType = ComponentType<{
  className?: string;
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

export interface TimelineEvent {
  label: string;
  date: string; // ISO timestamp
  done: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string; // category id
  location: string; // Iyamoye quarter / zone
  landmark: string; // specific landmark description
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string; // ISO timestamp
  upvotes: number;
  voted?: boolean;
  photo?: string; // data URL preview (optional)
  reporter?: string;
  timeline: TimelineEvent[];
}

export interface CategoryDef {
  id: string;
  label: string;
  icon: IconType;
  color: string; // tailwind classes for badge surface
  accent: string; // solid accent for icon chips
}

export interface FilterState {
  category: string; // "All" or category id
  status: string; // "All" or status
  quarter: string; // "All" or quarter
  search: string;
}
