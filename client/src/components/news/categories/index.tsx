import React, { useState } from "react";
import { ChevronDown, Layers, Loader2 } from "lucide-react";
import { useGetAllCategoriesQuery } from "../../../redux/services/categoryApi";

interface CategoryDropdownProps {
  onSelectCategory: (id: number | null) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  return (
    <div className="relative inline-block text-left w-64 p-2 mt-3">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-5 py-3 text-sm font-bold text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-fuchsia-500/20 active:scale-95 ${gradientClass}`}
      >
        <div className="flex items-center gap-2">
          <Layers size={18} />
          <span className="truncate">{selectedName || "Kateqoriyalar"}</span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-90"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute left-0 mt-2 w-full bg-white dark:bg-[#1A2633] border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl z-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="py-1 flex flex-col">
              <button
                onClick={() => {
                  setSelectedName(null);
                  onSelectCategory(null);
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <span className="w-2 h-2 rounded-full mr-3 bg-gray-300 shrink-0"></span>
                Hamısı
              </button>

              {/* Yüklənmə halı */}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2
                    size={20}
                    className="animate-spin text-fuchsia-600"
                  />
                </div>
              )}

              {/* Data siyahısı */}
              {categories?.map((category) => (
                <button
                  key={category.category_id}
                  onClick={() => {
                    setSelectedName(category.category_name);
                    onSelectCategory(category.category_id);
                    setIsOpen(false);
                  }}
                  className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-white hover:bg-linear-to-r hover:from-[#e11d48] hover:to-[#c026d3] transition-all duration-200 text-left group"
                >
                  <span className="w-2 h-2 rounded-full mr-3 bg-fuchsia-500 group-hover:bg-white shrink-0"></span>
                  {category.category_name}
                </button>
              ))}

              {error && (
                <div className="px-4 py-2 text-xs text-red-500 text-center">
                  Xəta baş verdi
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDropdown;
