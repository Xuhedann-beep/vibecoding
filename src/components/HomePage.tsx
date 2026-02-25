"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  RELATIONSHIP_START_DATE,
  CAT_INFO,
  MILESTONES,
  NICKNAMES,
} from "@/data/memories";
import { MAP_PLACES, PLACE_TYPE_COLORS } from "@/data/map-places";
import MusicPlayer from "@/components/MusicPlayer";
import Quiz from "@/components/Quiz";

// 动态导入，禁用 SSR
const MapWithNoSSR = dynamic(
  () => import("@/components/MapComponent"),
  {
    ssr: false,
    loading: () => <div className="h-[400px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center">地图加载中...</div>
  }
);

/** 计算从某日期到今天的间隔天数 */
function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/** 格式化大事记日期显示（如 2023-02-24 → 2023.02.24） */
function formatMilestoneDate(dateStr: string): string {
  return dateStr.replace(/-/g, ".");
}

/**
 * 首页：顶部导航 + 在一起天数 + 臭咪陪伴天数 + 大事记时间轴 + 添加回忆按钮
 */
export default function HomePage() {
  const [quizPerfect, setQuizPerfect] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [mounted, setMounted] = useState(false);
  const daysTogether = getDaysSince(RELATIONSHIP_START_DATE);
  const daysWithCat = getDaysSince(CAT_INFO.foundDate);
  const cityCount = MAP_PLACES.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuizComplete = (_score: number, isPerfect: boolean, isSkipped?: boolean) => {
    if (isSkipped) {
      // 跳过答题，显示故事内容
      setQuizPerfect(true);
      setShowRetry(false);
    } else if (isPerfect) {
      // 答题满分，显示故事内容
      setQuizPerfect(true);
      setShowRetry(false);
    } else {
      // 答题未满分
      setQuizPerfect(false);
      setShowRetry(true);
    }
  };

  const handleRetry = () => {
    setShowRetry(false);
    setQuizPerfect(false);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 顶部导航 */}
      <nav className="flex justify-center gap-10 md:gap-16 py-8">
        <span className="text-[#FFB6C1] font-medium">我们的故事</span>
        <Link
          href="/cutie"
          className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors text-sm md:text-base"
        >
          臭咪成长专栏
        </Link>
      </nav>

      {/* 我们的故事板块：需要答题满分才能查看 */}
      <AnimatePresence mode="wait">
        {!quizPerfect ? (
          <>
            <Quiz onComplete={handleQuizComplete} />
            {showRetry && (
              <motion.div
                key="retry"
                className="flex justify-center mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.button
                  type="button"
                  onClick={handleRetry}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#FFB6C1] text-white text-sm md:text-base font-medium shadow-md hover:opacity-90 transition-opacity"
                >
                  再试一次
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* 置顶留言卡片：导航下方、计数器上方 */}
            <section className="px-4 md:px-6 pb-4 md:pb-6">
              <motion.div
                className="max-w-2xl mx-auto rounded-3xl bg-[#FFF0F5] border border-[#FFB6C1] shadow-sm shadow-[#FFB6C1]/30 px-5 py-5 md:px-7 md:py-6"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-3">
                  <span className="block text-base md:text-lg font-semibold mb-1">
                    亲爱的老公酱：
                  </span>
                  从2023年2月24日你跨越千山万水来跟我第一次见面，到今天，我们一起走过了整整三年的时光。这三年里——
                </p>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-2">
                  我们一起经历了从学生到打工人的转变；
                  一起在不同城市辗转落脚；
                  一起迎接了小咪加入我们的家庭；
                  一起走过了青甘、川西、云南、泰国、贵州、阿那亚...
                </p>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-2">
                  一起熬过了找工作的焦虑、初入职场的迷茫；
                  一起庆祝了每一个纪念日，吃遍了每一家想去的餐厅。
                  你是我凌晨三点失眠时的倾听者，是我加班崩溃时的拥抱，是我遇到好事第一个想分享的人，是我在这个偌大北京城里最温暖的港湾。
                </p>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-2">
                  有人说北京是一座巨大的烘干机，会吸干人的水分和热情。但因为有你，这座城市有了温度，有了让我每天回家的期待。
                  未来的日子，我们继续一起走吧。两个人，一只猫，还有很多很多个春夏秋冬。
                </p>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-1">
                  三周年快乐！
                </p>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed italic text-right mt-2">
                  永远爱你的丹丹宝
                </p>
              </motion.div>
            </section>

            {/* 统计卡片区域 */}
            <section className="px-4 md:px-6 pb-8 md:pb-10">
              <motion.div
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="rounded-2xl bg-white/90 shadow-md shadow-[#FFB6C1]/10 border border-[#FFB6C1]/20 p-5 text-center">
                  <h3 className="text-sm text-[#4A4A4A]/70 mb-2">在一起</h3>
                  <p className="text-3xl font-medium text-[#FFB6C1]">{daysTogether}</p>
                  <p className="text-sm text-[#4A4A4A]/60 mt-1">天</p>
                </div>
                <div className="rounded-2xl bg-white/90 shadow-md shadow-[#FFB6C1]/10 border border-[#FFB6C1]/20 p-5 text-center">
                  <h3 className="text-sm text-[#4A4A4A]/70 mb-2">臭咪陪伴</h3>
                  <p className="text-3xl font-medium text-[#FFB6C1]">{daysWithCat}</p>
                  <p className="text-sm text-[#4A4A4A]/60 mt-1">天</p>
                </div>
                <div className="rounded-2xl bg-white/90 shadow-md shadow-[#FFB6C1]/10 border border-[#FFB6C1]/20 p-5 text-center">
                  <h3 className="text-sm text-[#4A4A4A]/70 mb-2">走过的城市</h3>
                  <p className="text-3xl font-medium text-[#FFB6C1]">{cityCount}</p>
                  <p className="text-sm text-[#4A4A4A]/60 mt-1">个</p>
                </div>
              </motion.div>
            </section>

            {/* 我们的故事内容（时间轴样式美化） */}
            <section className="px-4 md:px-6 pb-8 md:pb-10">
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h2 className="text-lg md:text-xl font-medium text-[#4A4A4A] mb-10 text-center">
                  我们的故事
                </h2>
                <div className="relative">
                  {/* 时间轴竖线 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFB6C1] via-[#FF85A2] to-[#FFB6C1]"></div>
                  
                  <div className="space-y-8">
                    {MILESTONES.map((m, i) => {
                      const isEven = i % 2 === 0;
                      return (
                      <motion.div
                        key={m.date + m.title}
                        className="relative flex items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      >
                        {/* 左侧内容：偶数索引显示，奇数索引隐藏 */}
                        <div className={`flex-1 ${isEven ? 'text-right pr-8' : 'invisible'}`}>
                          <p className="text-sm text-[#999] mb-1">{formatMilestoneDate(m.date)}</p>
                          <p className="text-lg font-bold text-[#333] mb-2">
                            {m.title}
                            {m.emoji && <span className="ml-2">{m.emoji}</span>}
                          </p>
                          <div className="inline-block">
                            <Image
                              src={`/images/${m.image}`}
                              alt={m.title}
                              width={150}
                              height={150}
                              className="timeline-bubble"
                            />
                          </div>
                        </div>
                        
                        {/* 中间圆点 */}
                        <div className="timeline-dot shrink-0 z-10"></div>
                        
                        {/* 右侧内容：奇数索引显示，偶数索引隐藏 */}
                        <div className={`flex-1 ${isEven ? 'invisible' : 'text-left pl-8'}`}>
                          <p className="text-sm text-[#999] mb-1">{formatMilestoneDate(m.date)}</p>
                          <p className="text-lg font-bold text-[#333] mb-2">
                            {m.title}
                            {m.emoji && <span className="ml-2">{m.emoji}</span>}
                          </p>
                          <div className="inline-block">
                            <Image
                              src={`/images/${m.image}`}
                              alt={m.title}
                              width={150}
                              height={150}
                              className="timeline-bubble"
                            />
                          </div>
                        </div>
                      </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* 地图足迹区域 */}
            <section className="px-4 md:px-6 pb-12 md:pb-16">
              <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-lg md:text-xl font-medium text-[#4A4A4A] mb-3 text-center">
                  我们的足迹 👣
                </h2>
                <p className="text-sm text-[#4A4A4A]/70 mb-6 text-center">
                  点击标记点查看回忆
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* 左侧地点列表 */}
                  <div className="lg:col-span-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#FFB6C1]/20 shadow-md shadow-[#FFB6C1]/10 p-4 h-[400px] overflow-y-auto">
                    <p className="text-xs font-medium text-[#4A4A4A]/60 uppercase tracking-wider mb-3">
                      走过的地方
                    </p>
                    <ul className="space-y-2">
                      {MAP_PLACES.map((place, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors hover:bg-[#FFB6C1]/10`}
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
                  </div>
                  {/* 右侧地图 */}
                  <div className="lg:col-span-3 h-[400px] rounded-2xl overflow-hidden border border-[#FFB6C1]/20 shadow-md shadow-[#FFB6C1]/10">
                    {mounted ? <MapWithNoSSR /> : <div className="h-full bg-[#f5f5f5] rounded-2xl"></div>}
                  </div>
                </div>
              </motion.div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* 内容已移至quizPerfect为true的部分 */}
      </main>

      {/* 底部添加回忆按钮 */}
      <footer className="pb-12 flex justify-center">
        <motion.button
          type="button"
          className="px-8 py-4 rounded-2xl bg-[#FFB6C1] text-white font-medium shadow-sm hover:opacity-90 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => {
            // TODO: 后续实现添加回忆弹窗或跳转
          }}
        >
          添加回忆
        </motion.button>
      </footer>
      {/* 右下角背景音乐播放器 */}
      <MusicPlayer />
    </motion.div>
  );
}
