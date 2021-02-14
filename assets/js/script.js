// Timer setup
var startButton = document.querySelector("#start-button");

var timeLeft = document.querySelector("#timer-count");

var content = document.getElementById("content");

// Starting time for quiz
var secondsLeft = 60;

var questionCounter = 0;


// Timer functionality
function setTime() {
    
    var timerInterval = setInterval(function() {
        
        secondsLeft--;

        timeLeft.textContent = secondsLeft;

        // Stop timer when reach zero
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = 0;
        }
    }, 1000);
    
};

// function to generate HTML for the questions
function quizQs(questionObject) {

    console.log(questionObject);

    var question = document.createElement("h1");

    question.textContent = questionObject.question;

    content.appendChild(question);

    var answers = Object.entries(questionObject.answers);

    console.log(answers);

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
    }

}

// what happens when user selects an answer
function answerSelect(event, correctAnswer) {
    console.log(event.target.value);
    console.log(correctAnswer);
}


function startQuiz() {

    setTime();

    console.log(content);

    content.innerHTML = "";

    quizQs(quizQuestions[questionCounter]);

}

// When start clicked, start the timer
startButton.addEventListener("click", startQuiz);


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