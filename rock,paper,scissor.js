let Result = 0;  // Score tracking
let autoplaying=false;
let twoPlayerMode = false;

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
    let inputElement = document.querySelector(".nameInput");
    let playerNamesDiv = document.querySelector(".playerNames");
    let name = inputElement.value.trim();

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
        inputElement.placeholder = "Enter Player 2 name";
    } else if (names.length === 2) {
        inputElement.style.display = "none"; // Hide input after two names
    }

    inputElement.value = ""; // Clear input
    playerNamesDiv.innerHTML = `<strong>Players:</strong> ${names[0]} & ${names[1]}`; // Show entered names
}

function twoplayer() {
    if (names.length < 2) {
        alert("Please enter two player names first!");
        return;
    }

    if (twoPlayerMode) {
        exitTwoPlayerMode();  // Call function to disable Two Player Mode
    } else {
        twoPlayerMode = true;
        console.log("Two Player Mode Activated");
        alert("Two Player Mode Activated! Use prompts for moves.");
    }
}

function exitTwoPlayerMode() {
    twoPlayerMode = false;
    console.log("Two Player Mode Deactivated");
    alert("Two Player Mode Deactivated! You can now play against the computer.");
}

let player1Move = null;
let player2Move = null;
let player1Score = 0;
let player2Score = 0;
let autoScore = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;


function game(move) {
    if (twoPlayerMode) {
        if (player1Move === null) {
            player1Move = move;
            document.querySelector(".para").innerHTML = `<strong>${names[0]}</strong> chose ${player1Move}. <br> Now it's ${names[1]}'s turn.`;
        } else {
            player2Move = move;

            // Determine winner
            let resultMessage = "";
            if (player1Move === player2Move) {
                resultMessage = "It's a Tie!";
            } else if (
                (player1Move === "rock" && player2Move === "scissor") ||
                (player1Move === "paper" && player2Move === "rock") ||
                (player1Move === "scissor" && player2Move === "paper")
            ) {
                resultMessage = `${names[0]} Wins!`;
                player1Score++;
            } else {
                resultMessage = `${names[1]} Wins!`;
                player2Score++;
            }

            // Display result with names and images
            document.querySelector(".para").innerHTML = `
                <strong>${names[0]}</strong> chose ${moveImages[player1Move]} | 
                <strong>${names[1]}</strong> chose ${moveImages[player2Move]} <br> 
                <strong>${resultMessage}</strong> <br>
                <strong>${names[0]}'s Score:</strong> ${player1Score} | 
                <strong>${names[1]}'s Score:</strong> ${player2Score}
            `;

            // Reset moves for next round
            player1Move = null;
            player2Move = null;
        }
        return; // Stop execution for single-player mode
    }

    // 🎮 Single Player Mode (vs Computer)
    let computerMove = getRandomMove();

    let resultMessage = "It's a Tie!";
    if (
        (move === "rock" && computerMove === "scissor") ||
        (move === "paper" && computerMove === "rock") ||
        (move === "scissor" && computerMove === "paper")
    ) {
        resultMessage = `${names[0]} Wins!`;
        autoScore++;
    } else if (move !== computerMove) {
        resultMessage = "Computer Wins!";
        autoScore--;
    }

    // Update local storage for single-player mode
    localStorage.setItem("score", autoScore);

    // Display results with names and images
    document.querySelector(".para").innerHTML = `
        <strong>${names[0]}'s Move:</strong> ${moveImages[move]} | 
        <strong>Computer's Move:</strong> ${moveImages[computerMove]} <br> 
        <strong>${resultMessage}</strong> <br>
        <strong>${names[0]}'s Score:</strong> ${autoScore}
    `;
}

// Function to get a random move (for computer)
function getRandomMove() {
    const moves = ["rock", "paper", "scissor"];
    return moves[Math.floor(Math.random() * moves.length)];
}

// Move images mapping
const moveImages = {
    rock: '<img src="rock-icon-png.png" class="image">',
    paper: '<img src="paper-icon-png.png" class="image">',
    scissor: '<img src="scissors-icon-png.png" class="image">'
};

function twoplayer() {
    if (names.length < 2) {
        alert("Please enter two player names first!");
        return;
    }

    document.querySelector(".player1").textContent = names[0];
    document.querySelector(".player2").textContent = names[1];

    twoPlayerMode = true;
    console.log("Two Player Mode Activated");
}

function restart() {
    if (twoPlayerMode) {
        player1Score = 0;
        player2Score = 0;
    } else {
        autoScore = 0;
        localStorage.setItem("score", autoScore);
    }

    document.querySelector(".para").innerHTML = "Your move: - | Opponent move: - | Score: 0";
}
