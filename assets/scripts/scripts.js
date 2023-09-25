const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')

let shuffleQuestions,currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame(){
    console.log('started')
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0 
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}









const questions = [
    {
        question: 'what is two + two',
        answers: [
            { text: 4, correct: true},
            { text: 22, correct: false}
        ]
    },
]
