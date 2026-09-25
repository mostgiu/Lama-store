"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";
import type { productType } from "@/types";

const colorStyles: Record<string, string> = {
  Gray: "bg-gray-400 border-gray-500",
  Olive: "bg-olive-500 border-olive-600",
  Purple: "bg-violet-500 border-violet-600",
  Coral: "bg-orange-300 border-orange-400",
  Cream: "bg-amber-50 border-amber-200",
  Teal: "bg-teal-500 border-teal-600",
  Pink: "bg-pink-400 border-pink-500",
  Green: "bg-green-500 border-green-600",
  Blue: "bg-blue-500 border-blue-600",
  White: "bg-white border-gray-300",
  Black: "bg-black border-black",
  Orange: "bg-orange-500 border-orange-600",
  Red: "bg-red-500 border-red-600",
};

const ProductDetails = ({ product }: { product: productType }) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    addItem(product, color, size);
    toast.success(`${product.name} - ${t("addToCart")}`);
    setIsAdding(false);
  };

  return (
    <main className="py-8">
      <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("backToProducts")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
          <Image src={product.images[color]} alt={`${product.name} - ${color}`} fill priority className="object-cover" />
        </div>

        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{t("productDetails")}</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
            </div>
            <p className="text-xl font-semibold text-gray-900">${product.price}</p>
          </div>

          <p className="leading-7 text-gray-600">{product.shortDescription}</p>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900">{t("color")}: {color}</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setColor(option)}
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 ${colorStyles[option] ?? "border-gray-400 bg-gray-300"} ${color === option ? "ring-2 ring-gray-900 ring-offset-2" : "opacity-75"}`}
                  aria-label={`${t("select")} ${option}`}
                  title={option}
                />
              ))}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-gray-900">
            {t("size")}
            <select value={size} onChange={(event) => setSize(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-3 font-normal outline-none focus:border-gray-900">
              {product.sizes.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>

          <button type="button" onClick={handleAddToCart} disabled={isAdding} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-black hover:shadow-md disabled:cursor-wait disabled:opacity-70">
            {isAdding ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ShoppingCart className="h-5 w-5" aria-hidden="true" />}
            {isAdding ? t("adding") : t("addToCart")}
          </button>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
