var currentQuestion = 0;
var score = 0;
var totalQuestions = questionsArray.length;

// answer1El.textContent = questionsArray[0].question

function displayQuestion(questionIndex) {
  function answerClickHandler() {
    if (this.textContent === questionsArray[questionIndex].answer) {
      score += 10;
    } else {
      //take 10 off timer here
    }
    if (questionIndex + 1 >= totalQuestions) {
      console.log("end");
      //call another function to display results... //funtion to display high scores
    } else {
      displayQuestion(questionIndex + 1);
    }
  }
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

displayQuestion(0); //change this function to displaystart screen once you make that function

//function to display start screen
