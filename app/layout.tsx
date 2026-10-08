"use client";
import { Geist, Geist_Mono, Noto_Sans_Thai, Sarabun } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/AppNavbar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
// import { SWRConfigProvider } from "@/provider/SWRAuthProvider";
// import { AuthProvider } from "@/app/provider/AuthProvider";
import { Toaster } from "@/components/ui/toast";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'thai'],
  variable: '--font-sarabun',
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "thai"],
  variable: "--font-noto-sans-thai",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${notoSansThai.variable} ${geistSans.variable} ${geistMono.variable} ${sarabun.variable} min-h-svh`}
      >
        {/* <SWRConfigProvider apiUrl={process.env.NEXT_PUBLIC_API_URL || ""}>
          <AuthProvider> */}

        <main className="w-full h-screen bg-background overflow-auto">
          <AppNavbar />
          {children}
        </main>
        {/* </AuthProvider>
        </SWRConfigProvider> */}
        <Toaster />
      </body>
    </html>
  );
}