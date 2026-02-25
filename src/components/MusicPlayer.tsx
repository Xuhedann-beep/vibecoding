"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AUDIO_SRC = "/music/brave-moment.mp3";

/**
 * 背景音乐播放器（页面右下角固定）
 * - 使用 HTML5 Audio 播放
 * - 进入首页尝试自动播放（音量 30%）
 * - 如果被浏览器拦截，提示「点击播放音乐」
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // 初始化 audio 实例
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audioRef.current = audio;
    audio.loop = true; // 单曲循环
    audio.volume = 0.3; // 默认 30% 音量

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // 进入首页后尝试自动播放
    const tryAutoplay = async () => {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setAutoplayBlocked(false);
        }
      } catch {
        // 浏览器拦截自动播放
        setAutoplayBlocked(true);
      }
    };

    void tryAutoplay();

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audioRef.current = null;
    };
  }, []);

  // 点击播放/暂停
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setAutoplayBlocked(false);
      } catch {
        setAutoplayBlocked(true);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={togglePlay}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex items-center gap-2 md:gap-3 rounded-full bg-white/90 border border-[#FFB6C1] shadow-md shadow-[#FFB6C1]/30 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-[#4A4A4A]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      {/* 圆形唱片 / 音符图标 */}
      <div
        className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FFB6C1] flex items-center justify-center text-white shadow-inner ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      >
        <span className="text-lg md:text-xl">♫</span>
        {/* 中心圆点，模拟唱片效果 */}
        <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-white/80" />
      </div>

      <div className="flex flex-col items-start">
        <span className="font-medium text-[11px] md:text-xs text-[#4A4A4A]">
          稳稳的幸福
        </span>
        <span className="text-[10px] md:text-[11px] text-[#4A4A4A]/70">
          陈奕迅 · {isPlaying ? "点击暂停" : "点击播放"}
        </span>
        {autoplayBlocked && (
          <span className="text-[10px] md:text-[11px] text-[#FFB6C1] mt-0.5">
            点击播放音乐
          </span>
        )}
      </div>
    </motion.button>
  );
}

