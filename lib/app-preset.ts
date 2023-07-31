import type { Config } from "tailwindcss";

import { appPlugin } from "./app-plugin";

export const appPreset = {
  darkMode: "class",
  content: [],
  plugins: [appPlugin],
} satisfies Config;
