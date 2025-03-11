<script lang="ts">
	import '../app.css';
	import AppNav from '../components/AppNav.svelte';
	let { children } = $props();
	export const prerender = true;
	export const ssr = false;
</script>

<AppNav></AppNav>

{@render children()}


