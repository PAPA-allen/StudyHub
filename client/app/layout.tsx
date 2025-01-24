"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: {
//     template: "%s  - StudyHub",
//     default:"StudyHub"
//   },
//   description:"StudyHub is a platform that allows you to learn and share your knowledge with others",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
            >
              <Custom>{children}</Custom>
       
          <Toaster />
            </ThemeProvider>
            </SessionProvider>
        </AppProviders>
     
      </body>
    </html>
  );
}


const Custom:React.FC<{children:React.ReactNode}> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isLoading ? <div className="h-screen w-screen flex justify-center items-center animate-spin"><Loader/></div> : <>{children}</>}
    </>
  )
 }