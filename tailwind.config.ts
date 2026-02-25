import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 项目主色：浅粉、背景、文字深灰
      colors: {
        primary: "#FFB6C1",
        background: "#FFFAFA",
        "text-dark": "#4A4A4A",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      // 密码错误时 gentle 摇动
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
