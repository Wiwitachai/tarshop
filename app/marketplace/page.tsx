"use client";

import React, { useState, useEffect } from "react";
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
  Upload,
  QrCode,
  CreditCard,
  Building2,
  Banknote,
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "bank" | "cash">("qr");
  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "เสื้อยืด",
    price: "",
    image: "",
    description: "",
  });

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

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === "ทั้งหมด" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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

  const handleConfirmPayment = () => {
    setCart([]);
    setIsPaymentOpen(false);
    setIsCartOpen(false);
    setSlipImage(null);
    if (paymentMethod === "cash") {
      showToast("บันทึกรายการสำเร็จ! ชำระเงินสดปลายทางเมื่อได้รับสินค้า");
    } else {
      showToast("ชำระเงินเรียบร้อย! ระบบกำลังดำเนินการจัดส่ง");
    }
  };

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
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80",
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

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("ลบรายการสินค้าเรียบร้อย");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-orange-50/50 dark:bg-[#0f0b08] text-stone-800 dark:text-[#f4eae0] font-sans pb-12 transition-colors duration-300">
        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-20 right-4 z-50 bg-orange-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Header Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-[#1a120b]/90 backdrop-blur-md border-b border-orange-100 dark:border-[#2a1c12] px-4 py-3 flex items-center justify-between shadow-sm transition-colors">
          <div className="flex items-center gap-2">
            <Shirt className="w-6 h-6 text-orange-600 dark:text-orange-500" />
            <h1 className="text-xl font-extrabold tracking-wide text-orange-600 dark:text-orange-500">
              TarShop Apparel 👕
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsStockOpen(true)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-[#261910] text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-[#3d2719] hover:bg-orange-100 dark:hover:bg-[#342216] transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">จัดการสต็อก</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-500 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เสื้อใหม่</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-orange-50 dark:bg-[#261910] text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-[#3d2719] hover:bg-orange-100 dark:hover:bg-[#342216]"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>

            {/* ปุ่มสลับกลางวัน / กลางคืน */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-orange-50 dark:bg-[#261910] text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-[#3d2719] hover:bg-orange-100 dark:hover:bg-[#342216] transition-all cursor-pointer"
              title="สลับโหมดกลางวัน/กลางคืน"
            >
              {mounted && isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-orange-600" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-orange-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเสื้อผ้า, ไซส์, หมวดหมู่..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1a120b] border border-orange-200/80 dark:border-[#2a1c12] focus:outline-none focus:border-orange-500 text-sm placeholder-stone-400 dark:placeholder-stone-500 shadow-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                  activeCategory === cat
                    ? "bg-orange-600 border-orange-600 text-white shadow-sm"
                    : "bg-white dark:bg-[#1a120b] border-orange-200/60 dark:border-[#2a1c12] text-stone-600 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-[#261910]"
                }`}
              >
                :: {cat}
              </button>
            ))}
          </div>

          <main className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-[#1a120b] border border-orange-100 dark:border-[#2a1c12] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative w-full h-56 md:h-72 bg-stone-100 dark:bg-[#0f0b08] overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 text-[10px] bg-stone-900/80 text-orange-300 backdrop-blur-md px-2.5 py-0.5 rounded-md font-medium border border-white/10">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-semibold text-sm line-clamp-1 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer text-stone-800 dark:text-stone-100"
                    >
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3 pt-0 flex items-center justify-between border-t border-stone-100 dark:border-[#261910] mt-2">
                  <span className="text-orange-600 dark:text-orange-500 font-extrabold text-base">
                    ฿{product.price}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-[#261910] text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-[#3d2719] hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 dark:hover:text-white transition-all font-medium"
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
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a120b] border border-orange-100 dark:border-[#2a1c12] rounded-2xl max-w-md w-full p-5 relative space-y-4 shadow-2xl">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-1 rounded-lg bg-stone-100 dark:bg-[#261910] text-stone-500 dark:text-stone-400 hover:text-orange-600"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-60 object-cover rounded-xl"
              />
              <div>
                <span className="text-xs px-2.5 py-1 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-medium">
                  {selectedProduct.category}
                </span>
                <h2 className="text-lg font-bold mt-2 text-stone-900 dark:text-stone-100">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {selectedProduct.description}
                </p>
                <p className="text-2xl font-black text-orange-600 dark:text-orange-500 mt-3">
                  ฿{selectedProduct.price}
                </p>
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-500 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                เพิ่มลงตะกร้าสินค้า
              </button>
            </div>
          </div>
        )}

        {/* Drawer: ตะกร้าสินค้า */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
            <div className="bg-white dark:bg-[#1a120b] border-l border-orange-100 dark:border-[#2a1c12] w-full max-w-md h-full p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#261910] pb-3">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-orange-600 dark:text-orange-500">
                    <ShoppingCart className="w-5 h-5" />
                    ตะกร้าสินค้า
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg bg-stone-100 dark:bg-[#261910]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-center text-sm text-stone-400 py-8">
                      ยังไม่มีสินค้าในตะกร้า
                    </p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between bg-orange-50/50 dark:bg-[#261910] p-3 rounded-xl border border-orange-100 dark:border-[#3d2719]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-sm font-medium line-clamp-1 text-stone-800 dark:text-stone-200">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                              ฿{item.product.price} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-stone-200 dark:border-[#261910] pt-4 space-y-3">
                  <div className="flex justify-between text-base font-bold">
                    <span>ราคารวมทั้งหมด:</span>
                    <span className="text-orange-600 dark:text-orange-500 text-xl font-extrabold">
                      ฿{cartTotal}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-500 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    ชำระเงิน
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: ระบบชำระเงิน */}
        {isPaymentOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a120b] border border-orange-100 dark:border-[#2a1c12] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsPaymentOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-lg bg-stone-100 dark:bg-[#261910] text-stone-500 dark:text-stone-400 hover:text-orange-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pb-2 border-b border-stone-100 dark:border-[#261910]">
                <h2 className="text-lg font-bold text-orange-600 dark:text-orange-500 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  เลือกช่องทางการชำระเงิน
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  ยอดที่ต้องชำระทั้งสิ้น
                </p>
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400 mt-1">
                  ฿{cartTotal}
                </p>
              </div>

              {/* ปุ่มเลือกช่องทางชำระเงิน */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setPaymentMethod("qr")}
                  className={`p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "qr"
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "bg-stone-50 dark:bg-[#261910] border-stone-200 dark:border-[#3d2719] text-stone-600 dark:text-stone-300"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  QR PromptPay
                </button>
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "bank"
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "bg-stone-50 dark:bg-[#261910] border-stone-200 dark:border-[#3d2719] text-stone-600 dark:text-stone-300"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  โอนธนาคาร
                </button>
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "cash"
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "bg-stone-50 dark:bg-[#261910] border-stone-200 dark:border-[#3d2719] text-stone-600 dark:text-stone-300"
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  เงินสด (COD)
                </button>
              </div>

              {/* แสดงรายละเอียดตามการเลือก */}
              {paymentMethod === "qr" && (
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-stone-200 shadow-inner text-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://promptpay.io/0812345678/${cartTotal}`}
                    alt="PromptPay QR Code"
                    className="w-44 h-44 object-contain"
                  />
                  <p className="text-xs font-semibold text-stone-700 mt-2">
                    สแกนผ่านแอปธนาคารได้ทุกธนาคาร
                  </p>
                  <p className="text-[10px] text-stone-400">
                    ชื่อบัญชี: ร้าน TarShop Apparel
                  </p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="bg-orange-50/60 dark:bg-[#261910] p-4 rounded-xl border border-orange-100 dark:border-[#3d2719] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">ธนาคาร:</span>
                    <span className="font-bold">กสิกรไทย (KBANK)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">เลขบัญชี:</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      123-4-56789-0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">ชื่อบัญชี:</span>
                    <span className="font-bold">บจก. ทาร์ช็อป แอพพาเรล</span>
                  </div>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="bg-orange-50/60 dark:bg-[#261910] p-4 rounded-xl border border-orange-100 dark:border-[#3d2719] text-center space-y-2">
                  <Banknote className="w-10 h-10 text-orange-600 dark:text-orange-500 mx-auto" />
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    ชำระเงินสดเก็บเงินปลายทาง (COD)
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    เตรียมเงินสดจำนวน <span className="font-bold text-orange-600 dark:text-orange-400">฿{cartTotal}</span> ให้พร้อมในวันที่เจ้าหน้าที่ไปส่งสินค้า
                  </p>
                </div>
              )}

              {/* ส่วนแนบสลิป */}
              {paymentMethod !== "cash" && (
                <div>
                  <label className="block text-xs font-medium mb-1">
                    แนบหลักฐานการโอนเงิน (สลิป)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer bg-stone-50 dark:bg-[#261910] border-stone-300 dark:border-[#3d2719] hover:border-orange-500 transition-all relative overflow-hidden">
                    {slipImage ? (
                      <img
                        src={slipImage}
                        alt="Slip Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-stone-400">
                        <Upload className="w-5 h-5 mb-1 text-orange-500" />
                        <p className="text-xs">อัปโหลดสลิปชำระเงินที่นี่</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSlipUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <button
                onClick={handleConfirmPayment}
                disabled={paymentMethod !== "cash" && !slipImage}
                className={`w-full py-3 font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                  paymentMethod === "cash" || slipImage
                    ? "bg-orange-600 hover:bg-orange-500 text-white cursor-pointer"
                    : "bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                {paymentMethod === "cash"
                  ? "ยืนยันการสั่งซื้อ (ชำระเงินสด)"
                  : slipImage
                  ? "ยืนยันการชำระเงิน"
                  : "กรุณาอัปโหลดสลิปโอนเงิน"}
              </button>
            </div>
          </div>
        )}

        {/* Modal: ลงขายเสื้อใหม่ */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a120b] border border-orange-100 dark:border-[#2a1c12] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#261910] pb-2">
                <h2 className="text-lg font-bold text-orange-600 dark:text-orange-500">
                  ลงขายเสื้อใหม่ 👕
                </h2>
                <button onClick={() => setIsAddModalOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-medium mb-1">ชื่อสินค้า</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-[#261910] border border-stone-200 dark:border-[#3d2719] focus:outline-none focus:border-orange-500 text-stone-800 dark:text-stone-100"
                    placeholder="เช่น เสื้อเชิ้ตสีขาว"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1">หมวดหมู่</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-[#261910] border border-stone-200 dark:border-[#3d2719] focus:outline-none focus:border-orange-500 text-stone-800 dark:text-stone-100"
                    >
                      {categories
                        .filter((c) => c !== "ทั้งหมด")
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">ราคา (บาท)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-[#261910] border border-stone-200 dark:border-[#3d2719] focus:outline-none focus:border-orange-500 text-stone-800 dark:text-stone-100"
                      placeholder="250"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">
                    อัปโหลดรูปภาพสินค้า
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-stone-50 dark:bg-[#261910] border-stone-300 dark:border-[#3d2719] hover:border-orange-500 transition-all relative overflow-hidden">
                    {newProduct.image ? (
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-stone-400">
                        <Upload className="w-6 h-6 mb-1 text-orange-500" />
                        <p className="text-xs">คลิกเพื่อเลือกไฟล์รูปภาพจากเครื่อง</p>
                        <p className="text-[10px]">PNG, JPG หรือ WEBP</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">รายละเอียดสินค้า</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-[#261910] border border-stone-200 dark:border-[#3d2719] focus:outline-none focus:border-orange-500 h-20 text-stone-800 dark:text-stone-100"
                    placeholder="รายละเอียดเกี่ยวกับไซส์ หรือสภาพสินค้า..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-500 transition-all shadow-md"
                >
                  ลงขายสินค้า
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: สต็อกสินค้า */}
        {isStockOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a120b] border border-orange-100 dark:border-[#2a1c12] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#261910] pb-2">
                <h2 className="text-lg font-bold flex items-center gap-2 text-orange-600 dark:text-orange-500">
                  <LayoutDashboard className="w-5 h-5" />
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
                    className="flex items-center justify-between bg-stone-50 dark:bg-[#261910] p-3 rounded-xl border border-stone-200 dark:border-[#3d2719]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">
                          ฿{item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
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
    </div>
  );
}