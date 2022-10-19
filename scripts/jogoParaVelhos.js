// função para guardar o nome dos jogadores no sessionStorage
function guardaPlayers() {
    let myForm = document.forms["playersForm"];
    sessionStorage.setItem("jogador1", myForm["jogador1"].value);
    sessionStorage.setItem("jogador2", myForm["jogador2"].value);
    window.sessionStorage.setItem("jogador1", myForm["jogador1"].value);
    window.sessionStorage.setItem("jogador2", myForm["jogador2"].value);
    window.location = "jogo.html";
}

// Função para carregar os nomes dos jogadores do sessionStorage
// apenas para teste
function carregaPLayers() {
    let jogadores = window.sessionStorage.getItem("jogador1") +
        " vs " + window.sessionStorage.getItem("jogador2");

    document.getElementById("jogadores").innerHTML = jogadores;
}

// DOM para o jogo da velha
window.addEventListener('DOMContentLoaded', () => {
    // constantes
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const mostraPLayerDaVez = document.querySelector('.mostraPlayerDaVez');

    // variáveis para o jogo da velha
    var tabuleiro = ['', '', '', '', '', '', '', '', ''];

    // sorteia o jogador que começa
    jogadorAtual = Math.random() < 0.5 ? 'X' : 'O';

    // flag para saber se o jogo acabou
    let flagJogo = true;

    // constantes para os jogadores vencedores
    const JOGADOR1_VENCEU = "JOGADOR1_VENCEU";
    const JOGADOR2_VENCEU = "JOGADOR2_VENCEU";
    const EMPATE = "EMPATE";

    // combinações vencedoras
    const alinhamentoVencedor = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // função para verificar se o jogo acabou
    function validaResultado() {
        let rodadaVencida = false;
        for (let i = 0; i <= 7; i++) {
            const alinhamento = alinhamentoVencedor[i];
            const a = tabuleiro[alinhamento[0]];
            const b = tabuleiro[alinhamento[1]];
            const c = tabuleiro[alinhamento[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                rodadaVencida = true;
                break;
            }
        }

        if (rodadaVencida) {
            announce(jogadorAtual === 'X' ? JOGADOR1_VENCEU : JOGADOR2_VENCEU);
            flagJogo = false;
            return;
        }

        if (!tabuleiro.includes(''))
            announce(EMPATE);
    }

    // função para anunciar o resultado do jogo
    const announce = (type) => {
        switch (type) {
            // jogador 1 = vermelho
            // jogador 2 = azul
            // empate = amarelo
            case JOGADOR1_VENCEU:
                announcer.innerHTML = "<h2 style='color:red;'>" + sessionStorage.getItem("jogador1") + " venceu!</h2>";
                break;
            case JOGADOR2_VENCEU:
                announcer.innerHTML = "<h2 style='color:blue;'>" + sessionStorage.getItem("jogador2") + " venceu!</h2>";
                break;
            case EMPATE:
                announcer.innerHTML = "<h2 style='color:yellow;'>Empate!</h2>";
                break;
            default:
                break;
        }
        announcer.classList.remove('hide');
    };

    // função para validar a jogada
    const validaJogada = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    // função para atualizar o tabuleiro
    const updateTabuleiro = (index) => {
        tabuleiro[index] = jogadorAtual;
    }

    // função para trocar o jogador atual
    const trocaJogador = () => {
        playerDisplay.classList.remove(`player${jogadorAtual}`);
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        playerDisplay.innerText = jogadorAtual;
        playerDisplay.classList.add(`player${jogadorAtual}`);
        if (jogadorAtual === 'X') {
            mostraPLayerDaVez.innerHTML = "<h2 style='color:green;'>Vez de </h2>" + "<h2 style='color:red;'> " + sessionStorage.getItem("jogador1") + "</h2>";
        } else {
            mostraPLayerDaVez.innerHTML = "<h2 style='color:green;'>Vez de </h2>" + "<h2 style='color:blue;'> " + sessionStorage.getItem("jogador2") + "</h2>";
        }

    }

    // função para marcar a jogada no tabuleiro
    const marcarJogada = (tile, index) => {
        if (validaJogada(tile) && flagJogo) {
            tile.innerText = jogadorAtual;
            tile.classList.add(`player${jogadorAtual}`);
            updateTabuleiro(index);
            validaResultado();
            trocaJogador();
        }
    }

    // função para resetar o jogo
    const reiniciarTabuleiro = () => {
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        flagJogo = true;
        announcer.classList.add('hide');
        // função para sortear quem começa o jogo
        jogadorAtual = Math.random() < 0.5 ? 'X' : 'O';
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => marcarJogada(tile, index));
    });

    resetButton.addEventListener('click', reiniciarTabuleiro);

    playerDisplay.classList.add(`player${jogadorAtual}`);
    playerDisplay.innerText = jogadorAtual;

    // verificar o jogador da vez armazenado em playerDisplay
    mostraPLayerDaVez.innerHTML = playerDisplay.innerText;

    // 

});
