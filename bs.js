// import { favourite } from "./api.js";

// https://jsonplaceholder.typicode.com/

export async function postSomething(title, body){
    try{
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }catch(err){
        console.log(err);
    }
}