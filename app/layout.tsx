import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ✅ ต้องมีบรรทัดนี้เพื่อใช้ Script
import { CSPostHogProvider } from "./providers";

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
        
        {/* 👇 นี่คือส่วนจากรูปที่คุณส่งมาครับ (Cookiebot) */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          strategy="beforeInteractive"
          data-cbid="1f32c5e5-295c-4365-95ff-c7b0a0729e2a" 
          data-blockingmode="auto"
          type="text/javascript"
        />
        {/* 👆 จบส่วน Cookiebot */}

        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}