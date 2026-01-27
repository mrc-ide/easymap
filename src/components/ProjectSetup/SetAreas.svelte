<script lang="ts">
import { Label, Radio, Select } from 'flowbite-svelte';
import { store } from '../../store.svelte.ts';
import { CountryIdType, CountrySettingsType, type MultiCountrySettings, type SingleCountrySettings } from '../../types.ts';

const dataFileColumnItems = $derived(store.dataFile.columns.map((s) => ({
	name: s,
	value: s
})));

const countryIdTypeItems = [
	{ name: "Name", value: CountryIdType.Name },
	{ name: "ISO3", value: CountryIdType.ISO3 }
];

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

	<Label for="country-id-column" class="mt-4 py-2">Countries are identified by </Label>
	<Select id="country-id-column" items={countryIdTypeItems} bind:value={store.countrySettings.countryIdType} />
{/if}

<div class="mt-6">{JSON.stringify(store.countrySettings)}</div>
