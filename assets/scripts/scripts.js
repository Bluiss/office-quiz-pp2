const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions,currentQuestionIndex


// start game 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ 
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }


// set next question
function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
}

//show next question 
function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// reset next question 
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

//select answer
function selectAnswer(e){
    const sleectedButton = e.target
    const correct = sleectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else{
        startButton.innerText = 'restart'
        startButton.classList.remove('hide')
    }
    
}

//set wrong or correct function
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
          { text: 'Sprinkles', correct: true },
          { text: 'Crinklepuss', correct: false },
          { text: 'Lady Aragorn', correct: false },
          { text: 'Tinkie', correct: false }
        ]
      },
      {
        question: "At Phyllis' wedding, Michael revealed that her nickname in high school was what?",
        answers: [
          { text: 'Easy Rider', correct: true },
          { text: 'Chill Voyager', correct: false },
          { text: 'Free Spirit', correct: false },
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
      question: 'Who won "Hottest in the Office" at Michaels last Dundies?',
        answers: [
          { text: 'Danny Cordray', correct: true },
          { text: 'Jim Halpert', correct: false },
          { text: 'Ryan Howard', correct: false },
          { text: 'Michael Scott', correct: false }
        ]
    },
      
    ]

