export interface AppConfig {
    appTitle: string;
    groutUrl: string;
    groutDataset: string;
}

export enum ProjectDialog {
    Setup,
    Download
}

export enum ProjectSetupAccItem {
    OpenFile,
    SetAreas
}

export enum CountrySettingsType {
    SingleCountry,
    MultiCountry
}

export enum CountryIdType {
    ISO3 = "iso3",
    Name = "name"
}

export interface SingleCountrySettings {
    countryISO: string | null;
}

export interface MultiCountrySettings {
    countryIdType: CountryIdType;
    countryIdColumn: string | null;
}

export type CountrySettings = SingleCountrySettings | MultiCountrySettings;

export enum RegionAdminLevel {
    Admin1 = "admin1",
    Admin2 = "admin2"
}

export enum RegionIdType {
    GADM = "gadm",
    Name = "name"
}

export interface RegionSettings {
    adminLevel: RegionAdminLevel;
    regionIdType: RegionIdType;
    regionIdColumn: string | null;
}
