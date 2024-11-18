let btnGame = document.querySelectorAll(".btn-game");
let resetBtn = document.getElementById("reset");
let newGameBtn = document.getElementById("new-game");
let message = document.getElementById("message");
let wrapper = document.getElementById("wrapper");
let game = document.getElementById("game");

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

let xStart = true;
let count = 0;

const newGame = () => {
  count = 0;
  btnGame.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    element.classList.remove("bg-green-500");
  });
  reset.classList.remove("hidden");
  game.classList.add("hidden");
};

const changeColorButton = (pattern) => {
  for (let i = 0; i < pattern.length; i++) {
    btnGame.forEach((element, key) => {
      if (key === pattern[i]) {
        element.classList.add("bg-green-500");
      }
    });
  }
};

const disableButton = () => {
  btnGame.forEach((element) => {
    element.disabled = true;
  });
  reset.classList.add("hidden");
  game.classList.remove("hidden");
  game.classList.add("flex");
};

const winFunction = (playerWinner, pattern) => {
  changeColorButton(pattern);
  disableButton(playerWinner);
  message.innerText = "";
  message.innerText = `${playerWinner} is Winer `;
};

const winPlayer = () => {
  for (let i of winPattern) {
    let [element1, element2, element3] = [
      btnGame[i[0]].innerText,
      btnGame[i[1]].innerText,
      btnGame[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1,i);
      }
    }
  }
};

btnGame.forEach((element) => {
  element.addEventListener("click", () => {
    if (xStart) {
      xStart = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xStart = true;
      element.innerText = "O";
      element.disabled = true;
    }
    count += 1;

    if (count === 9) {
      newGame();
    }
    winPlayer();
  });
});

resetBtn.addEventListener("click", () => {
  count = 0;
  btnGame.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    xStart = true;
    element.classList.add("white");
  });
});

newGameBtn.addEventListener("click", () => {
  newGame();
});
