"use client";

import { useState } from "react";
import Image from "next/image";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import Categories from "@/components/categories";
import { useCart } from "@/components/CartContext";
import type { productType } from "@/types";
import { useLanguage } from "@/components/LanguageContext";
import { toast } from "react-toastify";
import Link from "next/link";

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

const ProductList = ({ products }: { products: productType[] }) => {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addingProductId, setAddingProductId] = useState<string | number | null>(null);
  const { addItem } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = async (product: productType, color: string, size: string) => {
    setAddingProductId(product.id);

    try {
      // Replace this delay with the future add-to-cart API request.
      await new Promise((resolve) => setTimeout(resolve, 400));
      addItem(product, color, size);
      toast.success(`${product.name} - ${t("addToCart")}`);
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Categories />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const defaultColor = product.colors[0];
          const productKey = String(product.id);
          const activeColor = selectedColors[productKey] ?? defaultColor;
          const activeSize = selectedSizes[productKey] ?? product.sizes[0];

          return (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[activeColor] ?? product.images[defaultColor]}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 hover:scale-110"
                  />
                </div>
              </Link>

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/products/${product.id}`} className="text-lg font-semibold leading-tight text-gray-900 transition-colors hover:text-gray-500">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">{activeColor}</p>
                  </div>
                  <span className="text-base font-semibold text-gray-900">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-end gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500">
                      {t("color")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.colors.map((color) => {
                        const isSelected = activeColor === color;

                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() =>
                              setSelectedColors((prev) => ({
                                ...prev,
                                [String(product.id)]: color,
                              }))
                            }
                            className={`h-5 w-5 rounded-full border-2 ${colorStyles[color] ?? "bg-gray-300 border-gray-400"} ${
                              isSelected ? "scale-110 ring-2 ring-gray-900 ring-offset-2" : "opacity-80"
                            }`}
                            aria-label={`Select ${color}`}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-20 shrink-0 space-y-2">
                    <label
                      htmlFor={`size-${product.id}`}
                      className="block text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500"
                    >
                      {t("size")}
                    </label>
                    <select
                      id={`size-${product.id}`}
                      value={activeSize}
                      onChange={(event) =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [String(product.id)]: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-900"
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-sm leading-5 text-gray-600">{product.shortDescription}</p>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product, activeColor, activeSize)}
                  disabled={addingProductId === product.id}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black hover:shadow-md disabled:cursor-wait disabled:opacity-70"
                >
                  {addingProductId === product.id ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t("adding")}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      {t("addToCart")}
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
