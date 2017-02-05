// Post Plane:
// re-export start up animation as mp4 + ogg with handbrake
// Get Izzy to sense check project text

//PHASE ONE
//1. Fix all bugs (check on different browsers with Kerve browser stack login details)
//2. Check on windows/android mobile devices (problem with android selecting mobile version of site)
//3. Recode site so that is runs more effieciently (constructor functions)
//4. Re enable html videos and disable js video adding function
//5. Green sock animation instead of jquery (does it have a .stop function?)

// THINGS TO CHECK
//1. Video Player Functionality: Allow pause button to work on tablet (check that this isn't just on my ipad)

//PHASE TWO
//1. Create node back end and use johnny five for arduino code + a templating engine to serve bespoke message

//PHASE THREE
//1. use leapjs to make portfolio useable with the leap motion + myo band + wordpress

//** CHECK POSITIONS **//
function checkPositions() {
    // set size + position of each page within the website container
	var currentBrowserSizeX = BrowserInfo.browserSize()[0];
	var currentBrowserSizeY = BrowserInfo.browserSize()[1];
	$('#homepage').css({'margin-left': currentBrowserSizeX + 'px', 'margin-top': currentBrowserSizeY + 'px'});
	// set size + position of background
	$('#container').css({'height':currentBrowserSizeY*3 +'px ', 'width':currentBrowserSizeX*3 + 'px', 'margin-left': '-'+currentBrowserSizeX + 'px', 'margin-top': '-'+currentBrowserSizeY + 'px'}); 	
	//resize portfolio pages, once the check size function has calculated positions and heights of hitboxes
	Portfolio.calcPagePosAndSizes(Portfolio.loadHitBoxPosAndSize());
	Portfolio.setGifSizes();
	Portfolio.setGifGrid();

    if(Portfolio.video.clicked == false){
    	//RESET POSITIONS OF ITEMS ON SCREEN
    	$('#container').css({'opacity':1,'display':'block'});
	    // RESET PORTFOLIO HIT BOXS
	    Portfolio.setPageSizeAndPos();
		//center the middle two portfolio items
	    $('#heroText').css({'font-size':$('#centerImage').width()/8 +'px', 'top':($('#centerImage').height()-$('#heroText').height())/2});
	    //reveal social media buttons
	    if(Portfolio.page.lastScrolled != "newUser") {
	    	if(!isMobile) $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
	    	$('#heroText').css({'opacity':1, 'display':'block'});
	    	$('.videoContainer').css({'opacity': 0});
		    $('.content').css({'opacity': 0});
	    	Portfolio.page.lastScrolled ='';
	    }else $('#heroText').css({'opacity':0, 'display':'none'});
		//if resize the browser window whilst scrolled over a menu item then activate complete home page reset
		if(Portfolio.page.isHover!= 'container' && Portfolio.page.lastClicked == '') resetToHome('reset');
		// $('#heroText').css({'top':($('#centerImage').height()-$('#heroText').height())/2});
		activateHeroAnimation();
    }else{
    	//if video has been clicked and page then resized
    }
    if(Portfolio.page.lastScrolled == "newUser"){
	    $('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio6, #portfolio7').css({'opacity':0});
    }
}

function startWebsite(){
	$("#loadScreen, #loadPercentage").stop().animate({'opacity': 0},{ duration: 2000,
    specialEasing: {
      width: "linear",
      height: "easeOutBounce"
    }, complete: function(){ 
    	// var v = window.document.createElement("video");
		//if there is a video that can be played, the window size is for desktops and if the use has just loaded the page then play video. 
	    if(!!document.getElementById("startUpVid").canPlayType == true && BrowserInfo.browserSize()[0] > 1024 && Portfolio.page.lastScrolled == "newUser") animateHome(); //change this to animateHome when not in dev mode
	    //else load the page without video
	    else if(!!document.getElementById("startUpVid").canPlayType == false || BrowserInfo.browserSize()[0] < 1024 || isMobile) staticHome();
	}}); 
}

//** MAIN SECTION OF LOGIC **//

