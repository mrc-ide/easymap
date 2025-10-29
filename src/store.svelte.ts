import type { AppConfig } from './types';
import { ProjectDialog } from './types';

export interface Store {
    error: null | string;
    appConfig: null | AppConfig;
		openProjetDialog: null | ProjectDialog;
		enabledProjectDialogs: Set<ProjectDialog>;
}

export const store: Store = $state({
    error: null,
    appConfig: null,
	  openProjetDialog: ProjectDialog.Setup,
	  enabledProjectDialogs: new Set<ProjectDialog>([ProjectDialog.Setup])
});
