<script lang="ts">
    import { Modal, Accordion, AccordionItem, Button } from "flowbite-svelte";
    import { store } from "../../store.svelte";
    import { ProjectDialog, ProjectSetupAccItem } from "../../types";
    import LoadFile from "./LoadFile.svelte";
    import SetAreas from './SetAreas.svelte';
    import ConditionalAccordionItem from '../ConditionalAccordionItem.svelte';

    let isOpen = $derived(store.openProjectDialog == ProjectDialog.Setup);
    const openAccItems = $state({
        [ProjectSetupAccItem.OpenFile]: true,
        [ProjectSetupAccItem.SetAreas]: false
    });

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
        <AccordionItem bind:open={openAccItems[ProjectSetupAccItem.OpenFile]}>
            {#snippet header()}1. Open file{/snippet}
            <div class="grid">
                <LoadFile />
                <Button disabled={!store.dataFile} onclick={() => openAccItems[ProjectSetupAccItem.SetAreas] = true} class="justify-self-end">Next</Button>
            </div>
        </AccordionItem>
        <ConditionalAccordionItem disabled={!store.dataFile} header="2. Set areas" bind:open={openAccItems[ProjectSetupAccItem.SetAreas]}>
            <SetAreas />
        </ConditionalAccordionItem>
    </Accordion>
</Modal>


