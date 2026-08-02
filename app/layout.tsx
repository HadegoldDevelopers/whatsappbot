import "./globals.css";

export const metadata = {
  title: "Brief Check — Hadegold Media",
  description: "A structured brief-validation checklist for creative and consulting engagements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body text-ink">{children}</body>
    </html>
  );
}
