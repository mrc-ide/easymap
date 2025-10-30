import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { init } from "../../src/hooks.client";

const mockConfig = { appTitle: "Test Title" };
const server = setupServer(
    http.get("./easymap.config.json", () => {
        return HttpResponse.json(mockConfig);
    })
);

const { mockSetError, mockSetConfig } = vi.hoisted(() => ({
    mockSetError: vi.fn(),
    mockSetConfig: vi.fn()
}));

vi.mock("../../src/store.svelte.ts", () => {
    const mockStore = {
			errors: {}
		};
    Object.defineProperty(mockStore.errors, "fetch", { set: mockSetError });
    Object.defineProperty(mockStore, "appConfig", { set: mockSetConfig });
    return { store: mockStore };
});

describe("Client hooks", () => {
    beforeEach(async () => {
        vi.clearAllMocks();
        await server.listen();
    });

    afterEach(async () => {
        await server.close();
    });

    test("init fetches config and updates store", async () => {
        await init();
        expect(mockSetConfig).toHaveBeenCalledTimes(1);
        expect(mockSetConfig.mock.calls[0][0]).toStrictEqual(mockConfig);
        expect(mockSetError).not.toHaveBeenCalled();
    });

    test("init sets error if cannot fetch config", async () => {
        server.use(
            http.get("./easymap.config.json", () => {
                return HttpResponse("oh no", { status: 500 });
            })
        );
        await init();
        expect(mockSetConfig).not.toHaveBeenCalled();
        expect(mockSetError).toHaveBeenCalledWith("Error fetching app config");
    });
});
