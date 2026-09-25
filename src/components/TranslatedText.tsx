"use client";

import { useLanguage } from "@/components/LanguageContext";

type TranslationKey = Parameters<ReturnType<typeof useLanguage>["t"]>[0];

const TranslatedText = ({ translationKey }: { translationKey: TranslationKey }) => {
  const { t } = useLanguage();
  return <>{t(translationKey)}</>;
};

export default TranslatedText;
