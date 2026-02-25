/**
 * 情侣纪念站 - 数据源
 * 基础信息、恋爱大事记、小猫信息
 */

// ========== 基础信息 ==========
/** 恋爱开始日期（在一起的日子） */
export const RELATIONSHIP_START_DATE = "2023-02-24";

/** 称呼 */
export const NICKNAMES = {
  /** 对对方的称呼 */
  couple: ["老公酱", "宝宝酱"] as const,
};

/** 开屏页密码（我们在一起的日子 0224） */
export const UNLOCK_PASSWORD = "0224";

// ========== 恋爱大事记 ==========
export interface Milestone {
  /** 日期 YYYY-MM-DD */
  date: string;
  /** 描述 */
  title: string;
  /** 可选 emoji */
  emoji?: string;
  /** 可选备注（如地点） */
  note?: string;
  /** 大事记配图，放在 public/images 下 */
  image: string;
}

export const MILESTONES: Milestone[] = [
  { date: "2023-02-24", title: "在一起", emoji: "💕", image: "together.jpg" },
  { date: "2023-08-30", title: "结束异地", emoji: "🚄", image: "train.jpg" },
  { date: "2025-06-24", title: "毕业同居", emoji: "🏠", image: "home.jpg" },
  { date: "2025-06-27", title: "捡到臭咪", emoji: "🐱", note: "望湖公园", image: "cat.jpg" },
];

// ========== 小猫信息 ==========
export const CAT_INFO = {
  /** 名字 */
  name: "圆圆",
  /** 小名 */
  nickname: "臭咪",
  /** 捡到日期 */
  foundDate: "2025-06-27",
  /** 捡到地点 */
  foundPlace: "望湖公园",
  /** 性格标签 */
  traits: ["话痨", "干饭王", "拉屎大王", "专业跑酷选手"] as const,
} as const;
