<script>
    import { page } from "$app/state";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
    import { store } from "../store.svelte.js";
    import { resolve } from "$app/paths";
</script>

<Navbar rounded class="navbar" color="form" fluid="true">
    <NavBrand href={resolve("/")}>
        <span class="text-primary-600 pb-2 text-xl font-bold whitespace-nowrap dark:text-white">
            {store.appConfig?.appTitle || "EasyMap"}
        </span>
    </NavBrand>
    <NavHamburger />
    <NavUl activeUrl={page.url.pathname}>
        <NavLi href={resolve("/")}>Home</NavLi>
        <NavLi href={resolve("/about")}>About</NavLi>
    </NavUl>
</Navbar>
