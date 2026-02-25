/**
 * 默契问答 - 题库数据（共 8 题）
 * 注意：correct 为正确选项下标（0=A, 1=B, 2=C, 3=D）
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  hint: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "2023年10月15日，我们在上海的那个周末，去了哪些地方？",
    options: [
      "徐家汇书院、天主教堂、美罗城、周杰伦演唱会",
      "外滩、南京路、豫园、东方明珠",
      "迪士尼、田子坊、新天地、武康路",
      "人民广场、静安寺、淮海路、衡山路",
    ],
    correct: 0,
    hint: "那天我们看了周杰伦演唱会哦~",
  },
  {
    id: 2,
    question: "2024年春节，我们在北京出租屋里，除了置办家具，还做了什么有年味的事？",
    options: ["贴窗花和福字，买冬青", "包饺子", "看春晚", "放烟花"],
    correct: 0,
    hint: "我们还拍了照片发朋友圈呢~",
  },
  {
    id: 3,
    question: "2025年8月28日，小咪做了一件什么事，我开心地发了微博？",
    options: ["给我舔毛", "在我脚边睡觉", "玩逗猫棒", "晒太阳"],
    correct: 0,
    hint: "这是小咪表达爱的方式~",
  },
  {
    id: 4,
    question: "2023年7月8日，我们在顺德吃的那家粥底火锅，两个人花了多少钱？",
    options: ["65", "85", "105", "125"],
    correct: 1,
    hint: "超级便宜对不对！",
  },
  {
    id: 5,
    question: "2023年2月24日，我们第一次见面在厦门，那天我穿了什么颜色的衣服？",
    options: ["白色", "粉色", "黑色", "黄色"],
    correct: 1,
    hint: "很温柔的颜色~",
  },
  {
    id: 6,
    question: "2023年3月，我发的第一条恋爱Vlog，记录的是哪次旅行？",
    options: ["广州之行", "厦门之行", "长沙之行", "上海之行"],
    correct: 1,
    hint: "我们第一次见面的城市~",
  },
  {
    id: 7,
    question: "2023年4月，我们在广州一起看了哪部电影的重映？",
    options: ["泰坦尼克号", "大话西游", "情书", "你的名字"],
    correct: 0,
    hint: "经典爱情片~",
  },
  {
    id: 8,
    question: "2025年12月14日，我的健身视频里，杠铃臀桥做了多少公斤？",
    options: ["80kg", "90kg", "100kg", "110kg"],
    correct: 2,
    hint: "破百了！",
  },
];

