// Timer setup
var startButton = document.getElementById("start-button");

var timeLeft = document.getElementById("timer-count");

var content = document.getElementById("content");

var scorePage = document.getElementById("score-page");

// Starting time for quiz
var secondsLeft = 60;

var questionCounter = 0;

var timerInterval;

// Timer functionality
function setTime() {
    
    timerInterval = setInterval(function() {        
        secondsLeft--;
        timeLeft.textContent = secondsLeft;

        // Stop timer when reach zero
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        } 
    }, 1000);
    
}

var answers;

// function to generate HTML for the questions
function generateQuestions(questionObject) {

    // console.log(questionObject);

    var question = document.createElement("h1");
    question.textContent = questionObject.question;
    content.appendChild(question);

    answers = Object.entries(questionObject.answers);

    // console.log(answers);

    for (var i=0; i < answers.length; i++) {
        var answer = answers[i];
        // answer = ["1", "answer text"]
        var button = document.createElement("button");
        button.textContent = answer[0] + ". " + answer[1];
        button.setAttribute("value", answer[0]);
        button.setAttribute("id", "answerBtn");
        button.addEventListener("click", function (event) {
            answerSelect(event, questionObject.correctAnswer)
        });
        content.appendChild(button);
    };

}

// what happens when user selects an answer
function answerSelect(event, correctAnswer) {

    var chosenAnswer = event.target.value;

    if (chosenAnswer === correctAnswer) {
        console.log(true)
        var correct = document.createElement("p");
        correct.setAttribute("class", "right-wrong-text");
        correct.textContent = "Correct answer!";
        content.appendChild(correct);
        questionCounter++;
        content.innerHTML = "";
        if (questionCounter <= answers.length) {
            generateQuestions(quizQuestions[questionCounter]);
        } else {
            endGame();
        }
    } else {
        secondsLeft -= 10;
        questionCounter++;
        var wrong = document.createElement("p");
        wrong.setAttribute("class", "right-wrong-text");
        wrong.textContent = "Wrong answer!";
        content.appendChild(wrong);
        console.log(false);
        content.innerHTML = "";
        if (questionCounter <= answers.length) {
            generateQuestions(quizQuestions[questionCounter]);
        } else {
            endGame();
        }
        
    }

}

var listOfScores = [];
var listOfInitials = [];

function endGame() {
    clearInterval(timerInterval);
    var score = secondsLeft;
    // score.setAttribute("id", "lastScore");
    // console.log(score);
    content.innerHTML = "";

    var gameOverText = document.createElement("h2");
    gameOverText.textContent = "GAME OVER";
    content.appendChild(gameOverText);

    var yourScore = document.createElement("p");
    yourScore.textContent = "Final Score: " + score;
    listOfScores.push(score);
    localStorage.setItem("lastScore", JSON.stringify(score));
    content.appendChild(yourScore);

    initialEnter();

}

var lastScore;

var highScoreName;

function initialEnter() {

    // create form to hold initials stuff
    var initialsForm = document.createElement("form");
    initialsForm.setAttribute("class", "initials-form");
    // initialsForm.append(enterText);
    // initialsForm.append(highScoreName);
    // initialsForm.append(nameSubmit);
    content.appendChild(initialsForm);


    // create text before initials box
    var enterText = document.createElement("label");
    enterText.textContent = "Enter Initials: "
    initialsForm.appendChild(enterText);

    // create input for initials
    highScoreName = document.createElement("input");
    highScoreName.setAttribute("id", "highScoreName");
    // highScoreName.textContent = "Enter Initials: ";
    
    initialsForm.appendChild(highScoreName);

    // create button to submit 
    var nameSubmit = document.createElement("button");
    nameSubmit.textContent = "Submit";
    nameSubmit.setAttribute("id", "initials-submit");
    initialsForm.appendChild(nameSubmit);

    content.appendChild(initialsForm);

    listOfInitials.push(highScoreName.value);

    var initialsInputEl = document.querySelector(".initials-form");

    initialsInputEl.addEventListener("submit", handleInitialSubmit);

}



var lastScore = localStorage.getItem("lastScore");
var lastInitials = localStorage.getItem("lastInitials");

var scoresObject = {};

if (scoresObject == null) {
    s
}

function handleInitialSubmit(event) {

    event.preventDefault();

    localStorage.setItem("lastInitials", JSON.stringify(listOfInitials));
    
    
    // open next html page with high scores list
    document.location.href = "scores.html";

}
    
function renderScores() {
    console.log("hit");
}

if (scorePage) {
    scorePage.innerHTML = "";
    // add score: initials to scoresObject
    scoresObject[lastScore] = lastInitials;
    localStorage.setItem("test", JSON.stringify(scoresObject));

    var scoreListSize = Object.keys(scoresObject).length;

    console.log(scoreListSize);

    console.log(scoresObject);

    // var scoreItem = document.createElement("li");

    // scoreItem.textContent = (lastInitials + ' ' + lastScore);

    // scorePage.appendChild(scoreItem);
    
}

// initialsInputEl.addEventListener("submit", handleInitialSubmit);

function startQuiz() {
    setTime();

    // console.log(content);
    content.innerHTML = "";
    generateQuestions(quizQuestions[questionCounter]);
}

// When start clicked, start the quiz game (start timer and load questions)
if (startButton) {
    startButton.addEventListener("click", startQuiz);
}

var storedScores = [];
var storedInitials = [];

function init() {
    storedScores.push(lastScore);
    storedInitials.push(lastInitials);
}


// Establish questions and answers as objects in an array
// the answers are another object
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers",
        },
        correctAnswer: "3"
    },
    {
        question: "The condition in an if/else statement is contained in:",
        answers: {
            1: "quotes",
            2: "curly braces",
            3: "parenthesis",
            4: "square brackets",
        },
        correctAnswer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        },
        correctAnswer: "4"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: {
            1: "commas",
            2: "curly braces",
            3: "quotes",
            4: "parenthesis",
        },
        correctAnswer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "JavaScript",
            2: "terminal/bash",
            3: "for loops",
            4: "console.log",
        },
        correctAnswer: "4"
    },
]

// select answer 
// 1. increment question counter
// 2. compare selected to correct
// 3. if correct, call quizquestions func again
// 4. if incorrect, subtract 10 seconds timer and call quizquestions again
// end game case