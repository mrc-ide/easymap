import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { init } from "../../src/hooks.client";
import { groutSuccessResponse } from "./utils";

const mockConfig = {
    appTitle: "Test Title",
    groutUrl: "https://mock-grout",
    groutDataset: "mock-dataset"
};

const mockCountries = [{ id: "AFG", name: "Afghanistan" }];
const configHandler = http.get("./easymap.config.json", () => {
    return HttpResponse.json(mockConfig);
});

const server = setupServer(
    configHandler,
    http.get("https://mock-grout/region-metadata/mock-dataset/admin0", () => {
        return HttpResponse.json(groutSuccessResponse(mockCountries));
    })
);

const { mockSetError, mockSetConfig, mockSetCountries } = vi.hoisted(() => ({
    mockSetError: vi.fn(),
    mockSetConfig: vi.fn(),
    mockSetCountries: vi.fn()
}));

vi.mock("../../src/store.svelte.ts", () => {
    const mockStore = {
        errors: {}
    };
    Object.defineProperty(mockStore.errors, "fetch", { set: mockSetError });
    Object.defineProperty(mockStore, "appConfig", { set: mockSetConfig, get: () => mockConfig });
    Object.defineProperty(mockStore, "countries", { set: mockSetCountries });
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

    test("init fetches config and countries and updates store", async () => {
        await init();
        expect(mockSetConfig).toHaveBeenCalledTimes(1);
        expect(mockSetConfig.mock.calls[0][0]).toStrictEqual(mockConfig);
        expect(mockSetCountries).toHaveBeenCalledTimes(1);
        expect(mockSetCountries.mock.calls[0][0]).toStrictEqual(mockCountries);
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
        expect(mockSetError).toHaveBeenCalledWith("Error fetching from ./easymap.config.json");
        expect(mockSetCountries).not.toHaveBeenCalled();
    });

    test("init does not set countries if fetch fails", async () => {
        server.use(
            configHandler,
            http.get("https://mock-grout/region-metadata/mock-dataset/admin0", () => {
                return HttpResponse("oh no", { status: 500 });
            })
        );
        await init();
        expect(mockSetConfig).toHaveBeenCalled();
        expect(mockSetError).toHaveBeenCalledWith(
            "Error fetching from https://mock-grout/region-metadata/mock-dataset/admin0"
        );
        expect(mockSetCountries).not.toHaveBeenCalled();
    });
});
