"use client";

import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, CircleHelp, Home, MapPinned, Menu, MoonStar, Package, SunMedium, X } from "lucide-react";
import { useState } from "react";
import Search from "./Search";
import User from "./User";
import Cart from "./Cart";
import { useLanguage } from "@/components/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme, t } = useLanguage();

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-center gap-4 py-2 md:justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
        <span className="font-bold text-lg">LAMA.</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-3 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={t("homepage")}>
                <Home className="h-4 w-4" />
                <span>{t("homepage")}</span>
              </Link>
            </li>
            <li>
              <Link href="/products" className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={t("products")}>
                <Package className="h-4 w-4" />
                <span>{t("products")}</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={t("about")}>
                <CircleHelp className="h-4 w-4" />
                <span>{t("about")}</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={t("contact")}>
                <BriefcaseBusiness className="h-4 w-4" />
                <span>{t("contact")}</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800" aria-label={t("stores")}>
                <MapPinned className="h-4 w-4" />
                <span>{t("stores")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Search />
          <div className="hidden sm:block"><User /></div>
          <Cart />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <button type="button" onClick={toggleLanguage} className="rounded-md border border-gray-200 px-2 py-1 text-xs font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800" aria-label="Change language">
            {language.toUpperCase()}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-1 text-gray-800 transition hover:bg-gray-100 md:hidden"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="basis-full border-t border-gray-200 pt-3 md:hidden">
          <ul className="grid gap-3 text-sm">
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 dark:text-gray-100" aria-label={t("homepage")}>
                <Home className="h-4 w-4" />
                <span>{t("homepage")}</span>
              </Link>
            </li>
            <li><Link href="/products" onClick={() => setIsMenuOpen(false)}>{t("products")}</Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>{t("about")}</Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>{t("contact")}</Link></li>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>{t("stores")}</Link></li>
            <li><User /></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
