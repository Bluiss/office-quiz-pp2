const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const conatiner = document.getElementById('main-container')
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoresContainer = document.getElementById('score-container');
const timerContainer = document.getElementById('timer');
const container = document.getElementById('main-container');
const gameOverDiv = document.getElementById('game-over');
const finalScore = document.getElementById('final-score-container')
const finalMessage = document.getElementById('final-message')


let shuffledQuestions, currentQuestionIndex;

let timeLeft = 10;
let countdownDisplay = document.getElementById('timer');
let timerId = null;

// how to play show

function howToShow(){
    const howTo = document.getElementById('how-to-content')
    howTo.classList.remove('hide')
}

function howToHide(){
    const howTo = document.getElementById('how-to-content')
    howTo.classList.add('hide')
}


// start game 
startButton.addEventListener('click', startGame);
nextButton.classList.add('hide')
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    nextButton.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    timerContainer.classList.remove('hide');
    setNextQuestion();
    countdown();
}

function resumeCountdown() {
    timerId = setInterval(countdown, 1000);
}


// set next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    timeLeft = 10
    resumeCountdown();

}

//show next question 
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.removeEventListener('click', selectAnswer);
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    function resumeCountdown() {
        timerId = setInterval(countdown, 1000);
    }
}

// reset next question 
function resetState() {
    clearStatusClass(document.body);
    finalScore.classList.add('hide')
    nextButton.classList.add('hide');
    scoresContainer.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild);
    }
}

//select answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    const allButtons = answerButtonsElement.querySelectorAll('button');
    allButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });

    setStatusClass(selectedButton, correct);

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
        scoresContainer.classList.remove('hide');
        finalScore.classList.add('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        finalScore.classList.remove('hide');
        finalScoreTally();
        finalMessageDisplay();
    }
    clearInterval(timerId);
}

//set wrong or correct function
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
        incrementCorrect();
    } else {
        element.classList.add('wrong');
        const correctAnswerButton = answerButtonsElement.querySelector('[data-correct="true"]');
        if (correctAnswerButton) {
            correctAnswerButton.classList.add('correct');
        }
        incrementWrong();
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


 //Gets the current score from the DOM and increments it by 1


function incrementCorrect() {

    let previousScore = parseInt(document.getElementById('correct-score').innerText);
    document.getElementById('correct-score').innerText = ++previousScore;
}

function incrementWrong() {

    let previousScore = parseInt(document.getElementById('wrong-score').innerText);
    document.getElementById('wrong-score').innerText = ++previousScore;
}


// countdown timer

function countdown() {
    if (timeLeft === 0) {
        clearInterval(timerId);
        gameOver();
    } else {
        countdownDisplay.innerHTML = timeLeft + ' Seconds Left';
        timeLeft--;
    }
}


// game over 
function gameOver() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...You ran out of time!',
        text: 'Next time, dont be a time theif!',
        type: 'success',
        showCancelButton: false,
        confirmButtonText: 'Click here to have another go'
      }).then((result) => {
         if(result){
           location.reload();
         }
      })
}




// final score
function finalScoreTally() {
    const tallySecond = "/10"
    const correctScore = parseInt(document.getElementById('correct-score').innerText);
    let totalScore = parseInt(document.getElementById('final-score').innerText);
    document.getElementById('final-score').innerText = correctScore + tallySecond;

}

// final message

const lowScore = "Not good at all, how very Impish of you"
const midScore = "Well, you tried, and that's what counts, right? At least you're not Toby."
const highScore = "Excellent score, quite Admirable of you"


function finalMessageDisplay(){
    const correctScore = parseInt(document.getElementById('correct-score').innerText);

    if(correctScore <= 3){
        finalMessage.innerText = lowScore;
    } else if( correctScore <= 7 ){
        finalMessage.innerText = midScore;
    } else{
        finalMessage.innerText = highScore;
    }

}



// list of questions
const questions = [
    {
        question: 'Where does Michael Scott move to start his new life with Holly?',
        answers: [
            { text: 'Boulder, Colorado', correct: true },
            { text: 'Denver, Colorado', correct: false },
            { text: 'Colorado Springs, Colorado', correct: false },
            { text: 'Aspen, Colorado', correct: false }
        ]
    },
    {
        question: "Which of Angela's cats did Dwight kill?",
        answers: [
            { text: 'Crinklepuss', correct: false },
            { text: 'Sprinkles', correct: true },
            { text: 'Lady Aragorn', correct: false },
            { text: 'Tinkie', correct: false }
        ]
    },
    {
        question: "At Phyllis' wedding, Michael revealed that her nickname in high school was what?",
        answers: [
            { text: 'Free Spirit', correct: false },
            { text: 'Chill Voyager', correct: false },
            { text: 'Easy Rider', correct: true },
            { text: 'Carefree Roamer', correct: false }
        ]
    },
    {
        question: 'Who won "Hottest in the Office" at Michaels last Dundies?',
        answers: [
            { text: 'Danny Cordray', correct: true },
            { text: 'Jim Halpert', correct: false },
            { text: 'Ryan Howard', correct: false },
            { text: 'Michael Scott', correct: false }
        ]
    },
    {
        question: "Kelly gave out what as party favors at her America's Got Talent finale party?",
        answers: [
            { text: 'Coffee Mugs', correct: true },
            { text: 'Hello Kitty Laptop Covers', correct: false },
            { text: 'Fleece Blankets', correct: false },
            { text: 'Key Chains', correct: false }
        ]
    },
    {
        question: "Schrute boys must learn how many rules before the age of 5?",
        answers: [
            { text: '50', correct: false },
            { text: '30', correct: false },
            { text: '40', correct: true },
            { text: '60', correct: false }
        ]
    },
    {
        question: "Who came in first place in the Michael Scott's Dunder Mifflin Scranton Meredith Palmer Memorial Celebrity Rabies Awareness Pro-Am Fun Run Race for the Cure?",
        answers: [
            { text: 'Toby Flenderson', correct: true },
            { text: 'Michael Scott', correct: false },
            { text: 'Andy Bernard', correct: false },
            { text: 'Kevin Malone', correct: false }
        ]
    },
    {
        question: "What does Dwight always keep an extra set of in his car for special occasions?",
        answers: [
            { text: 'Levis', correct: true },
            { text: 'Ray Bans', correct: false },
            { text: 'Converse', correct: false },
            { text: 'Berkenstocks', correct: true }
        ]
    },

    {
        question: "Pam and Jim's first kiss took place where?",
        answers: [
            { text: 'Dunder Mifflin Office', correct: false },
            { text: "Chili's", correct: true },
            { text: 'The Casino Night', correct: false },
            { text: 'The Booze Cruise', correct: false }
        ]
    },

    {
        question: "What is the name of Dwight's porcupine?",
        answers: [
            { text: 'Henrietta', correct: true },
            { text: "Hermione", correct: false },
            { text: 'Harper', correct: false },
            { text: 'Harriet', correct: false }
        ]
    },
];

