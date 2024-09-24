<script>
    import { goto } from '$app/navigation';
</script>

<main>
    <h1>Welcome to My Website</h1>
    <p>Check out the Go game by clicking the button below.</p>
    <button on:click={() => goto('/go')}>Go to Go Game</button>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }
    button {
        padding: 10px 20px;
        font-size: 18px;
    }
</style>