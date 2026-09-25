"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastNotifications from "@/components/ToastNotifications";
import { useLanguage } from "@/components/LanguageContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useLanguage();

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-6xl flex-col p-4 pt-[max(1.5rem,env(safe-area-inset-top))] transition-colors duration-300 ${
        theme === "dark" ? "bg-[#09090b] text-zinc-100" : "bg-white text-zinc-900"
      }`}
    >
      <Navbar />
      {children}
      <Footer />
      <ToastNotifications />
    </div>
  );
}
