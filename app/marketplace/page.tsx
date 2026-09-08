"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Search,
  Shirt,
  ShoppingCart,
  LayoutDashboard,
  Plus,
  X,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  image: string;
  description: string;
}
const initialProducts: Product[] = [
  {
    id: 1,
    name: "เสื้อยืด Oversize ลายกราฟิก TarShop",
    category: "เสื้อยืด",
    price: 290,
    status: "มีสินค้าพร้อมส่ง",
    // เปลี่ยน URL รูปด้านล่างนี้
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80",
    description: "เสื้อยืดคอตตอน 100% ผ้านุ่ม ใส่สบาย ทรง Oversize สไตล์สตรีท",
  },
  {
    id: 2,
    name: "เสื้อเชิ้ตแขนยาวสไตล์มินิมอล",
    category: "เสื้อเชิ้ต",
    price: 350,
    status: "มีสินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    description: "เสื้อเชิ้ตใส่เรียนหรือใส่ทำงาน ผ้าพรีเมียม รีดง่าย ยับยาก",
  },
  {
    id: 3,
    name: "เสื้อฮู้ดดี้ผ้าหนานุ่ม สกรีนโลโก้วิทยาลัย",
    category: "เสื้อฮู้ด/แจ็คเก็ต",
    price: 590,
    status: "สินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    description: "เสื้อฮู้ดดี้ซับขนสัตว์สังเคราะห์ กันหนาวได้ดี ปักลายวิทยาลัย",
  },
  {
    id: 4,
    name: "เสื้อนักศึกษาชาย เข้ารูป ผ้าคอมทวิน",
    category: "ชุดนักศึกษา",
    price: 220,
    status: "มีสินค้าพร้อมส่ง",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
    description: "เสื้อเชิ้ตสีขาวสว่าง ผ้าคอมทวินทรงสวย ถูกระเบียบวิทยาลัย",
  },
];

const categories = [
  "ทั้งหมด",
  "เสื้อยืด",
  "เสื้อเชิ้ต",
  "เสื้อฮู้ด/แจ็คเก็ต",
  "ชุดนักศึกษา",
];

