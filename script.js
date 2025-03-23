const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const jumpButton = document.getElementById("jumpButton");
const restartButton = document.getElementById("restartButton");

let isJumping = false;
let score = 0;
let gameOver = false;

// Controle pelo botão
jumpButton.addEventListener("click", () => {
  if (!isJumping && !gameOver) jump();
});

// Também funciona com teclado (opcional)
document.body.onkeydown = function (e) {
  if (e.code === "Space" && !isJumping && !gameOver) {
    jump();
  }
};

function jump() {
  isJumping = true;
  player.classList.add("jump");

  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 420);
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    obstacleRect.left < playerRect.right &&
    obstacleRect.right > playerRect.left &&
    obstacleRect.top < playerRect.bottom &&
    obstacleRect.bottom > playerRect.top
  ) {
    message.innerText = "PERDEU!";
    message.innerText = "siga @cauaaasantos no insta!";
    obstacle.style.animationPlayState = "paused";
    gameOver = true;
    clearInterval(scoreInterval);
  }
  restartButton.style.display = "inline-block";
}

let scoreInterval = setInterval(() => {
  if (!gameOver) {
    score++;
    scoreText.innerText = `Pontos: ${score}`;
    checkCollision();
  }
}, 100);

restartButton.addEventListener("click", () => {
  // Resetar estado
  score = 0;
  gameOver = false;
  message.innerText = "";
  scoreText.innerText = "Pontos: 0";
  obstacle.style.animation = "none";
  
  // Reaplica a animação pra reiniciar o obstáculo
  void obstacle.offsetWidth; // Truque pra "reiniciar" a animação
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  
  // Esconde o botão de recomeçar
  restartButton.style.display = "none";

  // Reinicia o contador de pontos
  scoreInterval = setInterval(() => {
    if (!gameOver) {
      score++;
      scoreText.innerText = `Pontos: ${score}`;
      checkCollision();
    }
  }, 100);
});