import { onMount } from "svelte";
import { writable } from "svelte/store";

let storedTheme;
onMount(() => {
    const tmp = window.localStorage.getItem("theme");
    if(storedTheme) {
        storedTheme = tmp;
    }
})

function storeTheme() {
    window.localStorage.setItem("theme", storeTheme);
}
export const theme = writable(storedTheme);