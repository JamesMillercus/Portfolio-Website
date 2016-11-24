

//** MOUSE MOVEMENT NAVIGATION **//

// prevent touch screen from srolling	
$(document).bind('touchmove', function(e) {
	e.preventDefault();
});

//check size of browser + mouse position and move background accordingly
function checkWidth() {
	//restraining the movement of the background so that it the browser size
	var restrainedBrowserHeight = movementStrength / $(window).height();
	var restrainedBrowserWidth = movementStrength / $(window).width();
	
    //set current position of browser as negative ints, so it can be used to moved via css
    //windowSize variables are referenced from homepage.js
    windowSizeWidth = $(window).width();
    windowSizeHeight = $(window).height();
    var backgroundCurrentYPos = -windowSizeHeight;
	var backgroundCurrentXPos = -windowSizeWidth;

	//creates a pace which is a half of the users mouse speed: currentMousePosX = current mouse position - (window width / 2)
	var currentMousePosY = y - ($(window).height() / 2);	        
	var currentMousePosX = x - ($(window).width() / 2);

	//decides position: move background down by ((10 / height of browser) * (currentMousePosY speed)) + (the negative height of the browser)
	var newBackgroundPosX = restrainedBrowserWidth * currentMousePosX * -1 + backgroundCurrentXPos;
    var newBackgroundPosY = restrainedBrowserHeight * currentMousePosY * -1 + backgroundCurrentYPos;	  
	
	// // set view port as browser size (prevent mobile devices from scrolling)
	// $('#viewport').css({'height':windowSizeHeight +'px ', 'width':windowSizeWidth + 'px'});

	//send values to other js files that control each page
	if(lastScrolled != "newUser"){
		$(function() { 
		    updatePosition(newBackgroundPosX,newBackgroundPosY);
		});
	}
}	
// Execute on load
checkWidth();
// Bind event listener
$(window).resize(checkWidth);
//if mobile device make background move with accelerometer data
if(has_touch){
	window.addEventListener('devicemotion', deviceMotionHandler, false);
    function deviceMotionHandler(eventData) {
		// $('#container').css({'background-color': 'red'});
   		//check size of browser and decide background position every time accelerometer data comes in
  		checkWidth();
  		//reduce strength of movement on mobile
  		movementStrength = 3;
  		//if landscape reverse y & x values and multiply the data to compensate for screen size, else remain normal
	  	var deviceY = (Math.round(event.accelerationIncludingGravity.y)) * ($('.backgroundImage').height()*3);
	  	var deviceX = (Math.round(event.accelerationIncludingGravity.x)) * ($('.backgroundImage').width()*2);
        if ($(window).height() < $(window).width()) {
	        deviceY = (Math.round(event.accelerationIncludingGravity.x) * $('.backgroundImage').width());
	        deviceX = (Math.round(event.accelerationIncludingGravity.y) * $('.backgroundImage').height()*6);
        }
        //change mouse position to accelerometer data in the checkWidth() function
         x = deviceX;	         
     	 y = deviceY; 
    };
} else {
	//if desktop then use mouse pos to move background
	$("body").mousemove(function(e){
	   	  checkWidth();
   	      //x & y = mouse position    
          x = e.pageX;	     
          y = e.pageY;		
	});
}   

function updatePosition(posX, posY) {
    //move background container based on mouse positions
	currentPosX = posX;
	currentPosY = posY; 
	portfolioMovePosX = [currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX+'px', currentPosX/1.3+'px', currentPosX*1.24+'px', currentPosX+'px'];
	portfolioMovePosY = [currentPosY*.7+'px', currentPosY*.7+'px', currentPosY*1.3+'px', currentPosY*1.3+'px', currentPosY*.6+'px', currentPosY+'px', currentPosY+'px', currentPosY*1.4+'px'];
	//if animation between navigation buttons isn't happening 
	if (isAnimating == false && clickedVideo == false && windowSizeHeight >550){
		//detect what navigation button is being scrolled over and adjust maths mouse position accordingly
		for(var pageNumber = 0;pageNumber<portfolioMovePosX.length+1;pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '') scrollingPage(isHover, pageNumber-1)

		function scrollingPage(currentHover, posMovement){
			if(windowSizeWidth > 1024) $('#container').css({'margin-left': portfolioMovePosX[posMovement], 'margin-top': portfolioMovePosY[posMovement]});
		}
		//if not hovering on a nav button
		if(isHover == 'container' || windowSizeWidth < 1024) {
			//animate based on normal mouse position
			$('#container').css({'opacity': 1,'margin-left': posX+'px', 'margin-top': posY+'px'});
			//clear any inline styles on navigation images that were created with js
	        $('.backgroundImage').css({'width': backgroundWSize + 'px', 'height': backgroundHSize + 'px'});
	        $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':innerBtnHolderTop,'bottom':''}); 
	        if(isHover == 'container') lastScrolled = 'container';
		}
	}
}

