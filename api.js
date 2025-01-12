// import { favourite } from "./app.js";
export const questions = [];

export async function getQuestionsArray(){
    console.log("In getQuestionsArray");
    let ques = await getQuestions();
    console.log("after call");
    //ques.then((data) => {
        //for(let i = 0; i < questions.length; i++){
            //console.log("QUESTIONS " + i + ": " + questions[i].question);
            //console.log("CHOICES " + i + ": " + questions[i].options);
            //console.log("ANSWER " + i + ": " + questions[i].answer);
        //};
    return questions;
    //});
    //return questions;
}

export async function getQuestions(){
    try{
        //const questions = [];
        console.log("In getQuestions");
        const resp = await axios.get('https://api.sampleapis.com/avatar/questions');
        const json = resp.data;
        console.log(json)

        for(let i = 0; i < json.length; i++){
            //console.log("QUESTION " + i + ": " + json[i].question);
            //console.log("CHOICES " + i + ": " + json[i].possibleAnsers);
            //console.log("ANSWER " + i + ": " + json[i].correctAnswer);

            const questObj = 
            {
                question: json[i].question,
                options: json[i].possibleAnsers,
                answer: json[i].correctAnswer
            };

            questions.push(questObj);
        }
        //console.log("ARRAY: " + questions[0].options);

        return(json);
    }catch(err) {
        console.log(err);
    };
}