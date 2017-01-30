

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
    var backgroundCurrentYPos = -BrowserInfo.browserSize()[1], backgroundCurrentXPos = -BrowserInfo.browserSize()[0];

    //creates a pace which is a half of the users mouse speed: currentMousePosX = current mouse position - (window width / 2)
    var currentMousePosY = y - ($(window).height() / 2);
    var currentMousePosX = x - ($(window).width() / 2);

    //decides position: move background down by ((10 / height of browser) * (currentMousePosY speed)) + (the negative height of the browser)
    var newBackgroundPosX = restrainedBrowserWidth * currentMousePosX * -1 + backgroundCurrentXPos;
    var newBackgroundPosY = restrainedBrowserHeight * currentMousePosY * -1 + backgroundCurrentYPos;

    // // set view port as browser size (prevent mobile devices from scrolling)
    // $('#viewport').css({'height':BrowserInfo.browserSize()[1] +'px ', 'width':BrowserInfo.browserSize()[0] + 'px'});

    //send values to other js files that control each page
    if(lastScrolled != "newUser" && lastScrolled != "animatingHome"){
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

  //if animation between navigation buttons isn't happening 
  if (isAnimating == false && clickedVideo == false && BrowserInfo.browserSize()[1] >550){
    //detect what navigation button is being scrolled over and adjust maths mouse position accordingly
    for(var pageNumber = 0;pageNumber<Portfolio.totalNumberOfItems();pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '' && allowAnimation == true) scrollingPage(isHover, pageNumber-1)

    function scrollingPage(currentHover, posMovement){
      if(BrowserInfo.browserSize()[0] > 1024) $('#container').css({'margin-left': Portfolio.portfolioMoveValue(currentPosX, currentPosY, posMovement)[0], 'margin-top': Portfolio.portfolioMoveValue(currentPosX, currentPosY, posMovement)[1]});
		}
		//if not hovering on a nav button
		if(isHover == 'container' || BrowserInfo.browserSize()[0] < 1024) {
			//animate based on normal mouse position
			$('#container').css({'opacity': 1,'margin-left': posX+'px', 'margin-top': posY+'px'});
			//clear any inline styles on navigation images that were created with js
      if(BrowserInfo.browserSize()[0] < 1900) $('.backgroundImage').css({'width':Portfolio.gifSizes['backgroundWSize'] +'px ', 'height':Portfolio.gifSizes['backgroundHSize']+ 'px'});
  		else if(BrowserInfo.browserSize()[0] > 1900 || BrowserInfo.browserSize()[1] > 1100) $('.backgroundImage').css({'width':Portfolio.gifSizes['backgroundWSize']/1.5 +'px ', 'height':Portfolio.gifSizes['backgroundHSize']/1.5+ 'px'});
      $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':innerBtnHolderTop,'bottom':''}); 
      $('.videoContainer').css({'opacity':''});
      if(isHover == 'container') lastScrolled = 'container', allowAnimation = true;
		}
        //if the initial start up video played, then hide it to reveal the still jpg
		if($("video").css('display') === 'block') $('video').css({'display': 'none'});
	}
	// console.log("last Scrolled = "+ lastScrolled);
	// console.log("is hover = "+ isHover);
}

