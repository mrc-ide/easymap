<script lang="ts">
	import { Listgroup, ListgroupItem } from 'flowbite-svelte';
	import { CogOutline, DownloadOutline } from 'flowbite-svelte-icons';
	import { ProjectDialog } from '../types';
	import { store } from '../store.svelte.js';

	const handleClick = (dialog) => {
		if (store.openProjectDialog === dialog) {
			store.openProjectDialog = null;
		} else if (store.enabledProjectDialogs.has(dialog)) {
			store.openProjectDialog = dialog;
		}
	};
</script>

<Listgroup active onclick={handleClick} class="absolute top-20 left-4 w-18 z-9999">
	<ListgroupItem dialog={ProjectDialog.Setup}
								 disabled={!store.enabledProjectDialogs.has(ProjectDialog.Setup)}
								 aria-label="Download data"
								 onclick={() => handleClick(ProjectDialog.Setup)}>
		<CogOutline size="xl"></CogOutline>
	</ListgroupItem>
	<ListgroupItem dialog={ProjectDialog.Download}
								 disabled={!store.enabledProjectDialogs.has(ProjectDialog.Download)}
	               aria-label="Download data"
								 onclick={() => handleClick(ProjectDialog.Download)}>
		<DownloadOutline size="xl"></DownloadOutline>
	</ListgroupItem>
</Listgroup>
