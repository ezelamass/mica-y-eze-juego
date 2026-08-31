import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  tone?: "turq" | "plum";
}

export function Pill({ children, tone = "turq" }: PillProps) {
  return <span className={`pill ${tone === "plum" ? "plum" : ""}`}>{children}</span>;
}
