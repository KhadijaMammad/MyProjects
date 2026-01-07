import { useState, type SetStateAction } from 'react';
import CategoryDropdown from "../../components/news/categories/index";

const NewsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Üst Hissə: Başlıq və Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A2633] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
     

        {/* Dropdown bura gəlir */}
        <CategoryDropdown onSelectCategory={(id: SetStateAction<number | null>) => setSelectedCategoryId(id)} />
      </div>

      <div className="min-h-100">
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <span className="text-2xl">📰</span>
          </div>
          <p className="text-gray-500 font-bold">Xəbərlər yüklənir...</p>
          {selectedCategoryId && (
            <span className="mt-2 text-xs bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full">
              ID: {selectedCategoryId} kateqoriyası seçildi
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;