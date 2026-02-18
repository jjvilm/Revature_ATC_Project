import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 12px 36px rgba(0,0,0,0.55)"
      },
      colors: {
        ink: {
          950: "#06070A",
          900: "#0A0B10",
          850: "#0D0F16",
          800: "#101423",
          700: "#171C2F"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
