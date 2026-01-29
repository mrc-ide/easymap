<script lang="ts">
import { Label, Radio, Select } from 'flowbite-svelte';
import { store } from '../../store.svelte.ts';
import {
	CountryIdType,
	CountrySettingsType,
	type MultiCountrySettings,
	RegionAdminLevel, RegionIdType,
	type SingleCountrySettings
} from '../../types.ts';
import { stringEnumToSelectItems } from '$lib/utils';

const dataFileColumnItems = $derived(store.dataFile.columns.map((s) => ({
	name: s,
	value: s
})));

const countryIdTypeItems = stringEnumToSelectItems(CountryIdType);

const countryItems = $derived(store.countries.map((c) => ({
	name: c.name,
	value: c.id
})));

// When select new country settings type, need to refresh settings object to default for type
let countrySettingsType = {
	get value() {
		return store.countrySettingsType;
	},
	set value(v) {
		if (v !== store.countrySettingsType) {
			store.countrySettingsType = v;
			if (v === CountrySettingsType.SingleCountry) {
				store.countrySettings = {
					countryISO: null
				} as SingleCountrySettings;
			} else {
				store.countrySettings = {
					countryIdType: CountryIdType.Name,
					countryIdColumn: null
				} as MultiCountrySettings
			}
		}
	}
}

const adminLevelItems = stringEnumToSelectItems(RegionAdminLevel);
const regionIdTypeItems = stringEnumToSelectItems(RegionIdType);

</script>
<Label for="country-settings-type" class="pb-2">The file contains areas for</Label>
<div class="flex">
	<Radio name="country-settings-type"
				 bind:group={countrySettingsType.value}
				 value={CountrySettingsType.SingleCountry}>
			A single country
	</Radio>
	<Radio name="country-settings-type"
				 class="ms-4"
				 bind:group={countrySettingsType.value}
				 value={CountrySettingsType.MultiCountry}>
			Multiple countries
	</Radio>
</div>
{#if countrySettingsType.value === CountrySettingsType.SingleCountry}
  <Label for="country" class="mt-4 py-2">Country column</Label>
	<Select id="country" items={countryItems} bind:value={store.countrySettings.countryISO} />
{:else}
  <Label for="country-id-column" class="mt-4 py-2">Country column</Label>
  <Select id="country-id-column" items={dataFileColumnItems} bind:value={store.countrySettings.countryIdColumn} />

	<Label for="country-id-type" class="mt-4 py-2">Countries are identified by </Label>
	<Select id="country-id-type" items={countryIdTypeItems} bind:value={store.countrySettings.countryIdType} />
{/if}
<Label for="admin-level" class="mt-4 py-2">Region admin level</Label>
<Select id="admin-level" items={adminLevelItems} bind:value={store.regionSettings.adminLevel} />

<Label for="region-id-column" class="mt-4 py-2">Region column</Label>
<Select id="region-id-column" items={dataFileColumnItems} bind:value={store.regionSettings.regionIdColumn} />

<Label for="region-id-type" class="mt-4 py-2">Regions are identified by </Label>
<Select id="region-id-type" items={regionIdTypeItems} bind:value={store.regionSettings.regionIdType} />
