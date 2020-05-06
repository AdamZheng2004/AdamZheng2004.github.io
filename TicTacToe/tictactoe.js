let currentPlayer = "X";
let gameStatus = ""; //"" - continue gmae, "Tie", "X Wins", "O Wins"
let numTurns = 0;


// take player turn
function playerTakeTurn(e) {
	
	if(e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();
	} else {
		showLightBox("This box  is already selected.", "Please try another.");
		return;
	}//if else
	
// game is over
	if (gameStatus != "") {
		showLightBox(gameStatus, "Game Over.")
	}//if
	
}//playerTakeTurn

//after each turn check for a winner, a tie,
//or continuer playing

function checkGameStatus() {
	numTurns++; //counts the turns
	
	//checks for winner
	if (checkWin()) {
		gameStatus = currentPlayer + " Wins";
	}
	
	//checks for tie
	if (numTurns == 9) {
		gameStatus = "Tie Game";
	}//if
	
	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );
	
}//checkGameStatus

//check for a win
function checkWin() {
	let cb = []; // current board
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	//top
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
		//top
	} else if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
		//middle
	} else if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
		//bottum
	} else if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
		//column one
	} else if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
		//column two
	} else if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
		//column three
	} else if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
		//diagonal one
	} else if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
		//diagonal two
	} else {
		return false;
	}
	
}//checkWin

// change the visibility of a div with a given id
function changeVisibility(divID){
	var element = document.getElementById(divID);
	
	//if element exists, toggle its class
	//between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}//changeVisibility

// display message in light box
function showLightBox(message, message2) {
	
	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show light box
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage")
	
}//showLightBox

//closes light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage")
	
	//if game is over, show controls
	
}//continueGame
