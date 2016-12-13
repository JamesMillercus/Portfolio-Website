

//** START ON STATIC SCREEN **//
function staticHome(){
	// hide video
	$('video').css({'display': 'none'});
	//add a background image to the home page
	// $("#centerImage").addClass("designBackground");	
	//reset all nav button positions
	$('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio5, #portfolio6, #portfolio7, #portfolio8').css({'margin-top': '', 'margin-left': '', 'margin-right':'', 'margin-bottom': '', 'opacity': ''});
	//activate navigation movement by clearing lastScrolled and resetting isHover + isAnimating
	lastScrolled = '';
	isHover = 'container';
	isAnimating = false;
	//allow nav buttons to be scrolled over by revealing the scroll buttons
	if(clickedVideo == false) $('.animatingPage').css({'display':''});
	// console.log("static home");
}

//** START ON ANIMATED SCREEN **//
function animateHome(){
	// set video height to half the page
	var videoHeight = ($('#centerImage').height()-($('#centerImage').height()*.7))/2;
	//disable nav movement
	$('.animatingPage').css({'display':'none'});
	//hide nav button graphics
	$('#startUpVid').css({'display':'block', 'opacity':1});
	$('#topImage').css({'margin-top':'20%', 'opacity':0});
	$('#portfolio1').css({'margin-top':'20%', 'margin-left':'40%', 'opacity':0});
	$('#portfolio2').css({'margin-top':'20%', 'margin-right':'40%', 'opacity':0});
	$('#portfolio3').css({'margin-bottom':'20%', 'margin-left':'40%', 'opacity':0});
	$('#portfolio4').css({'margin-bottom':'20%', 'margin-right':'40%', 'opacity':0});
	$('#portfolio6').css({'margin-left':'40%', 'opacity':0});
	$('#portfolio7').css({'margin-right':'40%', 'opacity':0});
	$('#bottomImage').css({'margin-bottom':'20%', 'opacity':0});
	var heroTextHeight = ($('#centerImage').height()-$('#heroText').height())/2;
  	$('#heroText').css({'top':heroTextHeight + 'px'});
	lastScrolled = 'animatingHome';
	// console.log("animate home");
	//set video vertical position and if the video is completed
	$('video').css({'top':videoHeight + 'px'}).on('ended',function(){
      // console.log('Video has ended!');
      $('video').css({'display':'none'});
      $('#heroText').css({'font-size':$('#centerImage').width()/8 +'px','display':'block'});
      $('#heroText').stop().animate({'opacity': 1},{complete: function(){
	      //animate text in
	      //animate all the nav buttons to their correct positions	  
		  $('#topImage').stop().animate({'margin-top': '', 'margin-left': '', 'opacity': 1}, 500);
		  $('#portfolio1').stop().animate({'margin-top':'', 'margin-left':'', 'opacity':1}, 500);
		  $('#portfolio2').stop().animate({'margin-top':'', 'margin-right':'', 'opacity':1}, 500);
		  $('#portfolio3').stop().animate({'margin-bottom':'', 'margin-left':'', 'opacity':1}, 500);
		  $('#portfolio4').stop().animate({'margin-bottom':'', 'margin-right':'', 'opacity':1}, 500);
		  $('#portfolio6').stop().animate({'margin-left': '', 'opacity': 1}, 500);
		  $('#portfolio7').stop().animate({'margin-right': '', 'opacity': 1}, 500);
		  $('#bottomImage').stop().animate({'margin-bottom': '', 'opacity': 1},500);
		  lastScrolled = '';
		  //reset all variables so that navigation scrolling will work
		  isHover = 'container';
		  isAnimating = false;
		  //after a second, make the social links animate in
		  setTimeout(function(){
		    $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
		    $('.animatingPage').css({'display':'block'});
		  }, 1000);		
      }});
    });
}
//** SCROLLING FUNCTION **//
//Changes the math movement to match what navigation page the user has chosen
function scrollPortfolio(hovered, posmovement){
    //set last scrolled to the div that has just been hovered over
	lastScrolled = '#' + hovered.substring(0,10);
	//if the windowsize is desktop, mouse positions values are there, the height of the browser is over 500 and a video hasnt been clicked
	if(windowSizeWidth > 1024 && windowSizeHeight >500 && clickedVideo == false && isNaN(currentPosX) == false){
		//set animation to true
		isAnimating = true;
		//animate the container to the position of the item which was scrolled over, Once selected page is animated then set animation to false
		$('#container').stop().animate({'margin-left': portfolioMovePosX[posmovement], 'margin-top': portfolioMovePosY[posmovement]},{complete: function(){isAnimating=false;}});
		//add a class which will alow that div to grow
		$(lastScrolled).removeClass("backgroundImage").addClass("staticImage");
		//Make the selected pages' content appear
		$(lastScrolled + 'page .content').stop().animate({'opacity': 1});
		//Make the selected pages background image grow and once the image has grown and if the videos have been loaded, then animate the video in.
		$(".staticImage").stop().animate({'width': growBackgroundWSize+'px'},{complete: function(){ if(isReady == true) animateIn(); }}); 
		//Loop through all other pages and shrink them
		$( ".backgroundImage" ).stop().animate({'width': shrinkBackgroundWSize+'px'});
    	$( "#linksTop, #linksBottom" ).stop().animate({'opacity': 0});	
	}
}

//** ANIMATING VIDEOS ON SCROLL OVER **//
function animateIn(){
	//set the last video to what you've just scrolled over
	lastVideo = (lastScrolled.substr(lastScrolled.length - 1))-1;
	//play the selected video
	players[lastVideo].playVideo();
	//if the video is playing and it is currently hidden, then animate it in.
	if (myPlayerState == 1 && $("#" + isHover + " .videoContainer").css('opacity') === '0' && clickedVideo == false) $("#" + isHover + " .videoContainer").stop().animate({'opacity': 1});	
	// $(".staticImage").stop().animate({'opacity': 0});
}

//** OPEN VIDEO **//
function openPortfolio(clicked){
	//if is mobile and previously clicked on the same video
	if(isNaN(lastScrolled) && lastScrolled == "container" && isMobile) players[wasPlayed].unMute().seekTo(0).playVideo();
	//if a video hasn't been clicked yet, the videos have been loaded and the screen height is over 500
	if(clickedVideo == false && isReady == true && windowSizeHeight > 500){
		//set the last video to what you've just scrolled over
		lastVideo = (lastScrolled.substr(lastScrolled.length - 1))-1;
		//set up a variable which will be able to full screen the selected video
		var number = clicked.substring(9); //gets the substring from index position 3 to the end
		number = parseInt(number)-1; //converts to a number
		selectedVidLoader = 0;
		clickedVideo = true;
		// var selectedVideo = document.getElementById("player"+ (lastVideo + 1));
		// opens fullscreen video on mobile
		if(isMobile) fullScreenMobile();
		//full screen the selected video if on a desktop computer
		if(!isMobile) fullScreenVideoPlayer(number);
	}
}

