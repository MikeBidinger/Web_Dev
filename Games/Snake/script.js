const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls span");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
    snakeY = 10;
let snakeBody = [];
let velocityX = 0,
    velocityY = 0;
let setIntervalId;
let score = 0;

// Get high-score of local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // Create a random food position (1-30)
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    // Clear timer and reload page
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
};

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

controls.forEach((key) => {
    // Call changeDirection on key click and pass key
    key.addEventListener("click", () =>
        changeDirection({ key: key.dataset.key })
    );
});

const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // If snake hits food, push food position to snake body
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // With every pass, shift snake body elements by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Set first initial position of snake body

    // Set position of snake according to velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // If snake is outside the bounds, set gameOver
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Add a div for each element in snake body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} /
            ${snakeBody[i][0]}"></div>`;
        // If snake hits body, set gameOver
        if (
            i !== 0 &&
            snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]
        ) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
