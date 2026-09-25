import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const User = () => {
  const { t } = useLanguage();
  return (
    <Link href="/login" className="text-sm">
      {t("login")}
    </Link>
  );
};

export default User;
