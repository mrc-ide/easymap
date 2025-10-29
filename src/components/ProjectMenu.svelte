<script lang="ts">
	import { Listgroup } from "flowbite-svelte";
	let itemList = ["Setup", "Download"];
</script>

<Listgroup items={itemList} class="w-48" />