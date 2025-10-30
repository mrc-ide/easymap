import { describe, expect, test, vi } from "vitest";
import LoadFile from "../../../../src/components/ProjectSetup/LoadFile.svelte";
import { render, screen } from '@testing-library/svelte';

describe("LoadFile", () => {
	test("displays file input", () => {
		render(LoadFile);
		const input = screen.getByLabelText("Select a data file (csv or single sheet Excel file).");
		expect(input).toBeEnabled();
	});

	//test("uploads file");

	//test("displays columns from valid data file");

	//test("displays load file warning");

	//test("displays load file error");
});