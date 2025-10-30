import type { AppConfig } from './types';
import { ProjectDialog } from './types';

export interface Store {
    error: null | string;
    appConfig: null | AppConfig;
		openProjectDialog: null | ProjectDialog;
		enabledProjectDialogs: Set<ProjectDialog>;
}

export const store: Store = $state({
    error: null,
    appConfig: null,
	  openProjectDialog: ProjectDialog.Setup,
	  enabledProjectDialogs: new Set<ProjectDialog>([ProjectDialog.Setup])
});
