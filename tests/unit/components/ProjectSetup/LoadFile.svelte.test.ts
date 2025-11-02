import { beforeEach, describe, expect, test, vi } from 'vitest';
import LoadFile from "../../../../src/components/ProjectSetup/LoadFile.svelte";
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { getTestFile } from './utils';
import type { DataFile } from '$lib/DataFile';

const { mockSetDataFile } = vi.hoisted(() => ({
	mockSetDataFile: vi.fn()
}));
describe("LoadFile", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.mock("../../../../src/store.svelte.ts", () => {
			const mockStore = {
				errors: {},
				warnings: {}
			};
			Object.defineProperty(mockStore, "dataFile", { set: mockSetDataFile });
			return { store: mockStore };
		});
	});

	test("displays file input", () => {
		render(LoadFile);
		const input = screen.getByLabelText("Select a data file (csv or single sheet Excel file).");
		expect(input).toBeEnabled();
	});

	test("uploads csv file", async () => {
    const file = getTestFile("example_data.csv");
		render(LoadFile);
		const input = screen.getByLabelText("Select a data file (csv or single sheet Excel file).");
		fireEvent.change(input, {
			target: { files: [file] },
		});
		await waitFor(() => expect(mockSetDataFile).toHaveBeenCalled());
		const dataFile = mockSetDataFile.mock.calls[0][0] as DataFile;
		expect(dataFile.columns).toStrictEqual(["region", "value"])
	});

   // test("uploads xlsx file");

  // test("uploads xls file");

	//test("displays columns from valid data file");

	//test("displays load file warning");

	//test("displays load file error");
});