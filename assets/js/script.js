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

var listOfScores = new Object();

var score;

function endGame() {
    clearInterval(timerInterval);
    score = secondsLeft;
    // score.setAttribute("id", "lastScore");
    // console.log(score);
    content.innerHTML = "";

    var gameOverText = document.createElement("h2");
    gameOverText.textContent = "GAME OVER";
    content.appendChild(gameOverText);

    var yourScoreText = document.createElement("p");
    yourScoreText.textContent = "Final Score: " + score;    
    content.appendChild(yourScoreText);

    initialEnter();

}



var lastScore;

var nameInput;

var rawInitials;

function initialEnter() {

    // create form to hold initials stuff
    var initialsForm = document.createElement("form");
    initialsForm.setAttribute("class", "initials-form");
    // content.appendChild(initialsForm);


    // create text before initials box
    var enterText = document.createElement("label");
    enterText.textContent = "Enter Initials: "
    initialsForm.appendChild(enterText);

    // create input for initials
    nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name-input");
    nameInput.textContent = "Enter Initials: ";
    initialsForm.appendChild(nameInput);

    // create button to submit 
    var nameSubmitBtn = document.createElement("button");
    nameSubmitBtn.textContent = "Submit";
    nameSubmitBtn.setAttribute("id", "initials-submit");
    initialsForm.appendChild(nameSubmitBtn);
    content.appendChild(initialsForm);

    

    var initialsInputEl = document.querySelector(".initials-form");

    initialsInputEl.addEventListener("submit", handleInitialSubmit);

}


if (scorePage) {

    var plsWork = JSON.parse(localStorage.getItem("hit"));
    console.log(plsWork);
}

function storeData () {

    console.log("hit");

    // localStorage.setItem("scores", JSON.stringify(listOfScores));
}


function handleInitialSubmit(event) {

    event.preventDefault();
    
    rawInitials = document.getElementById("name-input").value;

    listOfScores[rawInitials] = score;

    localStorage.setItem("hit", JSON.stringify(listOfScores));
    

    // open next html page with high scores list
    document.location.href = ("scores.html");


}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("lastScore"));
    var storedInitials = JSON.parse(localStorage.getItem("lastInitials"))

    if (storedScores !==null) {
        listOfScores = storedScores;
    }
    
    if (storedInitials !== null) {
        listOfInitials = storedInitials;
    }

    if (scorePage) {
        renderScoreList();
    }
}

function renderScoreList() {

    for (var i=0; i < listOfScores.length; i++) {
        var score = listOfScores[i];
        var initials = listOfInitials[i];

        var li = document.createElement("li");
        li.textContent = initials + ' ' + score;
        li.setAttribute("data-index", i);
    }
}

function startQuiz() {
    setTime();
    content.innerHTML = "";
    generateQuestions(quizQuestions[questionCounter]);
}

// When start clicked, start the quiz game (start timer and load questions)
if (startButton) {
    startButton.addEventListener("click", startQuiz);
}

init();

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