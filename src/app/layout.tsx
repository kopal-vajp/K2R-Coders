import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MessageMind AI | Omnichannel Intelligence",
  description: "Real-Time Identity & Growth Decision Engine. Enterprise AI SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans overflow-hidden bg-black text-white" suppressHydrationWarning={true}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
