import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 👈 บรรทัดนี้สำคัญมาก! เพื่อให้มันอ่านไฟล์ใน components ที่เราเพิ่งสร้าง
  ],
  theme: {
    extend: {
      // 📐 Golden Ratio Spacing (1.618 Scale)
      spacing: {
        'gr-1': '0.618rem',  // ~10px (Gap เล็ก)
        'gr-2': '1rem',      // 16px (Base)
        'gr-3': '1.618rem',  // ~26px
        'gr-4': '2.618rem',  // ~42px (Padding ใหญ่)
        'gr-5': '4.236rem',  // ~68px (Section Gap)
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 🔮 Web3 Glass Colors
        glass: {
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      backdropBlur: {
        xs: '2px', // เบลอแบบกระจกใส
      }
    },
  },
  plugins: [],
};
export default config;