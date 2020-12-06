const JWT = "JWT";
const tokenString ="token";

const signUpString = "signUp";
const signInString = "signIn";

const user_id = "userId";
const logOut = "Logged out";
const MEME_ID = "MEMEID";
const descId = "#description";
const titleId = '#title';

const containerID = "#myQuizzes";

const Content_Type = "Content-Type";
const application_type =  "application/json";
const Authorization = "Authorization";

const method = 'GET';
const redirect = "follow";

const url = "https://comp4537-termproject.herokuapp.com/api/v1/memeList";
const view = "../views/login.html";
const errorString = "error";

if(!localStorage.getItem(tokenString) || !localStorage.getItem(user_id) ){
    alert(logOut);
    window.location.href = view;
}
const token = `JWT ${localStorage.getItem(tokenString)}`
const userId = localStorage.getItem(user_id);

const container = $(containerID);

let populateMyMemePage = (memePage)=>{
    memePage.forEach((memePage)=>{
        let viewMemePage = $(`<div id="memePage${meme.id}">
        <p>${memePage.title}</p>
        <p>${memePage.description}</p>
        </div>`);
        viewMemePage.click(()=>{
            window.location.href = `../views/editMeme.html/?memePage=${meme.id}`
        })
        container.append(viewMemePage);
    })
}


let myHeaders = new Headers();
myHeaders.append(Content_Type, application_type);
myHeaders.append(Authorization, token);

let requestOptions = {
method: method,
headers: myHeaders,
redirect: redirect
};
fetch(`https://comp4537-termproject.herokuapp.com/api/v1/user/${userId}/memePage`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMyMemePage(result);
})
.catch(error => error.then(msg => alert(msg.message)));

