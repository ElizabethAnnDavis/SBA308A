import * as APIdata from "./api.js"

// https://i.pinimg.com/originals/f5/3b/0a/f53b0a3b95e0f35eb8d479220518964e.jpg
// https://external-preview.redd.it/zrJcTeRyLSrt3tbf8lCJIbi3cMx6s8AiKATGq2iaSrU.png?width=640&crop=smart&auto=webp&s=40d5c8c79fb1e75e7508804a7c42a634ee31247f


const container = document.querySelector('.container');
const contentContainer = document.querySelector('.contentContainer');
const pageTitle = document.querySelector('.pageTitle');
const center = document.querySelector('.center');
const startBtn = document.querySelector('.startBtn');

let quizQuestions = [];
let score = 0;



async function loadQuestions(){
    try{
        let questions = await APIdata.getQuestionsArray();
        for(let i = 0; i < questions.length; i++){
            console.log("QUESTIONS " + i + ": " + questions[i].question);
            console.log("CHOICES " + i + ": " + questions[i].options);
            console.log("ANSWER " + i + ": " + questions[i].answer);

            quizQuestions.push(questions[i]);
        };
    }catch(err){
        console.log(err);
    };
}

async function startQuiz(e){
    alert(`You are about to start this quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);
    console.log(`You are about to start this quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);

    try{
        await loadQuestions();
        //testFunction();
        runQuiz();
    }catch(err){
        console.log(err);
    };
    //runQuiz();
}
startBtn.addEventListener('click', startQuiz);

function testFunction(){
    console.log(quizQuestions);
}


function runQuiz(){
    let optionsStr = "";
    for(let i = 0; i < quizQuestions.length; i++){
        optionsStr = "";
        for(let j = 0; j < quizQuestions[i].options.length; j++){
            if(j === 0){
                optionsStr = `1. ${quizQuestions[i].options[j]}`;
            }else{
                optionsStr = `${optionsStr}\n${j+1} ${quizQuestions[i].options[j]}`
            };
            //console.log(optionsStr);
        };
        console.log(optionsStr);
        /*
        let userAnswer = prompt(`QUESTION 1:(enter the number of your answer)\n${quizQuestions[i].question}\n1. ${quizQuestions[i].options[0]}\n2. ${quizQuestions[i].options[1]}\n3. ${quizQuestions[i].options[2]}`);
        console.log(`QUESTION 1:(enter the number of your answer)\n${quizQuestions[i].question}\n1. ${quizQuestions[i].options[0]}\n2. ${quizQuestions[i].options[1]}\n3. ${quizQuestions[i].options[2]}`);

        if((userAnswer.trim())-1 === quizQuestions[i].answer){
            alert("✔️ Correct!");
            console.log("✔️ Correct!");
            score++;
        }else if(userAnswer.trim().toLowerCase() === quizQuestions[i].options[quizQuestions[i].answer].toLowerCase()){
            alert("✔️ Correct!");
            console.log("✔️ Correct!");
            score++;
        }else{
            alert(`❌ Wrong!\nThe correct answer was: ${quizQuestions[i].options[quizQuestions[i].answer]}`);
            console.log(`❌ Wrong!\nThe correct answer was: ${quizQuestions[i].options[quizQuestions[i].answer]}`);
        };
        */
    };
    //displayResults();
}

function displayResults(){
    if(score === quizQuestions.length){
        alert(`PERFECT SCORE!\nCongrats you got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        console.log(`PERFECT SCORE!\nCongrats you got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
    }else if(score <= quizQuestions.length/2){
        if(score === 0){
            alert(`Are you even trying?\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
            console.log(`Are you even trying?\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        }else{
            alert(`Please study some more.\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
            console.log(`Please study some more.\n${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        };
    }else{
        alert(`You got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
        console.log(`You got ${score}/${quizQuestions.length}, ${(score/quizQuestions.length)*100}%`);
    };
}