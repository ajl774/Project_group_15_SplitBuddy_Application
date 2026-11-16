import { House, ShoppingBag, Utensils, Zap } from "lucide-react";
import type { Category } from "../types";

export const categoryMeta: Record<Category, { icon: typeof House; color: string; bg: string }> = {
  Food: { icon: Utensils, color: "#7667f8", bg: "#eeecff" },
  Home: { icon: House, color: "#3186ee", bg: "#e7f2ff" },
  Shopping: { icon: ShoppingBag, color: "#9c5de8", bg: "#f3eaff" },
  Transport: { icon: Zap, color: "#21a6a1", bg: "#e2f7f4" },
};
