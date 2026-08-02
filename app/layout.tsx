import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Brief Check — Hadegold Media",
  description: "A structured brief-validation checklist for creative and consulting engagements.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body text-ink">{children}</body>
    </html>
  );
}
