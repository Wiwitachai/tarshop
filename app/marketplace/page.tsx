"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Search,
  Shirt,
  ShoppingBag,
  LayoutDashboard,
  ShoppingCart,
  Tag,
} from "lucide-react";

// ข้อมูลจำลองรายการเสื้อผ้า
const categories = [
  "ทั้งหมด",
  "เสื้อยืด",
  "เสื้อเชิ้ต",
  "เสื้อฮู้ด/แจ็คเก็ต",
  "ชุดนักศึกษา",
];

const products = [
  {
    id: 1,
    name: "เสื้อยืด Oversize ลายกราฟิก TarShop",
    category: "เสื้อยืด",
    price: 290,
    status: "มีสินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
  },
  {
    id: 2,
    name: "เสื้อเชิ้ตแขนยาวสไตล์มินิมอล",
    category: "เสื้อเชิ้ต",
    price: 350,
    status: "มีสินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
  },
  {
    id: 3,
    name: "เสื้อฮู้ดดี้ผ้าหนานุ่ม สกรีนโลโก้วิทยาลัย",
    category: "เสื้อฮู้ด/แจ็คเก็ต",
    price: 590,
    status: "สินค้าหมดชั่วคราว",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
  },
  {
    id: 4,
    name: "เสื้อนักศึกษาชาย เข้ารูป ผ้าคอมทวิน",
    category: "ชุดนักศึกษา",
    price: 220,
    status: "มีสินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
  },
];

export default function MarketplacePage() {
  const { theme, setTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  const filteredProducts =
    activeCategory === "ทั้งหมด"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#120e0c] text-[#f5e6d3] font-sans pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 bg-[#1e1713]/90 backdrop-blur-md border-b border-[#382b22] px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Shirt className="w-6 h-6 text-amber-500" />
          <h1 className="text-xl font-bold tracking-wide text-amber-500">
            TarShop Apparel 👕
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#2a201a] text-amber-400 border border-[#423328] hover:bg-[#382b22] transition-all">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ระบบจัดการสต็อก</span>
          </button>
          <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-500 transition-all shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>เสื้อใหม่</span>
          </button>
          <button className="p-2 rounded-lg bg-[#2a201a] text-amber-400 border border-[#423328] hover:bg-[#382b22]">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-[#2a201a] text-amber-400 border border-[#423328] hover:bg-[#382b22]"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-600" />
          <input
            type="text"
            placeholder="ค้นหาเสื้อผ้า, ไซส์, หมวดหมู่..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1e1713] border border-[#382b22] focus:outline-none focus:border-amber-500 text-sm text-[#f5e6d3] placeholder-[#8c7361] shadow-inner"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                activeCategory === cat
                  ? "bg-amber-600 border-amber-500 text-white shadow-md shadow-amber-900/30"
                  : "bg-[#1e1713] border-[#382b22] text-[#c4ad9d] hover:bg-[#2a201a]"
              }`}
            >
              :: {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <main className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#1e1713] border border-[#382b22] rounded-2xl overflow-hidden shadow-md hover:border-amber-700/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative w-full h-56 md:h-72 bg-[#120e0c] overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 text-[10px] bg-[#120e0c]/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#382b22] text-amber-400">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1 text-[#f5e6d3]">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="p-3 pt-0 flex items-center justify-between border-t border-[#2a201a] mt-2">
                <span className="text-amber-500 font-bold text-base">
                  ฿{product.price}
                </span>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-[#2a201a] text-amber-400 border border-[#423328] hover:bg-amber-600 hover:text-white hover:border-amber-500 transition-all">
                  :: เลือกดูสินค้า
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}