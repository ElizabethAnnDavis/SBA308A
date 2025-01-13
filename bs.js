// import { favourite } from "./api.js";

// https://jsonplaceholder.typicode.com/
export const addedPosts = [];

export async function postSomething(title, body, id){
    //console.log(`TITLE: ${title}\nBODY: ${body}\nID: ${id}`);
    const newPost = 
    {
        title: title,
        body: body,
        userId: id
    };
    addedPosts.push(newPost);
    console.log(addedPosts);
    try{
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }catch(err){
        console.log(err);
    }
}