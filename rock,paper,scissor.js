let Result = 0;  // Score tracking
let autoplaying=false;

function autoplay(){
    if(!autoplaying){auto=setInterval(function(){
    const moves = ["rock", "paper", "scissor"];
    move = moves[Math.floor(Math.random() * moves.length)];
playgame=game(move);   
},1000);autoplaying=true;}
else{
 clearInterval(auto);
 autoplaying=false;
 }
}
function game(move){
let Result=localStorage.getItem("score")?parseInt(localStorage.getItem("score")) : 0;//checks if previous score is available else put 0
const variable1 = Math.random() * 3;  // Random number between 0 and 3
        let result = '';    
        // Assign rock, paper, or scissors based on random number
        if (variable1 <= 1) {
            result = 'rock';
        } else if (variable1 <= 2) {
            result = 'paper';
        } else {
            result = 'scissor';
        }

        console.log('Computer chose:', result);

        // Rock is always chosen by user (since they clicked the rock button)
        if(move==='rock'){
        if (result === 'rock') {
            console.log('Tie');
        } else if (result === 'scissor') {
            console.log('You win!');
            Result += 1;
        } else if (result === 'paper') {
            console.log('You lose!');
            Result -= 1;
        }
    }
    else if(move==='paper'){
        if (result === 'paper') {
            console.log('Tie');
        } else if (result === 'rock') {
            console.log('You win!');
            Result += 1;
        } else if (result === 'scissor') {
            console.log('You lose!');
            Result -= 1;
        }
    }
    else{
        if (result === 'scissor') {
            console.log('Tie');
        } else if (result === 'paper') {
            console.log('You win!');
            Result += 1;
        } else if (result === 'rock') {
            console.log('You lose!');
            Result -= 1;
        }
    }
        console.log('Your Score:', Result);
        localStorage.setItem("score",Result);
        // ✅ Add move images dynamically  
        const moveImages = {
        rock: '<img src="rock-icon-png.png" class="image">',
        paper: '<img src="paper-icon-png.png" class="image">',
        scissor: '<img src="scissors-icon-png.png" class="image">'
    };
    // ✅ Update the <p> tag dynamically
   document.querySelector(".para").innerHTML =`Your move: ${moveImages[move]} | Computer move: ${moveImages[result]} | Score: ${Result}`;
}
function restart(){
let finalScore = localStorage.getItem("score") || 0;
if (finalScore > 0) {
    alert(`You win!\nYour Final Score: ${finalScore}`);
} else if (finalScore == 0) {
    alert(`Tie!\nYour Final Score: ${finalScore}`);
} else {
    alert(`You lose!\nYour Final Score: ${finalScore}`);
}  
localStorage.removeItem("score");  // Corrected method to remove only the score
Result = 0;  // Reset local variable
localStorage.removeItem("score");  // ✅ Corrected method to remove only the score
    Result = 0;  // ✅ Reset global variable
    document.querySelector(".para").innerHTML = "Your move: - | Computer move: - | Score: 0"; // Reset display
}
document.addEventListener("keydown", function(event){
    if (event.key === "r" || event.key === "R") {
        game("rock");
    } else if (event.key === "p" || event.key === "P") {
        game("paper");
    } else if (event.key === "s" || event.key === "S") {
        game("scissor");
    } else if (event.key === "Enter") {
        restart();
    }
})
const names = [];

function twonames() {
    let Element = document.querySelector(".names");
    let name = Element.value.trim();

    if (name === "") {
        console.log("Empty name not allowed");
        return;
    }

    if (names.length >= 2) { 
        console.log("Only two names allowed");
        return;
    }

    names.push(name);
    console.log(names);

    // Update placeholders dynamically
    if (names.length === 1) {
        Element.placeholder = "Enter Player 2 name";
    } else if (names.length === 2) {
        Element.style.display = "none"; // Hide input after two names
    }

    Element.value = "";
}

function twoplayer() {
    if (names.length < 2) {
        alert("Please enter two player names first!");
        return;
    }

    document.querySelector(".player1").textContent = names[0];
    document.querySelector(".player2").textContent = names[1];

    console.log("Two Player Mode Activated");
}
