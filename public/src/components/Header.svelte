<script>
export let frases

const shuffle = Array => {
    let randomIndex = Math.floor(Math.random() * Math.floor(Array.lenght))
    return Array[randomIndex]
}

let shuffled = shuffle(frases)

</script>

<header>
    <div class="hero">
        <div class="separador separador1"></div>
        <svg class="etecLogo"
            version="1.0" 
            xmlns="http://www.w3.org/2000/svg" 
            width="81" 
            height="81" 
            viewBox="0 0 1000 1000" 
            preserveAspectRatio="xMidYMid meet">
            <g id="layer101" fill="#820024" stroke="none">
                <path d="M477 965 c-9 -19 -19 -63 -23 -98 l-6 -64 -97 -17 c-116 -20 -114 -20 -173 -18 -41 2 -48 5 -48 22 0 25 44 125 59 134 17 11 13 26 -7 26 -38 0 -90 -49 -124 -117 -29 -59 -33 -77 -32 -141 1 -76 9 -92 47 -92 9 0 22 11 28 24 7 15 17 22 28 19 9 -2 77 -10 151 -17 l135 -12 -120 -8 c-119 -7 -244 -21 -277 -32 -24 -7 -23 -49 1 -60 17 -8 146 -163 334 -403 26 -33 47 -69 47 -81 0 -46 45 -4 55 52 7 36 9 38 45 38 36 0 38 -2 45 -37 10 -58 55 -99 55 -52 0 26 353 471 382 481 14 6 18 15 16 35 -3 27 -6 28 -83 40 -44 6 -136 15 -205 19 l-125 8 135 12 c74 7 143 15 153 18 12 3 21 -3 28 -20 7 -20 15 -25 36 -22 24 3 29 9 36 48 11 63 1 119 -34 190 -31 61 -85 110 -121 110 -20 0 -24 -15 -8 -25 16 -10 48 -77 55 -118 l7 -37 -48 -2 c-61 -2 -59 -2 -175 18 l-96 17 -6 56 c-7 63 -29 133 -43 138 -6 2 -18 -12 -27 -32z m-15 -236 c7 -50 69 -49 76 0 3 22 6 22 110 16 150 -8 212 -15 212 -24 0 -16 -60 -33 -204 -58 l-151 -25 -135 21 c-179 28 -246 48 -227 67 4 4 57 10 119 14 201 12 196 13 200 -11z m-350 -241 c8 -7 41 -51 73 -98 32 -47 72 -105 90 -130 37 -52 53 -80 38 -65 -9 9 -139 177 -207 268 -28 36 -25 49 6 25z m801 0 c-6 -7 -60 -79 -122 -160 -62 -82 -114 -148 -117 -148 -2 0 17 30 43 68 25 37 71 103 101 147 55 80 78 105 95 105 6 0 6 -5 0 -12z m-718 -30 c28 -39 165 -273 165 -281 0 -5 -45 60 -100 143 -55 82 -100 153 -100 155 0 13 21 3 35 -17z m560 -117 c-48 -72 -89 -131 -92 -131 -3 0 5 17 17 38 13 20 45 76 72 125 44 76 75 113 86 102 2 -1 -36 -62 -83 -134z m-428 102 l82 -17 21 -48 c20 -46 20 -49 4 -148 -10 -55 -21 -100 -26 -100 -4 0 -8 5 -8 12 0 6 -38 78 -85 160 -47 82 -85 151 -85 154 0 6 9 5 97 -13z m443 11 c0 -7 -156 -284 -174 -309 -12 -16 -14 -10 -25 59 -15 104 -14 149 5 189 15 31 23 35 88 49 80 18 106 21 106 12z m-240 -29 c0 -11 -24 -55 -31 -55 -4 0 -12 14 -18 30 -10 29 -9 30 20 30 16 0 29 -2 29 -5z m-11 -195 c6 -28 11 -53 11 -55 0 -7 -45 -6 -52 0 -7 8 13 105 22 105 5 0 13 -23 19 -50z"/>
            </g>
            <g id="layer102" fill="#f68933" stroke="none">
                <path d="M235 604 c-92 -9 -206 -25 -220 -30 -22 -9 -18 -49 4 -60 17 -8 146 -163 334 -403 26 -33 47 -69 47 -81 0 -46 45 -4 55 53 7 35 9 37 45 37 36 0 38 -2 45 -37 10 -58 55 -99 55 -52 0 26 353 471 382 481 14 6 18 15 16 35 -3 27 -7 29 -83 41 -77 12 -597 24 -680 16z m-123 -116 c8 -7 41 -51 73 -98 32 -47 72 -105 90 -130 37 -52 53 -80 38 -65 -9 9 -139 177 -207 268 -28 36 -25 49 6 25z m801 0 c-6 -7 -60 -79 -122 -160 -62 -82 -114 -148 -117 -148 -2 0 17 30 43 68 25 37 71 103 101 147 55 80 78 105 95 105 6 0 6 -5 0 -12z m-718 -30 c28 -39 165 -273 165 -281 0 -5 -45 60 -100 143 -55 82 -100 153 -100 155 0 13 21 3 35 -17z m560 -117 c-48 -72 -89 -131 -92 -131 -3 0 5 17 17 38 13 20 45 76 72 125 44 76 75 113 86 102 2 -1 -36 -62 -83 -134z m-428 102 l82 -17 21 -48 c20 -46 20 -49 4 -148 -10 -55 -21 -100 -26 -100 -4 0 -8 5 -8 12 0 6 -38 78 -85 160 -47 82 -85 151 -85 154 0 6 9 5 97 -13z m443 11 c0 -7 -156 -284 -174 -309 -12 -16 -14 -10 -25 59 -15 104 -14 149 5 189 15 31 23 35 88 49 80 18 106 21 106 12z m-240 -29 c0 -11 -24 -55 -31 -55 -4 0 -12 14 -18 30 -10 29 -9 30 20 30 16 0 29 -2 29 -5z m-11 -195 c6 -28 11 -53 11 -55 0 -7 -45 -6 -52 0 -7 8 13 105 22 105 5 0 13 -23 19 -50z"/>
            </g>  
        </svg>
        <h1>ETEC JORNALISTA ROBERTO MARINHO</h1>
        <h2> { shuffled } </h2>
        <div class="icons">
            <svg class="youtube"
                xmlns="http://www.w3.org/2000/svg"
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#fff" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <path 
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>

            <svg class="twitter"
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#fff" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>

            <svg class="instagram"
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#fff" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>

            <svg class="facebook"
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#fff" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
        </div>
        <div class="separador separador2"></div>
    </div>
</header>

<style>
header {
    display: flex;
    width: 80%;
    margin: 2% 0;
    padding: 2% 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    border-radius: 12px;
    box-shadow: var(--neumorphism-shadow);
}

header .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    flex-direction: column;
    background-image: url('../../../assets/etecjrm.jpg');
    background-position: center;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05), 5px 5px 15px rgba(0, 0, 0, 0.5);
}

header .hero .separador {
    width: 100%;
    padding: 1%;
    border-radius: 12px;
    background: var(--vermelho-etec);
}

header .hero .separador1 {
    margin-top: -1%;
    margin-bottom: 1%;
}

header .hero .separador2 {
    margin-bottom: -1%;
    margin-top: 1%;
}

header .hero h1, h2 {
    font-family: 'Roboto Condensed', sans-serif;
    color: #fff;
    font-weight: bold;
    margin: 1%;
}

header .hero h1 {
    font-size: 36px;
    word-spacing: 1px;
}


header .hero .etecLogo {
    margin: 1%;
}

header .hero .icons {
    display: flex;
    flex-direction: row;
    width: 35%;
    justify-content: space-evenly;
}

header .hero .icons .facebook {
    margin-left: -2%;
}

header .hero .icons svg:hover {
    cursor: pointer; 
}
</style>