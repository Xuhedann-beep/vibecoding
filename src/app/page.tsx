"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import HomePage from "@/components/HomePage";

/**
 * 根页面：未解锁时显示开屏页（密码），正确密码后淡入显示首页
 * 刷新页面会重新回到开屏页（未做持久化）
 */
export default function Page() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <SplashScreen key="splash" onUnlock={() => setUnlocked(true)} />
      ) : (
        <HomePage key="home" />
      )}
    </AnimatePresence>
  );
}
