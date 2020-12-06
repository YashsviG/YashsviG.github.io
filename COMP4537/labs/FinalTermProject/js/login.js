const JWT = "JWT";
const token ="token";

const signUpString = "signUp";
const signInString = "signIn";

const user_id = "id";
const MEME_ID = "MEMEID";
const descId = "#description";
const titleId = '#title';

const Content_Type = "Content-Type";
const application_type =  "application/json";
const Authorization = "Authorization";

const method = 'POST';
const redirect = "follow";

const url = "https://comp4537-termproject.herokuapp.com/api/v1/user/create";
const view = "../views/login.html";
const errorString = "error";

function getToken() {
    return JWT + " " + localStorage.getItem(token);
  }
const signUpButton = document.getElementById(signUpString);
const signInButton = document.getElementById(signInString);
const host = "https://comp4537-termproject.herokuapp.com";


signUp= () => {

	const username = "#user";
	const password ="#pass";
	const emailId = "#email";

	const user = $(username).val();
	const pass = $(password).val();
	const email = $(emailId).val();
	
	const data = {
		username:user,
		password:pass,
		email:email
	}

	let myHeaders = new Headers();
	
	myHeaders.append(Content_Type, application_type);

	let requestOptions = {
	method: method,
	headers: myHeaders,
	body:JSON.stringify(data),
	redirect: redirect
	};

	
	fetch(url, requestOptions)
	.then((response) => {
		if (response.status == 409) throw response.json()
		window.location.href = view;
		return response.json()

	})


	.catch(error => error.then(msg => alert(msg.message)));
};


const url2 = "https://comp4537-termproject.herokuapp.com/api/v1/login";
const view2 = "../views/Profile.html";

signIn = () => {
	const username = "#username";
	const password = "#password";

	const user = $(username).val();
	const pass = $(password).val();
	const data = {
		username:user,
		password:pass,
	}

	let myHeaders = new Headers();
	
	myHeaders.append(Content_Type, application_type);

	let requestOptions = {
	method: method,
	body:JSON.stringify(data),
	headers: myHeaders,
	redirect: redirect
	};
	fetch(url2, requestOptions)
		.then(response => response.json())
		.then((result) => {
			localStorage.setItem(token, result.token);
			localStorage.setItem(user_id, result.id);

			if(localStorage.getItem(token) !== null)
			{
				window.location.href = view2;
			}
			
		})
		.catch(error => console.log(errorString, error));
};