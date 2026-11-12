"use client";

import { useEffect } from "react";

/** Runs before paint so the first frame matches the OS color scheme. */
export const COLOR_SCHEME_SCRIPT = `(function(){
  var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
})();`;

export function applyColorScheme() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  document.documentElement.dispatchEvent(new Event("color-scheme-change"));
}

/** Keeps `.dark` in sync when the OS appearance changes after load. */
export function ColorSchemeSync() {
  useEffect(() => {
    applyColorScheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyColorScheme);
    return () => media.removeEventListener("change", applyColorScheme);
  }, []);

  return null;
}
