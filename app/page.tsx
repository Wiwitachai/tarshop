"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SplashScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Tag */}
      <div className="w-full flex justify-end pt-2">
        <span className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> College Marketplace
        </span>
      </div>

      {/* Main Logo & Hero Section */}
      <div className="flex flex-col items-center text-center my-auto w-full max-w-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight"
        >
          Tar<span className="text-indigo-600 dark:text-indigo-400">Shop</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          แหล่งรวมสินค้า มารค์เก็ตเพลสสำหรับชาววิทยาลัย ซื้อ-ขาย ง่าย ปลอดภัย ในรั้วเดียวกัน
        </motion.p>
      </div>

      {/* Action Button Area */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-sm pb-6"
      >
        <Link
          href="/marketplace"
          className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
        >
          เข้าสู่ตลาดซื้อขาย
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

    </main>
  );
}