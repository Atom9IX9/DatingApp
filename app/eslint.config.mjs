import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "**/*.scss",
      "**/*.css",
      "scripts/**",
      "coverage/**",
    ],
  },
  js.configs.recommended,
  ...nextVitals,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx,d.ts,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
      import: importPlugin,
      boundaries: boundariesPlugin,
    },

    settings: {
      "import/resolver": {
        typescript: {},
      },

      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/**/*" },
        { type: "entities", pattern: "src/entities/**/*" },
        { type: "features", pattern: "src/features/**/*" },
        { type: "widgets", pattern: "src/widgets/**/*" },
        { type: "processes", pattern: "src/processes/**/*" },
        { type: "root", pattern: "src/root/**/*" },
        { type: "app", pattern: "src/app/**/*" },
      ],
    },

    rules: {
      "no-console": "warn",

      "prettier/prettier": "error",

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "shared",
              allow: ["shared"],
            },

            {
              from: "entities",
              allow: ["shared", "entities"],
            },

            {
              from: "features",
              allow: ["shared", "entities", "features"],
            },

            {
              from: "widgets",
              allow: ["shared", "entities", "features", "widgets"],
            },

            {
              from: "processes",
              allow: ["shared", "entities", "features", "widgets", "processes"],
            },

            {
              from: "root",
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "processes",
                "root",
              ],
            },

            {
              from: "app",
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "processes",
                "root",
                "app",
              ],
            },
          ],
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/entities/*/*",
                "@/features/*/*",
                "@/widgets/*/*",
                "@/processes/*/*",
                "@/root/*/*",

                "!@/entities/*/index",
                "!@/entities/*/client",
                "!@/entities/*/server",

                "!@/features/*/index",
                "!@/features/*/client",
                "!@/features/*/server",

                "!@/widgets/*/index",
                "!@/widgets/*/client",
                "!@/widgets/*/server",

                "!@/processes/*/index",
                "!@/processes/*/client",
                "!@/processes/*/server",

                "!@/root/*/index",
                "!@/root/*/client",
                "!@/root/*/server",
              ],
              message: "Use Public API only (index/client/server)",
            },
          ],
        },
      ],

      "import/no-cycle": "error",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
]);
