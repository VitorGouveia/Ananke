<script>
 import Nav from './components/Nav.svelte'
 import Header from './components/Header.svelte'
 import Index from './pages/Index.svelte'
</script>

<svelte:head>
  <title>etec jrm pwa | Svelte</title>
</svelte:head>


<Nav titleBar = { 'início' } componentsBar = { ['propósito', 'espaço do aluno', 'cursos técnicos', 'fale conosco'] } />
<Header />
<Index />

    
<style>
    :global(*) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, sans-serif;
        box-sizing: border-box;
    }

    :global(:root) {
        --vermelho-etec: #820024;
        --laranja-etec: #f68b37;
        --neumorphism-shadow: -6px -6px 18px rgba(255, 255, 255, 0.3),
            6px 6px 18px rgba(0, 0, 0, 0.16);
        --dark-neumorphism-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
    }

    :global(body) {
        width: 100%;
        height: 100%;
        background: #dedede;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>