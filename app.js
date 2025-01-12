import * as APIdata from "./api.js"
import * as fauxAPIdata from "./bs.js"

// https://i.pinimg.com/originals/f5/3b/0a/f53b0a3b95e0f35eb8d479220518964e.jpg
// https://external-preview.redd.it/zrJcTeRyLSrt3tbf8lCJIbi3cMx6s8AiKATGq2iaSrU.png?width=640&crop=smart&auto=webp&s=40d5c8c79fb1e75e7508804a7c42a634ee31247f


const container = document.querySelector('.container');
const contentContainer = document.querySelector('.contentContainer');
const pageTitle = document.querySelector('.pageTitle');
//const center = document.querySelector('.center');
const startBtn = document.querySelector('.startBtn');

//const form = document.createElement('form');

const moreOptions = document.querySelector('.moreOptions');
const add = document.querySelector('.add');
const learn = document.querySelector('.learn');


let quizQuestions = [];
let score = 0;
let currentQuestionIndex = 0;
let isFirstRun = true;



async function loadQuestions(){
    try{
        let questions = await APIdata.getQuestionsArray();
        for(let i = 0; i < questions.length; i++){
            quizQuestions.push(questions[i]);
        };
    }catch(err){
        console.log(err);
    };
}

async function startQuiz(e){
    pageTitle.innerHTML = "";
    pageTitle.innerHTML = "Good Luck!";
    startBtn.style.display = 'none';
    score = 0;
    currentQuestionIndex = 0;

    try{
        if(isFirstRun){
            await loadQuestions();
            isFirstRun = false;
        };
        alert(`You are about to start the quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);
        console.log(`You are about to start the quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);
        runQuiz();
    }catch(err){
        console.log(err);
    };
}
startBtn.addEventListener('click', startQuiz);

function runQuiz(){
    pageTitle.innerHTML = "";
    displayQuestion();
}

// Function to display the question and answers
function displayQuestion() {
    const formContainer = document.querySelector('.center');
    formContainer.innerHTML = '';

    if (currentQuestionIndex >= quizQuestions.length) {
        pageTitle.innerHTML = "Thank you for completing the quiz!";
        displayResults();
        return;
    }else{
        pageTitle.innerHTML = `QUESTION ${currentQuestionIndex+1}`;
    }

    const questionObj = quizQuestions[currentQuestionIndex];

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = questionObj.question;
    formContainer.appendChild(questionTitle);

    const form = document.createElement('form');

    questionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        input.id = 'option' + index;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'GUESS';
    form.appendChild(submitButton);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const selectedOption = form.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const isCorrect = selectedOption.value === questionObj.answer;
            if(isCorrect){
                score++;
            }
            alert(isCorrect ? '✔️ Correct!' : `❌ Wrong!\nYou need to focus. Have some calming tea.\nCORRECT ANSWER: ${questionObj.answer}`);
        }
        currentQuestionIndex++;
        displayQuestion();
    });

    formContainer.appendChild(form);
}

function displayResults(){
    if(score === quizQuestions.length){
        alert(`Follow Your Passion and Life Will Reward You.\nPERFECT SCORE!\nCongrats you got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        console.log(`Follow Your Passion and Life Will Reward You.\nPERFECT SCORE!\nCongrats you got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
    }else if(score <= quizQuestions.length/2){
        if(score === 0){
            alert(`You must redeem your honour!?\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
            console.log(`You must redeem your honour!\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        }else{
            alert(`Failure is only the opportunity to begin again. Only this time, more wisely.\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
            console.log(`Failure is only the opportunity to begin again. Only this time, more wisely.\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        };
    }else if(score <= (quizQuestions.length/4)*3){
        alert(`Good times become good memories, but bad times make good lessons.\nYou got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        console.log(`Good times become good memories, but bad times make good lessons.\nYou got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
    }else{
        alert(`It is usually best to admit mistakes when they occur, and to seek to restore honor.\nYou got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        console.log(`It is usually best to admit mistakes when they occur, and to seek to restore honor.\nYou got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
    };
    startBtn.style.display = 'block';
}