<script lang="ts">
	import { Fileupload, Label } from "flowbite-svelte";
	import { store } from '../../store.svelte';

	const loadFile = (e) => {
		console.log("loading file");
	};
</script>

<Label>Select a data file (csv or single sheet Excel file).</Label>
<Fileupload accept=".csv, .xls, .xlsx" onchange={loadFile} />