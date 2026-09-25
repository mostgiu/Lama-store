import { Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const Search = () => {
  const { t } = useLanguage();
  return (
    <div className="flex w-28 items-center gap-2 rounded-full border border-gray-200 px-2 py-1 sm:w-40">
      <SearchIcon className="w-4 h-4 text-gray-500" />
      <input
        type="text"
        placeholder={t("search")}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
};

export default Search;
