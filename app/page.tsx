"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Sun, Moon } from "lucide-react";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const nextState = !isDarkMode;
    setIsDarkMode(nextState);
    localStorage.setItem("theme", nextState ? "dark" : "light");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#0f0b08] text-stone-800 dark:text-[#f4eae0] flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
        
        {/* ปุ่มสลับโหมดกลางวัน/กลางคืน มุมขวาบน */}
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2.5 rounded-xl bg-orange-100/60 dark:bg-[#261910] text-orange-900 dark:text-orange-300 border border-orange-200/80 dark:border-[#3d2719] hover:bg-orange-200/60 dark:hover:bg-[#342216] transition-all cursor-pointer shadow-sm"
          title="สลับโหมดกลางวัน/กลางคืน"
        >
          {mounted && isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-orange-700" />
          )}
        </button>

        {/* คอนเทนต์หลัก */}
        <div className="flex flex-col items-center text-center max-w-sm space-y-6">
          
          {/* ไอคอนโลโก้วินเทจ */}
          <div className="w-20 h-20 bg-orange-600 dark:bg-orange-700 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-600/20 dark:shadow-none ring-4 ring-orange-200/50 dark:ring-orange-950/40">
            <ShoppingBag className="w-10 h-10 text-amber-50" />
          </div>

          {/* ชื่อแบรนด์ */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight font-serif">
              <span className="text-stone-900 dark:text-stone-100">tar</span>
              <span className="text-orange-600 dark:text-orange-500">shop</span>
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
              ตลาดซื้อ-ขายสินค้าสำหรับชาววิทยาลัย ช้อปสะดวก ปลอดภัย ในรั้วเดียวกัน
            </p>
          </div>

          {/* ปุ่มเข้าสู่ระบบ / หน้าร้าน */}
          <Link
            href="/marketplace"
            className="w-full mt-4 py-3.5 px-6 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-semibold rounded-2xl shadow-md shadow-orange-600/25 dark:shadow-none flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>เข้าสู่ tarshop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </div>
    </div>
  );
}