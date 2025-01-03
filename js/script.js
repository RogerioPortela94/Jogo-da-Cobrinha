const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const box = 20;
canvas.width = 400;
canvas.height = 400;

// Estado inicial
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;

// Gera uma posição aleatória dentro do canvas
function getRandomPosition() {
    return Math.floor(Math.random() * (canvas.width / box)) * box;
}

// Desenha a cobra
function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Desenha a comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Movimenta a cobra
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "RIGHT") head.x += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    snake.unshift(head);

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomPosition(), y: getRandomPosition() }; // Reposiciona a comida
    } else {
        snake.pop(); // Remove a cauda se não comer
    }
}

// Verifica colisões
function checkCollision() {
    const head = snake[0];

    // Colisão com bordas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        //alert('Game Over! Pontuação: ${score}');
        //resetGame();
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over! Pontuação: ${score}');
            resetGame();
        }
    }
}

// Reinicia o jogo
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = { x: getRandomPosition(), y: getRandomPosition() };
    score = 0;
}

// Atualiza a direção com base no teclado
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Loop do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
    setTimeout(gameLoop, 100);
}

// Inicia o jogo
gameLoop();
