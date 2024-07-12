import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [

    /***funcion para color imagen del input tipo date** */
    plugin(function ({
      addBase,
    }: {
      addBase: (styles: Record<string, any>) => void;
    }) {
      addBase({
        'input[type="date"]::-webkit-calendar-picker-indicator': {},
        "@media (prefers-color-scheme: dark)": {
          'input[type="date"]::-webkit-calendar-picker-indicator': {
            filter: "brightness(0) invert(1)",
          },
        },
      });
    }),
  ],
};
export default config;
