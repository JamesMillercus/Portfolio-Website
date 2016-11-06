

//0. Click on video to maximise to full screen
	//- css to make video go to full screen on all screen sizes
	//- Reveal controls
//1. Check if html5 vid is supported + animate design and nav buttons upon page load (fix bug upon page load, some time delay is triggering after animation is finished?)
//2. Acknowledge videos loading in some way, perhaps animate everything in to opacity 1 from 0 (when isready == true)
//3. Annotate / tidy js
//4. fix all bugs (check on different browsers with Kerve browser stack login details)
//5. do css for large desktop screens


	//setting up mobile device if statements by detecting touch availability
	var has_touch = 'ontouchstart' in document.documentElement;
	//adjust the below variables to select mobiles and tablets
	var isTablet = /Tablet|ipad/i.test(navigator.userAgent.toLowerCase()); 
	var isMobile = /webos|iphone|blackberry|ipod|android. +mobile|windows phone/i.test(navigator.userAgent.toLowerCase());

	// variables for mouse positions
	var currentPosX, currentPosY;
	// variables for resizing navigation images
	var backgroundWSize, backgroundHSize, backgroundWPos, backgroundHPos, smallHitboxWSize, smallHitboxHSize, largeHitboxWSize, largeHitboxHSize, medHitboxWSize, medHitboxHSize;
	// variables for resizing the home page when nav images are scrolled over/out
	var outerBtnHolderWSize,outerBtnHolderHSize, innerBtnHolderHSize, newouterBtnHolderWSize, newInnerBtnHolderHSize, newouterBtnHolderHSize, innerBtnHolderTop, outerBtnHolderTop, newInnerBtnHolderTop;
	// global variables for window sizes
	var windowSizeWidth, windowSizeHeight;
	// boolean to detect in navigation images are animated once hovered over/out
	var isAnimating = false;
	// variable to check what is being hovered on, set up automatically as container
	var isHover = 'container';
	// math to decide movement distance that the container will animate once nav buttons are hovered over/out
	var shortMovement = 1.22, mediumMovement = 1.28, longMovement = 1.29; 
	// store selected navigation image here
	var image;
	// store the last scrolled item
	var lastScrolled = 'newUser';
	var lastVideo;
	// store home page size to determine navigation movement distance
	var backgroundWMover, backgroundHMover;
	// math to decide button positions within the home page, every mouse movement
	var rightPosMath = 1.57, bottomPosMath = 1.73, topPosMath = 3.22, leftPosMath = 3.94;
	// store values to decide the size of selected and non selected nav buttons
	var growBackgroundWSize, shrinkBackgroundWSize;
	var v = document.createElement("video");
	var divCenter;
	var middleImagesHeight, newMiddleImagesHeight;
	var clickedVideo = false;
	var portfolioMovePosX;
	var portfolioMovePosY;
	// var isLoaded = 0;

	function updatePosition(posX, posY) {
	    //move background container based on mouse positions
		currentPosX = posX;
		currentPosY = posY; 
		portfolioMovePosX = [currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX/1.2+'px', currentPosX*1.16+'px', currentPosX+'px', currentPosX/1.3+'px', currentPosX*1.24+'px', currentPosX+'px'];
		portfolioMovePosY = [currentPosY*.7+'px', currentPosY*.7+'px', currentPosY*1.3+'px', currentPosY*1.3+'px', currentPosY*.6+'px', currentPosY+'px', currentPosY+'px', currentPosY*1.4+'px'];
		// console.log(posX);
		//if animation between navigation buttons isn't happening 
		if (isAnimating == false && clickedVideo == false){
			//detect what navigation button is being scrolled over and adjust maths mouse position accordingly
			if(isHover == 'portfolio1page') $('#container').css({'margin-left': currentPosX/1.2+'px', 'margin-top': currentPosY*.7+'px'});
			if(isHover == 'portfolio2page') $('#container').css({'margin-left': currentPosX*1.16+'px', 'margin-top': currentPosY*.7+'px'});
			if(isHover == 'portfolio3page') $('#container').css({'margin-left': currentPosX/1.2+'px', 'margin-top': currentPosY*1.3+'px'});
			if(isHover == 'portfolio4page') $('#container').css({'margin-left': currentPosX*1.16+'px', 'margin-top': currentPosY*1.3+'px'});
			if(isHover == 'portfolio5page') $('#container').css({'margin-left': currentPosX+'px', 'margin-top': currentPosY*.6+'px'});
			if(isHover == 'portfolio6page') $('#container').css({'margin-left': currentPosX/1.3+'px', 'margin-top': currentPosY+'px'});
			if(isHover == 'portfolio7page') $('#container').css({'margin-left': currentPosX*1.24+'px', 'margin-top': currentPosY+'px'});
			if(isHover == 'portfolio8page') $('#container').css({'margin-left': currentPosX+'px', 'margin-top': currentPosY*1.4+'px'});
			// if(isHover == 'portfolio1page' || isHover == 'portfolio2page' || isHover == 'portfolio3page' || isHover == 'portfolio4page' || isHover == 'portfolio5page' || isHover == 'portfolio6page' || isHover == 'portfolio7page' || isHover == 'portfolio8page') if(isReady == true) animateIn();
			//if not hovering on a nav button
			if(isHover == 'container') {
				//animate based on normal mouse position
				$('#container').css({'opacity': 1,'margin-left': posX+'px', 'margin-top': posY+'px'});
				//clear any inline styles on navigation images that were created with js
		        $('.backgroundImage').css({'width': backgroundWSize + 'px', 'height': backgroundHSize + 'px'});
		        $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':innerBtnHolderTop,'bottom':''}); 
		        // $('#portfolio5, #portfolio6, #portfolio7, #portfolio8').css({'left':'', 'right':'','top':'','bottom':''}); 
		        lastScrolled = 'container';
			}
		}
	}

