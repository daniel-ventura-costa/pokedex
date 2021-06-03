const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonName = urlParams.get('pokemon');

// faz o fetch dos pokemons
fetchPokemonData(pokemonName);

function fetchPokemonData(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {

            // console.log(pokeData);

            // Carrega a cor do header
            let cssCardColor = pokeData.types[0].type.name;
            const cabecalhoPokemonDiv = document.querySelector('.pokemon__cabecalho');
            cabecalhoPokemonDiv.classList.add(`pokemon__card--${cssCardColor}`);

            // Seta a imagem do pokemon
            document.getElementById('pokemon__imagem').src = pokeData['sprites']['other']['official-artwork']['front_default'];
            document.getElementById('sprite_front').src = pokeData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            document.getElementById('sprite_back').src = pokeData['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];

            // Seta o nome do pokemon
            const pokemonName = document.querySelector('.pokemon__nome');
            pokemonName.innerText = pokeData.name;

            // Seta o numero do pokemon
            const pokemonNumero = document.querySelector('.pokemon__numero');
            pokemonNumero.innerText = `#${leftFillNum(pokeData.id, 3)}`;

            const pokemonStatusDiv = document.querySelector('.pokemon__status');

            // Seta os status do pokemon
            createStats(pokeData.stats, pokemonStatusDiv)

            // Criando os tipos
            let pokemonTiposDiv = document.querySelector('.pokemon__tipos');
            createTypes(pokeData.types, pokemonTiposDiv);

            // Busca as vantagens e desvantagens
            advantages(pokeData.types);
        })
}

function createStats(pokemonStats, pokemonStatusDiv) {
    pokemonStats.forEach(stat => {

        const pokemonMedidor = document.createElement('div');
        pokemonMedidor.setAttribute('class', 'pokemon__medidor');

        const statName = document.createElement('div');
        statName.setAttribute('class', 'status');
        statName.innerText = stat.stat.name;

        const barraProgresso = document.createElement('div');
        barraProgresso.setAttribute('class', 'barra-progresso');
        barraProgresso.innerHTML = `<span class="barra-progresso-preenchimento" style="width: ${stat.base_stat}%"> ${stat.base_stat}</span>`;

        pokemonMedidor.appendChild(statName);
        pokemonMedidor.appendChild(barraProgresso);

        pokemonStatusDiv.appendChild(pokemonMedidor);
    });
}

function createTypes(types, ul) {
    types.forEach(function (type) {

        let typeLi = document.createElement('div');
        typeLi.classList.add('pokemon__tipo');
        typeLi.innerText = type['type']['name'];

        let cssType = `pokemon__tipo--${type['type']['name']}`;
        typeLi.classList.add(cssType);

        ul.append(typeLi)
    })
}

function advantages(types) {
    types.forEach(typeObject => {
       
        // usar a fetch api
        console.log(typeObject.type.url);
    });
}