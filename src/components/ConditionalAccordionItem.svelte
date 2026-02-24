<script lang="ts">
    import { AccordionItem } from "flowbite-svelte";
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";

    interface Props {
        disabled: boolean;
        open: boolean;
        title: string;
        classes: ClassValue;
        children: Snippet;
    }

    let { disabled, open = $bindable(), title, classes, children }: Props = $props();
</script>

{#if !disabled}
    <AccordionItem bind:open class={classes}>
        {#snippet header()}{title}{/snippet}
        {@render children()}
    </AccordionItem>
{:else}
    <h2 class={["group", classes]}>
        <div
            class="flex w-full items-center justify-between border-s border-e border-b border-gray-200 bg-gray-100
            p-5 text-left font-medium text-gray-400 group-first:rounded-t-xl group-first:border-t dark:border-gray-700
            dark:bg-gray-800 dark:text-white"
        >
            {title}
        </div>
    </h2>
{/if}
