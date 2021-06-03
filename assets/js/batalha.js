const buttonDarDano = document.getElementById('buttonDarDano');
const buttonTomarDano = document.getElementById('buttonTomarDano');

buttonDarDano.addEventListener('click', (evento) => {
    const pokemonAdversario = document.getElementById('pokemonAdversario');
    pokemonAdversario.classList.add('animacao__piscar');

    let hp = document.getElementById("hp-adversario");
    hpAtual = parseInt(hp.style.width);

    // gera um numero randomico de dano
    let dano = Math.floor(Math.random() * 25) + 1;
    let hpAtualizado = hpAtual - dano;

    console.log(`deu dano de ${dano}`);

    // Verifica se a pontuação do adversario é menor que 0
    if(hpAtualizado <= 0) {
        alert('você ganhou');
        // adiciona a classe de animação que o pokemon sai
        const pokemonAdversarioImagem = document.querySelector('.batalha__pokemonImagem-adversario');
        pokemonAdversarioImagem.classList.remove("animacao_enter_from_right");
        pokemonAdversarioImagem.classList.add("animacao_exit_to_right");

        hpAtualizado = 0;
    }

    // atualiza o hp do inimigo
    hp.setAttribute('style', `width: ${hpAtualizado}%`);

    setTimeout(() => {
        pokemonAdversario.classList.remove('animacao__piscar');
    }, 1000);

});

buttonTomarDano.addEventListener('click', (evento) => {
    const pokemonAdversario = document.getElementById('meuPokemon');
    pokemonAdversario.classList.toggle('animacao__piscar');
});