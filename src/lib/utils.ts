import { store } from '../store.svelte';

export const doFetch = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		store.errors.fetch = `Error fetching from ${url}`;
	}
	const json = await response.json();
	return {ok: response.ok, json}
}