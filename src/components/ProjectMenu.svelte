<script lang="ts">
	import { Listgroup } from 'flowbite-svelte';
	import { CogOutline, DownloadOutline } from 'flowbite-svelte-icons';
	import { ProjectDialog } from '../types';
	import { store } from '../store.svelte.js';

	let buttons = $derived([
		{ Icon: CogOutline, dialog: ProjectDialog.Setup, disabled: !store.enabledProjectDialogs.has(ProjectDialog.Setup) },
		{ Icon: DownloadOutline, dialog: ProjectDialog.Download, disabled: !store.enabledProjectDialogs.has(ProjectDialog.Download) }
	]);
	const handleClick = (e) => {
		// toggle related dialog
		const dialog = e.detail.dialog;
		if (store.openProjetDialog === dialog) {
			store.openProjetDialog = null;
		} else if (store.enabledProjectDialogs.has(dialog)) {
			store.openProjetDialog = dialog;
		}
	};
</script>

<Listgroup active items="{buttons}" onclick={handleClick} class="absolute top-20 left-4 w-14 z-9999" />
