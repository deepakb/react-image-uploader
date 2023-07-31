import { Config } from "tailwindcss";

import { appPreset } from "./lib/app-preset";

const config = {
  presets: [appPreset],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
