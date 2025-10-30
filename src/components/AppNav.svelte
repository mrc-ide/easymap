<script>
    import { page } from "$app/state";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
    import { store } from "../store.svelte.js";
    import { resolve } from "$app/paths";
</script>

<Navbar rounded class="navbar" color="form">
    <NavBrand href={resolve('/')}>
        <span class="self-center text-xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
            {store.appConfig?.appTitle || "EasyMap"}
        </span>
    </NavBrand>
    <NavHamburger />
    <NavUl activeUrl={page.url.pathname}>
        <NavLi href={resolve('/')}>Home</NavLi>
        <NavLi href={resolve('/about')}>About</NavLi>
    </NavUl>
</Navbar>
