"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

const Filter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t } = useLanguage();

    const updateSort = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (sort) {
            params.set("sort", sort);
        } else {
            params.delete("sort");
        }

        const query = params.toString();
        router.push(query ? `/products?${query}` : "/products");
    };

    return (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                {t("sortBy")}
            </label>
            <select
                id="sort"
                name="sort"
                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                value={searchParams.get("sort") || ""}
                onChange={(event) => updateSort(event.target.value)}
            >
                <option value="">{t("featured")}</option>
                <option value="price_asc">{t("priceLowHigh")}</option>
                <option value="price_desc">{t("priceHighLow")}</option>
                <option value="name_asc">{t("nameAZ")}</option>
                <option value="name_desc">{t("nameZA")}</option>
            </select>
        </div>
    );
};

export default Filter;              