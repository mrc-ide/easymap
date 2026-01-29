import type { AppConfig, CountrySettings, MultiCountrySettings, RegionSettings } from './types';
import { CountrySettingsType, ProjectDialog, RegionAdminLevel, RegionIdType } from './types';
import type { DataFile } from '$lib/DataFile';
import { SvelteSet } from 'svelte/reactivity';

export interface StoreProblems {
    fetch?: string;
    loadFile?: string;
}

export interface LatLng {
    lat: number,
    lng: number
}

export interface Store {
    errors: StoreProblems;
    warnings: StoreProblems;
    appConfig: null | AppConfig;
    countries: {
        id: string,
        name: string,
        bounds: {
            min: LatLng,
            max: LatLng
        }
    }[];
    openProjectDialog: null | ProjectDialog;
    enabledProjectDialogs: Set<ProjectDialog>;
    dataFile: null | DataFile;
    countrySettingsType: CountrySettingsType;
    countrySettings: CountrySettings;
    regionSettings: RegionSettings;
}

export const store: Store = $state({
    errors: {},
    warnings: {},
    appConfig: null,
    openProjectDialog: ProjectDialog.Setup,
    enabledProjectDialogs: new SvelteSet<ProjectDialog>([ProjectDialog.Setup]),
    dataFile: null,
    countrySettingsType: CountrySettingsType.SingleCountry,
    countrySettings: {
        countryISO: null
    },
    regionSettings: {
        adminLevel: RegionAdminLevel.Admin1,
        regionIdType: RegionIdType.Name,
        regionIdColumn: null
    }
});

// When the user uploads a new data file having already chosen settings in the context of a previous
// file, we will try to retain any column references from the previous file, but will remove any which
// are no longer possible because the new file does not have those columns
export const updateSettingsForNewDataFile = () => {
    const newColumns = store.dataFile?.columns;
    if (store.countrySettingsType == CountrySettingsType.MultiCountry) {
        const multiCountrySettings = store.countrySettings as MultiCountrySettings;
        const countryIdCol = multiCountrySettings.countryIdColumn;
        if (countryIdCol && !newColumns?.includes(countryIdCol)) {
            multiCountrySettings.countryIdColumn = null;
        }
    }

    const regionIdCol = store.regionSettings.regionIdColumn;
    if (regionIdCol && !newColumns?.includes(regionIdCol)) {
        store.regionSettings.regionIdColumn = null;
    }
}
