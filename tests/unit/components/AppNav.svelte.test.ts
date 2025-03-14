import { render, screen } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import AppNav from "../../../src/components/AppNav.svelte";

describe("AppNav", () => {
	test("renders as expected", async () => {
		render(AppNav);
		const home = screen.getByRole("link", {name: "Home"});
		expect(home).toBeEnabled();
		expect(home).toHaveAttribute("href", "/");

		const about = screen.getByRole("link", {name: "About"});
		expect(about).toBeEnabled();
		expect(about).toHaveAttribute("href", "/about");
	});
});