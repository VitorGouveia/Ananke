<script>
    import Nav from './components/Nav.svelte'
    import Header from './components/Header.svelte'
    import Index from './views/Index.svelte'
</script>

<Nav barTitle = { 'início' } barComponents = { ['história', 'espaço do aluno', 'cursos técnicos', 'fale conosco'] } />
<Header frases = { ['ATRÁVES DO CONHECIMENTO, CONSQUISTA-SE O MUNDO', 'EXEMPLO', 'MAIS UM EXEMPLO'] } />
<Index />