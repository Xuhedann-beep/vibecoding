"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CAT_PROFILE, CAT_MOMENTS, PARENTS_MESSAGES } from "@/data/cat-moments";
import { NICKNAMES } from "@/data/memories";

/** 从捡到日算起的月数 */
function getAgeMonths(foundDateStr: string): number {
  const start = new Date(foundDateStr + "T00:00:00");
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.max(0, months);
}

/** 日期格式化：如果是 2025-06-27 则转为 2025.06.27，若已为“2025年6月27日”则原样返回 */
function formatDate(dateStr: string): string {
  if (dateStr.includes("年")) return dateStr;
  return dateStr.replace(/-/g, ".");
}

/** 根据天气文字返回简单的天气图标 */
function getWeatherIcon(weather?: string): string {
  if (!weather) return "";
  if (weather.includes("大雨")) return "🌧";
  if (weather.includes("雨")) return "🌧";
  if (weather.includes("多云")) return "⛅";
  if (weather.includes("晴") && weather.includes("风")) return "🌬";
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("阴")) return "☁️";
  if (weather.includes("冷")) return "❄️";
  return "☁️";
}

export default function CutiePage() {
  const ageMonths = getAgeMonths(CAT_PROFILE.foundDate);

  return (
    <motion.div
      className="cat-diary min-h-screen bg-gradient-to-b from-[#ffeef8] via-[#ffe0f0] to-[#fff5f7] text-[#4A4A4A] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 装饰元素 */}
      <motion.div
        className="fixed top-10 left-10 text-2xl z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🐾
      </motion.div>
      <motion.div
        className="fixed top-10 right-10 text-2xl z-0"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🐟
      </motion.div>
      <motion.div
        className="fixed bottom-10 left-10 text-2xl z-0"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🧶
      </motion.div>
      <motion.div
        className="fixed bottom-10 right-10 text-2xl z-0"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        💕
      </motion.div>
      {/* 顶部导航（与首页一致） */}
      <nav className="flex justify-center gap-10 md:gap-16 py-6 border-b border-[#FFB6C1]/20 bg-white/30 backdrop-blur-md">
        <Link
          href="/"
          className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors text-base md:text-lg"
        >
          我们的故事
        </Link>
        <span className="text-[#FFB6C1] font-medium text-base md:text-lg">
          臭咪成长专栏
        </span>
        <Link
          href="/map"
          className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors text-base md:text-lg"
        >
          地图
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 pb-16">
        {/* 1. 顶部 header：大头照 + 名字 + 个性签名 */}
        <header className="flex flex-col items-center text-center mb-10 relative z-10">
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg shrink-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 旋转光环动画 */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB6C1] via-[#FF85A2] to-[#FFB6C1] opacity-70"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* 呼吸灯效果 */}
            <motion.div
              className="absolute inset-2 rounded-full bg-white"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 182, 193, 0.7)",
                  "0 0 0 10px rgba(255, 182, 193, 0)",
                  "0 0 0 0 rgba(255, 182, 193, 0.7)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Image
              src={`/images/${CAT_PROFILE.avatar}`}
              alt={CAT_PROFILE.name}
              fill
              className="object-cover rounded-full"
              sizes="128px"
              priority
            />
          </motion.div>
          <motion.h1
            className="mt-4 text-3xl md:text-4xl font-bold text-[#4A4A4A]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {CAT_PROFILE.name}（{CAT_PROFILE.nickname}）
          </motion.h1>
          <motion.p
            className="mt-2 text-base md:text-lg text-[#4A4A4A]/80 max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {CAT_PROFILE.signature}
          </motion.p>
        </header>

        {/* 2. 基础信息卡 */}
        <motion.section
          className="rounded-2xl bg-white/40 backdrop-blur-md shadow-lg shadow-[#FFB6C1]/20 p-6 mb-10 border border-[#FFB6C1]/30 relative z-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-sm font-medium text-[#4A4A4A]/60 mb-5 uppercase tracking-wider">
            基础信息
          </h2>
          <dl className="space-y-4 text-base">
            <div className="flex justify-between">
              <dt className="text-[#4A4A4A]/70">年龄</dt>
              <dd className="text-[#4A4A4A] font-medium">{ageMonths} 个月</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#4A4A4A]/70">体重</dt>
              <dd className="text-[#4A4A4A] font-medium">
                {CAT_PROFILE.weight ? `${CAT_PROFILE.weight} kg` : "____ kg"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#4A4A4A]/70">品种</dt>
              <dd className="text-[#4A4A4A] font-medium">{CAT_PROFILE.breed}</dd>
            </div>
            <div>
              <dt className="text-[#4A4A4A]/70 mb-3">性格标签</dt>
              <dd className="flex flex-wrap gap-3">
                {CAT_PROFILE.traits.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full bg-[#FFB6C1]/20 text-[#4A4A4A] text-sm font-medium hover:bg-[#FFB6C1]/40 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </motion.section>

        {/* 3. 成长时间轴（照片墙 / Pinterest 风格网格） */}
        <section className="mb-12 relative z-10">
          <h2 className="text-base font-medium text-[#4A4A4A]/70 mb-6 text-center">
            成长时间轴
          </h2>
          <div className="moments-grid">
            {CAT_MOMENTS.map((m, i) => (
              <motion.article
                key={m.date + m.content.slice(0, 8)}
                className={`moment-card rounded-3xl bg-white/50 backdrop-blur-sm shadow-lg shadow-[#FFB6C1]/20 border border-[#FFB6C1]/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#FFB6C1]/30 hover:-translate-y-2 ${
                  m.isAnniversary ? "border-[#FFB6C1] ring-2 ring-[#FFB6C1]/50" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
              >
                {/* 顶部：日期 + 天气（同一行） */}
                <div className="px-5 pt-5 flex items-center justify-between gap-3">
                  <span className="bg-gradient-to-r from-[#FFB6C1] to-[#FF85A2] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {formatDate(m.date)}
                  </span>
                  {m.weather ? (
                    <span className="text-sm text-[#4A4A4A]/70 flex items-center gap-1">
                      {getWeatherIcon(m.weather)} {m.weather}
                    </span>
                  ) : (
                    <span className="text-sm text-[#4A4A4A]/40"> </span>
                  )}
                </div>

                {/* 可选：地点 + 特别标记 */}
                {(m.location || m.isAnniversary) && (
                  <div className="px-5 mt-3 text-sm text-[#4A4A4A]/60 flex items-center justify-between">
                    <span>{m.location || ""}</span>
                    {m.isAnniversary && (
                      <span className="text-[#FFB6C1] font-medium">🎉 三周年</span>
                    )}
                  </div>
                )}

                {/* 中间：文字内容 */}
                <p className="px-5 py-4 text-base md:text-lg text-[#4A4A4A] leading-relaxed">
                  {m.content}
                </p>

                {/* 底部：图片（高度自适应，不固定比例） */}
                <div className="bg-[#FFB6C1]/5 p-4 flex justify-center">
                  {/* 这里用原生 img，保证图片高度按原图自适应（瀑布流/网格更自然） */}
                  <img
                    src={`/images/${m.image}`}
                    alt=""
                    loading="lazy"
                    className="w-3/5 max-w-[200px] h-auto block rounded-xl"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 4. 爸爸妈妈留言板 */}
        <motion.section
          className="rounded-3xl bg-white/40 backdrop-blur-md shadow-lg shadow-[#FFB6C1]/20 p-6 border border-[#FFB6C1]/30 relative z-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-base font-medium text-[#4A4A4A]/70 mb-5 text-center">
            爸爸妈妈留言板
          </h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm text-[#4A4A4A]/60 mb-2">{NICKNAMES.couple[0]}留言</p>
              <p className="text-base text-[#4A4A4A] min-h-[3rem] rounded-xl bg-white/60 border border-[#FFB6C1]/30 px-4 py-3">
                {PARENTS_MESSAGES.fromHusband || "____"}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#4A4A4A]/60 mb-2">{NICKNAMES.couple[1]}留言</p>
              <p className="text-base text-[#4A4A4A] min-h-[3rem] rounded-xl bg-white/60 border border-[#FFB6C1]/30 px-4 py-3">
                {PARENTS_MESSAGES.fromWife || "____"}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
