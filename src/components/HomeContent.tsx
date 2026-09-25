"use client";

import Image from "next/image";
import ProductList from "@/components/productList";
import { useLanguage } from "@/components/LanguageContext";
import type { productType } from "@/types";

const HomeContent = ({ products }: { products: productType[] }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-gray-100">
        <div className="relative h-[360px] w-full sm:h-[420px]">
          <Image src="/featured.png" alt={t("newCollection")} fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:px-16">
          <div className="max-w-xl text-white">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gray-200">{t("newCollection")}</p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">{t("heroTitle")}</h1>
            <p className="mb-6 text-sm text-gray-200 md:text-base">{t("heroDescription")}</p>
            <button className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200">{t("shopNow")}</button>
          </div>
        </div>
      </section>
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">{t("trendingNow")}</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t("bestSellers")}</h2>
          </div>
          <button className="cursor-pointer text-sm font-medium text-gray-700 underline underline-offset-4">{t("viewAll")}</button>
        </div>
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default HomeContent;