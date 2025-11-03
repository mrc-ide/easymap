<script lang="ts">
	import { Fileupload, Label, Helper } from "flowbite-svelte";
	import { DataFile } from "$lib/DataFile";
	import { store } from '../../store.svelte';

	const loadFile = async (e) => {
		// TODO: set better filtype on upload component
		const file = e.target.files[0];
		const data = await file.arrayBuffer();
		const dataFile = new DataFile(data);
		store.dataFile = dataFile.loadError ? null : dataFile;
		store.errors.loadFile = dataFile.loadError;
		store.warnings.loadFile = dataFile.loadWarning;
	};
</script>

<div>
<Label for="file-select">Select a data file (csv or single sheet Excel file).</Label>
<Fileupload id="file-select" accept=".csv, .xls, .xlsx" onchange={loadFile} class="my-2" />
{#if store.errors.loadFile}
	<Helper class="text-red-600">File load error: {store.errors.loadFile}</Helper>
{:else if store.warnings.loadFile}
	<Helper class="text-orange-600">File load warning: {store.warnings.loadFile}</Helper>
{:else if store.dataFile}
	<Helper>Loaded file with columns: {store.dataFile.columns.join(", ")}.</Helper>
{/if}
</div>