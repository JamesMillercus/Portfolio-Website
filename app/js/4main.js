
// TO DO ON PLANE
// - MAKE ALL ASSETS FOR NEW DESIGN (new html5 video + mood tree)

//0. Allow pause button to work on tablet (check that this isn't just on my ipad)
//1. Finish all designs (animated creative technology, all gifs)
//2. Fix all bugs (check on different browsers with Kerve browser stack login details)
// 	- black outline around html5 video, reveal jpg on a lower z-index, x seconds into the video, once video has finished then opacity 0 on vid
//3. do css + js for large desktop screens
//4. Check on windows/android mobile devices

//** MAIN SECTION OF LOGIC **//

//on document ready
$( document ).ready(function() {

	vid = document.getElementById("startUpVid");
	console.log(vid);

	vid.ontimeupdate = function() { myFunction() };
	function myFunction() {
		if(vid.currentTime >= .5) $("#centerImage").addClass("designBackground");
	}


	//when all navigation images are loaded, call checkPositions()
	$('.backgroundImage').imagesLoaded()
	.done( function( instance ) {
	    console.log('all images successfully loaded');
      	checkPositions();
  	});
	
	// when browser is resized, call checkPositions()
	$(window).resize(checkPositions);
	$(window).on( "orientationchange", function( event ) { checkPositions(); });
	// on mouse over of navigation button
	$(".animatingPage").mouseenter(function(){
	    isHover = $(this).attr('id');
	    //Detect what navigation button is being hovered, move the background to center the selected page 
	    for(var pageNumber = 0;pageNumber<(portfolioMovePosX.length)+1;pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '') scrollPortfolio(isHover, pageNumber-1);	   
	});
	//on mouse click
	$(".animatingPage").click(function(){
		if(isHover == "container" && isMobile) openPortfolio(wasPlayed);
		
		if(isTablet) {
			//open video full screen for ipad
		}
		
		//open the selected portfolio item
		for(var pageNumber = 0;pageNumber<portfolioMovePosX.length+1;pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '') openPortfolio(isHover);	
	});

	$("#mobileVideoExit").click(function(){
		exitMobileFullScreen();
	});

	//on mouse out of navigation button
	$(".animatingPage").mouseleave(function(){ resetToHome(isHover); });

	//** RESET TO HOME POSITION **//
	function resetToHome(lastPage){
		// if browser is above 1024 (is a desktop) and a video hasn't been clicked
		if(clickedVideo == false && windowSizeWidth > 1024 && !isMobile){
			// Get the page that was just scrolled out and shrink its background image to its normal size
		    $(lastScrolled).removeClass("staticImage").addClass("backgroundImage");
		    // $(lastScrolled + 'page .content').stop().animate({"opacity":0});
			$('.videoContainer').stop().animate({"opacity": 0});
			//if videos are loaded then pause all of them
			if(isReady == true) pauseAllVideos();
			//if you've just scrolled out of a nav button
			if(lastPage != 'reset' && lastScrolled != ''){
				// animation starts
			    if(!isMobile) isAnimating = true;
				$(".backgroundImage").stop().animate({'width': backgroundWSize+'px'});
				//Hide the scrolled out pages content back to opacity 0
			    $('#' +lastPage + ' .content').stop().animate({'opacity': 0});
				//Make the container holding the nav buttons go back to its original size and position
				$('#middleImages').stop().animate({'top':(innerBtnHolderHSize - middleImagesHeight)/2 +'px'});
				$('#innerBtnHolder').stop().animate({'top':innerBtnHolderTop +'px'});
				$('#outerBtnHolder').stop().animate({'width': outerBtnHolderWSize +'px', 'height': outerBtnHolderHSize+'px','margin-right':'','margin-left':divCenter+'px', 'top':outerBtnHolderTop+'px'}); 
				$( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
				//if another navigation item isn't selected, then set hover state to container and animate by normal mouse position
			    for(var pageNumber = 1;pageNumber<8;pageNumber++){
					if(isHover != 'portfolio'+pageNumber+'page'){ 
						isHover = 'container';
				        $('#container').stop().animate({'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'},{complete: function(){ isAnimating=false; }});
					}
				}
			//if you've just resized the screen.
			}else{
			    $('#container').css({'opacity': 0, 'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'});
			    // $(lastScrolled).css({"opacity":1});
			    setTimeout(function(){
				    isAnimating=false;
				    $(lastScrolled + 'page .content').css({'opacity':0});
				    $('#container').css({'opacity': '1', 'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'});
				    isHover='container';
				    checkPositions();
				    $('.videoContainer').css({"opacity": 0});
				    console.log("reset");
				    // $('body').css({'background-color': 'orange'});
				    // lastScrolled = '';
				}, 50);		    
			}
		//if a video has been clicked and then you resize the screen, then return to the standard screen navigation
		} else {
			// $('body').css({'background-color': 'red'});
		     // players[lastVideo].stopVideo();
			if(!isMobile && !isTablet) isHover = 'container';
		}
	}
});

//** CHECK POSITIONS **//
function checkPositions() {
	//update window sizes
	portfolioMovePosX = [currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX+'px', currentPosX/1.3+'px', currentPosX*1.24+'px', currentPosX+'px'];
	portfolioMovePosY = [currentPosY*.7+'px', currentPosY*.7+'px', currentPosY*1.3+'px', currentPosY*1.3+'px', currentPosY*.6+'px', currentPosY+'px', currentPosY+'px', currentPosY*1.4+'px'];
	
	console.log("window width = " + windowSizeWidth);
	console.log("window height = " + windowSizeHeight);
    windowSizeWidth = $(window).width();
	windowSizeHeight = $(window).height();
    // set size + position of each page within the website container
	$('#homepage').css({'margin-left': windowSizeWidth + 'px', 'margin-top': windowSizeHeight + 'px'});
	// set size + position of background
	$('#container').css({'height':windowSizeHeight*3 +'px ', 'width':windowSizeWidth*3 + 'px', 'margin-left': '-'+windowSizeWidth + 'px', 'margin-top': '-'+windowSizeHeight + 'px'}); 	
	//Find 37% of the size of the home page to use for movement calculations of navigation scroll overs
	backgroundWMover = $('#homepage').width()*.375, backgroundHMover = $('#homepage').height()*.375;
	//for each screen size (4), call the checkSize function
	for(var windowResizeNumber = 0;windowResizeNumber < greaterThanResizer.length; windowResizeNumber++) checkSize(windowResizeNumber); 
	//** CHECK SIZE OF SCREEN + LOAD NEW SIZES **//
	function checkSize(x){
		//based on what screen size you are on, load in different arrays that resize the divs on the screen
		if(windowSizeWidth > greaterThanResizer[x] && windowSizeWidth < lesserThanResizer[x]) {
			//set the size of all the gifs
			if(!isMobile && !isTablet) backgroundWSize = $('#homepage').width()/backgroundWImageResizerArr[x], backgroundHSize = $('#homepage').height()/backgroundHImageResizerArr[x];
			//if tablet set the sizes to load the tablet array
			if(isTablet) backgroundWSize = $('#homepage').width()/backgroundWImageResizerArr[2], backgroundHSize = $('#homepage').height()/backgroundHImageResizerArr[2];
			//if mobile set the sizes to load the mobile array
			if(isMobile) backgroundWSize = $('#homepage').width()/backgroundWImageResizerArr[3], backgroundHSize = $('#homepage').height()/backgroundHImageResizerArr[3];
			//load in desktop sizes
			desktopImageSizes = [/*topPagePos*/0.5, /*leftPagePos*/ .76, /*rightPagePos*/ 1.675, /*bottomPagePos*/ 1.7, /*leftCornerPos*/ 1.5, /*rightCornerPos*/ 1.734, /*centralPos*/ 1.272, /*middlePagePos*/ 1.32, /*large hitbox height */ backgroundHSize*4, /*large hitbox width */ backgroundWSize*4, /*med hitbox width */backgroundWSize*3, /*small hitbox height */backgroundHSize * 1.8, /*small hitbox width */backgroundWSize * 2];
			//load in small desktop sizes
			smallDesktopImageSizes = [/*topPagePos*/0.58, /*leftPagePos*/.72, /*rightPagePos*/1.72, /*bottomPagePos*/ 1.74, /*leftCornerPos*/1.5, /*rightCornerPos*/ 1.77,/*centralPos*/ 1.4,/*middlePagePos*/1.345,/*large hitbox height */backgroundHSize*4, /*large hitbox width */backgroundWSize*4,/*med hitbox width */backgroundWSize *1.5, /*small hitbox height */backgroundHSize * 1.8, /*small hitbox width */ backgroundWSize * 2];
			//load in tablet sizes
			tabletImageSizes = [/*topPagePos*/ 0.65, /*leftPagePos*/.42, /*rightPagePos*/ 1.78, /*bottomPagePos*/1.75,/*leftCornerPos*/2.3,/*rightCornerPos*/ 1.77,/*centralPos*/ 1.4,/*middlePagePos*/1.375,/*large hitbox height */backgroundHSize*4,/*large hitbox width */backgroundWSize*4,/*med hitbox width */backgroundWSize,/*small hitbox height */backgroundHSize * 1.8, /*small hitbox width */ backgroundWSize * 2];
			//load in mobile sizes
			mobileImageSizes = [/*topPagePos*/.22,/*leftPagePos*/.42,/*rightPagePos*/1.78, /*bottomPagePos*/1.635,/*leftCornerPos*/8,/*rightCornerPos*/1.66,/*centralPos*/1.348,/*middlePagePos*/1.375,/*large hitbox height */backgroundHSize*4,/*large hitbox width */backgroundWSize*4,/*med hitbox width */backgroundWSize, /*small hitbox height */backgroundHSize * 1.8, /*small hitbox width */ backgroundWSize,1.348];
			//store all loaded arrays into a larger array
			imageResizingArr = [desktopImageSizes, smallDesktopImageSizes, tabletImageSizes, mobileImageSizes];
			//set the current size of the content based on what size screen was loaded
			if(!isMobile && !isTablet) currentSize = imageResizingArr[x];
			//if tablet load the tablet array
			if(isTablet) currentSize = imageResizingArr[2];
			//if mobile load the mobile array
			if(isMobile) currentSize = imageResizingArr[3];
			//for each item in the array, call a function which will sort through the data of the array
			for(var resizeNumber = 0; resizeNumber < desktopImageSizes.length; resizeNumber++) resizeImages(resizeNumber,currentSize[resizeNumber]);
		}
		// write code that hides gifs and reveals iframes once all videos have been loaded in.
	}

	//** SORT POSITION DATA FROM ARRAY AND ASSIGN NEW ELEMENT POSITIONS **//
	function resizeImages(resizedNumber, newSize){
		//store chosen array data in a new array
		imageSizeVariables[resizedNumber] = newSize;
		//set the height of all the content
	    navHeight = [imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[11], imageSizeVariables[11], imageSizeVariables[8]];
		//set the width of all the content
		navWidth = [imageSizeVariables[9], imageSizeVariables[9], imageSizeVariables[9], imageSizeVariables[9], imageSizeVariables[10], imageSizeVariables[9], imageSizeVariables[9], imageSizeVariables[10]]; 
		//set the margin left
		navMarginLeft = [windowSizeWidth/imageSizeVariables[4], windowSizeWidth*imageSizeVariables[5], windowSizeWidth/imageSizeVariables[4], windowSizeWidth*imageSizeVariables[5], windowSizeWidth*imageSizeVariables[6], windowSizeWidth*imageSizeVariables[1], windowSizeWidth*imageSizeVariables[2], windowSizeWidth*imageSizeVariables[6]];
		//set the margin top of all the content
		navMarginTop = [windowSizeHeight*imageSizeVariables[0], windowSizeHeight*imageSizeVariables[0], windowSizeHeight*imageSizeVariables[3], windowSizeHeight*imageSizeVariables[3], windowSizeHeight*imageSizeVariables[0], windowSizeHeight*imageSizeVariables[7], windowSizeHeight*imageSizeVariables[7], windowSizeHeight*imageSizeVariables[3]];
	}
	//set the size of the background image based on the screen size
    $('.backgroundImage').css({'width':backgroundWSize +'px ', 'height':backgroundHSize+ 'px'});
 	//get size of the outer btn holder for calculations on vertical/horizontal centering
    outerBtnHolderWSize = $('#outerBtnHolder').width(), outerBtnHolderHSize = $('#outerBtnHolder').height(), innerBtnHolderHSize = $('#innerBtnHolder').height(), middleImagesHeight = $('#middleImages').height(); 
    //calculate the horizontal center
	divCenter = ($(window).width() - outerBtnHolderWSize)/2;
	//calculate the vertical center
    outerBtnHolderTop = ($('#homepage').height()-$('#outerBtnHolder').height())/2, innerBtnHolderTop = (outerBtnHolderHSize-innerBtnHolderHSize)/2;  
    // Selected page background image grows by 1.2 times its current size and other pages have their size divided by 1.8
	growBackgroundWSize = backgroundWSize*1.3, shrinkBackgroundWSize = backgroundWSize/1.9;
	//if a video hasn't been clicked and the browser window is resized
    if(clickedVideo == false){
    	$('#container').css({'opacity':1,'display':'block'});
    	//reset and re-center all postions of all content
	    $('#outerBtnHolder').css({'width': '', 'height': '', 'top':outerBtnHolderTop+'px','margin-left':'', 'margin-right':'', 'left':'', 'right':''}), $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':innerBtnHolderTop,'bottom':''});
	    //for each portfolio item on the page, call a function that will resize them based on screen size
    	for(var portNumber = 0;portNumber<navMarginLeft.length;portNumber++) resizePortfolio(portNumber);
    	//** RESIZE ALL CONTENT**//
		function resizePortfolio(portfolioNumber){
			$('#portfolio'+ (portfolioNumber+1) +'page').css({'height':navHeight[portfolioNumber] +'px', 'width':navWidth[portfolioNumber] +'px', 'margin-left': navMarginLeft[portfolioNumber] +'px', 'margin-top': navMarginTop[portfolioNumber] +'px'});		
		}
		//center the middle two portfolio items
	    $('#middleImages').css({'top':(innerBtnHolderHSize - middleImagesHeight)/2 +'px '});
	    //reveal social media buttons
	    if(lastScrolled != "newUser") $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
		//if resize the browser window whilst scrolled over a menu item then activate complete home page reset
		if(isHover!= 'container') resetToHome('reset');
    }else{
    	//if video has been clicked and page then resized
    }
	//if there is a video that can be played, the window size is for desktops and if the use has just loaded the page then play video. 
	if(!!v.canPlayType == true && windowSizeWidth > 1024 && lastScrolled == "newUser") animateHome(); //change this to animateHome when not in dev mode
	//else load the page without video
	else if(!!v.canPlayType == false || windowSizeWidth < 1024 || isMobile || $("video").get(0).paused != true) staticHome();
}