$( document ).ready(function() {
	//when all navigation images are loaded, call checkPositions()
	$('.backgroundImage').imagesLoaded()
	.done( function( instance ) {
	    console.log('all images successfully loaded');
      	checkPositions();
  	});
	
	
	// when browser is resized, call checkPositions()
	$(window).resize(checkPositions);
	$(window).on( "orientationchange", function( event ) {
		checkPositions();
	});

	function checkPositions()
	{
		//update window sizes
	    windowSizeWidth = $(window).width();
		windowSizeHeight = $(window).height();
		
		//math to decide pages positions every mouse movement
		var topPagePos, bottomPagePos, leftPagePos, rightPagePos, bottomPagePos, leftCornerPos, rightCornerPos, centralPos, middlePagePos;
		
	    // set size + position of each page within the website container
		$('#homepage').css({'margin-left': windowSizeWidth + 'px', 'margin-top': windowSizeHeight + 'px'});
		// set size + position of background
		$('#container').css({'height':windowSizeHeight*3 +'px ', 'width':windowSizeWidth*3 + 'px', 'margin-left': '-'+windowSizeWidth + 'px', 'margin-top': '-'+windowSizeHeight + 'px', 'opacity': 1}); 	
		//Find 37% of the size of the home page to use for movement calculations of navigation scroll overs
		backgroundWMover = $('#homepage').width()*.375, backgroundHMover = $('#homepage').height()*.375;
		//if desktop, then calculate math to decide pages positions every mouse movement
		if(windowSizeWidth > 1024){
			topPagePos = 0.5, leftPagePos = .75, rightPagePos = 1.72, bottomPagePos = 1.7, leftCornerPos = 1.5, rightCornerPos = 1.734, centralPos = 1.29, middlePagePos = 1.32;
			backgroundWSize = $('#homepage').width()/7, backgroundHSize = $('#homepage').height()/5;
			largeHitboxHSize = backgroundHSize*4, largeHitboxWSize = backgroundWSize*4, medHitboxWSize = backgroundWSize*3, smallHitboxHSize = backgroundHSize * 1.8, smallHitboxWSize = backgroundWSize * 2;
		} 
	    else if(windowSizeWidth > 900 && windowSizeWidth < 1024){
	    	topPagePos = 0.58, leftPagePos = .72, rightPagePos = 1.72, bottomPagePos = 1.74, leftCornerPos = 1.5, rightCornerPos = 1.77, centralPos = 1.354, middlePagePos = 1.345;
	    	backgroundWSize = $('#homepage').width()/7, backgroundHSize = $('#homepage').height()/6;
	    	largeHitboxHSize = backgroundHSize*4, largeHitboxWSize = backgroundWSize*4, smallHitboxHSize = backgroundHSize * 1.8, smallHitboxWSize = backgroundWSize * 2;
	    } 
	    else if(windowSizeWidth >= 551 && windowSizeWidth < 900 || isTablet){
	    	topPagePos = 0.65, leftPagePos = .42, rightPagePos = 1.78, bottomPagePos = 1.75, leftCornerPos = 2.3, rightCornerPos = 1.77, centralPos = 1.3, middlePagePos = 1.375;
	    	backgroundWSize = $('#homepage').width()/5, backgroundHSize = $('#homepage').height()/7;
	    	largeHitboxHSize = backgroundHSize*4, largeHitboxWSize = backgroundWSize*4, smallHitboxHSize = backgroundHSize * 1.8, smallHitboxWSize = backgroundWSize * 2;
	    } 
	    //if mobile, then calculate math to decide pages positions every mouse movement
	    if(windowSizeWidth <= 550 || isMobile){
	    	topPagePos = .25, bottomPagePos = 1.6, leftCornerPos = 8, rightCornerPos = 1.66, centralPos = 1.3478, middlePagePos = 1.375;
	    	backgroundWSize = $('#homepage').width()/3.3, backgroundHSize = $('#homepage').height()/3.5;
	    	largeHitboxHSize = backgroundHSize*4, largeHitboxWSize = backgroundWSize*4, smallHitboxHSize = backgroundHSize * 1.8, smallHitboxWSize = backgroundWSize;
	    } 

	    $('.backgroundImage').css({'width':backgroundWSize +'px ', 'height':backgroundHSize+ 'px'});
	    outerBtnHolderWSize = $('#outerBtnHolder').width(), outerBtnHolderHSize = $('#outerBtnHolder').height(), innerBtnHolderHSize = $('#innerBtnHolder').height(), middleImagesHeight = $('#middleImages').height(); 
		divCenter = ($(window).width() - outerBtnHolderWSize)/2;
	    // Selected page background image grows by 1.2 times its current size and other pages have their size divided by 1.8
		growBackgroundWSize = backgroundWSize*1.3, shrinkBackgroundWSize = backgroundWSize/1.9;
		//shrink the container holder the home page nav buttons by 1.5 of their current size
		newouterBtnHolderWSize = outerBtnHolderWSize/1.5, newouterBtnHolderHSize = outerBtnHolderHSize/1.5;
	    newMiddleImagesHeight = middleImagesHeight/1;
	    newInnerBtnHolderHSize = innerBtnHolderHSize/1.5;
	    outerBtnHolderTop = ($('#homepage').height()-$('#outerBtnHolder').height())/2, innerBtnHolderTop = (outerBtnHolderHSize-innerBtnHolderHSize)/2;  
	    newInnerBtnHolderTop = (newouterBtnHolderHSize-newInnerBtnHolderHSize)/2;
	    if(clickedVideo == false){
	    	//if a video hasn't been clicked and the browser window is resized
		    $('#outerBtnHolder').css({'width': '', 'height': '', 'top':outerBtnHolderTop+'px','margin-left':'', 'margin-right':'', 'left':'', 'right':''}), $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':innerBtnHolderTop,'bottom':''});
			$('#portfolio1page').css({'height':largeHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth/leftCornerPos +'px', 'margin-top': windowSizeHeight*topPagePos + 'px'});
			$('#portfolio2page').css({'height':largeHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth*rightCornerPos +'px', 'margin-top': windowSizeHeight*topPagePos + 'px'});
			$('#portfolio3page').css({'height':largeHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth/leftCornerPos +'px', 'margin-top': windowSizeHeight*bottomPagePos +'px'});
			$('#portfolio4page').css({'height':largeHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth*rightCornerPos +'px', 'margin-top': windowSizeHeight*bottomPagePos +'px'});
			$('#portfolio5page').css({'height':largeHitboxHSize +'px ', 'width':medHitboxWSize + 'px', 'margin-left': windowSizeWidth*centralPos +'px', 'margin-top': windowSizeHeight*topPagePos + 'px'});
			$('#portfolio6page').css({'height':smallHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth*leftPagePos +'px', 'margin-top': windowSizeHeight*middlePagePos +'px'});
			$('#portfolio7page').css({'height':smallHitboxHSize +'px ', 'width':largeHitboxWSize + 'px', 'margin-left': windowSizeWidth*rightPagePos +'px', 'margin-top': windowSizeHeight*middlePagePos +'px'});
			$('#portfolio8page').css({'height':largeHitboxHSize +'px ', 'width':medHitboxWSize + 'px', 'margin-left': windowSizeWidth*centralPos +'px', 'margin-top': windowSizeHeight*bottomPagePos +'px'});
		    $('#middleImages').css({'top':(innerBtnHolderHSize - middleImagesHeight)/2 +'px '});
			//if resize the browser window whilst scrolled over a menu item then activate complete home page reset
			if(isHover!= 'container') resetToHome('reset');
	    }else{
	    	//if video has been clicked and page then resized
	    	// $("#" + isHover + " .videoContainer").css({'width':'115%', 'height':'100%'});
	    	// $("#"+isHover).css({'margin-left': windowSizeWidth + 'px', 'margin-top': windowSizeHeight + 'px', 'width': windowSizeWidth + 'px', 'height':windowSizeHeight+'px'});
	    	// $("#" + isHover + " iframe").css({'width': '100%', 'height': '100%'});
	    }
		
		//if there is a video that can be played, the window size is for desktops and if the use has just loaded the page then play video. 
		if(!!v.canPlayType == true && windowSizeWidth > 1024 && lastScrolled == "newUser") animateHome();
		//else load the page without video
		else if(!!v.canPlayType == false || windowSizeWidth < 1024) staticHome();
	}
	// hide video, add a background image to the home page, reset all nav button positions and activate navigation movement by clearing lastScrolled
	function staticHome(){
		console.log('static home triggered');
		$('video').css({'display': 'none'});
		$("#moving5").addClass("designBackground");	
		$('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio5, #portfolio6, #portfolio7, #portfolio8').css({'top': '', 'left': '', 'right':'', 'bottom': '', 'opacity': ''});
		lastScrolled = '';
		isHover = 'container';
		isAnimating = false;
		$('.animatingPage').css({'display':'block'});
	}
	// set video height to half the page, disable nav movement + hide nav button graphics, 
	function animateHome(){
		console.log('video play');
		var videoHeight = ($('#moving5').height()-($('#moving5').height()*.7))/2;
		$('.animatingPage').css({'display':'none'});
		$('#topImage').css({'top':'35%', 'opacity':'0'});
		$('#portfolio1').css({'top':'40%', 'left':'40%', 'opacity':0});
		$('#portfolio2').css({'top':'40%', 'right':'40%', 'opacity':0});
		$('#portfolio3').css({'bottom':'40%', 'left':'40%', 'opacity':0});
		$('#portfolio4').css({'bottom':'40%', 'right':'40%', 'opacity':0});
		$('#portfolio6').css({'left':'40%', 'opacity':0});
		$('#portfolio7').css({'right':'40%', 'opacity':0});
		$('#bottomImage').css({'bottom':'35%', 'opacity':0});

		if($("video").get(0).paused != true) staticHome();
		else{
			$('video').css({'top':videoHeight + 'px'}).on('ended',function(){
				if(lastScrolled == "newUser"){
			      console.log('Video has ended!');	  
				  $('#topImage').stop().animate({'top': '0', 'left': '0', opacity: 1}, 300);
				  $('#portfolio1').stop().animate({'top':'', 'left':'', 'opacity':1}, 300);
				  $('#portfolio2').stop().animate({'top':'', 'right':'', 'opacity':1}, 300);
				  $('#portfolio3').stop().animate({'bottom':'', 'left':'', 'opacity':1}, 300);
				  $('#portfolio4').stop().animate({'bottom':'', 'right':'', 'opacity':1}, 300);
				  $('#portfolio6').stop().animate({'left': '0', opacity: 1}, 300);
				  $('#portfolio7').stop().animate({'right': '0', opacity: 1}, 300);
				  $('#bottomImage').stop().animate({'bottom': '0', opacity: 1},300);
				  lastScrolled = '';
				  isHover = 'container';
				  isAnimating = false;
				  setTimeout(function(){
				    $('.animatingPage').css({'display':'block'});
					console.log('animation finished - ready to play!');
				  }, 300);		
				}
		    });
		}
	}

	// on mouse over of navigation button
	$(".animatingPage").mouseenter(function(){
		//if browser is over 1024 (desktop user)
		if(windowSizeWidth > 1024 && isNaN(currentPosX) == false && windowSizeHeight >500 && clickedVideo == false){
			//check what page the user is scrolling over
		    isHover = $(this).attr('id');
		    //start animating
			isAnimating = true;
		    //Detect what navigation button is being hovered, move the background to center the selected page 
		    for(var pageNumber = 1;pageNumber<9;pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '') scrollPortfolio(isHover, pageNumber-1);	   
		}
	});

	$(".animatingPage").click(function(){
		for(var pageNumber = 1;pageNumber<9;pageNumber++) if(isHover == 'portfolio'+pageNumber+'page' && lastScrolled != '') openPortfolio(isHover);	
	});


	function scrollPortfolio(hovered, posmovement){
	    //Change the math movement to match what navigation page the user has chosen
	    //Once the selected page has animated to its defined position, set animation to false
		$('#container').stop().animate({'margin-left': portfolioMovePosX[posmovement], 'margin-top': portfolioMovePosY[posmovement]},{complete: function(){isAnimating=false;}});
		lastScrolled = '#' + hovered.substring(0,10);
		$(lastScrolled).removeClass("backgroundImage").addClass("staticImage");
		//Make the selected pages' content appear
		$(lastScrolled + 'page .content').stop().animate({'opacity': 1});
		//Make the selected pages background image grow
		$(".staticImage").stop().animate({'width': growBackgroundWSize+'px'},{complete: function(){
			if(isReady == true) animateIn();
		}}); 
		//Loop through all other pages and shrink them
		$( ".backgroundImage" ).stop().animate({'width': shrinkBackgroundWSize+'px'});
	}
	
	function openPortfolio(clicked){
		if(clickedVideo == false){
			console.log("clicked video = #" + clicked);
			if(isReady == true){
				lastVideo = (lastScrolled.substr(lastScrolled.length - 1))-1;
				players[lastVideo].playVideo();
				$("#" + isHover + " .videoContainer").stop().animate({'opacity': 1, 'width':'120%', 'height':'100%', 'right': 0, 'left': '-15%', 'top': 0, 'bottom': 0, 'position':'fixed'});
				$("#" + isHover + " .videoPlayer").stop().animate({'right': 0, 'left': 0, 'top': 0, 'bottom': 0});
				$("#" + isHover + " iframe").stop().animate({'right': 0, 'left': 0, 'top': 0, 'bottom': 0});
				$("#" + isHover + " iframe").css({'z-index': 10000});
				$("#" + clicked + ", #" + isHover + " .videoPlayer").css({'overflow':'visible', 'z-index':1000});
				$("#" + clicked + " .content").css({'opacity':0});
				$("#"+clicked).stop().animate({'margin-left': windowSizeWidth + 'px', 'margin-top': windowSizeHeight + 'px', 'width': windowSizeWidth + 'px', 'height':windowSizeHeight+'px'});
				$('#container').stop().animate({'margin-left': -windowSizeWidth + 'px', 'margin-top': -windowSizeHeight + 'px'});
				clickedVideo = true;
				// $("#" + isHover + " .videoContainer").css({'position':'fixed'});
				//change css of video to become full screen and then reveal controls
			} 
		}
	}


	// function animateOut(){
	// 	$(lastScrolled).stop().animate({'opacity': 1},{complete: function(){
	// 		animateIn();
	// 	}});
	// }

	//on mouse out of navigation button
	$(".animatingPage").mouseleave(function(){ 
		if(windowSizeWidth > 1024 && clickedVideo == false) resetToHome(isHover); });

	function resetToHome(lastPage){
		if(clickedVideo == false){

		//     // Get the page that was just scrolled out and shrink its background image to its normal size
		    $(lastScrolled).removeClass("staticImage").addClass("backgroundImage");
		    $(lastScrolled + 'page .content').stop().animate({"opacity":0});
			$('.videoContainer').stop().animate({"opacity": 0});
			if(isReady == true){
				pauseAllVideos();
			} 
		    // $(lastScrolled).css({'opacity':1});
		// 	// if browser is above 1024 (is a desktop)
			if(lastPage != 'reset' && lastScrolled != ''){
		// 		// animation starts
			    isAnimating = true;
		// 	    // console.log("call mouse out");
				$(".backgroundImage").stop().animate({'width': backgroundWSize+'px'});
		// 		//Hide the scrolled out pages content back to opacity 0
			    $('#' +lastPage + ' .content').stop().animate({'opacity': 0});
		// 	    //Make the container holding the nav buttons go back to its original size and position
				$('#middleImages').stop().animate({'top':(innerBtnHolderHSize - middleImagesHeight)/2 +'px'});
				$('#innerBtnHolder').stop().animate({'top':innerBtnHolderTop +'px'});
				$('#outerBtnHolder').stop().animate({'width': outerBtnHolderWSize +'px', 'height': outerBtnHolderHSize+'px','margin-right':'','margin-left':divCenter+'px', 'top':outerBtnHolderTop+'px'}); 
		// 	    //if another navigation item isn't selected, then set hover state to container and animate by normal mouse position
			    for(var pageNumber = 1;pageNumber<8;pageNumber++){
					if(isHover != 'portfolio'+pageNumber+'page'){ 
						isHover = 'container';
				        $('#container').stop().animate({'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'},{complete: function(){
				        	isAnimating=false;
				        	console.log('animated back to original layout');
				        }});
				        // isAnimating = false;
					}
				}
			}else{
			    $('#container').css({'opacity': 0, 'margin-left': currentPosX+'px', 'margin-top': currentPosY+'px'});
			    // $(lastScrolled).css({"opacity":1});
			    setTimeout(function(){
				    isAnimating=false;
				    // lastScrolled = '';
				    // $(lastScrolled + 'page .content').css({'opacity':0});
				    // $('#container').css({'opacity': 0});
				    isHover='container';
				}, 50);		    
			}
		}
	}
});

function animateIn(){
	lastVideo = (lastScrolled.substr(lastScrolled.length - 1))-1;
	players[lastVideo].playVideo();
	if (myPlayerState == 1 && $("#" + isHover + " .videoContainer").css('opacity') === '0') $("#" + isHover + " .videoContainer").stop().animate({'opacity': 1});	
}