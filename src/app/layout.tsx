"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Token dekodlashda xatolik:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Provider store={store}>
          <ToastProvider>
            {!isAuthPage && <Navbar isLoggedIn={isLoggedIn} />}
            <main className="flex-grow">{children}</main>
            {!isAuthPage && <Footer />}
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
