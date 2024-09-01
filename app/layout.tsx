import type { Metadata } from "next";
import { JetBrains_Mono as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mohit Arora | aboutmohit.com",
  description: "CTO | Software & Cloud Architect | Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mohit.svg" type="image/svg+xml" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
