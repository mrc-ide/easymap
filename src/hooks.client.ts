import type { ClientInit } from "@sveltejs/kit";
import { store } from "./store.svelte";
import type { AppConfig } from "./types";
import { doFetch } from '$lib/utils';

export const init: ClientInit = async () => {
    let configRes = await doFetch("./easymap.config.json");
    if (!configRes.ok) return
    store.appConfig = configRes.json as AppConfig;
    const {groutUrl, groutDataset} = store.appConfig;
    let countriesRes = await doFetch(`${groutUrl}/region-metadata/${groutDataset}/admin0`);
    if (countriesRes.ok) {
        store.countries = countriesRes.json.data;
    }
}
