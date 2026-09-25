"use client";

import {
  BriefcaseBusiness,
  Footprints,
  Glasses,
  Hand,
  Shirt,
  ShoppingBasket,
  Venus,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const Categories = () => {
  const { t } = useLanguage();
  const translatedCategories = [
    { id: 1, name: t("footwear"), icon: Footprints },
    { id: 2, name: t("accessories"), icon: Glasses },
    { id: 3, name: t("business"), icon: BriefcaseBusiness },
    { id: 4, name: t("apparel"), icon: Shirt },
    { id: 5, name: t("basket"), icon: ShoppingBasket },
    { id: 6, name: t("handmade"), icon: Hand },
    { id: 7, name: t("beauty"), icon: Venus },
  ];
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {translatedCategories.map(({ id, name, icon: Icon }) => (
          <div
            key={id}
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-center transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <Icon className="h-4 w-4 text-gray-700 transition group-hover:text-black" />
            <span className="text-sm font-medium text-gray-700 transition group-hover:text-black">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
