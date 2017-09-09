// Post Plane:
// re-export start up animation as mp4 + ogg with handbrake
// Get Izzy to sense check project text

//PHASE ONE
//1. Fix all bugs (check on different browsers with Kerve browser stack login details)
//2. Check on windows/android mobile devices (problem with android selecting mobile version of site)
//3. TURN LOAD IFRAMES FUNCITON into a loading screen to play video for x seconds, then load another video, then play etc..
//4. Green sock animation instead of jquery (does it have a .stop function?)


// THINGS TO CHECK
//1. Video Player Functionality: Allow pause button to work on tablet (check that isn't just on my ipad)

//PHASE TWO
//1. Create node back end and use johnny five for arduino code + a templating engine to serve bespoke message

//PHASE THREE
//1. use leapjs to make portfolio useable with the leap motion + myo band + wordpress

//** MAIN SECTION OF LOGIC **//
//on document ready
var Portfolio = new animationFunctions();   

$(document).ready(function () {
	//make sure that all gifs are loaded first
	Portfolio.loadGifs();

	//when all navigation images are loaded, call Portfolio.checkPositions()
    $('.backgroundImage').imagesLoaded().done( function( instance ) {
            Portfolio.checkPositions();
    });
	// when browser is resized, call Portfolio.checkPositions()
	$( window ).resize(function() {
  		Portfolio.checkPositions();
		Portfolio.mousePos.allowAnimation = false;
	    Portfolio.page.lastScrolled = '';
	    Portfolio.checkWidth();
	});

	$(window).on( "orientationchange", function( event ) { Portfolio.checkPositions(); });

	// on mouse over of navigation button
	$(".animatingPage").mouseenter(function(){
	    Portfolio.page.isHover = $(this).attr('id');
	    //Detect what navigation button is being hovered, move the background to center the selected page 
	    for(var pageNumber = 0;pageNumber<(Portfolio.totalNumberOfItems());pageNumber++) if(Portfolio.page.isHover == 'portfolio'+pageNumber+'page' && Portfolio.page.lastScrolled != '' && Portfolio.mousePos.allowAnimation == true) Portfolio.scrollPortfolio(Portfolio.page.isHover, pageNumber-1);	   
	});
	//on mouse click
	$(".animatingPage").click(function(){
		if(Portfolio.page.isHover == "container" && Portfolio.isMobile) Portfolio.openPortfolio(Portfolio.video.wasPlayed);
		
		if(Portfolio.isTablet) {
			//open video full screen for ipad
		}
		
		//open the selected portfolio item
		for(var pageNumber = 0;pageNumber<(Portfolio.totalNumberOfItems());pageNumber++) if(Portfolio.page.isHover == 'portfolio'+pageNumber+'page' && Portfolio.page.lastScrolled != '') Portfolio.openPortfolio(Portfolio.page.isHover);	
	});

	$("#videoExit").click(function(){
		Portfolio.exitFullScreen();
	});

	//on mouse out of navigation button
	$(".animatingPage").mouseleave(function(){ 
		// console.log("Portfolio.page.lastScrolled = " + Portfolio.page.lastScrolled);
		if(Portfolio.page.lastScrolled != 'container') Portfolio.resetToHome(Portfolio.page.isHover); 
	});

	$(document).keyup(function(e) {
  		if (e.keyCode === 27) exitFullScreen();
	});

	$( "html" ).keypress(function( event ) {	
		for(Portfolio.invitation.lowerCase = 0; Portfolio.invitation.lowerCase < Portfolio.invitation.keyboardArr.length; Portfolio.invitation.lowerCase+=2){
		  	Portfolio.invitation.upperCase = (Portfolio.invitation.lowerCase+1);
		  	Portfolio.invitation.count++;
			Portfolio.page.lastClicked = "portfolio"+Portfolio.invitation.count+"page";
		  	Portfolio.invitation.keyboardEvent=event.which;
			Portfolio.mousePos.currentPosX = -Portfolio.browserSize()[0];
			Portfolio.mousePos.currentPosY = -Portfolio.browserSize()[1];
		  	Portfolio.triggerResponse(Portfolio.page.lastClicked,Portfolio.invitation.keyboardEvent);
		}
		// console.log(keyboardEvent);
	}); 

	Portfolio.loadIframes();
});