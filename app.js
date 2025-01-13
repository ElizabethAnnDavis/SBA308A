import * as APIdata from "./api.js"
import * as fauxAPIdata from "./bs.js"


const container = document.querySelector('.container');
const contentContainer = document.querySelector('.contentContainer');
const pageTitle = document.querySelector('.pageTitle');
const formContainer = document.querySelector('.center');
const startBtn = document.querySelector('.startBtn');
const moreOptions = document.querySelector('.moreOptions');
const add = document.querySelector('.add');
const learn = document.querySelector('.learn');

const searchContainer = document.createElement('div');
searchContainer.id = 'searchContainer';

const btnContainer = document.createElement('div');
btnContainer.id = 'btnContainer';

const showInfo = document.createElement('div');
showInfo.id = 'showInfoId';
const synopsisEle = document.createElement('p');
const creators = document.createElement('p');

const charInfo = document.createElement('button');
charInfo.id = 'characterBtn';
charInfo.innerHTML = 'GET CHARACTER INFOMATION';
const charSearch = document.createElement('select');
charSearch.id = 'charSearch';

const epiInfo = document.createElement('button');
epiInfo.id = 'episodeBtn';
epiInfo.innerHTML = 'GET EPISODE INFOMATION';
const epiSearch = document.createElement('select');
epiSearch.id = 'epiSearch';


const studyQues = document.createElement('button');
studyQues.id = 'studyBtn';
studyQues.innerHTML = 'STUDY FOR THE QUIZ';

let quizQuestions = [];
let tenQuestions = [];

let showData = {};
let charData = {};
let epiData = {};

let score = 0;
let currentQuestionIndex = 0;
let isFirstRun = true;
let entryID = 0;

/*******************************************/
/*              GET INFO CODE              */
/*******************************************/
async function getInfo(){
    try{
        showData = await APIdata.getShowInfo();
        console.log(showData[0].synopsis);
        console.log(showData[0].creators);

        charData = await APIdata.getCharacterInfo();
        epiData = await APIdata.getEpisodeInfo();

        createInfoSection();
    }catch(err){
        console.log(err);
    };
}
learn.addEventListener('click', getInfo);

async function createInfoSection(){
    try{
        charSearch.hidden = true;
        epiSearch.hidden = true;
        synopsisEle.innerHTML = showData[0].synopsis;
        //synopsisEle.hidden = false;
        //searchContainer.appendChild(charSearch);
        //searchContainer.appendChild(epiSearch);

        showInfo.appendChild(searchContainer);
        showInfo.appendChild(synopsisEle);
        showInfo.appendChild(creators);

        btnContainer.appendChild(charInfo);
        btnContainer.appendChild(epiInfo);
        
        formContainer.appendChild(showInfo);
        formContainer.appendChild(btnContainer);
        //formContainer.appendChild(studyQues);

        //console.log("HOW MANY KIDS: " + formContainer.children.length);
    }catch(err){
        console.log(err);
    };
}

function characterSearch(){
    charSearch.hidden = false;
    epiSearch.hidden = true;
    synopsisEle.innerHTML = "";

    if(epiSearch.children.length > 0){
        resetContainer(searchContainer);
    };

    for (let i = 0; i < charData.length; i++) {
        const option = document.createElement("option");

        option.value = charData[i].name;
        option.textContent = charData[i].name;
        //console.log(charData[i].name);

        charSearch.appendChild(option);
    }
    searchContainer.appendChild(charSearch);
    retrieveCharactorsInformation();
}
charInfo.addEventListener('click', characterSearch);

function retrieveCharactorsInformation(){
    let thisChar = charSearch.value;
    console.log(thisChar);

    let description = "";
    console.log("before the for");
    for (let i = 0; i < charData.length; i++) {
        //console.log("Selected value:", thisChar);
        //console.log("Option value:", charData[i].value);
        if (charData[i].name === thisChar) {
            //console.log(charData[i])
            //console.log(charData[i].physicalDescription)
            //console.log(charData[i].bio.ethnicity)
            description = `${thisChar}\ngender: ${charData[i].physicalDescription.gender}\neye color: ${charData[i].physicalDescription.eyeColor}\nhair color: ${charData[i].physicalDescription.hairColor}\nnation: ${charData[i].bio.ethnicity}`;
            console.log(description);
            break;
        }
    }
    synopsisEle.innerHTML = description;
}
charSearch.addEventListener("change", retrieveCharactorsInformation);


function searchEpisodes(){
    charSearch.hidden = true;
    epiSearch.hidden = false;
    synopsisEle.innerHTML = "";

    if(charSearch.children.length > 0){
        resetContainer(searchContainer);
    };

    for (let i = 0; i < 3; i++) {
        const option = document.createElement("option");

        option.value = `${i+1}`;
        option.textContent = `Season ${i+1}`;
        //console.log`Season ${i+1}`;

        epiSearch.appendChild(option);
    }
    searchContainer.appendChild(epiSearch);
    retrieveEpisodeInformation();
}
epiInfo.addEventListener('click', searchEpisodes);


