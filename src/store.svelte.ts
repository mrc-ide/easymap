import type { AppConfig, CountrySettings, RegionSettings } from './types';
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
