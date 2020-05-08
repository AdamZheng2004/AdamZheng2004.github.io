let currentPlayer = "X";
let gameStatus = ""; //"" - continue gmae, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

// resets the board and all vars
function newGame() {
	
	//reets the board
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	}//for
		
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
		
		
}//newGame

// take player turn
function playerTakeTurn(e) {
	
	if(e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();
		
		//if game not over then comp goes
		if (gameStatus == "") {
			setTimeout(function() {
				computerTakeTurn();
				checkGameStatus();
			}, 500
			);
		}//if	
		
	} else {
		showLightBox("This box  is already selected.", "Please try another.");
		return;
	}//if else
	
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
	if (numTurns == 9 && checkWin() == false) {
		gameStatus = "Tie Game";
	}//if
	
	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );
	
	// game is over
	if (gameStatus != "") {
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
	}//if
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
	if (gameStatus != ""){
		changeVisibility("controls");
	}
	
}//continueGame

//randomly choose a free box for the computer
function computerTakeTurn() {

	let idName = "";
	let x = 0;
	let y = 0;
	
	if (document.getElementById("one").innerHTML == "X" && document.getElementById("two").innerHTML == "X" && document.getElementById("three").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("three").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "X" && document.getElementById("two").innerHTML == "" && document.getElementById("three").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("two").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "" && document.getElementById("two").innerHTML == "X" && document.getElementById("three").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("one").innerHTML = currentPlayer;
		y = 1;
		} 
	}//top row
	
	 else if (document.getElementById("four").innerHTML == "X" && document.getElementById("five").innerHTML == "X" && document.getElementById("six").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("six").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("four").innerHTML == "X" && document.getElementById("five").innerHTML == "" && document.getElementById("six").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("five").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("four").innerHTML == "" && document.getElementById("five").innerHTML == "X" && document.getElementById("six").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("four").innerHTML = currentPlayer;
		y = 1;
		} 
	}//middle row
	
	 else if (document.getElementById("seven").innerHTML == "X" && document.getElementById("eight").innerHTML == "X" && document.getElementById("nine").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("nine").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("seven").innerHTML == "X" && document.getElementById("eight").innerHTML == "" && document.getElementById("nine").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("eight").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("seven").innerHTML == "" && document.getElementById("eight").innerHTML == "X" && document.getElementById("nine").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("seven").innerHTML = currentPlayer;
		y = 1;
		} 
	}//bottem row
	
	 else if (document.getElementById("one").innerHTML == "X" && document.getElementById("four").innerHTML == "X" && document.getElementById("seven").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("seven").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "X" && document.getElementById("four").innerHTML == "" && document.getElementById("seven").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("four").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "" && document.getElementById("four").innerHTML == "X" && document.getElementById("seven").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("one").innerHTML = currentPlayer;
		y = 1;
		} 
	}//left column
	
	 else if (document.getElementById("two").innerHTML == "X" && document.getElementById("five").innerHTML == "X" && document.getElementById("eight").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("eight").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("two").innerHTML == "X" && document.getElementById("five").innerHTML == "" && document.getElementById("eight").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("five").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("two").innerHTML == "" && document.getElementById("five").innerHTML == "X" && document.getElementById("eight").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("two").innerHTML = currentPlayer;
		y = 1;
		} 
	}//middle column
	
	else if (document.getElementById("three").innerHTML == "X" && document.getElementById("six").innerHTML == "X" && document.getElementById("nine").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("nine").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("three").innerHTML == "X" && document.getElementById("six").innerHTML == "" && document.getElementById("nine").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("six").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("two").innerHTML == "" && document.getElementById("five").innerHTML == "X" && document.getElementById("eight").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("two").innerHTML = currentPlayer;
		y = 1;
		} 
	}//right column
	
	 else if (document.getElementById("one").innerHTML == "X" && document.getElementById("five").innerHTML == "X" && document.getElementById("nine").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("nine").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "X" && document.getElementById("five").innerHTML == "" && document.getElementById("nine").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("five").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("one").innerHTML == "" && document.getElementById("five").innerHTML == "X" && document.getElementById("eight").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("one").innerHTML = currentPlayer;
		y = 1;
		} 
	}// diagonal one
	
	 else if (document.getElementById("three").innerHTML == "X" && document.getElementById("five").innerHTML == "X" && document.getElementById("seven").innerHTML == "") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("seven").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("three").innerHTML == "X" && document.getElementById("five").innerHTML == "" && document.getElementById("seven").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("five").innerHTML = currentPlayer;
		y = 1;
		} 
	} else if (document.getElementById("three").innerHTML == "" && document.getElementById("five").innerHTML == "X" && document.getElementById("seven").innerHTML == "X") {
		x = parseInt(Math.random()*2) + 1;
		if (x ==1){
		document.getElementById("three").innerHTML = currentPlayer;
		y = 1;
		} 
	}// diagonal two

	if(y == 0){
		//choose random box tell an empty one is found
		do {
			
				let rand = parseInt(Math.random()*9) + 1; //1-9
				idName = idNames[rand-1];
					//check for if div is empty
					if (document.getElementById(idName).innerHTML == "") {
						document.getElementById(idName).innerHTML = currentPlayer;
						break;
					}//if

		} while(true);
	}
	
	
}//computerTakeTurn
