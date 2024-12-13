const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text : "Shark", correct: false },
            { text : "Blue whale", correct: true },
            { text : "Elephant", correct: false },
            { text : "Giraffe", correct: false }
        ]
    },
    {
        question: "Which country is the highest populated?",
        answers:[
            { text : "Russia", correct: false },
            { text : "China", correct: false },
            { text : "India", correct: true },
            { text : "Germany", correct: false }
        ]
    },
    {
        question: "Who is known as the \"Father of the Indian Constitution\"?",
        answers:[
            { text : "Jawaharlal Nehru", correct: false },
            { text : "Mahatma Gandhi", correct: false },
            { text : "Dr.B.R. Ambhedkar", correct: true },
            { text : "Sardar Vallabhbhai Patel", correct: false }
        ]
    },
    {
        question: "What is the capital city of Australia?",
        answers:[
            { text : "Perth", correct: false },
            { text : "Sydney", correct: false },
            { text : "Melbourne", correct: false },
            { text : "Canberra", correct: true }
        ]
    },
    {
        question: "Which planet is known as the \"Red Planet\"?",
        answers:[
            { text : "Jupiter", correct: false },
            { text : "Earth", correct: false },
            { text : "Mars", correct: true },
            { text : "Saturn", correct: false }
        ]
    },
    {
        question: "Who invented the telephone?",
        answers:[
            { text : "Alexander Graham Bell", correct: true },
            { text : "Thomas Edison", correct: false },
            { text : "Nicholas Tesla", correct: false },
            { text : "Galileo Galilei", correct: false }
        ]
    },
    {
        question: "Which is the smallest ocean in the world?",
        answers:[
            { text : "Pacific ocean", correct: false },
            { text : "Artic ocean", correct: true },
            { text : "Indian ocean", correct: false },
            { text : "Atlantic ocean", correct: false }
        ]
    },
    {
        question: "In which year did India gain independence?",
        answers:[
            { text : "1950", correct: false },
            { text : "1949", correct: false },
            { text : "1947", correct: true },
            { text : "1948", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers:[
            { text : "Au", correct: true },
            { text : "Ag", correct: false },
            { text : "Go", correct: false },
            { text : "Gd", correct: false }
        ]
    },
    {
        question: "Who wrote the famous book \"The Origin of Species\"?",
        answers:[
            { text : "Isaac Newton", correct: false },
            { text : "Albert Einstein", correct: false },
            { text : "Charles Darwin", correct: true },
            { text : "Gregor Mendel", correct: false }
        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();}
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();