// global vars
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
	
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = 0;
var score2 = 0;

var buzzer = new sound("buzzer.mp3");
var bounce = new sound("bounce.mp3");

//used to control game start/stop
var controlPlay;

//start ball motion
/*
window.addEventListener('load', function() {
	startBall();
});
*/

//moves paddle
document.addEventListener('keydown', function(e) {
	//console.log("key down" + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { //W key
		speedOfPaddle1 = -10;
	}
	if (e.keyCode == 83 || e.which == 83) { //S key
		speedOfPaddle1 = 10;
	}
	if (e.keyCode == 38 || e.which == 38) { //up key
		speedOfPaddle2 = -10;
	}
	if (e.keyCode == 40 || e.which == 40) { //down key
		speedOfPaddle2 = 10;
	}

});


//stops paddle
document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { //W key
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 83 || e.which == 83) { //S key
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 38 || e.which == 38) { //up key
		speedOfPaddle2 = 0;
	}
	if (e.keyCode == 40 || e.which == 40) { //down key
		speedOfPaddle2 = 0;
	}

});


//object constructor to play sound
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  };
  this.stop = function(){
    this.sound.pause();
  };
}


//starts the ball
function startBall() {
	
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	//50% chance of the ball starting either direction
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	}//if else
		
	topSpeedOfBall = Math.random() * 2 + 3; //3-4
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);
	
}//startBall


//updates location of paddles and ball
function show() {
	
	//update position of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stops paddle from leaving the top of game board
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}
	
	//stops paddle from leaving the bottom of game board
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}
	
	// if ball hits top or bottom of board change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		topSpeedOfBall *= -1;
	}//if
	
	//ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {
		
		//if ball hits left paddle change dirction
		if (topPositionOfBall > positionOfPaddle1 && 
			topPositionOfBall < positionOfPaddle1 + paddleHeight){
			
			leftSpeedOfBall *= -1;	
			bounce.play();
			document.getElementById("ball").style.backgroundColor = "green";
		} else {
			buzzer.play();
			startBall();
			score2 = score2 + 1;
		}// if else	
	}//if

	//ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
		//if ball hits right paddle change dirction
		if (topPositionOfBall > positionOfPaddle2 &&
			topPositionOfBall < positionOfPaddle2 + paddleHeight){
			
			leftSpeedOfBall *= -1;	
			bounce.play();
			document.getElementById("ball").style.backgroundColor = "blue";			
		} else {
			buzzer.play();
			startBall();
			score1 = score1 + 1;
		}// if else	
	}//if
	
	        
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("score1").innerHTML = score1;
	document.getElementById("score2").innerHTML = score2;


}//show


//resume game play
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60 );
	}
}//resumeGame


//pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame


//start game play
function startGame() {
	//reset score, ball and paddle
	score1 = 0;
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	startBall();
	document.getElementById("ball").style.backgroundColor = "white";			
	
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}
}//startGame


//stop game play
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	//show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue. ";
	
	if(score2 > score1) {
		message1 = "Player 2 wins with: " + score2 + " points";
		message2 = "Player 1 had " + score1 + " points";
	} else if (score1 > score2) {
		message1 = "Player 1 wins with: " + score1 + " points";
		message2 = "Player 2 had " + score2 + " points";
	}//if else
	
	showLightBox(message1, message2);
	
	
}//stopGame


/**** Lightbox code ****/

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
}//continueGame

/**** end of lightbox code ****/