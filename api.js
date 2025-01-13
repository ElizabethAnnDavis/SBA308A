import * as fauxAPIdata from "./bs.js"
// import { favourite } from "./app.js";
export const questions = [];

export async function getQuestionsArray(){
    console.log("In getQuestionsArray");
    let ques = await getQuestions();
    console.log("after call");
    return questions;
}

export async function getQuestions(){
    try{
        console.log("In getQuestions");
        const resp = await axios.get('https://api.sampleapis.com/avatar/questions');
        const json = resp.data;
        console.log(json)

        for(let i = 0; i < json.length; i++){
            const questObj = 
            {
                question: json[i].question,
                options: json[i].possibleAnsers,
                answer: json[i].correctAnswer
            };

            questions.push(questObj);
        }
        return(json);
    }catch(err) {
        console.log(err);
    };
}

export async function getShowInfo(){
    try{
        console.log("In getShowInfo");
        const resp = await axios.get('https://api.sampleapis.com/avatar/info');
        const json = resp.data;
        console.log(json)

        return(json);
    }catch(err){
        console.log(err);
    }
}

export async function getEpisodeInfo(){
    try{
        console.log("In getEpisodeInfo");
        const resp = await axios.get('https://api.sampleapis.com/avatar/episodes');
        const json = resp.data;
        console.log(json)

        return(json);
    }catch(err){
        console.log(err);
    }
}

export async function getCharacterInfo(){
    try{
        console.log("In getCharacterInfo");
        const resp = await axios.get('https://api.sampleapis.com/avatar/characters');
        const json = resp.data;
        console.log(json)

        return(json);
    }catch(err){
        console.log(err);
    }
}