<script lang="ts">
	import "../app.css";
	import AppNav from "../components/AppNav.svelte";
	let { children } = $props();
</script>

<AppNav></AppNav>

{@render children()}


