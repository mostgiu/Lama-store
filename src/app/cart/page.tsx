"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";

const CartPage = () => {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showSummaryWarning, setShowSummaryWarning] = useState(false);
  const [shippingSummary, setShippingSummary] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const updateShippingSummary = (field: keyof typeof shippingSummary, value: string) => {
    setShippingSummary((current) => ({ ...current, [field]: value }));
  };

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const shippingFields = ["name", "phone", "address", "city", "postalCode"];
    const hasEmptyField = shippingFields.some((field) => {
      const input = document.getElementById(field) as HTMLInputElement | null;
      return !input?.value.trim();
    });

    if (hasEmptyField) {
      const message = t("completeAddress");
      setError(message);
      setShowSummaryWarning(true);
      window.alert(message);
      return;
    }

    setShowSummaryWarning(false);

    if (paymentMethod === "stripe") {
      const form = new FormData(event.currentTarget);
      const cardNumber = String(form.get("cardNumber") ?? "").replace(/\s/g, "");
      const expiry = String(form.get("expiry") ?? "");
      const cvc = String(form.get("cvc") ?? "");

      if (cardNumber.length < 16 || expiry.length < 5 || cvc.length < 3) {
        setError(t("validCard"));
        return;
      }
    }

    setIsSubmitted(true);
  };

  const continueToPayment = () => {
    const shippingFields = ["name", "phone", "address", "city", "postalCode"];
    const hasEmptyField = shippingFields.some((field) => {
      const input = document.getElementById(field) as HTMLInputElement | null;
      return !input?.value.trim();
    });

    if (hasEmptyField) {
      setError(t("completeAddress"));
      return;
    }

    setError("");
    setCheckoutStep(3);
  };

  return (
    <main className="py-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">{t("yourSelection")}</p>
          <h1 className="text-3xl font-bold text-gray-900">{t("shoppingCart")}</h1>
        </div>
        <span className="text-sm text-gray-500">{itemCount} {itemCount === 1 ? t("item") : t("items")}</span>
      </div>

      {items.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-gray-400" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{t("emptyCart")}</h2>
          <p className="mt-2 text-sm text-gray-500">{t("emptyCartDescription")}</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            {t("browseProducts")}
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <section className="space-y-8">
            <div className="flex rounded-xl border border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setCheckoutStep(1)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition ${checkoutStep === 1 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">1</span>
                <span className="hidden sm:inline">{t("shoppingCart")}</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep(2)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition ${checkoutStep === 2 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">2</span>
                <span className="hidden sm:inline">{t("shippingAddress")}</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep(3)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition ${checkoutStep === 3 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">3</span>
                <span className="hidden sm:inline">{t("paymentMethod")}</span>
              </button>
            </div>

            <div className={`${checkoutStep === 1 ? "space-y-4" : "hidden"}`}>
              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={`${item.product.id}-${item.color}-${item.size}`}
                    className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                  >
                    <Image
                      src={item.product.images[item.color]}
                      alt={item.product.name}
                      width={128}
                      height={128}
                      className="h-28 w-24 rounded-xl object-cover sm:h-32 sm:w-32"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-semibold text-gray-900">{item.product.name}</h2>
                          <p className="mt-1 text-sm text-gray-500">{item.color} / {item.size}</p>
                        </div>
                        <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-2 py-1">
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)} className="p-1 text-gray-600 hover:text-black" aria-label={`Decrease ${item.product.name} quantity`}>
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-4 text-center text-sm">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)} className="p-1 text-gray-600 hover:text-black" aria-label={`Increase ${item.product.name} quantity`}>
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.product.id, item.color, item.size)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <button type="button" onClick={() => setCheckoutStep(2)} className="w-full cursor-pointer rounded-full bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black hover:shadow-md">
                {t("continueToShipping")}
              </button>
            </div>

            <div className={`${checkoutStep === 2 ? "space-y-4" : "hidden"}`}>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-700" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-gray-900">{t("shippingAddress")}</h2>
              </div>
              <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-gray-700">
                  {t("fullName")}
                  <input
                    id="name"
                    required
                    name="name"
                    value={shippingSummary.name}
                    onChange={(event) => updateShippingSummary("name", event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900"
                    placeholder="Alex Morgan"
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium text-gray-700">
                  {t("phoneNumber")}
                  <input
                    id="phone"
                    required
                    name="phone"
                    type="tel"
                    value={shippingSummary.phone}
                    onChange={(event) => updateShippingSummary("phone", event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900"
                    placeholder="+1 555 000 0000"
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium text-gray-700 sm:col-span-2">
                  {t("streetAddress")}
                  <input
                    id="address"
                    required
                    name="address"
                    value={shippingSummary.address}
                    onChange={(event) => updateShippingSummary("address", event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900"
                    placeholder="123 Main Street"
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium text-gray-700">
                  {t("city")}
                  <input
                    id="city"
                    required
                    name="city"
                    value={shippingSummary.city}
                    onChange={(event) => updateShippingSummary("city", event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900"
                    placeholder="New York"
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium text-gray-700">
                  {t("postalCode")}
                  <input
                    id="postalCode"
                    required
                    name="postalCode"
                    value={shippingSummary.postalCode}
                    onChange={(event) => updateShippingSummary("postalCode", event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900"
                    placeholder="10001"
                  />
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="button" onClick={continueToPayment} className="w-full cursor-pointer rounded-full bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black hover:shadow-md">
                {t("continueToPayment")}
              </button>
            </div>

            <div className={`${checkoutStep === 3 ? "space-y-4" : "hidden"}`}>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-700" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-gray-900">{t("paymentMethod")}</h2>
              </div>
              <form id="checkout-form" onSubmit={handleCheckout} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === "stripe" ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200 hover:border-gray-400"}`}>
                    <input type="radio" name="paymentMethod" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="mr-2" />
                    <span className="mb-3 flex h-10 items-center gap-2">
                      <Image src="/stripe.png" alt="Stripe" width={56} height={24} className="h-6 w-auto object-contain" />
                      <Image src="/cards.png" alt="Card payment methods" width={80} height={24} className="h-6 w-auto object-contain" />
                    </span>
                    <span className="font-medium">{t("stripeCards")}</span>
                    <span className="mt-1 block text-xs text-gray-500">{t("stripeDescription")}</span>
                  </label>
                  <label className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === "klarna" ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200 hover:border-gray-400"}`}>
                    <input type="radio" name="paymentMethod" value="klarna" checked={paymentMethod === "klarna"} onChange={() => setPaymentMethod("klarna")} className="mr-2" />
                    <span className="mb-3 flex h-10 items-center">
                      <Image src="/klarna.png" alt="Klarna" width={88} height={28} className="h-7 w-auto object-contain" />
                    </span>
                    <span className="font-medium">{t("klarna")}</span>
                    <span className="mt-1 block text-xs text-gray-500">{t("klarnaDescription")}</span>
                  </label>
                  <label className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === "cash" ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200 hover:border-gray-400"}`}>
                    <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="mr-2" />
                    <span className="mb-3 flex h-10 items-center">
                      <CreditCard className="h-7 w-7 text-gray-700" aria-hidden="true" />
                    </span>
                    <span className="font-medium">{t("cashOnDelivery")}</span>
                    <span className="mt-1 block text-xs text-gray-500">{t("cashDescription")}</span>
                  </label>
                </div>

                {paymentMethod === "stripe" && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1 text-sm font-medium text-gray-700 sm:col-span-2">
                      {t("cardNumber")}
                      <input required name="cardNumber" inputMode="numeric" className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900" placeholder="4242 4242 4242 4242" />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-gray-700">
                      {t("expiryDate")}
                      <input required name="expiry" inputMode="numeric" className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900" placeholder="MM/YY" />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-gray-700">
                      {t("cvc")}
                      <input required name="cvc" inputMode="numeric" className="rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-gray-900" placeholder="123" />
                    </label>
                  </div>
                )}

                {paymentMethod === "klarna" && (
                  <div className="mt-4 rounded-xl bg-pink-50 p-4 text-sm text-pink-900">
                    {t("klarnaDescription")}
                  </div>
                )}
              </form>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {isSubmitted && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-800">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  {t("orderSaved")}
                </div>
              )}
            </div>

          </section>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-semibold text-gray-900">{t("orderSummary")}</h2>
            <div className="mt-5 space-y-3 text-sm">
              {(shippingSummary.name || shippingSummary.address || shippingSummary.city || shippingSummary.postalCode) && (
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-left">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Shipping to</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    {shippingSummary.name && <p className="font-medium text-gray-900">{shippingSummary.name}</p>}
                    {shippingSummary.address && <p>{shippingSummary.address}</p>}
                    {(shippingSummary.city || shippingSummary.postalCode) && (
                      <p>
                        {shippingSummary.city}
                        {shippingSummary.city && shippingSummary.postalCode ? ", " : ""}
                        {shippingSummary.postalCode}
                      </p>
                    )}
                    {shippingSummary.phone && <p>{shippingSummary.phone}</p>}
                  </div>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>{t("subtotal")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("shipping")}</span>
                <span>{t("free")}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" form="checkout-form" className="mt-6 w-full cursor-pointer rounded-full bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black hover:shadow-md">
              {t("placeOrder")}
            </button>
            {showSummaryWarning && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {t("completeAddress")}
              </div>
            )}
            <Link href="/products" className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black">
              <ArrowLeft className="h-4 w-4" />
              {t("continueShopping")}
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
