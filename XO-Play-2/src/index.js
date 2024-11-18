
const X = "X";
const O = "O";
const N = 5;
const WINNER_O = "OW",
  WINNER_X = "XW",
  TIE = "XO";
const getInitialBoard = () =>
  Array(N)
    .fill("")
    .map((v) => [...Array(N).fill("")]);

const initialTurn = X;

const blocks = Array.from(document.getElementsByClassName("block"));
const turnDisplay = document.getElementById("turn");
const winnerDisplay = document.getElementById("winner");

let board = getInitialBoard();
let turn = initialTurn;

const canFillBlock = (row, col) => {
  if (board[row][col] === "") {
    return true;
  }
  return false;
};

const fillBlock = (block, row, col) => {
  if (turn == initialTurn) {
    turn = O;
    block.innerText = X;
    board[row][col] = X;
  } else {
    turn = X;
    block.innerText = O;
    board[row][col] = O;
  }
};

const toggleTurn = () => {
  if (turn == initialTurn) {
    turnDisplay.innerText = X;
  } 
  else{
    turnDisplay.innerText = O;
  }
};

const announceResult = (type) => {
  switch (type) {
    case WINNER_X:
      winnerDisplay.innerText = `winner ${X}`;
      break;
    case WINNER_O:
      winnerDisplay.innerText = `winner ${O}`;
      break;
    case TIE:
      winnerDisplay.innerText = `winner ${X} ${O}`;
      break;
  }
  winnerDisplay.classList.remove("hide");
};

const isTied = () => {
  //   const n_playedRounds = // todo: calculate number of played rounds by board.
  if (n_playedRounds === N * N) return true;
  return false;
};

const checkRow = (row) => {
  let sCount = 1;
  for (let j = 1; j < N; j++) {
    if (board[row][j - 1] == "" || board[row][j] == "") continue;

    if (board[row][j - 1] != board[row][j]) {
      sCount = 1;
      continue;
    }
    sCount += 1;
    if (sCount == N - 1) return true;
  }
  return false;
};

const checkcol = (col) => {
  let sCount = 1;
  for (let i = 1; i < N; i++) {
    if (board[i - 1][col] == "" || board[i][col] == "") continue;

    if (board[i - 1][col] != board[i][col]) {
      sCount = 1;
      continue;
    }
    sCount += 1;
    if (sCount == N - 1) return true;
  }
  return false;
};

const Subdiameter = () => {};

const maindiameter = () => {};

const getWinner = (block, row, col) => {
  if (checkRow(row) === true || checkcol(col) === true) {
    return {
      hasWinner: true,
      winner: block.innerText,
    };
  } else {
    return {
      hasWinner: false,
      winner: null,
    };
  }
};

const handleBlockClick = (block, row, col) => {
  if (canFillBlock(row, col)) {
    fillBlock(block, row, col);
    const { hasWinner, winner } = getWinner(block, row, col);
    if (hasWinner) {
      announceResult(winner === X ? WINNER_X : WINNER_O);
      setTimeout(resetBoard, 2000);
      return;
    }
    if (isTied()) {
      announceResult(TIE);
      setTimeout(resetBoard, 2000);
      return;
    }
    toggleTurn();
  }
};

const resetBoard = () => {
  board = getInitialBoard();
  turn = initialTurn;
  winnerDisplay.classList.add("hide");
  turnDisplay.innerText = X;
  blocks.forEach((block) => {
    block.innerText = "";
  });
};

blocks.forEach((block, index) => {
  const row = Math.floor(index / N);
  const col = index % N;

  block.addEventListener("click", () => handleBlockClick(block, row, col));
});
