<script lang="ts">
	  import { AccordionItem } from 'flowbite-svelte';
		import type { Snippet } from 'svelte';
		import type { ClassValue } from 'svelte/elements';

	  interface Props {
		    disabled: boolean;
				open: boolean;
				header: string;
				classes: ClassValue;
				children: Snippet;
	  }

		let { disabled, open = $bindable(), header, classes, children }: Props = $props();
</script>

{#if !disabled}
    <AccordionItem bind:open={open} class={classes}>
	      {#snippet header()}{header}{/snippet}
			  {@render children()}
    </AccordionItem>
{:else}
    <h2 class={['group', classes]}>
	      <div class="flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700 border-b p-5 border-s border-e group-first:border-t bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-white">
			      {header}
		    </div>
    </h2>
{/if}