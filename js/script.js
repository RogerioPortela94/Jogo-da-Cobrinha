const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const box = 20;
canvas.width = 400;
canvas.height = 400;

// Estado inicial
let cobra = [{ x: 200, y: 200 }];
let direcao = "RIGHT";
let comida = { x: getRandomPosicao(), y: getRandomPosicao() };
let score = 0;
let isPause = false;

// Gera uma posição aleatória dentro do canvas
function getRandomPosicao() {
    return Math.floor(Math.random() * (canvas.width / box)) * box;
}

// Desenha a cobra
function desenharCobra() {
    cobra.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Desenha a comida
function denharComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, box, box);
}

// Movimenta a cobra
function movimentoCobra() {
    const cabeca = { ...cobra[0] };

    if (direcao === "RIGHT") cabeca.x += box;
    if (direcao === "LEFT") cabeca.x -= box;
    if (direcao === "UP") cabeca.y -= box;
    if (direcao === "DOWN") cabeca.y += box;

    cobra.unshift(cabeca);

    // Verifica se comeu a comida
    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        score++;
        comida = { x: getRandomPosicao(), y: getRandomPosicao() }; // Reposiciona a comida
    } else {
        cobra.pop(); // Remove a cauda se não comer
    }
}

// Verifica colisões
function checkColisao() {
    const head = cobra[0];

    // Colisão com bordas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("Game Over! Pontuação: "+score);
        resetGame();
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < cobra.length; i++) {
        if (head.x === cobra[i].x && head.y === cobra[i].y) {
            alert("Game Over! Pontuação:"+score);
            resetGame();
        }
    }
}

// Reinicia o jogo
function resetGame() {
    cobra = [{ x: 200, y: 200 }];
    direcao = "RIGHT";
    comida = { x: getRandomPosicao(), y: getRandomPosicao() };
    score = 0;
}

// Atualiza a direção com base no teclado
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {isPause = !isPause;}
    if (event.key === "ArrowRight" && direcao !== "LEFT") direcao = "RIGHT";
    if (event.key === "ArrowLeft" && direcao !== "RIGHT") direcao = "LEFT";
    if (event.key === "ArrowUp" && direcao !== "DOWN") direcao = "UP";
    if (event.key === "ArrowDown" && direcao !== "UP") direcao = "DOWN";
});

//Mensagem quando o jogo está pausado
function pauseMensagem(){
    if(isPause){
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Jogo Pausado", canvas.width / 2, canvas.height / 2);
    }
}

// Loop do jogo
function gameLoop() {
    
    if(isPause == false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        denharComida();
        desenharCobra();
        movimentoCobra();
        checkColisao();
    }
    pauseMensagem();
    setTimeout(gameLoop, 100);
}

// Inicia o jogo
gameLoop();