function retrieveEpisodeInformation(){
    let thisSeason = epiSearch.value;
    console.log(thisSeason);
    let start = 0;
    let stop = 20;

    let description = "";
    console.log("before the for");
    for (let i = 0; i < epiData.length; i++) {
        console.log("Selected value:", thisSeason);
        console.log("Option value:", epiData[i].Season);
        console.log(Number(epiData[i].Season) === Number(thisSeason));
        if (Number(epiData[i].Season) === Number(thisSeason)) {
            if(Number(thisSeason) === 1){
                start = 0;
                stop = 20;
                break;
            }else if(Number(thisSeason) === 2){
                start = 20;
                stop = 40;
                break;
            }else{//Number(thisSeason) === 3
                start = 40;
                stop = 61;
                break;
            };
            //break;

            //console.log(charData[i])
            //console.log(charData[i].physicalDescription)
            //console.log(charData[i].bio.ethnicity)
            //description = //`${thisChar}\ngender: ${charData[i].physicalDescription.gender}\neye color: ${charData[i].physicalDescription.eyeColor}\nhair color: ${charData[i].physicalDescription.hairColor}\nnation: ${charData[i].bio.ethnicity}`;
            //console.log(description);
            //break;
        };
    }
    description = "";
    for(let j = start; j < stop; j++){
        console.log(j);
        //console.log(epiData[j].Season);
        //console.log(epiData[j].NumInSeason);
        //console.log(epiData[j].Title);

        description = `${description}\n - Season ${epiData[j].Season} Episode ${epiData[j].NumInSeason}: ${epiData[j].Title}`;
    };
    console.log(description);
    synopsisEle.innerHTML = description;
}
epiSearch.addEventListener("change", retrieveEpisodeInformation);


//listEpisodes
//studyQues.addEventListener('click', practiceQuiz);



function resetContainer(element){
    let numOfChildren = element.children.length;
    for(let i = 0; i < numOfChildren; i++){
        console.log("HOW MANY KIDS: " + element.children.length);
        element.removeChild(element.children[0]);
    };
    console.log("HOW MANY KIDS: " + element.children.length);
}




/*******************************************/
/*              ADD INFO CODE              */
/*******************************************/
async function addInfo(){
    entryID++;
    let title = prompt('Title your entry:')
    let body = prompt('What would you like to add?');
    let id = entryID;
    try{
        await fauxAPIdata.postSomething(title, body, id);
    }catch(err){
        console.log(err);
    }
}
add.addEventListener('click', addInfo);




/*******************************************/
/*                QUIZ CODE                */
/*******************************************/
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
    //startBtn.style.display = 'none';
    startBtn.hidden = true;
    score = 0;
    currentQuestionIndex = 0;
    resetContainer(formContainer);

    try{
        if(isFirstRun){
            await loadQuestions();
            isFirstRun = false;
        };
        alert(`You are about to start the quiz.\nIt has 10 questions.\nGood luck!`);
        console.log(`You are about to start the quiz.\nIt has 10 questions.\nGood luck!`);
        setTenQuestions();
        runQuiz();
    }catch(err){
        console.log(err);
    };
}
startBtn.addEventListener('click', startQuiz);

function setTenQuestions(){
    for(let i = 0; i < 10; i++){
        tenQuestions.push(quizQuestions[Math.floor(Math.random() * (35)) + 1])
    };
    console.log(tenQuestions);
}

function clearTenQuestions(){
    let arrLen = tenQuestions.length;
    for(let i = 0; i < arrLen; i++){
        tenQuestions.pop();
    };
    console.log(tenQuestions);
}

function runQuiz(){
    pageTitle.innerHTML = "";
    displayQuestion();
}

// Function to display the question and answers
function displayQuestion() {
    formContainer.innerHTML = '';

    if (currentQuestionIndex >= tenQuestions.length) {
        pageTitle.innerHTML = "Thank you for completing the quiz!";
        displayResults();
        return;
    }else{
        pageTitle.innerHTML = `QUESTION ${currentQuestionIndex+1}`;
    }

    const questionObj = tenQuestions[currentQuestionIndex];

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
    if(score === tenQuestions.length){
        alert(`Follow Your Passion and Life Will Reward You.\nPERFECT SCORE!\nCongrats you got ${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
        console.log(`Follow Your Passion and Life Will Reward You.\nPERFECT SCORE!\nCongrats you got ${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
    }else if(score <= tenQuestions.length/2){
        if(score === 0){
            alert(`You must redeem your honour!?\n${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
            console.log(`You must redeem your honour!\n${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
        }else{
            alert(`Failure is only the opportunity to begin again. Only this time, more wisely.\n${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
            console.log(`Failure is only the opportunity to begin again. Only this time, more wisely.\n${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
        };
    }else if(score <= (tenQuestions.length/4)*3){
        alert(`Good times become good memories, but bad times make good lessons.\nYou got ${score}/$tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
        console.log(`Good times become good memories, but bad times make good lessons.\nYou got ${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
    }else{
        alert(`It is usually best to admit mistakes when they occur, and to seek to restore honor.\nYou got ${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
        console.log(`It is usually best to admit mistakes when they occur, and to seek to restore honor.\nYou got ${score}/${tenQuestions.length}, ${(score/tenQuestions.length)*100}%`);
    };
    startBtn.hidden = false;
}