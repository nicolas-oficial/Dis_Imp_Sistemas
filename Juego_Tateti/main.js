let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

const cells = document.querySelectorAll("td");

console.log(cells);

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Madrid", "París", "Londres"],
    correct: "París"
  },
  {
    question: "¿Cuál es el océano más grande?",
    options: ["Atlántico", "Índico", "Pacífico"],
    correct: "Pacífico"
  },
  {
    question: "¿Qué planeta es conocido como el planeta rojo?",
    options: ["Marte", "Júpiter", "Saturno"],
    correct: "Marte"
  },
  {
    question: "¿En qué país se fundó la empresa Apple Inc.?",
    options: ["Japón", "EEUU", "Alemania"],
    correct: "EEUU"
  },
  {
    question: "¿Cuál es el lema de Nike?",
    options: ["Just Do It", "Think Different", "Impossible is Nothing"],
    correct: "Just Do It"
  },
  {
    question: "¿En qué país se encuentra la sede central de Samsung?",
    options: ["China", "Corea del Sur", "Taiwan"],
    correct: "Corea del Sur"
  },
  {
    question: "¿Cuál es la empresa matriz de Google?",
    options: ["Alphabet Inc", "Meta", "Berkshire Hathaway"],
    correct: "Alphabet Inc"
  },
  {
    question: "¿En que año se fundó Facebook?",
    options: ["2002", "2004", "2006"],
    correct: "2004"
  },
  {
    question: "¿Qué compañia es conocida por el desarrollo del sistema operativo Android?",
    options: ["Apple", "Microsoft", "Google"],
    correct: "Google"
  },
];

function handleClick(event) {
  const cellIndex = Array.from(cells).indexOf(event.target);

  if (board[cellIndex] != "") {
    return;
  }

  askQuestion().then(isCorrect => {
    if (isCorrect) {
      board[cellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.classList.add('current-player');

      if (checkWin()) {
        alert(`¡Felicidades! Jugador ${currentPlayer} ha ganado.`);

        cells.forEach(cell => {
          cell.removeEventListener('click', handleClick);
        });

        return;
      }

      currentPlayer = currentPlayer == "X" ? "O" : "X";
      event.target.classList.add('current-player');
    } else {
      alert("Respuesta incorrecta. Pierdes tu turno.");
      currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
  });
}

function askQuestion() {
  return new Promise((resolve) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    let optionsText = randomQuestion.options.map((option, index) => `${String.fromCharCode(65 + index)}: ${option}`).join("\n");
    const playerAnswer = prompt(`${randomQuestion.question}\n${optionsText}`);

    const correctIndex = randomQuestion.options.indexOf(randomQuestion.correct) + 1;
    
    if (String.fromCharCode(64 + correctIndex) === playerAnswer.toUpperCase()) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

function checkWin() {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // veticales
    [0, 4, 8],
    [2, 4, 6], // diagonales
  ];

  for (let index = 0; index < winCondition.length; index++) {
    const winElement = winCondition[index];
    let isWin = true;
    for (let index2 = 0; index2 < winElement.length; index2++) {
      const posWin = winElement[index2];
      if (board[posWin] != currentPlayer) {
        isWin = false;
      }
    }
    if (isWin) {
      alert(`¡Felicidades! Jugador ${currentPlayer} ha ganado.`);
      return true;
    }
  }

  return false;

  return winConditions.some((condition) => {
    return condition.every((index) => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove('current-player');
  });
}