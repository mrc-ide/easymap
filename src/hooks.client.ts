import type { ClientInit } from "@sveltejs/kit";
import { store } from "./store.svelte";
import type { AppConfig } from "./types";

export const init: ClientInit = async () => {
    // TODO: consider fetch wrapper with generic error handling
    const response = await fetch("./easymap.config.json");
    if (!response.ok) {
        store.errors.fetch = "Error fetching app config";
    } else {
        store.appConfig = (await response.json()) as AppConfig;
    }
};
