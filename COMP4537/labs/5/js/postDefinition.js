const api = "https://sachit-yashi-lab5.herokuapp.com/api/definitions"

function validate(string){
    return string && string.match(/^[a-zA-Z\s]+$/);
}

function postDefinition(){
    let word = $("#word-input").val();
    console.log(word);
    if(!validate(word)){
        alert("Word not valid.");
        return;
    }
    let definition = $("#definition-input").val();
    console.log(definition);
    if(!validate(definition)){
        alert("Definition not valid.");
        return;
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${api}/${word}`, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4&& this.status == 200){
            let response = JSON.parse(this.responseText);
            alert(`${response.word} : ${response.definition}`);
        } else if(this.readyState == 4 && this.status != 200){
            let response = JSON.parse(this.responseText);
            alert(response.message);
        }
    };
    xhttp.send(`definition=${definition}`);
}

$("#submit-button").click(postDefinition);
$("#search-button").click(()=> { window.location.href = "./search.html"})