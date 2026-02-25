"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/data/quiz-questions";

type Status = "idle" | "checking" | "locked" | "finished";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

/** 根据总分给出评价 */
function getResultText(score: number): string {
  if (score >= 80) return "完美！";
  if (score >= 60) return "还可以！";
  if (score >= 40) return "我对你很失望！";
  return "不及格！";
}

/**
 * 默契问答互动组件
 * - 一题一题进行
 * - 每题 10 分，共 8 题
 * - 粉色主题，题目卡片居中
 */
export default function Quiz({
  onComplete,
}: {
  onComplete?: (score: number, isPerfect: boolean, isSkipped?: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [lastIsCorrect, setLastIsCorrect] = useState<boolean | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  const current = QUIZ_QUESTIONS[currentIndex];
  const total = QUIZ_QUESTIONS.length;

  // 从本地存储加载分数
  useEffect(() => {
    const savedScore = localStorage.getItem('quizScore');
    if (savedScore !== null) {
      setScore(parseInt(savedScore));
      setStatus('finished');
    }
  }, []);

  // 选择选项
  const handleSelect = (index: number) => {
    if (!current || status === "locked" || status === "finished") return;
    if (selected !== null) return; // 避免重复点击同一题

    setSelected(index);
    setStatus("checking");

    const isCorrect = index === current.correct;
    setLastIsCorrect(isCorrect);
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }

    // 1.5s 后进下一题 / 或结束
    const isLast = currentIndex === total - 1;
    const delay = 1500;

    window.setTimeout(() => {
      if (isLast) {
        // 最后一题，1 秒后展示结果页
        setStatus("locked");
        window.setTimeout(() => {
          setStatus("finished");
          // 存储分数到本地存储
          const finalScore = score + (isCorrect ? 10 : 0);
          localStorage.setItem('quizScore', finalScore.toString());
          // 通知父组件答题完成
          if (onComplete) {
            const isPerfect = finalScore === 80;
            onComplete(finalScore, isPerfect);
          }
        }, 1000);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
        setStatus("idle");
        setLastIsCorrect(null);
      }
    }, delay);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setStatus("idle");
    setScore(0);
    setLastIsCorrect(null);
    setIsSkipped(false);
    // 清除本地存储
    localStorage.removeItem('quizScore');
  };

  // 跳过答题
  const handleSkip = () => {
    setIsSkipped(true);
    setStatus("finished");
    // 通知父组件答题完成（跳过）
    if (onComplete) {
      onComplete(0, false, true);
    }
  };

  // 当前题目进度文本
  const progressText = `${currentIndex + 1}/${total}`;

  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-10">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {status !== "finished" && current && (
            <motion.div
              key={current.id}
              className="rounded-3xl bg-white/90 border border-[#FFB6C1]/60 shadow-lg shadow-[#FFB6C1]/25 px-5 py-6 md:px-7 md:py-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* 顶部：标题 + 进度 + 分数 */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#4A4A4A]/60">
                    默契问答
                  </p>
                  <p className="text-sm text-[#4A4A4A]/80 mt-1">
                    当前得分：<span className="font-semibold">{score}</span>/80
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#4A4A4A]/60 mb-1">进度</p>
                  <p className="text-sm font-semibold text-[#FFB6C1]">
                    {progressText}
                  </p>
                </div>
              </div>

              {/* 简单进度条 */}
              <div className="w-full h-1.5 rounded-full bg-[#FFB6C1]/20 mb-5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FFB6C1] transition-all"
                  style={{
                    width: `${((currentIndex + 1) / total) * 100}%`,
                  }}
                />
              </div>

              {/* 题目文案 */}
              <motion.h2
                className="text-base md:text-lg font-medium text-[#4A4A4A] mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {current.question}
              </motion.h2>

              {/* 选项按钮列表 */}
              <div className="space-y-3 mt-4">
                {current.options.map((opt, idx) => {
                  const isChosen = selected === idx;
                  const isCorrect = idx === current.correct;
                  const isWrongChosen =
                    selected !== null && isChosen && !isCorrect;

                  let bg = "bg-white";
                  let border =
                    "border border-[#FFB6C1]/40 hover:border-[#FFB6C1]/80";
                  let text = "text-[#4A4A4A]";

                  if (selected !== null) {
                    if (isCorrect) {
                      bg = "bg-emerald-50";
                      border = "border border-emerald-400";
                      text = "text-emerald-700";
                    } else if (isWrongChosen) {
                      bg = "bg-rose-50";
                      border = "border border-rose-400";
                      text = "text-rose-700";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      whileHover={{
                        scale: selected === null ? 1.01 : 1,
                      }}
                      whileTap={{
                        scale: selected === null ? 0.98 : 1,
                      }}
                      className={`w-full flex items-center text-left px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl text-sm md:text-[15px] transition-colors ${bg} ${border} ${text} ${
                        isWrongChosen ? "animate-shake" : ""
                      }`}
                    >
                      <span className="mr-3 text-xs font-semibold text-[#FFB6C1]">
                        {OPTION_LABELS[idx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* 提示 + 正确爱心动画 */}
              <div className="mt-4 min-h-[2.5rem] relative overflow-visible">
                {selected !== null && (
                  <>
                    <p className="text-xs md:text-sm text-[#4A4A4A]/80">
                      提示：{current.hint}
                    </p>
                    {lastIsCorrect && (
                      <motion.span
                        key="heart"
                        className="absolute right-2 bottom-0 text-lg"
                        initial={{ opacity: 0, y: 8, scale: 0.7 }}
                        animate={{ opacity: 1, y: -12, scale: 1.1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                      >
                        💖
                      </motion.span>
                    )}
                  </>
                )}
              </div>

              {/* 跳过答题按钮 */}
              <div className="mt-6 text-center">
                <motion.button
                  type="button"
                  onClick={handleSkip}
                  disabled={status === "locked"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs text-[#4A4A4A]/60 hover:text-[#4A4A4A]/80 transition-colors"
                >
                  🙈 先跳过
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* 结果页 */}
          {status === "finished" && (
            <motion.div
              key="result"
              className="rounded-3xl bg-white/90 border border-[#FFB6C1]/60 shadow-lg shadow-[#FFB6C1]/25 px-6 py-8 md:px-8 md:py-9 text-center"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-wide text-[#4A4A4A]/60 mb-2">
                测试结果
              </p>
              {isSkipped ? (
                <>
                  <p className="text-3xl md:text-4xl font-semibold text-[#FFB6C1] mb-3">
                    跳过测试
                  </p>
                  <p className="text-base md:text-lg text-[#4A4A4A] mb-6">
                    你选择了跳过，默契值待测试 💕
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl md:text-4xl font-semibold text-[#FFB6C1] mb-3">
                    {score}/80 分
                  </p>
                  <p className="text-base md:text-lg text-[#4A4A4A] mb-6">
                    {getResultText(score)}
                  </p>
                </>
              )}
              <motion.button
                type="button"
                onClick={handleRestart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#FFB6C1] text-white text-sm md:text-base font-medium shadow-md hover:opacity-90 transition-opacity"
              >
                {isSkipped ? "开始测试" : "重新测试"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

