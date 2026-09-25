"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "en" | "it";
type Theme = "light" | "dark";
type TranslationKey = keyof typeof translations.en;

type LanguageContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey) => string;
};

const translations = {
  en: {
    homepage: "Homepage",
    products: "Products",
    about: "About",
    contact: "Contact",
    stores: "Stores",
    login: "Login",
    cart: "Cart",
    closeMenu: "Close navigation menu",
    openMenu: "Open navigation menu",
    search: "Search",
    sortBy: "Sort by",
    featured: "Featured",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    nameAZ: "Name: A-Z",
    nameZA: "Name: Z-A",
    footwear: "Footwear",
    accessories: "Accessories",
    business: "Business",
    apparel: "Apparel",
    basket: "Basket",
    handmade: "Handmade",
    beauty: "Beauty",
    addToCart: "Add to cart",
    adding: "Adding...",
    productDetails: "Product details",
    backToProducts: "Back to products",
    select: "Select",
    color: "Color",
    size: "Size",
    collection: "Collection",
    allProducts: "All products",
    trendingNow: "Trending now",
    bestSellers: "Best Sellers",
    viewAll: "View all",
    newCollection: "New Collection",
    heroTitle: "Build your everyday style.",
    heroDescription: "Discover premium essentials designed for comfort, movement, and modern living.",
    shopNow: "Shop now",
    shoppingCart: "Shopping cart",
    item: "item",
    items: "items",
    yourSelection: "Your selection",
    emptyCart: "Your cart is empty",
    emptyCartDescription: "Find something you love and add it to your cart.",
    browseProducts: "Browse products",
    shippingAddress: "Shipping address",
    paymentMethod: "Payment method",
    continueToShipping: "Continue to shipping",
    continueToPayment: "Continue to payment",
    fullName: "Full name",
    phoneNumber: "Phone number",
    streetAddress: "Street address",
    city: "City",
    postalCode: "Postal code",
    cardPayment: "Card payment",
    stripeCards: "Stripe cards",
    klarna: "Klarna",
    klarnaDescription: "Pay later or split your payment with Klarna.",
    stripeDescription: "Secure card payment powered by Stripe.",
    cashOnDelivery: "Cash on delivery",
    cashDescription: "Pay when your order arrives.",
    cardNumber: "Card number",
    expiryDate: "Expiry date",
    cvc: "CVC",
    placeOrder: "Place order",
    orderSaved: "Order details saved. Checkout API integration can be connected here next.",
    orderSummary: "Order summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    continueShopping: "Continue shopping",
    remove: "Remove",
    decrease: "Decrease",
    increase: "Increase",
    clearCart: "Clear cart",
    viewCart: "View cart",
    yourCart: "Your cart",
    completeAddress: "Complete your shipping address before continuing.",
    validCard: "Enter a valid card number, expiry date, and CVC.",
    qualityEssentials: "Quality essentials for everyday style.",
    allRightsReserved: "All rights reserved.",
  },
  it: {
    homepage: "Home",
    products: "Prodotti",
    about: "Chi siamo",
    contact: "Contatti",
    stores: "Negozi",
    login: "Accedi",
    cart: "Carrello",
    closeMenu: "Chiudi il menu di navigazione",
    openMenu: "Apri il menu di navigazione",
    search: "Cerca",
    sortBy: "Ordina per",
    featured: "In evidenza",
    priceLowHigh: "Prezzo: dal più basso",
    priceHighLow: "Prezzo: dal più alto",
    nameAZ: "Nome: A-Z",
    nameZA: "Nome: Z-A",
    footwear: "Calzature",
    accessories: "Accessori",
    business: "Business",
    apparel: "Abbigliamento",
    basket: "Cestino",
    handmade: "Artigianato",
    beauty: "Bellezza",
    addToCart: "Aggiungi al carrello",
    adding: "Aggiunta...",
    productDetails: "Dettagli prodotto",
    backToProducts: "Torna ai prodotti",
    select: "Seleziona",
    color: "Colore",
    size: "Taglia",
    collection: "Collezione",
    allProducts: "Tutti i prodotti",
    trendingNow: "Di tendenza",
    bestSellers: "Più venduti",
    viewAll: "Vedi tutto",
    newCollection: "Nuova collezione",
    heroTitle: "Crea il tuo stile quotidiano.",
    heroDescription: "Scopri capi essenziali di qualità, pensati per comfort, movimento e vita moderna.",
    shopNow: "Acquista ora",
    shoppingCart: "Carrello",
    item: "articolo",
    items: "articoli",
    yourSelection: "La tua selezione",
    emptyCart: "Il carrello è vuoto",
    emptyCartDescription: "Trova ciò che ami e aggiungilo al carrello.",
    browseProducts: "Sfoglia i prodotti",
    shippingAddress: "Indirizzo di spedizione",
    paymentMethod: "Metodo di pagamento",
    continueToShipping: "Continua alla spedizione",
    continueToPayment: "Continua al pagamento",
    fullName: "Nome completo",
    phoneNumber: "Numero di telefono",
    streetAddress: "Indirizzo",
    city: "Città",
    postalCode: "Codice postale",
    cardPayment: "Pagamento con carta",
    stripeCards: "Carte Stripe",
    klarna: "Klarna",
    klarnaDescription: "Paga dopo o dividi il pagamento con Klarna.",
    stripeDescription: "Pagamento sicuro con carta tramite Stripe.",
    cashOnDelivery: "Pagamento alla consegna",
    cashDescription: "Paga quando il tuo ordine arriva.",
    cardNumber: "Numero carta",
    expiryDate: "Scadenza",
    cvc: "CVC",
    placeOrder: "Effettua ordine",
    orderSaved: "Dettagli dell'ordine salvati. Qui potrai collegare l'API di checkout.",
    orderSummary: "Riepilogo ordine",
    subtotal: "Subtotale",
    shipping: "Spedizione",
    free: "Gratis",
    total: "Totale",
    continueShopping: "Continua gli acquisti",
    remove: "Rimuovi",
    decrease: "Diminuisci",
    increase: "Aumenta",
    clearCart: "Svuota carrello",
    viewCart: "Vedi carrello",
    yourCart: "Il tuo carrello",
    completeAddress: "Completa l'indirizzo di spedizione prima di continuare.",
    validCard: "Inserisci un numero carta, una scadenza e un CVC validi.",
    qualityEssentials: "Capi essenziali di qualità per il tuo stile quotidiano.",
    allRightsReserved: "Tutti i diritti riservati.",
  },
} as const;

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "it") setLanguage(savedLanguage);

    setTheme(getPreferredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
  };

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
  };

  const value = useMemo(
    () => ({
      language,
      theme,
      setLanguage: changeLanguage,
      toggleLanguage: () => changeLanguage(language === "en" ? "it" : "en"),
      setTheme: changeTheme,
      toggleTheme: () => changeTheme(theme === "dark" ? "light" : "dark"),
      t: (key: TranslationKey) => translations[language][key],
    }),
    [language, theme],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
