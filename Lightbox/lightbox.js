// change the visibility of a div with a given id
function changeVisibility(divID){
	var element = document.getElementById(divID);
	
	//if element exists, toggle its class
	//between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}//changeVisibility

//display light box with bigImage in it
function displayLightBox(imageFile, alt) {
	
	var image = new Image();
	var bigImage = 	document.getElementById("bigImage");
	
	image.src = "images/" + imageFile;
	image.alt = alt;

	//force big image to preload so we can have
	//access to its width so it will be centered
	image.onload = function () {
		var width = image.width;
		document.getElementById("boundaryBigImage").style.width = width + "px";
	};
	
	bigImage.src = image.src;
	bigImage.alt = image.alt;
	
	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage');
}//displayLightBox