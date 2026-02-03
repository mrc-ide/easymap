import { store } from "../store.svelte";

export const doFetch = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        store.errors.fetch = `Error fetching from ${url}`;
    }
    const json = await response.json();
    return { ok: response.ok, json };
};

// convert an enum with string values into a list of items for a select item
// NB this will not work for enum with numeric values as entries are duplicated
export const stringEnumToSelectItems = (senum: object) => {
    return Object.entries(senum).map((e) => ({ name: e[0], value: e[1] }));
};
