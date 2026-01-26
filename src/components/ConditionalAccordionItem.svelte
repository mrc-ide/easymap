<script lang="ts">
	  import { AccordionItem } from 'flowbite-svelte';
		import type { Snippet } from 'svelte';

	  interface Props {
		    disabled: boolean;
				header: string;
				children: Snippet;
	  }

		let { disabled, header, children }: Props = $props();
</script>

{#if !disabled}
    <AccordionItem>
	      {#snippet header()}{header}{/snippet}
			  {@render children()}
    </AccordionItem>
{:else}
    <h2 class="group">
	      <div class="flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700 border-b p-5 border-s border-e group-first:border-t bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-white">
			      {header}
		    </div>
    </h2>
{/if}