<script lang="ts">
	import { Fileupload, Label } from "flowbite-svelte";
	import { DataFile } from "$lib/DataFile";
	import { store } from '../../store.svelte';

	const loadFile = async (e) => {
		const file = e.target.files[0];
		const data = await file.arrayBuffer();
		const dataFile = new DataFile(data);
		store.dataFile = dataFile;
		// TODO: Error handling
	};
</script>

<Label>Select a data file (csv or single sheet Excel file).</Label>
<Fileupload accept=".csv, .xls, .xlsx" onchange={loadFile} />
{#if store.dataFile}
	<p>Loaded file with columns: {store.dataFile.columns}.</p>
{/if}