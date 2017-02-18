

//** START ON STATIC SCREEN **//
function staticHome(){
	// hide video
	console.log("static home triggered!");
	$('video').css({'display': 'none'});
	$( "#viewport" ).removeClass( "hide" );
	$( "#loadScreenHolder" ).addClass( "hide" ).css({'display':'none'});
	//add a background image to the home page
	// $("#centerImage").addClass("designBackground");
	$('#heroText').css({'font-size':$('#centerImage').width()/8 +'px','display':'block', 'opacity':1});	
	//reset all nav button positions
	$('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio5, #portfolio6, #portfolio7, #portfolio8').css({'margin-top': '', 'margin-left': '', 'margin-right':'', 'margin-bottom': '', 'opacity': '', 'display':''});
	//activate navigation movement by clearing Portfolio.page.lastScrolled and resetting Portfolio.page.isHover + Portfolio.isAnimating
	Portfolio.page.lastScrolled = '';
	console.log("Portfolio.page.lastScrolled = " + Portfolio.page.lastScrolled);
	Portfolio.page.isHover = 'container';
	Portfolio.isAnimating = false;
	//allow nav buttons to be scrolled over by revealing the scroll buttons
	if(Portfolio.video.clicked == false) $('.animatingPage').css({'display':''});
	// console.log("static home");
	activateHeroAnimation();
}

//** START ON ANIMATED SCREEN **//
function animateHome(){
	console.log("animate home launched!");
	// set video height to half the page
	var videoHeight = ($('#centerImage').height()-($('#centerImage').height()*.7))/2;
	//disable nav movement
	$( "#viewport" ).removeClass( "hide" );
	$( "#loadScreenHolder" ).addClass( "hide" ).css({'display':'none'});
	$('#startUpVid').css({'display':'block', 'opacity':1});
	document.getElementById('startUpVid').play();
	$('.animatingPage').css({'display':'none'});
	//hide nav button graphics
	$('#topImage').css({'margin-top':'20%'});
	$('#portfolio1').css({'margin-top':'20%', 'margin-left':'40%'});
	$('#portfolio2').css({'margin-top':'20%', 'margin-right':'40%'});
	$('#portfolio3').css({'margin-bottom':'20%', 'margin-left':'40%'});
	$('#portfolio4').css({'margin-bottom':'20%', 'margin-right':'40%'});
	$('#portfolio6').css({'margin-left':'40%'});
	$('#portfolio7').css({'margin-right':'40%'});
	$('#bottomImage').css({'margin-bottom':'20%'});
	var heroTextHeight = ($('#centerImage').height()-$('#heroText').height())/2;
  	$('#heroText').css({'top':heroTextHeight + 'px'});
	Portfolio.page.lastScrolled = 'animatingHome';
	// if(videoYeah.paused){
	// 	staticHome();
	// }
	$( window ).resize(function() {
  		staticHome();
	});
	// console.log("animate home");
	//set video vertical position and if the video is completed
	console.log("Portfolio.page.lastScrolled = " + Portfolio.page.lastScrolled);
	var videoYeah = document.getElementById("startUpVid");
	if(!videoYeah.paused) {
		console.log("Portfolio.page.lastScrolled = " + Portfolio.page.lastScrolled);
		$('video').css({'top':videoHeight + 'px'}).on('ended',function(){
	      if(Portfolio.page.lastScrolled == 'animatingHome'){
		      console.log('Video has ended!');
		      $('video').css({'display':'none'});
		      $('#heroText').css({'font-size':$('#centerImage').width()/8 +'px','display':'block'});
			  activateHeroAnimation();
			  $('#heroText').css({'width':heroTotalTextWidth +'px','bottom':0+'px','font-size':0+'px','padding-top':$('#heroText').height()/1.5+'px','padding-left':$('#heroText').width()/1.5+'px',});
		      // console.log('width of hero = ' + heroTotalTextWidth + 'px');
		      $('#heroText').stop().animate({'opacity': 1, 'font-size':$('#centerImage').width()/8 +'px', 'padding':0+'px'},{complete: function(){
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
				  Portfolio.page.lastScrolled = '';
				  //reset all variables so that navigation scrolling will work
				  Portfolio.page.isHover = 'container';
				  Portfolio.isAnimating = false;
				  //after a second, make the social links animate in
				  setTimeout(function(){
				    $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
				    $('.animatingPage').css({'display':'block'});
				  }, 1000);		
		      }});
	      }
	    });
	}
}


