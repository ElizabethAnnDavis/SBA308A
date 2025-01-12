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

let quizQuestions = [];
let score = 0;
let currentQuestionIndex = 0;
let isFirstRun = true;



async function loadQuestions(){
    try{
        let questions = await APIdata.getQuestionsArray();
        for(let i = 0; i < questions.length; i++){
            //console.log("QUESTIONS " + i + ": " + questions[i].question);
            //console.log("CHOICES " + i + ": " + questions[i].options);
            //console.log("ANSWER " + i + ": " + questions[i].answer);

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
        alert(`You are about to start this quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);
        console.log(`You are about to start this quiz.\nIt has ${quizQuestions.length} questions.\nGood luck!`);
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
    pageTitle.innerHTML = "";
    let optionsStr = "";
    console.log(quizQuestions.length);

    displayQuestion();

    //console.log("currentQuestionIndex: " + currentQuestionIndex);
    //console.log("quizQuestions.length: " + quizQuestions.length);

    //if (currentQuestionIndex >= quizQuestions.length) {
      //  displayResults();
    //};
    //for(let i = 0; i < quizQuestions.length; i++){
        //if(i != 0){
          //  clearForm();
        //};
        //pageTitle.innerHTML = `QUESTION ${i+1}`;
        
        // create form element (quizQuestions[i].options)
        /*setFormQuestion(quizQuestions[i].options);

        //console.log(i);
        optionsStr = "";
        for(let j = 0; j < quizQuestions[i].options.length; j++){
            if(j === 0){
                optionsStr = `${quizQuestions[i].options[j]}`;
            }else{
                optionsStr = `${optionsStr}\n${j+1}. ${quizQuestions[i].options[j]}`
            };
            //console.log(optionsStr);
        };
        //console.log(optionsStr);
        
        let userAnswer = prompt(`QUESTION ${i+1}:(enter your answer)\n${quizQuestions[i].question}\n1. ${optionsStr}`);
        console.log(`QUESTION ${i+1}:(enter your answer)\n${quizQuestions[i].question}\n1. ${optionsStr}`);
        */
        /*if((userAnswer.trim())-1 === quizQuestions[i].answer){
            //alert("✔️ Correct!");
            console.log("✔️ Correct! OP:1");
            score++;
        }else */
        /*
        if(userAnswer.trim().toLowerCase() === quizQuestions[i].answer.toLowerCase()){
            //alert("✔️ Correct!");
            console.log("✔️ Correct!");
            score++;
        }else{
            //alert(`❌ Wrong!\nThe correct answer was: ${quizQuestions[i].answer}`);
            console.log(`❌ Wrong!\nThe correct answer was: ${quizQuestions[i].answer}`);
        };*/
        
    //};
}

// Function to display the question and answers
function displayQuestion() {
    const formContainer = document.querySelector('.center');
    formContainer.innerHTML = '';  // Clear any previous content

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
        
        // Check if the selected answer is correct
        const selectedOption = form.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const isCorrect = selectedOption.value === questionObj.answer;
            if(isCorrect){
                score++;
            }
            alert(isCorrect ? '✔️ Correct!' : `❌ Wrong!\nThe correct answer was: ${questionObj.answer}`); // Show whether the answer is correct or not
        }

        // Remove the question and options when an answer is selected
        currentQuestionIndex++;
        displayQuestion();
    });

    formContainer.appendChild(form);
}

// Start by displaying the first question
//displayQuestion();







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
            //You need to focus.\nHave some calming tea.
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


/*
<form>
    <input type="radio" id="vehicle1" name="vehicle" value="Bike">
    <label for="vehicle1"> I have a bike</label><br>
    <input type="radio" id="vehicle2" name="vehicle" value="Car">
    <label for="vehicle2"> I have a car</label><br>
    <input type="radio" id="vehicle3" name="vehicle" value="Boat">
    <label for="vehicle3"> I have a boat</label><br><br>
    <input type="submit" value="Submit">
</form>

    // Create the radio button
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'choice'; // Use the same name for grouping
    radioButton.value = 'choice1';
    radioButton.id = 'choice1';

    // Create the label
    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.textContent = option.label;

    // Append the radio button and label to the container
    container.appendChild(radioButton);
    container.appendChild(label);
    container.appendChild(document.createElement('br')); // Add a line break
*/
function setFormQuestion(quesArr){
    for(let i = 0; i < quesArr.length; i++){
        const id = `${quesArr[i]}${i+1}`;

        // Create the radio button
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'choice'; // Use the same name for grouping
        radioButton.value = id;
        radioButton.id = id;

        // Create the label
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = quesArr[i];

        form.appendChild(radioButton);
        form.appendChild(label);
        form.appendChild(document.createElement('br')); // Add a line break
    };
    center.appendChild(form);
}

function clearFormQuestion(quesArr){
    form.removeChild(form);
}

function clearForm(){
    //center.removeChild(form);
    center.innerHTML = "";
}