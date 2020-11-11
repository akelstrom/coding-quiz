var score = 0;
var totalQuestions = questionsArray.length;
var startButton = document.querySelector("#start-btn");
var timerEl = document.querySelector("#countdown");
var timeLeft = 75;
var instructionsEl = document.querySelector("#instructions");
var resultEl = document.querySelector("#result");
var questionsEl = document.querySelector("#question");
var initialsEl = document.querySelector("#initials");
var signUpButton = document.querySelector("#save");
var highScores = [];

//this function is using .innerHTML to show instructions
function startScreen() {
  instructionsEl.innerHTML = `
    <p> Hello! Welcome to the Coding Quiz! The timer will start when you hit the start button, 
    and everytime you get a question wrong the timer will deduct 10 seconds.
    </p>
    `;
  startButton.addEventListener("click", clickStart);
}

function clickStart() {
  //calling the display question function, to make the quiz questions pop up
  displayQuestion(0);
  //call the set interval function here to start the timer when start button is pressed
  countDown();

  instructionsEl.style.display = "none";
  startButton.style.display = "none";
}

//this function displays the questions in the browser, and goes from the first to the second
function displayQuestion(questionIndex) {
  //function within a function that handles what happens when you click the buttons
  function answerClickHandler() {
    if (this.textContent === questionsArray[questionIndex].answer) {
      score += 10;
      console.log(score);
      resultEl.textContent = "Correct!";
    } else {
      timeLeft -= 10;
      resultEl.textContent = "Incorrect.";
    }
    if (questionIndex + 1 >= totalQuestions) {
      scoreDisplay();
      timerEl.style.display = "none";
      //call another function to display results... //funtion to display high scores
    } else {
      displayQuestion(questionIndex + 1);
    }
  }
  //this query selector selects the parent container div in html, and uses .innerHTML to display the text within, and uses string interprolation `html ${java} html`
  questionsEl.innerHTML = `
    <h2>${questionsArray[questionIndex].question}</h2>
    <button class="choices" id="answer1">${questionsArray[questionIndex].option1}</button>
    <button class="choices" id="answer2">${questionsArray[questionIndex].option2}</button>
    <button class="choices" id="answer3">${questionsArray[questionIndex].option3}</button>
    <button class="choices" id="answer4">${questionsArray[questionIndex].option4}</button>    
    `;

  document
    .querySelector("#answer1")
    .addEventListener("click", answerClickHandler);
  document
    .querySelector("#answer2")
    .addEventListener("click", answerClickHandler);
  document
    .querySelector("#answer3")
    .addEventListener("click", answerClickHandler);
  document
    .querySelector("#answer4")
    .addEventListener("click", answerClickHandler);
}

//got this function code below from LPS coding bootcamp in-class lesson (11/04/2020)
function countDown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      scoreDisplay();
    }
  }, 1000);
}
//this part needs to be fixed.

function scoreDisplay() {
  questionsEl.style.display = "none";
  resultEl.style.display = "none";

  document.querySelector(".input-group").innerHTML = `
    <label for="initials">Initials:</label>
        <input type="text" name="initials" id="initials" placeholder= "Enter your initials here"/>
        <button id="save">Save</button>
    `;
  document.querySelector("#score-card").textContent = "Your score is: " + score;
  document.querySelector("#save").addEventListener("click", renderInitials);
  
  highScoreDisplay();
}

function renderInitials() {
  var initials = document.querySelector("#initials").value;
  localStorage.setItem("initials", initials);

  var highScores = loadScore();
  //put initials and score into array object
  var newScore = {
    initials: initials,
    yourScore: score,
  };
  //push newScore object into high scores array
  highScores.push(newScore);

  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  highScoreDisplay();
}

function loadScore() {
  var highScores = localStorage.getItem("highScores");
  if (!highScores) {
    highScores = [];
  } else {
    highScores = JSON.parse(highScores);
  }
  return highScores;
}


function highScoreDisplay() {
  // document.querySelector("#highscore-display").textContent = JSON.stringify(loadScore());
  //for loop for all the elements in load score
  var highScores = loadScore();
  var content = ""

  for (var i = 0; i < highScores.length; i++) {
    content = content + `<p> ${highScores[i].initials} - ${highScores[i].yourScore}</p>`
  }
  document.querySelector("#highscore-display").innerHTML = `${content}`
}

startScreen();
