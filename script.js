// border color of choices
const borderColor = {
  rock: "#0074b6",
  scissor: "#bd00ff",
  paper: "#ffa943",
};

// getting score from local storage
const score = window.localStorage.getItem("score")
  ? JSON.parse(window.localStorage.getItem("score"))
  : { personScore: 0, pcScore: 0 };

// computer score container
const pcScore = document.getElementById("computer-score");
// set pc score
pcScore.innerHTML = score.pcScore;

// person score container
const personScore = document.getElementById("your-score");
// set person score
personScore.innerHTML = score.personScore;

// rules close and open
const rulesContainer = document.getElementById("game-rules-container");
const closeBtn = document.getElementById("close-btn");
const rulesBtn = document.getElementById("rule-btn");

// open rule container
rulesBtn.addEventListener("click", (e) => {
  rulesContainer.style.display = "block";
  setTimeout((e) => {
    rulesContainer.style.right = "60px";
  }, 100);
});

// close rule container
closeBtn.addEventListener("click", (e) => {
  rulesContainer.style.display = "none";
  rulesContainer.style.right = "25px";
});

// rock paper scissor choices
const choices = ["rock", "paper", "scissor"];

// getting rock paper scissor container
const rockPaperScissorContainer = document.getElementById(
  "rock-paper-scissor-container"
);

// getting person and pc choice container
const personAndPcChoiceContainer = document.getElementById(
  "person-pc-container"
);

// getting person choice container
const personChoiceContainer = document.getElementById("person-container");

// getting pc choice container
const pcChoiceContainer = document.getElementById("pc-container");

// getting person choice img container
const personChoiceImgContainer = document.getElementById("person-choice-img");

//  getting pc choice img container
const pcChoiceImgContainer = document.getElementById("pc-choice-img");

// getting result title tag
const resultTitle = document.getElementById("result-title");

// getting focus container
const focusContainer = document.getElementById("zero-focus-div");

// getting against pc container
const againstPcTitle = document.getElementById("against-pc-title");

// getting result-btn container
const resultBtn = document.getElementById("result-btn");

// getting next btn which we used after winning
const nextBtn = document.getElementById("next-btn");

// getting result container
const resultContainer = document.getElementById("result-container");

// winner celebration container
const winnerCelebrationContainer = document.getElementById(
  "winner-celebration-container"
);

// generate random choice for PC
function generateChoiceForPc() {
  const indx = Math.floor(Math.random() * choices.length);
  return choices[indx];
}

// set winner focus
function setFocusOnWinnerContainer() {
  focusContainer.style.display = "inline-block";
}

// choosing rock paper scissor
let rockPaperScissor = document.getElementsByClassName("circle");
rockPaperScissor = [...rockPaperScissor];

// adding click event listener to all the choices
rockPaperScissor.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let personChoice = e.target.getAttribute("data-choiceName");

    let pcChoice = generateChoiceForPc();

    // remove rock paper scissor container
    rockPaperScissorContainer.style.display = "none";

    // make person and pc choice container visible for showing result
    personAndPcChoiceContainer.style.display = "flex";

    // add person choice img to person container
    personChoiceImgContainer.setAttribute(
      "src",
      `assets/${personChoice}-icon.png`
    );

    // add pc choice img to pc choice container
    pcChoiceImgContainer.setAttribute("src", `assets/${pcChoice}-icon.png`);

    // setting border color of person and pc choice container
    personChoiceContainer.style.borderColor = borderColor[personChoice];
    pcChoiceContainer.style.borderColor = borderColor[pcChoice];

    if (personChoice == pcChoice) {
      resultTitle.innerHTML = "tie up";
      againstPcTitle.style.display = "none";
      resultBtn.innerHTML = "replay";
    } else if (
      (personChoice == "rock" && pcChoice == "scissor") ||
      (personChoice == "scissor" && pcChoice == "paper") ||
      (personChoice == "paper" && pcChoice == "rock")
    ) {
      // person wins
      setFocusOnWinnerContainer();
      focusContainer.style.left = "-154.5px";
      resultTitle.innerHTML = "You win";
      nextBtn.style.display = "inline-block";
      score.personScore++;
      window.localStorage.setItem("score", JSON.stringify(score));
      personScore.innerHTML = score.personScore;
    } else {
      // pc wins
      setFocusOnWinnerContainer();
      focusContainer.style.right = "-154.5px";
      resultTitle.innerHTML = "you lost";
      score.pcScore++;
      window.localStorage.setItem("score", JSON.stringify(score));
      pcScore.innerHTML = score.pcScore;
    }
  });
});

// reset function
function reset() {
  personAndPcChoiceContainer.style.display = "none";
  focusContainer.style.removeProperty("left");
  focusContainer.style.removeProperty("right");
  focusContainer.style.display = "none";
  nextBtn.style.display = "none";
  againstPcTitle.style.display = "inline-block";
  resultBtn.innerHTML = "play again";
}

// setting up the replay or play again scenario
function startAgain() {
  rockPaperScissorContainer.style.display = "block";
  reset();
}

// setting up next page when click after winning the game
function getNextPageAfterWinning() {
  resultContainer.style.display = "none";
  rockPaperScissorContainer.style.display = "none";
  winnerCelebrationContainer.style.display = "block";
  reset();
}

// winner celebration play again btn
function winnerPlayAgainBtn() {
  resultContainer.style.display = "flex";
  rockPaperScissorContainer.style.display = "block";
  winnerCelebrationContainer.style.display = "none";
  reset();
}
