const playButton = document.getElementById("playButton");
const jumpButton = document.getElementById("jumpButton");
const restartButton = document.getElementById("restartButton");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

let isJumping = false;
let score = 0;
let gameOver = false;
let scoreInterval;
let speedInterval;
let gameLoop;
let obstacleX = 600;
let obstacleSpeed = 5; // px por frame (~60fps)

playButton.addEventListener("click", startGame);

function startGame() {
  playButton.style.display = "none";
  jumpButton.style.display = "inline-block";
  restartButton.style.display = "none";

  score = 0;
  gameOver = false;
  obstacleSpeed = 5;
  obstacleX = 600;
  obstacle.style.left = `${obstacleX}px`;
  message.innerText = "";
  obstacle.style.display = "block";

  // Loop de pontos
  scoreInterval = setInterval(() => {
    if (!gameOver) {
      score++;
      scoreText.innerText = `Pontos: ${score}`;
    }
  }, 100);

  // Aumenta velocidade gradualmente
  speedInterval = setInterval(() => {
    if (!gameOver) {
      obstacleSpeed += 1;
    }
  }, 5000);

  // Loop de movimento do obstáculo
  gameLoop = setInterval(() => {
    if (!gameOver) {
      moveObstacle();
      checkCollision();
    }
  }, 16); // ~60fps
}

function moveObstacle() {
  obstacleX -= obstacleSpeed;
  if (obstacleX < -40) {
    obstacleX = 600; // reinicia fora da tela
  }
  obstacle.style.left = `${obstacleX}px`;
}

jumpButton.addEventListener("click", () => {
  if (!isJumping && !gameOver) jump();
});

function jump() {
  isJumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 400);
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // Ajusta os retângulos para pegar só o centro dos elementos
  const playerCenter = {
    x: playerRect.left + playerRect.width / 2,
    y: playerRect.top + playerRect.height / 2,
  };

  const obstacleCenter = {
    x: obstacleRect.left + obstacleRect.width / 2,
    y: obstacleRect.top + obstacleRect.height / 2,
  };

  const dx = Math.abs(playerCenter.x - obstacleCenter.x);
  const dy = Math.abs(playerCenter.y - obstacleCenter.y);

  const collisionThreshold = 35; // Ajuste fino da sensibilidade

  if (dx < collisionThreshold && dy < collisionThreshold) {
    gameOver = true;
    message.innerText = "CONTRATADO! Siga @Cauaaasantos no insta!";
    clearInterval(scoreInterval);
    clearInterval(speedInterval);
    clearInterval(gameLoop);
    restartButton.style.display = "inline-block";
  }
}

restartButton.addEventListener("click", () => {
  clearInterval(scoreInterval);
  clearInterval(speedInterval);
  clearInterval(gameLoop);
  startGame();
});