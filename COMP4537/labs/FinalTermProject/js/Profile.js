function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}
getInfo = () => {
    let name = $("#name");
    let email = $("#email");
    let password = $("#password");
    let id = localStorage.getItem("id");
    const data = {
        id:id,
    }

    console.log(data);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",getToken())

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch("https://comp4537-termproject.herokuapp.com/api/v1/user/"+id, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
        name.val(data.username)
        email.val(data.email)
        password.val(data.password)
        })

        .catch(error => console.log('error', error));
};
getInfo();

updateInfo = () => {
  console.log("IN save changes");
  let id = localStorage.getItem("id");
  console.log("ID", id);
  let name = $("#name").val()
  let email = $("#email").val()
  let pass = $("#password").val()
  const data = {
    name : name,
    email : email,
    password:pass
}

console.log(data);
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'PUT',
body:JSON.stringify(data),
headers: myHeaders,
redirect: 'follow'
};
fetch("https://comp4537-termproject.herokuapp.com/api/v1/user/"+id, requestOptions)
    .then(response => response.json())
    .then(getInfo())
    .catch(error => console.log('error', error));
     

}

deleteInfo = () => {
 
  let id = localStorage.getItem("id");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",getToken())

  let requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
  };
  fetch("https://comp4537-termproject.herokuapp.com/api/v1/user/"+id, requestOptions)
      .then(response => {response.json()
      window.location.href = "../views/login.html"}
      )
      .catch(error => console.log('error', error));

  }

  launchCreate = () => 
  {
    window.location.href = "../views/createMemePage.html";
  }
  launchViewMemePage = () =>
  {
    window.location.href = "../views/viewMemePage.html";
  }

  launchViewMeme = () =>
  {
    window.location.href = "../views/MemeList.html";
  }

  launchViewYourMeme = () =>
  {
    window.location.href = "../views/yourMemeList.html";
  }