function activateHeroAnimation(){
	$elem = $('#heroText');
	var charHover, previousCharHover;
	var heroCharNumber = 0, heroSpaceNumber = 0;
	var heroTextHeight = ($('#centerImage').height()-$('#heroCharNumber1').height())/2;
	heroTotalTextWidth = 0;
	if(Portfolio.heroText.currentHero == 0) $( "#heroText" ).html(Portfolio.heroText.options[0]);
	var chars = jQuery.map($elem.text().split(''), function(c) {
	  var charLength, charLengthParser;
	  if(c != ' '){
		  heroCharNumber++;
		  return '<span class ="heroChar" id = "heroCharNumber'+heroCharNumber+'">' + c + '</span>';
	  }else {
	  	  heroSpaceNumber++;
		  return '<span id = heroCharSpace>' + c + '</span>';
	  }
	});
	if(heroSpaceNumber != 0) charLength = chars.length, charLengthParser = chars.length-1;
	else charLength = chars.length+1, charLengthParser = chars.length;
	$elem.html(chars.join('')); 
	$( "#heroCharSpace" ).css({'width': $( "#heroCharNumber1" ).width()+'px', 'height':$( "#heroCharNumber1" ).height()+'px'});
	$(".heroChar").mouseenter(function(){
		charHover = $(this).attr('id');
		if ($("#"+charHover).css('opacity')==='1' && Portfolio.browserSize()[0] > 1024 && Portfolio.isAnimating == false && $('.animatingPage').css('display')==='block') growChar(charHover, charLengthParser);
	});
	
	// $("#centerImage").mouseenter(function(){
	// 	allowAnimation = true;
	// 	console.log("ALLOW ANIMATION");
	// });
	for(var x = 1;x<charLength;x++){
		var heroTextWidth = $('#heroCharNumber'+x).width();
		heroTotalTextWidth += heroTextWidth;
	}
	if(heroSpaceNumber>0) heroTotalTextWidth = heroTotalTextWidth + $("#heroCharSpace").width();
	$('#heroText').css({'height':$('#heroCharNumber1').height() + 'px'});
  	$('#heroText').css({'top': heroTextHeight + 'px', 'width':heroTotalTextWidth + 'px'});
}

function growChar(selectedChar, numberOfChars){
	Portfolio.heroText.grownChars++;
	if(Portfolio.heroText.grownChars == numberOfChars) changeHero();
	$( "#"+selectedChar ).css({'opacity':'.5'});
	$( "#"+selectedChar ).stop().animate({'margin-top':'-20px'},{complete: function(){
		$( "#"+selectedChar ).stop().animate({'margin-top':'0px'});
	}});
}

