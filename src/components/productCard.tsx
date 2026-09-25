"use client";

import Image from "next/image";
import { useState } from "react";
import type { productType } from "@/types";

const ProductCard = ({ product }: { product: productType }) => {
  const [productType, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = (type: "size" | "color", value: string) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <Image
          src={product.images[productType.color]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{productType.color}</p>
          </div>
          <span className="text-base font-semibold text-gray-900">${product.price}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Color
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleProductType("color", color)}
                  className={`h-6 w-6 rounded-full border-2 ${
                    productType.color === color ? "ring-2 ring-gray-900 ring-offset-2" : "border-gray-300"
                  } ${
                    color === "White"
                      ? "bg-white"
                      : color === "Black"
                        ? "bg-black"
                        : color === "Blue"
                          ? "bg-blue-500"
                          : color === "Graphite"
                            ? "bg-zinc-700"
                            : color === "Olive"
                              ? "bg-olive-500"
                              : color === "Gray"
                                ? "bg-gray-400"
                                : color === "Pink"
                                  ? "bg-pink-400"
                                  : color === "Green"
                                    ? "bg-green-500"
                                    : color === "Orange"
                                      ? "bg-orange-500"
                                      : color === "Red"
                                        ? "bg-red-500"
                                        : color === "Purple"
                                          ? "bg-violet-500"
                                          : "bg-stone-300"
                  }`}
                  aria-label={`Select ${color}`}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Size
            </label>
            <select
              value={productType.size}
              onChange={(event) => handleProductType("size", event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-700 outline-none focus:border-gray-900"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-900 hover:text-white">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
