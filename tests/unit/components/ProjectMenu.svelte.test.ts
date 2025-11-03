import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ProjectMenu from '../../../src/components/ProjectMenu.svelte';
import { ProjectDialog } from '../../../src/types';
import { store } from '../../../src/store.svelte';

describe("ProjectMenu", () => {
	test("sets openProjectDialog in store", async () => {
		 store.enabledProjectDialogs = new Set<ProjectDialog>([ ProjectDialog.Setup, ProjectDialog.Download ]);
     render(ProjectMenu);
		 const buttons = screen.getAllByRole("button");
		 expect(buttons.length).toBe(2);

		 await userEvent.click(buttons.at(1));
		 await waitFor(() => expect(store.openProjectDialog).toBe(ProjectDialog.Download));

		await userEvent.click(buttons.at(0));
		await waitFor(() => expect(store.openProjectDialog).toBe(ProjectDialog.Setup));

		// Should toggle off if dialog already open
		await userEvent.click(buttons.at(0));
		await waitFor(() => expect(store.openProjectDialog).toBe(null));
	});

	test("disabled buttons whose dialog is not enabled", () => {
		store.enabledProjectDialogs = new Set<ProjectDialog>([ ProjectDialog.Setup ]);
		render(ProjectMenu);
		const buttons = screen.getAllByRole("button");
		expect(buttons[0]).toBeEnabled();
		expect(buttons[1]).not.toBeEnabled();
	});
});