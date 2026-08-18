"use client";

export function useTheme() {
  return {
    theme: "light" as const,
    setTheme: () => {},
    toggleTheme: () => {},
    resolvedTheme: "light" as const,
  };
}
