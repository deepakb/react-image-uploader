import svgToDataUri from "mini-svg-data-uri";
import plugin from "tailwindcss/plugin";

export const appPlugin = plugin(
  function ({ addBase, addVariant, matchUtilities, addUtilities, theme }) {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "0 0% 93.33%",
        "--card": "0 0% 100%",
        "--card-foreground": "210 17% 16%",
        "--muted": "185 100% 36%",
        "--muted-foreground": "210 17% 36%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "210 17% 16%",
        "--border": "185 100% 36%",
        "--input": "185 100% 36%",
        "--primary": "210 17% 16%",
        "--primary-foreground": "185 100% 56%",
        "--secondary": "185 100% 36%",
        "--secondary-foreground": "210 17% 16%",
        "--accent": "185 100% 36%",
        "--accent-foreground": "210 17% 16%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "185 100% 56%",
        "--ring": "185 100% 36%",
        "--radius": "0.5rem",
      },
      ".dark": {
        "--background": "0 0% 10%",
        "--foreground": "210 17% 36%",
        "--card": "214, 17%, 26%",
        "--card-foreground": "0, 0%, 100%",
        "--muted": "185 100% 16%",
        "--muted-foreground": "210 17% 6%",
        "--accent": "220 9% 6%",
        "--accent-foreground": "185 100% 56%",
        "--popover": "0 0% 10%",
        "--popover-foreground": "220 9% 6%",
        "--border": "220 9% 6%",
        "--input": "220 9% 6%",
        "--primary": "185 100% 56%",
        "--primary-foreground": "210 17% 2%",
        "--secondary": "210 17% 16%",
        "--secondary-foreground": "185 100% 56%",
        "--destructive": "0 63% 11%",
        "--destructive-foreground": "185 100% 56%",
        "--ring": "220 9% 6%",
        "--radius": "0.5rem",
      },
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',
      },
    }),
      addVariant(
        "supports-backdrop-blur",
        "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
      );
    addVariant("supports-scrollbars", "@supports selector(::-webkit-scrollbar)");
    addVariant("children", "& > *");
    addVariant("scrollbar", "&::-webkit-scrollbar");
    addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
    addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");

    let backgroundSize = "7.07px 7.07px";
    let backgroundImage = (color: string) =>
      `linear-gradient(135deg, ${color} 10%, transparent 10%, transparent 50%, ${color} 50%, ${color} 60%, transparent 60%, transparent 100%)`;
    let colors = Object.entries(theme("backgroundColor")!).filter(
      ([, value]) => typeof value === "object" && value[400] && value[500]
    );
    addUtilities(
      Object.fromEntries(
        colors.map(([name, colors]) => {
          let backgroundColor = colors[400] + "1a"; // 10% opacity
          let stripeColor = colors[500] + "80"; // 50% opacity

          return [
            `.bg-stripes-${name}`,
            {
              backgroundColor,
              backgroundImage: backgroundImage(stripeColor),
              backgroundSize,
            },
          ];
        })
      )
    );
    addUtilities({
      ".bg-stripes-white": {
        backgroundImage: backgroundImage("rgba(255 255 255 / 0.75)"),
        backgroundSize,
      },
    });
    addUtilities({
      ".ligatures-none": {
        fontVariantLigatures: "none",
      },
    });
  },
  {
    theme: {
      screens: {
        tablet: "960px",
        desktop: "1248px",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      extend: {
        fontSize: {
          mini: ["12px", { lineHeight: "16px", letterSpacing: "-0.03em" }],
        },
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          hover: {
            from: { scale: "100%" },
            to: { scale: "125%" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          hover: "hover 0.6s ease-in-out",
        },
      },
    },
  }
);
