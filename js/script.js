document.addEventListener("DOMContentLoaded", () => {
    
    //Canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    //Display
    const menu = document.getElementById("menu");
    const gameOverScreen = document.getElementById("gameOver");
    const scoreDisplay = document.getElementById("score");
    const controls = document.getElementById("controls");

    //Estados
    let gameLoop, snake, food, dx, dy, score, speed;

    function showMenu() {
        menu.style.display = "block";
        gameOverScreen.style.display = "none";
        canvas.style.display = "none";
        controls.style.display = "none";
    }

    function startGame(level) {
        menu.style.display = "none";
        gameOverScreen.style.display = "none";
        canvas.style.display = "block";
        if (window.innerWidth <= 768) controls.style.display = "flex";
        snake = [{ x: 10, y: 10 }];
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        dx = 1; dy = 0;
        score = 0;
        speed = level;
        scoreDisplay.textContent = score;
        clearInterval(gameLoop);
        gameLoop = setInterval(updateGame, speed);
    }

    function updateGame() {
        let head = { x: snake[0].x + dx, y: snake[0].y + dy };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || checkCollision(head)) {
            gameOver();
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = score;
            food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        } else {
            snake.pop();
        }
        drawGame();
    }

    function checkCollision(head) {
        return snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function gameOver() {
        clearInterval(gameLoop);
        gameOverScreen.style.display = "block";
        canvas.style.display = "none";
        controls.style.display = "none";
    }

    function drawGame() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
        ctx.fillStyle = "lime";
        snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
    }

    // Movimenta a cobra
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
        if (key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
        if (key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
        if (key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
    });

    document.getElementById("easy").addEventListener("click", () => startGame(200));
    document.getElementById("medium").addEventListener("click", () => startGame(150));
    document.getElementById("hard").addEventListener("click", () => startGame(100));
    document.getElementById("restart").addEventListener("click", showMenu);

    document.getElementById("btnUp").addEventListener("click", () => { if (dy === 0) { dx = 0; dy = -1; } });
    document.getElementById("btnDown").addEventListener("click", () => { if (dy === 0) { dx = 0; dy = 1; } });
    document.getElementById("btnLeft").addEventListener("click", () => { if (dx === 0) { dx = -1; dy = 0; } });
    document.getElementById("btnRight").addEventListener("click", () => { if (dx === 0) { dx = 1; dy = 0; } });

    showMenu();
});
