var currentQuestion = 0;
var score = 0;
var totalQuestions = questionsArray.length;
var startButton = document.querySelector("#start-btn");
var timerEl = document.querySelector("#countdown");
var timeLeft = 75;


function startScreen() {
  document.querySelector("#start").innerHTML = `
    <p> Hello! Welcome to the Coding Quiz! The timer will start when you hit the start button, 
    and everytime you get a question wrong the timer will deduct 10 seconds.
    </p>
    
    `;
}

startButton.addEventListener("click", clickStart);

function clickStart() {
  displayQuestion(0);
  countDown();
  //call the timer start function here
}

//this function displays the questions in the browser, and goes from the first to the second
function displayQuestion(questionIndex) {
  //function within a function that handles what happens when you click the buttons
  function answerClickHandler() {
    if (this.textContent === questionsArray[questionIndex].answer) {
      score += 10;
    } else {
      timeLeft -= 10
    }
    if (questionIndex + 1 >= totalQuestions) {
      console.log("end");
      //call another function to display results... //funtion to display high scores
    } else {
      displayQuestion(questionIndex + 1);
    }
  }
  //this query selector selects the parent container div in html, and uses .innerHTML to display the text within, and uses string interprolation `html ${java} html`
  document.querySelector("#question").innerHTML = `
    <h2>${questionsArray[questionIndex].question}</h2>
    <button class="choices" id="answer1">${questionsArray[questionIndex].option1}</button>
    <button class="choices" id="answer2">${questionsArray[questionIndex].option2}</button>
    <button class="choices" id="answer3">${questionsArray[questionIndex].option3}</button>
    <button class="choices" id="answer4">${questionsArray[questionIndex].option4}</button>    
    <div id="rightOrWrong"></div>
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

//change this function to displaystart screen once you make that function


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
      }
    }, 1000);
  }
  

startScreen();
