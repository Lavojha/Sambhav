import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAMBHAV UPSC",
  description: "UPSC preparation and answer evaluation platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
