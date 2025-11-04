import type { AppConfig } from "./types";
import { ProjectDialog } from "./types";
import type { DataFile } from "$lib/DataFile";
import { SvelteSet } from "svelte/reactivity";

export interface StoreErrors {
    fetch?: string;
    loadFile?: string;
}

export interface StoreWarnings {
    loadFile?: string;
}

export interface Store {
    errors: StoreErrors;
    warnings: StoreWarnings;
    appConfig: null | AppConfig;
    openProjectDialog: null | ProjectDialog;
    enabledProjectDialogs: Set<ProjectDialog>;
    dataFile: null | DataFile;
}

export const store: Store = $state({
    errors: {},
    warnings: {},
    appConfig: null,
    openProjectDialog: ProjectDialog.Setup,
    enabledProjectDialogs: new SvelteSet<ProjectDialog>([ProjectDialog.Setup]),
    dataFile: null
});
