<script lang="ts">
    import { Modal, Accordion, AccordionItem } from "flowbite-svelte";
    import { store } from "../../store.svelte";
    import { ProjectDialog } from "../../types";
    import LoadFile from "./LoadFile.svelte";

    let isOpen = $derived(store.openProjectDialog == ProjectDialog.Setup);
    const handleClose = () => {
        store.openProjectDialog = null;
    };
</script>

<Modal
    title="Set up your EasyMap project."
    bind:open={isOpen}
    modal={false}
    size="md"
    class="absolute top-20 left-24 z-9999 m-0"
    onclose={handleClose}
>
    <Accordion>
        <AccordionItem open>
            {#snippet header()}1. Open file{/snippet}
            <LoadFile />
        </AccordionItem>
    </Accordion>
</Modal>
