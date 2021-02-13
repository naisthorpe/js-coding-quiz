// Timer setup
var startButton = document.querySelector(".start-button");

var timeLeft = document.querySelector(".timer-count");

// Starting time for quiz
var secondsLeft = 75;

// Timer functionality
function setTime() {
    
    var timerInterval = setInterval(function() {
        
        secondsLeft--;

        timeLeft.textContent = secondsLeft;

        // Stop timer when reach zero
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
};

// When start clicked, start the timer
startButton.addEventListener("click", setTime);


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