const api = "https://sachit-yashi-lab5.herokuapp.com/api/definitions"

function validate(string){
    return string && string.match(/^[a-zA-Z\s]+$/);
}

function getDefinition(){
    let word = $("#word-input").val();
    console.log(word);
    if(!validate(word)){
        alert("Word not valid.");
        return;
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${api}/${word}`, true);
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4&& this.status == 200){
            let response = JSON.parse(this.responseText);
            $("#word-field").text(response.word);
            $("#definition-field").text(response.definition);
        } else if(this.readyState == 4 && this.status != 200){
            let response = JSON.parse(this.responseText);
            alert(response.message);
        }
    };
    xhttp.send();
}

$("#submit-button").click(getDefinition);