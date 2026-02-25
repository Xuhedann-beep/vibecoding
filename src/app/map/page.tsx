"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { MAP_PLACES, PLACE_TYPE_COLORS } from "@/data/map-places";

// 地图依赖 window，必须关闭 SSR
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 bg-[#FFFAFA] text-[#4A4A4A]">
      <div
        className="w-10 h-10 rounded-full border-2 border-[#FFB6C1] border-t-transparent animate-spin"
        aria-hidden
      />
      <p className="text-sm text-[#4A4A4A]/70">加载中...</p>
    </div>
  ),
});

export default function MapPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectPlace = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <motion.div
      className="h-screen flex flex-col bg-[#FFFAFA] text-[#4A4A4A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 顶部：导航 + 标题 */}
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 py-3 border-b border-[#FFB6C1]/20 bg-white/80">
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors"
          >
            我们的故事
          </Link>
          <Link
            href="/cutie"
            className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors"
          >
            臭咪成长专栏
          </Link>
          <span className="text-[#FFB6C1] font-medium">地图</span>
        </nav>
        <h1 className="text-base md:text-lg font-medium text-[#4A4A4A] truncate">
          从南到北，一路有你
        </h1>
        <div className="w-[120px] md:w-[140px]" />
      </header>

      <div className="flex-1 flex min-h-0">
        {/* 左侧侧边栏：地点列表 */}
        <aside className="shrink-0 w-[200px] md:w-[260px] flex flex-col border-r border-[#FFB6C1]/20 bg-white/60 overflow-y-auto">
          <p className="px-3 py-2 text-xs font-medium text-[#4A4A4A]/60 uppercase tracking-wider">
            我们的足迹
          </p>
          <ul className="px-2 pb-4">
            {MAP_PLACES.map((place, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelectPlace(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    selectedIndex === i
                      ? "bg-[#FFB6C1]/25 text-[#4A4A4A]"
                      : "text-[#4A4A4A]/90 hover:bg-[#FFB6C1]/10"
                  }`}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle shrink-0"
                    style={{ backgroundColor: PLACE_TYPE_COLORS[place.type] }}
                  />
                  <span className="font-medium line-clamp-2">{place.name}</span>
                  <span className="block text-xs text-[#4A4A4A]/60 mt-0.5">
                    {place.date} · {place.type}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 地图区域：占满剩余空间 */}
        <main className="flex-1 min-w-0 relative">
          <MapView selectedIndex={selectedIndex} />
        </main>
      </div>
    </motion.div>
  );
}
