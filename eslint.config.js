import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        ignores: ["eslint.config.js", "svelte.config.js"],

        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                svelteConfig
            }
        }
    },
    {
        rules: {
            quotes: ["error", "double", { avoidEscape: true }],
            "max-len": [2, 120, 4],
            "arrow-body-style": "off",
            "import/prefer-default-export": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "no-plusplus": "off",
            "no-shadow": "off",
            "@typescript-eslint/no-shadow": ["error"],
            "no-underscore-dangle": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error"],
            "no-await-in-loop": "off",
            "no-useless-concat": "off"
        }
    },
    {
        files: ["**/*.test.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-empty-function": "off",
            "max-classes-per-file": "off",
            "no-useless-constructor": "off"
        }
    }
);
