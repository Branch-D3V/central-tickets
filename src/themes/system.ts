import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-gilroy)" },
        heading: { value: "var(--font-gilroy)" },
      },

      colors: {
        brand: {
          50: { value: "#FFF0F7" },
          100: { value: "#FFD6EB" },
          200: { value: "#FFADD6" },
          300: { value: "#FF7AB8" },
          400: { value: "#FF3D99" },
          500: { value: "#FF0080" },
          600: { value: "#C30061" },
        },

        gray: {
          50: { value: "#F7F7F7" },
          100: { value: "#EDEDED" },
          200: { value: "#DADADA" },
          300: { value: "#C4C4C4" },
          400: { value: "#98A8B3" },
          500: { value: "#6C757D" },
          700: { value: "#3A3A3A" },
          900: { value: "#121212" },
        },

        success: {
          500: { value: "#22C55E" },
        },

        warning: {
          500: { value: "#EAB308" },
        },

        error: {
          500: { value: "#E31B23" },
        },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          page: {
            _light: { value: "#F5F5F7" },
            _dark: { value: "#0F0F0F" },
          },
          surface: {
            _light: { value: "#FFFFFF" },
            _dark: { value: "#1A1A1A" },
          },
        },

        fg: {
          default: {
            _light: { value: "#121212" },
            _dark: { value: "#FFFFFF" },
          },
          muted: {
            _light: { value: "#6C757D" },
            _dark: { value: "#A1A1A1" },
          },
        },

        border: {
          default: {
            _light: { value: "#E0E0E0" },
            _dark: { value: "#2A2A2A" },
          },
        },

        primary: {
          default: {
            _light: { value: "{colors.brand.500}" },
            _dark: { value: "{colors.brand.400}" },
          },
          hover: {
            _light: { value: "{colors.brand.600}" },
            _dark: { value: "{colors.brand.300}" },
          },
        },

        disabled: {
          _light: { value: "#BDBDBD" },
          _dark: { value: "#4A4A4A" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, theme);
