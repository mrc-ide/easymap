import { beforeEach, describe, expect, test, vi } from "vitest";
import { within } from "@testing-library/dom";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import {
    CountryIdType,
    CountrySettingsType,
    MultiCountrySettings,
    RegionAdminLevel,
    RegionIdType,
    SingleCountrySettings
} from "../../../../src/types";
import SetAreas from "../../../../src/components/ProjectSetup/SetAreas.svelte";
import { store } from "../../../../src/store.svelte.ts";

describe("Set Areas", () => {
    beforeEach(() => {
        vi.mock("../../../../src/store.svelte.ts", () => {
            const testStore = $state({
                countrySettingsType: CountrySettingsType.SingleCountry,
                countrySettings: {
                    countryISO: null
                },
                regionSettings: {
                    adminLevel: RegionAdminLevel.Admin1,
                    regionIdType: RegionIdType.Name,
                    regionIdColumn: null
                },
                countries: [
                    { name: "Country 1", id: "C1" },
                    { name: "Country 2", id: "C2" }
                ],
                dataFile: {
                    columns: ["Column 1", "Column 2"]
                }
            });
            return {
                store: testStore
            };
        });
    });

    const setup = () => {
        render(SetAreas);
        return userEvent.setup();
    };

    const expectSelectOptions = (select: HTMLSelectElement, expectedOptions: { name: string; value: string }[]) => {
        const allOptions = within(select).getAllByRole("option");
        expect(allOptions.length).toBe(expectedOptions.length + 1);
        expect(allOptions[0]).toHaveValue(""); // empty unselected option
        expectedOptions.forEach((option, idx) => {
            expect(allOptions[idx + 1]).toHaveValue(option.value);
            expect(allOptions[idx + 1].innerHTML).toBe(option.name);
        });
    };

    test("binds country settings type correctly", async () => {
        const user = setup();
        const singleCountryRadio = screen.getByLabelText(/A single country/);
        const multiCountryRadio = screen.getByLabelText(/Multiple countries/);
        expect(singleCountryRadio.checked).toBe(true);
        expect(multiCountryRadio.checked).toBe(false);
        await user.click(multiCountryRadio);
        expect(singleCountryRadio.checked).toBe(false);
        expect(multiCountryRadio.checked).toBe(true);
        expect(store.countrySettingsType).toBe(CountrySettingsType.MultiCountry);
        // Hides single country controls and show multi country controls
        expect(screen.queryByLabelText("Country")).toBeNull();
        expect(screen.getByLabelText(/Country column/)).toBeVisible();
        expect(screen.getByLabelText(/Countries are identified by/)).toBeVisible();

        await user.click(singleCountryRadio);
        expect(singleCountryRadio.checked).toBe(true);
        expect(multiCountryRadio.checked).toBe(false);
        expect(store.countrySettingsType).toBe(CountrySettingsType.SingleCountry);
        // Hides multi country controls and shows single country controls
        expect(screen.getByLabelText("Country")).toBeVisible();
        expect(screen.queryByLabelText(/Country column/)).toBeNull();
        expect(screen.queryByLabelText(/Countries are identified by/)).toBeNull();
    });

    test("binds country correctly", async () => {
        const user = setup();
        const countrySelect = screen.getByLabelText("Country");
        expectSelectOptions(countrySelect, [
            { name: "Country 1", value: "C1" },
            { name: "Country 2", value: "C2" }
        ]);
        await user.selectOptions(countrySelect, countrySelect.options[2]);
        expect((store.countrySettings as SingleCountrySettings).countryISO).toBe("C2");
    });

    test("binds country id column correctly", async () => {
        const user = setup();
        const multiCountryRadio = screen.getByLabelText(/Multiple countries/);
        await user.click(multiCountryRadio);
        const countryIdColSelect = screen.getByLabelText(/Country column/);
        expectSelectOptions(countryIdColSelect, [
            { name: "Column 1", value: "Column 1" },
            { name: "Column 2", value: "Column 2" }
        ]);
        await user.selectOptions(countryIdColSelect, countryIdColSelect.options[1]);
        expect((store.countrySettings as MultiCountrySettings).countryIdColumn).toBe("Column 1");
    });

    test("binds country id type correctly", async () => {
        const user = setup();
        const multiCountryRadio = screen.getByLabelText(/Multiple countries/);
        await user.click(multiCountryRadio);
        const countryIdTypeSelect = screen.getByLabelText(/Countries are identified by/);
        expectSelectOptions(countryIdTypeSelect, [
            { name: "ISO3", value: "iso3" },
            { name: "Name", value: "name" }
        ]);
        await user.selectOptions(countryIdTypeSelect, countryIdTypeSelect.options[2]);
        expect((store.countrySettings as MultiCountrySettings).countryIdType).toBe(CountryIdType.Name);
    });

    test("binds admin level correctly", async () => {
        const user = setup();
        const adminLevelSelect = screen.getByLabelText(/Region admin level/);
        expectSelectOptions(adminLevelSelect, [
            { name: "Admin1", value: "admin1" },
            { name: "Admin2", value: "admin2" }
        ]);
        await user.selectOptions(adminLevelSelect, adminLevelSelect.options[2]);
        expect(store.regionSettings.adminLevel).toBe(RegionAdminLevel.Admin2);
    });

    test("binds region id column correctly", async () => {
        const user = setup();
        const regionIdColSelect = screen.getByLabelText(/Region column/);
        expectSelectOptions(regionIdColSelect, [
            { name: "Column 1", value: "Column 1" },
            { name: "Column 2", value: "Column 2" }
        ]);
        await user.selectOptions(regionIdColSelect, regionIdColSelect.options[2]);
        expect(store.regionSettings.regionIdColumn).toBe("Column 2");
    });

    test("binds region id type correctly", async () => {
        const user = setup();
        const regionIdTypeSelect = screen.getByLabelText(/Regions are identified by/);
        expectSelectOptions(regionIdTypeSelect, [
            { name: "GADM", value: "gadm" },
            { name: "Name", value: "name" }
        ]);
        await user.selectOptions(regionIdTypeSelect, regionIdTypeSelect.options[2]);
        expect(store.regionSettings.regionIdType).toBe(RegionIdType.Name);
    });
});
