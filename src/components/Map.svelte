<div id="map" class="map"></div>

<script lang="ts">
	import { onMount } from "svelte";
	import "leaflet/dist/leaflet.css"; // This doesn't work when imported in the <style> tag

	let map;
	let L;

	onMount(async () => {
		// Dynamically import the leaflet library to resolve CSR requirements (window global)
		L = await import("leaflet");
		map = L.map("map", {
			maxBoundsViscosity: 1.0 // prevent any dragging outside max bounds
		}).setView({ lon: 0, lat: 0 }, 3);
		map.options.minZoom = 3;
		map.setMaxBounds(map.getBounds());

		// Background layer
		const attribution = "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ; " +
				"Boundaries: <a href='https://gadm.org' target='_blank'>GADM</a> version 4.1";
		const layerSource =
			// eslint-disable-next-line max-len
			"https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
		L.tileLayer(layerSource, {
			attribution,
		}).addTo(map);
	});
</script>