//on document ready
$(document).ready(function () {

	// vid = document.getElementById("startUpVid");
	// // console.log(vid);

	// vid.ontimeupdate = function() { myFunction() };
	// function myFunction() {
	// 	// if(vid.currentTime >= .5) $("#centerImage").addClass("designBackground");
	// }

	//when all navigation images are loaded, call checkPositions()
    $('.backgroundImage').imagesLoaded().done( function( instance ) {
	    // console.log('all images successfully loaded');
            checkPositions();
    });
	// when browser is resized, call checkPositions()
	$( window ).resize(function() {
  		checkPositions();
		allowAnimation = false;
	    Portfolio.page.lastScrolled = '';
	});
	$(window).on( "orientationchange", function( event ) { checkPositions(); });

	// on mouse over of navigation button
	$(".animatingPage").mouseenter(function(){
	    Portfolio.page.isHover = $(this).attr('id');
	    //Detect what navigation button is being hovered, move the background to center the selected page 
	    for(var pageNumber = 0;pageNumber<(Portfolio.totalNumberOfItems());pageNumber++) if(Portfolio.page.isHover == 'portfolio'+pageNumber+'page' && Portfolio.page.lastScrolled != '' && allowAnimation == true) scrollPortfolio(Portfolio.page.isHover, pageNumber-1);	   
	});
	//on mouse click
	$(".animatingPage").click(function(){
		if(Portfolio.page.isHover == "container" && isMobile) openPortfolio(wasPlayed);
		
		if(isTablet) {
			//open video full screen for ipad
		}
		
		//open the selected portfolio item
		for(var pageNumber = 0;pageNumber<(Portfolio.totalNumberOfItems());pageNumber++) if(Portfolio.page.isHover == 'portfolio'+pageNumber+'page' && Portfolio.page.lastScrolled != '') openPortfolio(Portfolio.page.isHover);	
	});

	$("#videoExit").click(function(){
		exitFullScreen();
	});

	//on mouse out of navigation button
	$(".animatingPage").mouseleave(function(){ 
		// console.log("Portfolio.page.lastScrolled = " + Portfolio.page.lastScrolled);
		if(Portfolio.page.lastScrolled != 'container') resetToHome(Portfolio.page.isHover); 
	});

	$(document).keyup(function(e) {
  		if (e.keyCode === 27) exitFullScreen();
	});

	$( "html" ).keypress(function( event ) {	
		for(lowerCase = 0; lowerCase < keyboardArr.length; lowerCase+=2){
		  	upperCase = (lowerCase+1);
		  	count++;
			Portfolio.page.lastClicked = "portfolio"+count+"page";
		  	keyboardEvent=event.which;
			currentPosX = -BrowserInfo.browserSize()[0];
			currentPosY = -BrowserInfo.browserSize()[1];
		  	triggerResponse(Portfolio.page.lastClicked,keyboardEvent);
		}
		// console.log(keyboardEvent);
	}); 
	  
	function triggerResponse(newHover, keyp){
		if ( keyp == keyboardArr[lowerCase] || keyp == keyboardArr[upperCase] ) {
			var counter = count-1;
			if(Portfolio.video.clicked==false && counter<(keyboardArr.length/2)-1){
				if(newHover != Portfolio.page.isHover){
				    resetToHome(newHover);
				  	Portfolio.page.isHover = newHover;
					Portfolio.page.lastScrolled = '#' + newHover.substring(0,10);
					scrollPortfolio(newHover, counter);	
				}else openPortfolio(Portfolio.page.isHover);
			}else exitFullScreen(); 
			if (counter==(keyboardArr.length/2)-1 && Portfolio.page.lastScrolled != '') resetToHome(newHover);
		}
		if(count>=(keyboardArr.length/2)) count =0;
	}

	//** RESET TO HOME POSITION **//
	function resetToHome(lastPage){
		// if browser is above 1024 (is a desktop) and a video hasn't been clicked
		if(Portfolio.video.clicked == false && BrowserInfo.browserSize()[0] > 1024 && !isMobile){
			// $(".staticImage").css({'opacity': 1});
			// Get the page that was just scrolled out and shrink its background image to its normal size
		    $(Portfolio.page.lastScrolled).removeClass("staticImage").addClass("backgroundImage");
		    // $(Portfolio.page.lastScrolled + 'page .content').stop().animate({"opacity":0});
			$('.videoContainer').stop().animate({"opacity": 0});
			//if videos are loaded then pause all of them
			if(isReady == true) pauseAllVideos();
			//if you've just scrolled out of a nav button
			// console.log("Last Scrolled (musn't be '') = " + Portfolio.page.lastScrolled);
			if(lastPage != 'reset' && Portfolio.page.lastScrolled != ''){
				// animation starts
			    if(!isMobile) isAnimating = true;
			    // console.log("background W size SLUT = " + backgroundWSize+'px');
				if(BrowserInfo.browserSize()[0] < 1900) $(".backgroundImage").stop().animate({'width': Portfolio.gif['backgroundWSize']+'px'});
    			else if (BrowserInfo.browserSize()[0] > 1900 || BrowserInfo.browserSize()[1] > 1100) $(".backgroundImage").stop().animate({'width': Portfolio.gif['backgroundWSize']/1.5+'px'});
				//Hide the scrolled out pages content back to opacity 0
			    // $('#' +lastPage + ' .content').stop().animate({'opacity': 0});
			    $('.content').stop().animate({'opacity': 0});
				//Make the container holding the nav buttons go back to its original size and position
				$('#middleImages').stop().animate({'top':(Portfolio.gif.innerGridHSize - Portfolio.gif.centerGridHSize)/2 +'px'});
				$('#innerBtnHolder').stop().animate({'top':Portfolio.gif.innerGridYPos +'px'});
				$('#outerBtnHolder').stop().animate({'width': Portfolio.gif.outerGridWSize +'px', 'height': Portfolio.gif.outerGridHSize+'px','margin-right':'','margin-left':'', 'top':Portfolio.gif.outerGridYPos+'px'}); 
				if(Portfolio.page.lastScrolled != 'newUser' && Portfolio.video.clicked == false) $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
				
				if(Portfolio.page.lastScrolled == "#portfolio5") {
					$('#portfolio8page').css({"display":"none"});
					setTimeout(function(){ $('#portfolio8page').css({"display":"block"}); }, 700);	
				}
				else if(Portfolio.page.lastScrolled == "#portfolio8"){
				 $('#portfolio5page').css({"display":"none"});
					setTimeout(function(){ $('#portfolio5page').css({"display":"block"}); }, 700);	
				}
				//if another navigation item isn't selected, then set hover state to container and animate by normal mouse position
			    for(var pageNumber = 1;pageNumber<8;pageNumber++){
					if(Portfolio.page.isHover != 'portfolio'+pageNumber+'page'){ 
						Portfolio.page.isHover = 'container';
				        if(allowAnimation == true) $('#container').stop().animate({'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'},{complete: function(){ isAnimating=false; }});
					}
				}
				// console.log("animate page to home position")
			//if you've just resized the screen.
			}else{
				//if the user isn't using special electronics invitation (keyboard inputs)
				if(Portfolio.page.lastClicked == ''){
				    $(Portfolio.page.lastScrolled).removeClass("staticImage").addClass("backgroundImage");
				    if(BrowserInfo.browserSize()[0] < 1900) $(".backgroundImage").css({'width': Portfolio.gif['backgroundWSize']+'px'});
    				else if (BrowserInfo.browserSize()[0] > 1900 || BrowserInfo.browserSize()[1] > 1100) $(".backgroundImage").css({'width': Portfolio.gif['backgroundWSize']/1.5+'px'});
				    $('#container').css({'opacity': 0, 'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'});
				    $('.videoContainer').css({'opacity': 0});
				    $('.content').css({'opacity': 0});
				    // $(Portfolio.page.lastScrolled).css({"opacity":1});
				    setTimeout(function(){
					    isAnimating=false;
					    $(Portfolio.page.lastScrolled + 'page .content').css({'opacity':0});
					    $('#container').css({'opacity': '1', 'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'});
					    Portfolio.page.isHover='container';
					    checkPositions();
					    // console.log("reset");
					    // $('body').css({'background-color': 'orange'});
					}, 50);		    
					//if the user is navigating the site with the electronics invitation (keyboard inputs)
				} else{
				    Portfolio.page.lastScrolled = 'container';
				    Portfolio.page.isHover='container';
					checkPositions();
				}
			}
		//if a video has been clicked and then you resize the screen, then return to the standard screen navigation
		} else {
			// $('body').css({'background-color': 'red'});
		     // players[lastVideo].stopVideo();
			if(!isMobile && !isTablet) Portfolio.page.isHover = 'container';
		}
	}

	loadIframes();
});
