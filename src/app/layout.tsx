import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JobTrackr",
  description: "Track your job applications and interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <Nav />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
