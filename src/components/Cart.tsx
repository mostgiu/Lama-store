"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, itemCount, total, updateQuantity, removeItem, clearCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex cursor-pointer items-center gap-1 text-sm font-medium text-gray-800 transition-colors hover:text-gray-500"
        aria-expanded={isOpen}
        aria-label={`Cart with ${itemCount} items`}
      >
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        {t("cart")}
        <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-800 px-1 text-[10px] text-white">
          {itemCount}
        </span>
      </button>

      {isOpen && (
        <div className="fixed left-1/2 top-1/2 z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:z-20 sm:mt-4 sm:translate-x-0 sm:translate-y-0">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t("yourCart")}</h2>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close cart">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">{t("emptyCart")}</p>
          ) : (
            <>
              <div className="max-h-80 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <Image
                      src={item.product.images[item.color]}
                      alt={item.product.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.color} / {item.size}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                            className="h-6 w-6 rounded border border-gray-300 text-sm"
                            aria-label={`Decrease ${item.product.name} quantity`}
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                            className="h-6 w-6 rounded border border-gray-300 text-sm"
                            aria-label={`Increase ${item.product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.color, item.size)}
                          className="text-xs text-gray-500 underline"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm font-semibold text-gray-900">
                  <span>{t("total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 block w-full rounded-full bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-black"
                >
                  {t("viewCart")}
                </Link>
                <button type="button" onClick={clearCart} className="mt-3 w-full text-sm text-gray-500 underline">
                  {t("clearCart")}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
