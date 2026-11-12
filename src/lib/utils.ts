import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Custom --spacing-* tokens must be registered or twMerge keeps both `h-control` and `h-auto`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ["control", "control-compact", "icon"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
