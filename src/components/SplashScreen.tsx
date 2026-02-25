"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { UNLOCK_PASSWORD, NICKNAMES } from "@/data/memories";

interface SplashScreenProps {
  onUnlock: () => void;
}

/**
 * 开屏页：大标题 + 4位密码输入，正确后回调 onUnlock
 */
export default function SplashScreen({ onUnlock }: SplashScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handlePinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
      setPin(value);
      if (error) setError("");
    },
    [error]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (pin === UNLOCK_PASSWORD) {
        onUnlock();
      } else {
        setError("密码不对哦，再想想～");
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    },
    [pin, onUnlock]
  );

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 大标题 */}
      <motion.h1
        className="text-4xl md:text-5xl font-light text-[#4A4A4A] mb-16 text-center tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {NICKNAMES.couple[0]} & {NICKNAMES.couple[1]}
      </motion.h1>

      {/* 4位密码输入表单 */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={pin}
          onChange={handlePinChange}
          placeholder="输入密码"
          className={`
            w-full px-6 py-4 text-center text-xl tracking-[0.5em] rounded-2xl
            border-2 border-[#FFB6C1]/50 bg-white/80
            placeholder:text-gray-300 focus:outline-none focus:border-[#FFB6C1]
            transition-colors
            ${shaking ? "animate-shake border-red-300" : ""}
          `}
          autoFocus
          autoComplete="off"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-rose-400"
          >
            {error}
          </motion.p>
        )}
        <button
          type="submit"
          className="px-8 py-3 rounded-2xl bg-[#FFB6C1] text-white font-medium hover:opacity-90 transition-opacity"
        >
          进入
        </button>
      </motion.form>
    </motion.div>
  );
}
