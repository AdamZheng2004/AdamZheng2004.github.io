const levels = [	
	//level 0
	["portal", "rock", "", "", "",
	 "fenceside", "rock", "", "", "crown",
	 "", "tree", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fence", "", "slimeup", ""],
 
 	//level 1
	["portal", "water", "", "", "",
	 "fenceside", "water", "", "", "crown",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "water", "slimeup", "", ""],
	 
	//level 2
	["tree", "tree", "portal", "tree", "tree",
	 "animate", "animate", "animate", "animate", "animate",
	 "water", "bridge", "water", "water", "water",
	 "", "", "", "fence", "",
	 "crown", "rock", "", "", "slimeup"],
	 
	["", "fence", "", "tree", "crown",
	 "", "tree", "", "rock", "",
	 "", "rock", "animate", "animate", "animate",
	 "fenceside", "tree", "", "rock", "",
	 "portal", "rock", "", "fence", "slimeup"],
	 
	 ["", "fence", "", "fence", "",
	 "", "tree", "tree", "rock", "",
	 "animate", "animate", "animate", "animate", "animate",
	 "", "rock", "", "rock", "",
	 "slimeup", "rock", "crown", "tree", "flag"]
	//end of levels
 
 ];
 
const gridBoxes = document.querySelectorAll("#gameBoard div")
const noPassObsticales = ["rock", "tree", "water"];

var currentLevel = 0; //starting level
var crownOn = false; //is the crown on?
var currentLocationOfSlime = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5;

var restarted = false;

//start game
window.addEventListener("load", function () {
	loadLevel();
});

//move slime
document.addEventListener("keydown", function (e) {
	
	switch (e.keyCode) {
		case 37: //left arrow
			if (currentLocationOfSlime % widthOfBoard !== 0){
				tryToMove("left");		
			}
			break;
		
		case 38: //up arrow
			if (currentLocationOfSlime - widthOfBoard >= 0){
					tryToMove("up");		
			}
			break;
		
		case 39: //right arrow
			if (currentLocationOfSlime % widthOfBoard < widthOfBoard - 1){
					tryToMove("right");		
			}
			break;
		
		case 40: //down arrow
			if (currentLocationOfSlime + widthOfBoard < widthOfBoard * widthOfBoard){
					tryToMove("down");		
			}
			break;
		
	}//switch
}); // key event listener


//try to move slime
function tryToMove(direction) {
	
	//location before move
	let oldLocation = currentLocationOfSlime;
	
	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;
	
	let nextLocation = 0; //location we wish to move to
	let nextClass = ""; //class of location we wish to move to
	
	let nextLocation2 = 0;
	let nextClass2 = 0;
	
	let newClass = ""; //new class to switch to if move successful
	
	switch (direction) {
		case "left":
			nextLocation = currentLocationOfSlime - 1;
			break;
		case "right":
			nextLocation = currentLocationOfSlime + 1;
			break;
		case "up":
			nextLocation = currentLocationOfSlime - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfSlime + widthOfBoard;
			break;
	}//switch
	
	nextClass = gridBoxes[nextLocation].className;
	
	//if the obstacle is not passable, don't move
	if (noPassObsticales.includes(nextClass)) { return; }
	
	// if it is a fence, and there is no crown equiped, don't move
	if (!crownOn && nextClass.includes("fence")) { return; }
	
	//if there is a fence and crown is on, move two spaces with animation
	if (nextClass.includes("fence")) {
		
		// checks that slime has crow
		if (crownOn) {
			gridBoxes[currentLocationOfSlime].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			
			//set value acording to direction
			if (direction == "left") {
				nextClass = "jumpleft";
				nextClass2 = "kingslimeleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right"){
				nextClass = "jumpright";
				nextClass2 = "kingslimeright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up"){
				nextClass = "jumpup";
				nextClass2 = "kingslimeup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if (direction == "down"){
				nextClass = "jumpdown";
				nextClass2 = "kingslimedown";
				nextLocation2 = nextLocation + widthOfBoard;
			}// else if
			
			//show slime jumping
			gridBoxes[nextLocation].className = nextClass;
			
			setTimeout(function() {
				
				// set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;
				
				//update current location of slime to be 2 spaces past take off 
				currentLocationOfSlime = nextLocation2;
				
				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfSlime].className;
				
				//show king slime after landing
				gridBoxes[currentLocationOfSlime].className = nextClass2;
				
				//if next box is portal, levelUp
				levelUp(nextClass);
				
			}, 300);
			return;
		
		}//if crownOn
		
	}// if class has fence
	
	//if the is a crown, equips it
	if (nextClass == "crown") {
		crownOn = true;
	}//if
	
	//if there is a bridge in the old location keep it
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	}// else
	
	//build name of new class
	newClass = (crownOn) ? "kingslime" : "slime";
	newClass += direction;
	
	// if there is a bridge in the next location keep it 
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";	
	}//if
	
	//move slime 1 spaces
	currentLocationOfSlime = nextLocation;
	gridBoxes[currentLocationOfSlime].className = newClass;
	
	//if it is an enemy 
	if (nextClass.includes("enemy")) {
		document.getElementById("lose").style.display = "block";
		return;
	}
	
		//if it is an enemy 
	if (nextClass.includes("flag")) {
		document.getElementById("win").style.display = "block";
		return;
	}
	
	//hit portal move up one level if needed
	levelUp(nextClass);
	
}//tryToMove



//moves up a level
function levelUp(nextClass) {
	if (nextClass == "portal" && crownOn ) {
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout (function(){
			document.getElementById("levelup").style.display = "none";	
			currentLevel++;
			loadLevel();
		}, 1000);
		
	}
}//levelUp


//load levels 0 - maxlevel
function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	crownOn = false;
	
	//load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("slime")) currentLocationOfSlime = i;
	}//for
	
	animateBoxes = document.querySelectorAll(".animate");
	
	animateEnemy(animateBoxes, 0, "right");

}//loadLevel


//animate enemy left to right
//boxes - array of grid boxes that include animation
//index - current location of animation
//direction - current direction of animation
function animateEnemy(boxes, index, direction) {	
	//exit function if no animation
	if (boxes.length <= 0){
		return;
	}//if
	
	//update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else {
		boxes[index].classList.add("enemyleft");
	}
	
	//remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemyleft");
		}
	}//for
	
	//moving right
	if (direction == "right") {
		//turn around if hit right side
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		} else {
			index++;
		}//if else
			
	//moving left
	}else {
		//turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		}//if else
	}//if else
	
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
		
	//if enemy hits slime
	if ((boxes[index].className).includes("slime")) {
		document.getElementById("lose").style.display = "block";
		return;
	}

	},750);
	
}//animateEnemy