export default function MarketplacePage() {
  const { theme, setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "เสื้อยืด",
    price: "",
    image: "",
    description: "",
  });

  // Notifications
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === "ทั้งหมด" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Add Product Function
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const item: Product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      status: "มีสินค้าพร้อมส่ง",
      image:
        newProduct.image ||
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
      description: newProduct.description || "ไม่มีรายละเอียดเพิ่มเติม",
    };

    setProducts([item, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      category: "เสื้อยืด",
      price: "",
      image: "",
      description: "",
    });
    showToast("ลงขายเสื้อใหม่สำเร็จแล้ว!");
  };

  // Delete Product Function
  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("ลบรายการสินค้าเรียบร้อย");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#120e0c] text-slate-900 dark:text-[#f5e6d3] font-sans pb-12 transition-colors duration-300">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-amber-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-[#1e1713]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#382b22] px-4 py-3 flex items-center justify-between shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <Shirt className="w-6 h-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-xl font-bold tracking-wide text-amber-600 dark:text-amber-500">
            TarShop Apparel 👕
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStockOpen(true)}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#2a201a] text-amber-700 dark:text-amber-400 border border-slate-300 dark:border-[#423328] hover:bg-slate-200 dark:hover:bg-[#382b22] transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ระบบจัดการสต็อก</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-500 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เสื้อใหม่</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-slate-100 dark:bg-[#2a201a] text-amber-700 dark:text-amber-400 border border-slate-300 dark:border-[#423328] hover:bg-slate-200 dark:hover:bg-[#382b22]"
          >
            <ShoppingCart className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#2a201a] text-amber-700 dark:text-amber-400 border border-slate-300 dark:border-[#423328] hover:bg-slate-200 dark:hover:bg-[#382b22]"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเสื้อผ้า, ไซส์, หมวดหมู่..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1e1713] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500 text-sm placeholder-slate-400 dark:placeholder-[#8c7361] shadow-inner"
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
                  ? "bg-amber-600 border-amber-500 text-white shadow-md"
                  : "bg-white dark:bg-[#1e1713] border-slate-200 dark:border-[#382b22] text-slate-600 dark:text-[#c4ad9d] hover:bg-slate-100 dark:hover:bg-[#2a201a]"
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
              className="bg-white dark:bg-[#1e1713] border border-slate-200 dark:border-[#382b22] rounded-2xl overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative w-full h-56 md:h-72 bg-slate-100 dark:bg-[#120e0c] overflow-hidden group cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-amber-400">
                    {product.category}
                  </span>
                </div>

                <div className="p-3">
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="font-semibold text-sm line-clamp-1 hover:text-amber-500 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-[#2a201a] mt-2">
                <span className="text-amber-600 dark:text-amber-500 font-bold text-base">
                  ฿{product.price}
                </span>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#2a201a] text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-[#423328] hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-all"
                >
                  :: เลือกดูสินค้า
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Modal: รายละเอียดสินค้า */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1713] border border-slate-200 dark:border-[#382b22] rounded-2xl max-w-md w-full p-5 relative space-y-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-1 rounded-lg bg-slate-100 dark:bg-[#2a201a] text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-xl"
            />
            <div>
              <span className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-medium">
                {selectedProduct.category}
              </span>
              <h2 className="text-lg font-bold mt-2">{selectedProduct.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedProduct.description}
              </p>
              <p className="text-xl font-extrabold text-amber-600 dark:text-amber-500 mt-3">
                ฿{selectedProduct.price}
              </p>
            </div>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-500 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              เพิ่มลงตะกร้าสินค้า
            </button>
          </div>
        </div>
      )}

      {/* Drawer: ตะกร้าสินค้า */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white dark:bg-[#1e1713] border-l border-slate-200 dark:border-[#382b22] w-full max-w-md h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2a201a] pb-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-500" />
                  ตะกร้าสินค้า
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg bg-slate-100 dark:bg-[#2a201a]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-sm text-slate-400 py-8">
                    ยังไม่มีสินค้าในตะกร้า
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between bg-slate-50 dark:bg-[#2a201a] p-3 rounded-xl border border-slate-200 dark:border-[#382b22]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-amber-500 font-bold">
                            ฿{item.product.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 dark:border-[#2a201a] pt-4 space-y-3">
                <div className="flex justify-between text-base font-bold">
                  <span>ราคารวมทั้งหมด:</span>
                  <span className="text-amber-500">฿{cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    setCart([]);
                    setIsCartOpen(false);
                    showToast("สั่งซื้อสินค้าสำเร็จ!");
                  }}
                  className="w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all shadow-md"
                >
                  ชำระเงิน
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: เพิ่มเสื้อใหม่ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1713] border border-slate-200 dark:border-[#382b22] rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2a201a] pb-2">
              <h2 className="text-lg font-bold">ลงขายเสื้อใหม่ 👕</h2>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#2a201a] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500"
                  placeholder="เช่น เสื้อเชิ้ตสีขาว"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-1">หมวดหมู่</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#2a201a] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500"
                  >
                    {categories.filter((c) => c !== "ทั้งหมด").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#2a201a] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500"
                    placeholder="250"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">ลิงก์ รูปภาพ (URL)</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#2a201a] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs mb-1">รายละเอียดสินค้า</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#2a201a] border border-slate-200 dark:border-[#382b22] focus:outline-none focus:border-amber-500 h-20"
                  placeholder="รายละเอียดเกี่ยวกับไซส์ หรือสภาพสินค้า..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all shadow-md"
              >
                ลงขายสินค้า
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: ระบบจัดการสต็อก */}
      {isStockOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1713] border border-slate-200 dark:border-[#382b22] rounded-2xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2a201a] pb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-amber-500" />
                จัดการสต็อกสินค้า
              </h2>
              <button onClick={() => setIsStockOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-slate-50 dark:bg-[#2a201a] p-3 rounded-xl border border-slate-200 dark:border-[#382b22]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-xs font-semibold">{item.name}</p>
                      <p className="text-[10px] text-amber-500">฿{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}