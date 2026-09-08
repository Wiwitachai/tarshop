"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Search, PlusCircle, Home, ShoppingBag, User } from "lucide-react";

export default function MarketplacePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">TarShop</h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>

      {/* Product Grid Sample */}
      <main className="p-4 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-xl mb-2 flex items-center justify-center text-xs text-slate-400">
              รูปสินค้า {item}
            </div>
            <h3 className="font-semibold text-sm line-clamp-1">ตัวอย่างสินค้า {item}</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm mt-1">฿250</p>
          </div>
        ))}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg flex justify-around py-3">
        <button className="flex flex-col items-center text-indigo-600 dark:text-indigo-400">
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">หน้าแรก</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-1">สินค้า</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] mt-1">ลงขาย</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">โปรไฟล์</span>
        </button>
      </nav>
    </div>
  );
}