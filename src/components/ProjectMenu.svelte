<script lang="ts">
	import { Listgroup } from 'flowbite-svelte';
	import { CogOutline, DownloadOutline } from 'flowbite-svelte-icons';
	import { ProjectDialog } from '../types';
	import { store } from '../store.svelte.js';

	// TODO: make these a bit bigger with Listgroupitems
	let buttons = $derived([
		{
			Icon: CogOutline,
			dialog: ProjectDialog.Setup,
			disabled: !store.enabledProjectDialogs.has(ProjectDialog.Setup),
			"aria-label": "Set up project"
		},
		{
			Icon: DownloadOutline,
			dialog: ProjectDialog.Download,
			disabled: !store.enabledProjectDialogs.has(ProjectDialog.Download),
			"aria-label": "Download data"
		}
	]);
	const handleClick = (e) => {
		// toggle related dialog
		const dialog = e.detail.dialog;
		if (store.openProjectDialog === dialog) {
			store.openProjectDialog = null;
		} else if (store.enabledProjectDialogs.has(dialog)) {
			store.openProjectDialog = dialog;
		}
	};
</script>

<Listgroup active items={buttons} onclick={handleClick} class="absolute top-20 left-4 w-14 z-9999" />
