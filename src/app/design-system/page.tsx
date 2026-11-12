import type { Metadata } from "next";

import { DesignSystemShowcase } from "@/design-system/playground/showcase";

export const metadata: Metadata = {
  title: "Visual Design System — Pickup",
  description: "The public review surface for Pickup's visual foundations.",
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
