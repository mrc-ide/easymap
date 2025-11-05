import type { AppConfig } from "./types";

export interface Store {
    error: null | string;
    appConfig: null | AppConfig;
}

export const store: Store = $state({
    error: null,
    appConfig: null
});
