"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-[#2e2118] border border-orange-200 dark:border-[#423023]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setTheme(isDark ? "light" : "dark");
      }}
      className="p-2 rounded-lg bg-orange-50 dark:bg-[#2e2118] text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-[#423023] hover:bg-orange-100 dark:hover:bg-[#38271d] transition-all"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-orange-600" />
      )}
    </button>
  );
}