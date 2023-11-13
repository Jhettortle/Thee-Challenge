const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// QUESTIONS
let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '8',
        choice2: '2',
        choice3: '4',
        choice4: '21',
        answer: 3,
        
    },
    {
        question: 'What is the name of Ash\'s electric mouse pokemon?',
        choice1: 'Pikachu',
        choice2: 'yellow diamonds',
        choice3: 'rat',
        choice4: 'Caterpie',
        answer: 1,
        
    },
     {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'All of the above',
        answer: 1,
        
    },
    {
        question: 'How many hearts does an Octopus have?',
        choice1: '8',
        choice2: '3',
        choice3: '4',
        choice4: '6',
        answer: 2,
        
    },
]

// PROGRESS BAR
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 

//FUNCTION
startGame = () => {
    questionCounter = 0 
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })

})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()