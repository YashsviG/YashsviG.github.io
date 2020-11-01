// ========== START of  Game Logic ==========   
// ========== Declaring variables ==========   
let gameStart = false;
let answer;
let level = 1;
let totalScore = 0;
let scoreYouGot = 0;
let round = 1;
let  rows = 2;
let columns = 2;
let userChoice = 0;
let rowswitch = true;
let failed = false;
let name;

// ========== Generating random numbers for the rows and column ==========   
function randomNumberGenerator(){
    let ranArray = []
    var min ;
    var max;
    if(rowswitch){
            min = rows;
            max = columns;
    }
    else{
        min = columns;
        max = rows;
    }
     
    while(ranArray.length != (min)){
        let ranNum = Math.floor(Math.random() * Math.floor(max*min));
        if(!(ranArray.indexOf(ranNum)>-1)){
                ranArray.push(ranNum);
            }
    }
    console.log(ranArray);
    return ranArray;
}

// ========== Show blocks to the user ==========   
async function showBlocks(){

    answer = randomNumberGenerator();
    let blocks = document.getElementsByClassName('box');
    for(let i = 0; i < answer.length; i++){
        blocks[answer[i]].children[1].style.backgroundColor = '#37A8E8';
        flip(answer[i]);
    }
    setTimeout( () => {
        for(let i = 0; i < answer.length; i++){
            flip(answer[i]);
        }
    }, 2000)
    await setTimeout( () => {
        rotation();
    }, 3500)

    setTimeout(enableChoose, 3600); 
}

// ========== Locates the box on the game board ==========   
function boxLocate(){
    let board = document.getElementById("game-board");
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            console.log("at level" + level);
          //  console.log("level : " + level + "boxlocate" );
            let box = document.createElement("div"); 
            box.classList.add("box");
            let front = document.createElement("div"); 
            front.classList.add("front");
            let back = document.createElement("div"); 
            back.classList.add("back");
            box.appendChild(front);
            box.appendChild(back);
            board.appendChild(box);
        }
    }
    
}

// ========== Flips the cards ==========   
function flip(index){
    let blocks = document.getElementsByClassName('box');
    if(blocks[index].classList.contains("is-flipped")){
        blocks[index].classList.remove("is-flipped");
    } else {
        blocks[index].classList.add("is-flipped");
    }
}

// ========== Checking the selected box tile on click ==========   
function choose(index){
    if(gameStart){
        let boxes = document.getElementsByClassName('box');
        boxes[index].removeAttribute("onclick")
        if(answer.indexOf(index) > -1){
            totalScore++;
            scoreYouGot++;
        } else {
            totalScore--;
            failed = true;
            if(rows >3 && columns >3){
            set_difficulty();}
        }

        if(totalScore <= 0){
            alert('Sorry, you lost');
            negative_score();
        }

        document.getElementById('score').textContent = totalScore;
        flip(index);
        userChoice++;

    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }
        if(userChoice == answer.length){
            userChoice = 0;
            disableChoose();
            setTimeout(nextGame,1000);
        }
    }
}

// ========== Rotating the box after showing tiles ==========   
function rotation(){
    let board = document.getElementById("game-board");
    board.classList.add("rotation");
}

// ========== Starts a new game and resets all variables ==========   
function newGame(){

    gameStart = true;
    reset()
    score = 0;
    level = 1;
    rows=2;
    columns=2;
    let gameBoard = document.getElementById('game-board');
    gameBoard.classList.remove('rotation');
    gameBoard.style.gridTemplateColumns = "repeat("+(rows)+",50px)"; 
    gameBoard.style.gridTemplateRows = "repeat("+(columns)+",50px)";

    var child = gameBoard.lastElementChild;  
    while (child) { 
        gameBoard.removeChild(child); 
        child = gameBoard.lastElementChild; 
    }
    

    boxLocate();

    setTimeout(showBlocks,500);
    setTimeout(rotation,5000);
    
}

// ========== Restarts the game and resets the score board ==========   
function restart(){
    newGame();
    console.log(level);
    console.log(score);
    document.getElementById('score').innerHTML = score;
    document.getElementById('level').innerHTML = level;
}

