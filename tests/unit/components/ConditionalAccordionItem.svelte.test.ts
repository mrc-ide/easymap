import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import ConditionalAccordionItem from '../../../src/components/ConditionalAccordionItem.svelte';

describe("Conditional Accordion Item", () => {
	const children = createRawSnippet(() => {
		return {
			render: () => "<div>CAI content</div>",
			setup: () => {}
		};
	});
	const header = "Test Header"
	test("renders as expected when open", () => {
		render(ConditionalAccordionItem, {
				props: { open: true, disabled: false, header, children }
			}
		);
		expect(screen.getByRole("button")).toBeVisible(); // expand buton exists
		expect(screen.getByText(header)).toBeVisible();
		expect(screen.getByText(/CAI content/)).toBeVisible();
	});

	test("renders as expected when not open", () => {
		render(ConditionalAccordionItem, {
				props: { open: false, disabled: false, header, children }
			}
		);
		expect(screen.getByRole("button")).toBeVisible(); // expand buton exists
		expect(screen.getByText(header)).toBeVisible();
		expect(screen.queryByText(/CAI content/)).toBeNull();
	});

	test("renders as expected when disabled", () => {
		render(ConditionalAccordionItem, {
				props: { open: false, disabled: true, header, children }
			}
		);
		expect(screen.queryByRole("button")).toBeNull(); // expand buton does not exist
		expect(screen.getByText(header)).toBeVisible();
		expect(screen.queryByText(/CAI content/)).toBeNull();
	});
});