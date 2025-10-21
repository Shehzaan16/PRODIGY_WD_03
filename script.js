const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const messageElement = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let isXTurn = true;

// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  messageElement.textContent = "Player X's Turn";
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "X" : "O";
  cell.textContent = currentClass;

  if (checkWin(currentClass)) {
    messageElement.textContent = `🎉 Player ${currentClass} Wins!`;
    endGame();
  } else if (isDraw()) {
    messageElement.textContent = "🤝 It's a Draw!";
  } else {
    isXTurn = !isXTurn;
    messageElement.textContent = `Player ${isXTurn ? "X" : "O"}'s Turn`;
  }
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].textContent === currentClass);
  });
}

restartBtn.addEventListener("click", startGame);
