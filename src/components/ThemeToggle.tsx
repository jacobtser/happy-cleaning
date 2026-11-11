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
    const sync = () => {
      const current =
        document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setTheme(current);
    };

    const stored = localStorage.getItem("theme");
    const initial: Theme = stored === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate theme from storage after mount
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    window.addEventListener("theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("theme-change"));
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
