fetchKantoPokemon();

function fetchKantoPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                renderPokemonCards(pokemon);
            })
        })
}

function renderPokemonCards(pokemon) {
    let content = `<div class="pokemon__nome">${pokemon.name}</div>`;

    // Criando o elemento pai
    let div = document.createElement('div');
    div.classList.add('pokemon__card', 'pokemon__card--pokeball');
    div.setAttribute("id", pokemon.name);
    div.innerHTML = content;

    let sectionPokemon = document.querySelector('.container');
    sectionPokemon.appendChild(div);

    // faz o fetch dos pokemons
    fetchPokemonData(pokemon, pokemon.name);
}

function fetchPokemonData(pokemon, id) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {

            console.log(pokeData);

            // Carrega o numero do pokemon
            let pokemonNumero = document.createElement('div');
            pokemonNumero.setAttribute('class', 'pokemon__numero');
            pokemonNumero.innerText = `#${leftFillNum(pokeData.id, 3)}`;

            // Carrega a imagem do pokemon
            let pokemonImagem = document.createElement('a');
            pokemonImagem.setAttribute('href', 'pokemon.html?pokemon=' + pokeData.name);
            pokemonImagem.setAttribute('class', 'pokemon__imagem');
            pokemonImagem.innerHTML = `<img src="${pokeData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}" alt="imagem ${id}">`;

            // Criando os tipos
            let pokeTypes = document.createElement('div');
            pokeTypes.classList.add('pokemon__tipos');
            createTypes(pokeData.types, pokeTypes);

            // Encontra a div do pokemon e carrega o DOM criado
            let cardPokemon = document.querySelector(`#${id}`);
            cardPokemon.appendChild(pokemonNumero);
            cardPokemon.appendChild(pokemonImagem);
            cardPokemon.appendChild(pokeTypes);

            //Carrega a cor do card do pokemon
            let cssCardColor = pokeData.types[0].type.name;
            cardPokemon.classList.add(`pokemon__card--${cssCardColor}`);
        })
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