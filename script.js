const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const canvasSize = 400;
const tileCount = canvasSize / gridSize;

let snake = [
    { x: 10, y: 10 } // Initial position of the snake head
];
let dx = 1;
let dy = 0;
let food = { x: 15, y: 15 };
let score = 0;
let changingDirection = false;
let gameRunning = true;

// Game loop
function main() {
    if (!gameRunning) {
        gameOver();
        return;
    }

    changingDirection = false;
    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 150); // Adjust speed here (lower value = faster game)
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvasSize, canvasSize);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
    ctx.strokeRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with walls
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameRunning = false;
        return;
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameRunning = false;
            return;
        }
    }

    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function randomTile(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateFood() {
    food.x = randomTile(0, tileCount);
    food.y = randomTile(0, tileCount);

    // Ensure food doesn't spawn on the snake
    snake.forEach(part => {
        const foodIsOnSnake = part.x === food.x && part.y === food.y;
        if (foodIsOnSnake) {
            generateFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function gameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvasSize / 2, canvasSize / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press Enter to Restart', canvasSize / 2, canvasSize / 2 + 40);
}

function restartGame(event) {
    if (event.keyCode === 13 && !gameRunning) { // Enter key
        // Reset game state
        snake = [{ x: 10, y: 10 }];
        dx = 1; // Reset direction to move right initially
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        generateFood();
        gameRunning = true;
        main(); // Restart the game loop
        // Remove the event listener after restart to prevent multiple restarts
        document.removeEventListener('keydown', restartGame);
        // Re-add the direction change listener
        document.addEventListener('keydown', changeDirection);
    }
}

// Start the game
document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', (event) => {
    if (!gameRunning) {
        // Add restart listener only when game is over
        document.removeEventListener('keydown', changeDirection); // Prevent direction changes on game over screen
        document.addEventListener('keydown', restartGame);
    }
});

main();