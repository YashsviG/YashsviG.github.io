const JWT = "JWT";
const token ="token";

const user_id = "id";
const MEME_ID = "MEMEID";

const descId = "#description";
const titleId = '#title';

const Content_Type = "Content-Type";
const application_type =  "application/json";
const Authorization = "Authorization";

const method = 'PUT';
const redirect = "follow";

const url = "https://comp4537-termproject.herokuapp.com/api/v1/memePage/";
const view = "../views/viewMemePage.html";
const errorString = "error";

function getToken() {
    return JWT + " " + localStorage.getItem(token);
  }
  editMemePage = () => {
    let id = localStorage.getItem(user_id);
    let memeId = localStorage.getItem(MEME_ID);
   
    let description = $(descId).val();
    let title = $(titleId).val();
    const data = {
        id: id,
        description: description,
        title: title
    }
    console.log(data);
    let myHeaders = new Headers();
    myHeaders.append(Content_Type,application_type);
    myHeaders.append(Authorization,getToken())

    let requestOptions = {
    method: method,
    body:JSON.stringify(data),
    headers: myHeaders,
    redirect: redirect
    };

    fetch(url+memeId, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
          window.location.href = view;
        })
        .catch(error => console.log(errorString, error));
};
