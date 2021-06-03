const buttonDarDano = document.getElementById('buttonDarDano');
const buttonTomarDano = document.getElementById('buttonTomarDano');
let vitoria = undefined;

buttonDarDano.addEventListener('click', () => {
    // função atualiza o hp (sua vez)
    atualizaHp(0);
    if(vitoria == 0 || vitoria == 1) {
        return false;
    }
    // Passa a vez para o adversario
    vezAdversario();
});

function vezAdversario() {
    // executa a função de atualizar o hp depois de 2 segundos
    setTimeout(() => {
        // função atualiza o hp (vez do adversario)
        atualizaHp(1);
    }, 2000);
}

function atualizaHp(adversario) {

    if (adversario) {
        
        let hp = document.getElementById("hp-proprio");

        const pokemonAdversario = document.getElementById('meuPokemon');
        pokemonAdversario.classList.add('animacao__piscar');

        hpAtual = parseInt(hp.style.width);

        // gera um numero randomico de dano
        let dano = Math.floor(Math.random() * 25) + 1;
        let hpAtualizado = hpAtual - dano;

        console.log(`tomou dano de ${dano}`);

        // Verifica se a pontuação do adversario é menor que 0
        if(hpAtualizado <= 0) {

            console.log('você perdeu');
            vitoria = 0;

            // adiciona a classe de animação que o pokemon sai
            const pokemonAdversarioImagem = document.querySelector('.batalha__pokemonImagem-proprio');
            pokemonAdversarioImagem.classList.remove("animacao_enter_from_left");
            pokemonAdversarioImagem.classList.add("animacao_exit_to_left");

            hpAtualizado = 0;
        }

        // atualiza o hp do inimigo
        hp.setAttribute('style', `width: ${hpAtualizado}%`);

        setTimeout(() => {
            pokemonAdversario.classList.remove('animacao__piscar');
        }, 1000);

    } else {

        let hp = document.getElementById("hp-adversario");

        const pokemonAdversario = document.getElementById('pokemonAdversario');
        pokemonAdversario.classList.add('animacao__piscar');

        hpAtual = parseInt(hp.style.width);

        // gera um numero randomico de dano
        let dano = Math.floor(Math.random() * 25) + 1;
        let hpAtualizado = hpAtual - dano;

        console.log(`deu dano de ${dano}`);

        // Verifica se a pontuação do adversario é menor que 0
        if(hpAtualizado <= 0) {

            console.log('você ganhou');
            vitoria = 1;

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

    }

}