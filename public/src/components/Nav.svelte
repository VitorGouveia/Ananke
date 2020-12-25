<script>
export let titleBar
export let componentsBar

function showDropdown() {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "flex";
    }
}

function showDropdownDark() {
    const dropdownDark = document.querySelector("#dark .dropdown");
    if (dropdownDark.style.display == "flex") {
        dropdownDark.style.display = "none";
    } else {
        dropdownDark.style.display = "flex";
    }
}

</script>

    <nav>
        <header>
            <h1> { titleBar.toUpperCase() } </h1>
            <svg on:click = { showDropdown } class="hamburger" 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </header>

        <div class="dropdown">
            <div class="row">
                <h1> { componentsBar[0].toUpperCase() } </h1>
            </div>
            <div class="row">
                <h1> { componentsBar[1].toUpperCase() } </h1>
            </div>
            <div class="row">
                <h1> { componentsBar[2].toUpperCase() } </h1>
            </div>
            <div class="row">
                <h1> { componentsBar[3].toUpperCase() } </h1>
            </div>
        </div>
    </nav>
    <!-- <nav id="dark">
        <header>
            <h1>INÍCIO</h1>
            <svg on:click = { showDropdownDark } class="hamburger" 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </header>

        <div class="dropdown">
            <div class="row">
                <h1>PROPÓSITO</h1>
            </div>
            <div class="row">
                <h1>ESPAÇO DO ALUNO</h1>
            </div>
            <div class="row">
                <h1>CURSOS TÉCNICOS</h1>
            </div>
            <div class="row">
                <h1>FALE CONOSCO</h1>
            </div>
        </div>
    </nav> -->

<style> 
    nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;
        border-radius: 12px;
        padding: 2%;
        margin: 2% 0;
        align-items: center;
        background: #fff;
        box-shadow: var(--neumorphism-shadow);
    }

    nav header {
        display: flex;
        width: 95%;
        border-radius: 12px;
        padding: 2% 6%;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        box-shadow: inset -6px -6px 18px #ffffff, inset 6px 6px 18px rgba(0, 0, 0, 0.16);
    }

    nav h1 {
        color: var(--vermelho-etec);
        font-size: 3vmax;
        font-family: "Roboto Condensed", sans-serif;
        font-weight: bold;
    }

    nav .hamburger {
        cursor: pointer;
        width: 4vmax;
        color: var(--vermelho-etec);
    }

    nav .dropdown {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    nav .dropdown .row {
        display: flex;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        margin: 1% 0;
        padding: 2% 6%;
        width: 95%;
        border-radius: 12px;
        box-shadow: var(--neumorphism-shadow);
    }

    nav .dropdown .row:active {
        cursor: pointer;
        box-shadow: inset -6px -6px 18px #ffffff, inset 6px 6px 18px rgba(0, 0, 0, 0.16);
    }

    nav#dark {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;
        border-radius: 12px;
        padding: 2%;
        margin: 2% 0;
        align-items: center;
        background: #1b1b1b;
        box-shadow: var(--dark-neumorphism-shadow);
    }

    nav#dark header {
        display: flex;
        width: 95%;
        border-radius: 12px;
        padding: 2% 6%;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        box-shadow: inset -5px -5px 10px rgba(255, 255, 255, 0.05), inset 5px 5px 15px rgba(0, 0, 0, 0.5);
    }

    nav#dark h1 {
        color: var(--laranja-etec);
        font-size: 3vmax;
        font-family: "Roboto Condensed", sans-serif;
        font-weight: bold;
    }

    nav#dark .hamburger {
        cursor: pointer;
        width: 4vmax;
        color: var(--laranja-etec);
    }

    nav#dark .dropdown {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    nav#dark .dropdown .row {
        display: flex;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        margin: 1% 0;
        padding: 2% 6%;
        width: 95%;
        border-radius: 12px;
        box-shadow: var(--dark-neumorphism-shadow);
    }

    nav#dark .dropdown .row:active {
        cursor: pointer;
        box-shadow: inset -5px -5px 10px rgba(255, 255, 255, 0.05), inset 5px 5px 15px rgba(0, 0, 0, 0.5);
    }
</style>