// ========== Setting diffulty level depending on the users answers ==========
function set_difficulty(){
    if(failed){
        if(rowswitch){
            rows--;
        
        }else{
            columns--;
        }
    }
}

// ========== Plays level change/up sound ==========
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// ========== Sets the sound from the resources ==========
function nextLevelSound(){
    let mySound = new sound("./source/audio/levelChange.mp3");
    mySound.play();
}

// ========== changing level, adding columns ==========
function nextGame(){
    console.log("rows"+rows);
    console.log("columns"+columns);
    if(rows == 7 && columns==7){
        terminate();
    }
    
   
      if(scoreYouGot > 0){
        level++;
       
        if(rowswitch){
            rows++;
            rowswitch = false;
        }else{
            columns++;
            rowswitch = true;
        }
    }  else if(scoreYouGot < level + 1) {
        if(level != 1){
            level--;
        }
    }
    document.getElementById('level').textContent = level; 
    let gameBoard = document.getElementById('game-board');
    reset();
    gameBoard.classList.remove('rotation');
    var child = gameBoard.lastElementChild;  
    while (child) { 
        gameBoard.removeChild(child); 
        child = gameBoard.lastElementChild; 
    } 
    
    gameBoard.style.gridTemplateRows = "repeat(" + (rows) + ", 50px)";
    gameBoard.style.gridTemplateColumns = "repeat(" + (columns) + ", 50px)";
    
    nextLevelSound();
    boxLocate();
    setTimeout(showBlocks,500);
    setTimeout(rotation,5000);
}

// ========== Resetting required variables ==========
function reset(){
    answer = null;
    scoreYouGot = 0;
    failed = false;
    
}

// ========== locating leaderboard ==========
function leaderBoard(){
    window.location.href="./game/leaderboard";   
}

// ========== Checking if the score is 0 or below for the game to terminate ==========
function negative_score(){
    document.getElementById("cred").innerHTML = "<input type = 'text' id = 'name' placeholder = 'Enter_name'/><br/><input type= 'button' value = 'Submit' onclick='Send_Data()'/><br/><span id = 'response'></span>"
        
}
// ========== Terminating the game ==========
async function terminate(){
    let r =confirm("Do you want to terminate this game?");
    if(r == true){
        document.getElementById("cred").innerHTML = "<input type = 'text' id = 'name' placeholder = 'Enter_name'/><br/><input type= 'button' value = 'Submit' onclick='Send_Data()'/><br/><span id = 'response'></span>"
        
        }    

    }

// ========== disable choose while showing blocks and rotating the box ==========    
function disableChoose(){
    let boxes = document.getElementsByClassName('box');
    var inc ;
    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }

    for(let i = 0; i <= (rows * columns - 1); i++){
        console.log("level : " + level + "loop disable" );
        boxes[i].removeAttribute("onclick")
    }
}

// ========== Enabling user interaction with the game ==========
function enableChoose(){
    let boxes = document.getElementsByClassName('box');
    var inc ;
    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }
    for(let i = 0; i <= ((rows * columns) -1); i++){
        console.log(i);
        boxes[i].setAttribute("onclick","choose("+i+");");
    }
    
}

// ========== Displaying data for leaderboard ==========
function Send_Data(){
    let x = new XMLHttpRequest();
    let name = document.getElementById("name").value;
    x.open("GET", "https://chilling-skeleton-57875.herokuapp.com/?name="+name+"&score="+totalScore,true);
    x.send();
    x.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        localStorage.setItem('list',this.responseText);
    }
    };
    let t = "";
    let posts_array = JSON.parse(localStorage.getItem('list'));
    console.log(posts_array);
    
    for (let i = 0; i < posts_array.length; i++){
          var tr = "<tr>";
          tr += "<td>"+posts_array[i].score+"</td>";
          tr += "<td>" + "&nbsp;&nbsp;"+"</td>";
          tr += "<td>"+posts_array[i].name+"</td>";
          tr += "</tr><br>";
          t += tr;
    }
    document.getElementById("data").innerHTML += t;
}

// ========== Starts the Game by calling required functions ==========
function start(){
    boxLocate();
    newGame();
    
}