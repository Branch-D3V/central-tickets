import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-gilroy)" },
        heading: { value: "var(--font-gilroy)" },
      },
      colors: {
        primary: {
          500: { value: "#0C0813" },
        },
        background: {
          page: { value: "#F5F5F7" },
          surface: { value: "#FFFFFF" },
        },
        accent: {
          1: {
            value: "#F5F5F7",
          },
          2: {
            value: "#FF99CC",
          },
        },
        gray: {
          400: { value: "#98A8B3" },
          500: { value: "#6C757D" },
        },
        success: {
          500: { value: "#28A745" },
        },
        warning: {
          500: { value: "#EAB208" },
        },
        error: {
          500: { value: "#E31B23" },
        },
        border: {
          default: { value: "#98A8B3" },
        },
        disabled: {
          500: { value: "#6C757D" },
        },
        white: {
          DEFAULT: { value: "#FFFFFF" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, theme);
