"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Theme = stored === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate theme from storage after mount
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      title={mounted ? (isDark ? "Light mode" : "Dark mode") : "Toggle theme"}
      className={`grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-forest transition hover:border-forest/30 hover:bg-cream ${className}`}
    >
      {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
