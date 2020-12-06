const JWT = "JWT";
const tokenString ="token";

const signUpString = "signUp";
const signInString = "signIn";

const user_id = "id";
const MEME_ID = "MEMEID";
const descId = "#description";
const titleId = '#title';

const containerID = "#memeList";

const Content_Type = "Content-Type";
const application_type =  "application/json";
const Authorization = "Authorization";

const method = 'GET';
const redirect = "follow";

const url = "https://comp4537-termproject.herokuapp.com/api/v1/memeList";
const view = "../views/login.html";
const errorString = "error";

function getToken() {
    return JWT + " " + localStorage.getItem(tokenString);
  }
const token = getToken()
const userId = localStorage.getItem(user_id);

const container = $(containerID);

let populateMemeList = (memeList)=>{
    
    memeList.data.forEach((meme)=>{
        
        let memeView = $(`<div class="col mb-4" style="flex: 0 0 33.333%;display: flex;">
        <div class="card">
        <div class="card-body" id="${meme.id}">
        <h5 class="card-title">${meme.title}</h5>
        <img src = "${meme.images.fixed_height.url}">
        <div class="container">
        
        </div>
        </div></div></div>`);
         container.append(memeView);
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
fetch(url, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMemeList(result);
})
.catch(error => error.then(msg => alert(msg.message)));