function changeHero(){
	var chosenWord;
	if(Portfolio.heroText.currentHero == 0) Portfolio.heroText.currentHero++;
	for(var x = 0;x<Portfolio.heroText.options.length;x++){
		if(Portfolio.heroText.currentHero == x) chosenWord = Portfolio.heroText.options[x];
		if(Portfolio.heroText.currentHero == Portfolio.heroText.options.length) Portfolio.heroText.currentHero = 0, chosenWord = Portfolio.heroText.options[0];
	}
	$( "#heroText" ).stop().animate({'opacity':'0'},{complete: function(){
		$( "#heroText" ).html(chosenWord);
		$( "#heroText" ).stop().animate({'opacity':'1'});
		Portfolio.heroText.grownChars = 0;
		activateHeroAnimation();
	}});
	Portfolio.heroText.currentHero++;
}
//** SCROLLING FUNCTION **//
//Changes the math movement to match what navigation page the user has chosen
function scrollPortfolio(hovered, posmovement){
    //set last scrolled to the div that has just been hovered over
	Portfolio.page.lastScrolled = '#' + hovered.substring(0,10);
	//if the windowsize is desktop, mouse positions values are there, the height of the browser is over 500 and a video hasnt been clicked
	if(Portfolio.browserSize()[0] > 1024 && Portfolio.browserSize()[1] >500 && Portfolio.video.clicked == false && isNaN(Portfolio.mousePos.currentPosX) == false){
		var scrollMovement = Portfolio.portfolioMoveValue(Portfolio.mousePos.currentPosX, Portfolio.mousePos.currentPosY, posmovement);
		//set animation to true
		Portfolio.isAnimating = true;
		//animate the container to the position of the item which was scrolled over, Once selected page is animated then set animation to false
		$('#container').stop().animate({'margin-left': scrollMovement[0], 'margin-top': scrollMovement[1]},{complete: function(){Portfolio.isAnimating=false;}});
		//add a class which will alow that div to grow
		$(Portfolio.page.lastScrolled).removeClass("backgroundImage").addClass("staticImage");
		//Make the selected pages' content appear
		$(Portfolio.page.lastScrolled + 'page .content').stop().animate({'opacity': 1});
		//Make the selected pages background image grow and once the image has grown and if the videos have been loaded, then animate the video in.
		$(".staticImage").stop().animate({'width': Portfolio.gif.growWSize+'px'},{complete: function(){ if(Portfolio.video.isReady == true) animateIn(); }}); 
		//Loop through all other pages and shrink them
		$( ".backgroundImage" ).stop().animate({'width': Portfolio.gif.shrinkWSize+'px'});
    	$( "#linksTop, #linksBottom" ).stop().animate({'opacity': 0});	
	}
}


//** ANIMATING VIDEOS ON SCROLL OVER **//
function animateIn(){
	//set the last video to what you've just scrolled over
	Portfolio.video.lastVideo = (Portfolio.page.lastScrolled.substr(Portfolio.page.lastScrolled.length - 1))-1;
	//play the selected video
	//stops a bug that tries to play a video that doesn't exist
	if(Portfolio.video.lastVideo>=0) Portfolio.video.players[Portfolio.video.lastVideo].playVideo();
	//if the video is playing and it is currently hidden, then animate it in.
	if (Portfolio.video.myPlayerState == 1 && $("#" + Portfolio.page.isHover + " .videoContainer").css('opacity') === '0' && Portfolio.video.clicked == false) $("#" + Portfolio.page.isHover + " .videoContainer").stop().animate({'opacity': 1});	
	// $(".staticImage").stop().animate({'opacity': 0});
}

//** OPEN VIDEO **//
function openPortfolio(clicked){
	//if is mobile and previously clicked on the same video
	if(isNaN(Portfolio.page.lastScrolled) && Portfolio.page.lastScrolled == "container" && Portfolio.isMobile) Portfolio.video.players[Portfolio.video.wasPlayed].unMute().seekTo(0).playVideo();
	//if a video hasn't been clicked yet, the videos have been loaded and the screen height is over 500
	if(Portfolio.video.clicked == false && Portfolio.video.isReady == true && Portfolio.browserSize()[1] > 500){
		//set the last video to what you've just scrolled over
		Portfolio.video.lastVideo = (Portfolio.page.lastScrolled.substr(Portfolio.page.lastScrolled.length - 1))-1;
		//set up a variable which will be able to full screen the selected video
		var number = clicked.substring(9); //gets the substring from index position 3 to the end
		number = parseInt(number)-1; //converts to a number
		Portfolio.video.selectedVidLoader = 0;
		Portfolio.video.clicked = true;
		// var selectedVideo = document.getElementById("player"+ (lastVideo + 1));
		// opens fullscreen video on mobile
		if(Portfolio.isMobile) fullScreenMobile();
		//full screen the selected video if on a desktop computer
		if(!Portfolio.isMobile) fullScreenVideoPlayer(number);
	}
}
