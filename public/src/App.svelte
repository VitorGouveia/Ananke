<script>
  const name = "pwa";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <title>svelte pwa template</title>
</svelte:head>

<main>
  <h1>hello {name}!</h1>
  <img src="/assets/android-chrome-192x192.png" alt="svelte_icon" />
</main>
