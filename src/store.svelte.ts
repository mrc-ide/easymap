import type { AppConfig } from './types';
import { ProjectDialog } from './types';
import type { DataFile } from '$lib/DataFile';

export interface Store {
    error: null | string;
    appConfig: null | AppConfig;
		openProjectDialog: null | ProjectDialog;
		enabledProjectDialogs: Set<ProjectDialog>;
		dataFile: null | DataFile;
}

export const store: Store = $state({
    error: null,
    appConfig: null,
	  openProjectDialog: ProjectDialog.Setup,
	  enabledProjectDialogs: new Set<ProjectDialog>([ProjectDialog.Setup]),
	  dataFile: null
});


