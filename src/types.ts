export interface AppConfig {
    appTitle: string;
}

export enum ProjectDialog {
    Setup,
    Download
}

export enum CountrySettingsType {
    SingleCountry,
    MultiCountry
}

export enum CountryIdType {
    ISO3,
    Name
}

export interface SingleCountrySettings {
    countryISO: string | null
}

export interface MultiCountrySettings {
    countryIdType: CountryIdType,
    countryIdColumn: string | null
}

export type CountrySettings = SingleCountrySettings | MultiCountrySettings;

export enum RegionAdminLevel {
    Admin1,
    Admin2
}

export enum RegionIdType {
    GADM,
    Name
}

export interface RegionSettings {
    adminLevel: RegionAdminLevel,
    regionIdType: RegionIdType,
    regionIdColumn: string | null
}