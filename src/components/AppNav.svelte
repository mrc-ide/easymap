<script>
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { store } from '../store.svelte.js';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
      { store.appConfig?.appTitle }
    </span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl activeUrl={page.url.pathname} {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
	</NavUl>
</Navbar>
