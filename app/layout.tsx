import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CSPostHogProvider } from "./providers";
import Navbar from "@/components/Navbar"; // 👈 นำเข้า Navbar ที่นี่

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media For You",
  description: "Premium custom design products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* 1. ✅ Cookiebot (ถูกต้องแล้ว) */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          strategy="beforeInteractive"
          data-cbid="1f32c5e5-295c-4365-95ff-c7b0a0729e2a" 
          data-blockingmode="auto"
          type="text/javascript"
        />

        <CSPostHogProvider>
          {/* 2. ✅ ใส่ Navbar ไว้ตรงนี้ (ให้แสดงทุกหน้า) */}
          <Navbar />

          {/* 3. ✅ ใส่ padding-top (pt-24) เพื่อไม่ให้เนื้อหาถูก Navbar บัง */}
          <main className="pt-24 min-h-screen">
            {children}
          </main>
        </CSPostHogProvider>
        
      </body>
    </html>
  );
}