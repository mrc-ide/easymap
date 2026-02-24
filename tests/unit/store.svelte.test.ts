import { beforeEach, describe, test, expect } from "vitest";
import { store, updateSettingsForNewDataFile } from "../../src/store.svelte";
import { CountryIdType, CountrySettingsType, MultiCountrySettings } from "../../src/types";

describe("updateSettingsForNewDataFile", () => {
    beforeEach(() => {
        store.countrySettingsType = CountrySettingsType.MultiCountry;
        store.countrySettings = {
            countryIdType: CountryIdType.ISO3,
            countryIdColumn: "oldCol3"
        };
        store.regionSettings.regionIdColumn = "oldCol1";
    });

    test("retains columns settings when they are still present in file", () => {
        store.dataFile = {
            columns: ["oldCol1", "oldCol2", "oldCol3"]
        } as any;
        updateSettingsForNewDataFile();
        expect((store.countrySettings as MultiCountrySettings).countryIdColumn).toBe("oldCol3");
        expect(store.regionSettings.regionIdColumn).toBe("oldCol1");
    });

    test("resets column settings when they are not present in file", () => {
        store.dataFile = {
            columns: ["newCol1", "newCol2", "newCol3"]
        } as any;
        updateSettingsForNewDataFile();
        expect((store.countrySettings as MultiCountrySettings).countryIdColumn).toBeNull();
        expect(store.regionSettings.regionIdColumn).toBeNull();
    });
});
