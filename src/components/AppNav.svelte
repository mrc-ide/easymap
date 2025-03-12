<script>
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { store } from '../store.svelte.js';
	import { base } from '$app/paths';
</script>

<Navbar rounded class="navbar" color="form" let:hidden let:toggle>
	<NavBrand href="{base}/">
		<span class="self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
      { store.appConfig?.appTitle }
    </span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl activeUrl={page.url.pathname} {hidden}>
		<NavLi href="{base}/" active={true}>Home</NavLi>
		<NavLi href="{base}/about">About</NavLi>
	</NavUl>
</Navbar>

