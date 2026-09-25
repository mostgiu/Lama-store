"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto border-t border-gray-800 bg-[#050505] px-4 py-4 text-gray-50 sm:px-6">
      <div className="grid gap-4 md:grid-cols-[1.6fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 transition group-hover:bg-white/10">
              <Image src="/logo.png" alt="Trend Lama logo" width={16} height={16} />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-200">TREND LAMA</span>
          </Link>
          <p className="mt-2 max-w-xs text-[10px] leading-4 text-gray-500">{t("qualityEssentials")}</p>
          <Link href="/products" className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-gray-200 transition-colors hover:text-white">
            {t("products")}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Footer navigation">
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-gray-600">{t("homepage")}</p>
          <ul className="grid gap-1 text-[10px] text-gray-400">
            <li><Link href="/" className="transition-colors hover:text-white">{t("homepage")}</Link></li>
            <li><Link href="/products" className="transition-colors hover:text-white">{t("products")}</Link></li>
            <li><Link href="/cart" className="transition-colors hover:text-white">{t("cart")}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-gray-600">{t("contact")}</p>
          <a href="mailto:hello@trendlama.com" className="inline-flex items-center gap-2 text-[10px] text-gray-400 transition-colors hover:text-white">
            <Mail className="h-3 w-3" aria-hidden="true" />
            hello@trendlama.com
          </a>
          <p className="mt-2 text-[10px] leading-4 text-gray-500">{t("qualityEssentials")}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1 border-t border-gray-800 pt-2 text-[8px] text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Trend Lama. {t("allRightsReserved")}</span>
        <span>EN / IT</span>
      </div>
    </footer>
  );
};

export default Footer;
