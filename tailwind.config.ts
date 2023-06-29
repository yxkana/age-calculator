import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(259, 100%, 65%)",
        error: "hsl(0, 100%, 67%)"
      },
    },
  },
  plugins: [],
} satisfies Config;
