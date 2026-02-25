import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "老公酱 & 宝宝酱",
  description: "情侣纪念网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-[#FFFAFA] text-[#4A4A4A]">
        {children}
      </body>
    </html>
  );
}
