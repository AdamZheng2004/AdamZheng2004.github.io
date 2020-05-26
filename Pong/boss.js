// global vars
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("boss").offsetTop;
const startPositionOfPaddle2 = document.getElementById("boss").offsetTop;
	
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

var playerHp = 3;
var currentBossHp = document.getElementById("bossHp").innerHTML;
var maxBossHp = 5;

var buzzer = new sound("buzzer.mp3");
var bounce = new sound("bounce.mp3");

var level = document.getElementById("level").innerHTML = 1;
var speed = 60;

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
	
	let direction = -1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
		
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
			playerHp = playerHp - 1;
			
			if (playerHp == 2) {
				changeVisibility("heart3");
			}//if
			
			if (playerHp == 1) {
				changeVisibility("heart2");
			}//if
			
			if (playerHp == 0) {
				changeVisibility("heart1");
			}//if
			
		}// if else	
	}//if

	//ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
			leftSpeedOfBall *= -1;	
			document.getElementById("ball").style.backgroundColor = "red";		
			buzzer.play();
			currentBossHp = currentBossHp - 1;			

	}//if
	
	        
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("boss").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("playerHp").innerHTML = playerHp;
	document.getElementById("bossHp").innerHTML = currentBossHp;
	document.getElementById("level").innerHTML = level;
	checkForWin();


}//show


//resume game play
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/speed);
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
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	startBall();
	document.getElementById("ball").style.backgroundColor = "white";			
	
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/speed);
	}
}//startGame


//stop game play
function checkForWin() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	if(playerHp == 0) {
		message1 = "You lost at level: " + level;
		message2 = "Restart";
		showLightBox(message1, message2);
	} else if (currentBossHp == 0) {
		message1 = "You beat level: " + level;
		message2 = "Next level";
		showLightBox(message1, message2);
	}//if else
	else {
		resumeGame();
	}
	
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


//ubgrades the dificulty or reset game
function upgradeBoss() {
	if (currentBossHp == 0){
		if (level%2 == 0){
			speed = speed + 5;
		}else {
			maxBossHp = maxBossHp + 1;
		}//if else
			
		changeVisibility("lightbox");
		changeVisibility("boundaryMessage")	
		currentBossHp = maxBossHp;
		level = level + 1;
		startGame();
	} else {
		changeVisibility("lightbox");
		changeVisibility("boundaryMessage")	
		changeVisibility("heart1");
		changeVisibility("heart2");
		changeVisibility("heart3");
		playerHp = 3;
		bossHp = 5;
		level = 1;
		startGame();
	}
	
}