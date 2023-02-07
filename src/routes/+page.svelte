<script>
    import {onMount}from 'svelte'
    import {writable} from 'svelte/store'
    let test
    let token = testFunc()
    let filmType;
    let dataLoc;
    let error = '';
    let username = "Bite";
    let password = "password123";
    let theme
    let plzWork

    function toggleToken(newToken){
        plzWork = newToken
        localStorage.setItem("token",plzWork)
    }
    
    onMount(()=>{
        plzWork = localStorage.getItem("token") || token;
    })

    function toggleTheme(newTheme){
        theme = newTheme
        localStorage.setItem("theme",theme)
    }

    $: isDark = theme == "dark"

    onMount(()=>{
        theme = localStorage.getItem("theme") || "light"
    })
    

    onMount(async()=>{
        const response = await fetch('https://localhost:3000')
        const data = await response.json()
        test = data.message
    })
    
    async function testFunc() {
        const response = await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'Bite',
                password: 'password123'
            })
        })

        const data = await response.json()
        token = data.jwt

        if(typeof localStorage !== "undefined"){
            toggleToken(token)
        }
        return token
    }

    onMount(async ()=>{
        token = await testFunc();
        const response = await fetch("http://localhost:3000/locations",
        {
            headers:{
                'Authorization':`Bearer ${token}`
            },
        })
        dataLoc = await response.json()
        filmType = dataLoc.filmType
        console.log(filmType)
    })
    console.log(token)
</script>
    <h1>Web App 2033 - {theme} - {plzWork}</h1>
    <button on:click={()=> toggleTheme('light')}>Light Theme</button>
    <button on:click={()=> toggleTheme('dark')}>Dark Theme</button>
    <button on:click={()=> toggleTheme('token Down')}>Token Down</button>
    
{#if dataLoc}
{#each dataLoc as item (item._id)}
        <h4>{test} +++ {item.filmType}</h4>
        {/each}
    {:else}
    <h4>{test} +++ LIGMA</h4>
{/if}
<h1>Ton foutu Token JWT : {token}</h1>
<!--{:else}
    <div class = "index">
        <h1>Welcome Stalker</h1>
        <p>Take a seat near the camp fire</p>
    </div> -->


<style>
    .index {
        text-align: center;
        display: block;
        margin: 20px auto;
        color: #000080;
    }
</style>