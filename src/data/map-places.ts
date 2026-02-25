/**
 * 地图页 - 我们的足迹地点数据
 * 顺序即轨迹连线顺序
 */

export type PlaceType = "起点" | "途经" | "重要" | "终点";

export interface MapPlace {
  /** 地点名称 */
  name: string;
  /** [纬度, 经度] */
  coords: [number, number];
  /** 日期展示 */
  date: string;
  /** 描述 */
  description: string;
  /** 类型（用于标记颜色：起点绿、途经蓝、重要粉、终点红） */
  type: PlaceType;
}

export const MAP_PLACES: MapPlace[] = [
  {
    name: "福建省厦门市厦门北站",
    coords: [24.5347, 118.0894],
    date: "2023.02.24",
    description: "第一次见面 💕",
    type: "起点",
  },
  {
    name: "广东省广州市黄埔区未来科学城",
    coords: [23.16, 113.45],
    date: "2023年",
    description: "实习时一起住的地方，第一次同居的小窝",
    type: "途经",
  },
  {
    name: "浙江省杭州市魔方公寓江南大道店",
    coords: [30.2086, 120.212],
    date: "2023.07-08",
    description: "一起在杭州暑期实习的小家 🏠",
    type: "途经",
  },
  {
    name: "上海市杨浦区上海财经大学",
    coords: [31.30, 121.50],
    date: "2023-2025年",
    description: "一起读研两年的地方，从校园到社会的过渡期",
    type: "途经",
  },
  {
    name: "北京市朝阳区圣馨大地家园",
    coords: [39.98, 116.48],
    date: "2025年底",
    description: "来北京实习时一起住的小区，圆圆也是在这里捡到的",
    type: "途经",
  },
  {
    name: "北京市朝阳区望湖公园",
    coords: [40.0128, 116.4478],
    date: "2025.06.27",
    description: "捡到臭咪的地方 🐱",
    type: "重要",
  },
  {
    name: "北京市朝阳区来广营乡朝悦居",
    coords: [40.0215, 116.4605],
    date: "2025.06.24",
    description: "现在的家，毕业同居 🏡",
    type: "终点",
  },
];

/** 按类型取标记颜色 */
export const PLACE_TYPE_COLORS: Record<PlaceType, string> = {
  起点: "#22c55e",
  途经: "#3b82f6",
  重要: "#FFB6C1",
  终点: "#ef4444",
};
