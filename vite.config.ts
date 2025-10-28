import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],

    test: {
        projects: [
            {
                extends: "./vite.config.ts",
                plugins: [svelteTesting()],
                test: {
                    name: "client",
                    environment: "jsdom",
                    clearMocks: true,
                    include: ["tests/unit/**/**.{test,spec}.{js,ts}"],
                    setupFiles: ["./vitest-setup-client.ts"]
                }
            }
        ]
    },
		resolve: {
			// Bit of hacky grossness to get around "Error:  No known conditions for "./node" specifier in "msw" package"
			// which crept in for some reason
			alias: [
				{ find: "msw/node", replacement: "/node_modules/msw/lib/native/index.mjs"}
			],
			conditions: process.env.VITEST ? ["browser"] : undefined
		}
});
