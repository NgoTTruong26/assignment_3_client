import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"
import { theme } from "./src/styles/theme"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        default: "1400px",
      },
      padding: {
        default: "24px",
      },
      margin: {
        default: "24px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(theme)],
}
export default config
