import { Navigation } from './4nav'; 

export class animationFunctions extends Navigation {
	constructor(){
		super();
		this.charLength; 
		this.charLengthParser;
	}

	//** START ON STATIC SCREEN **//
	staticHome(){
		// hide video
		
		$('video').css({'display': 'none'});
		$( "#viewport" ).removeClass( "hide" );
		$( "#loadScreenHolder" ).addClass( "hide" ).css({'display':'none'});
		//add a background image to the home page
		// $("#centerImage").addClass("designBackground");
		$('#heroText').css({'font-size':$('#centerImage').width()/8 +'px','display':'block', 'opacity':1});	
		//reset all nav button positions
		$('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio5, #portfolio6, #portfolio7, #portfolio8').css({'margin-top': '', 'margin-left': '', 'margin-right':'', 'margin-bottom': '', 'opacity': '', 'display':''});
		//activate navigation movement by clearing Portfolio.page.lastScrolled and resetting Portfolio.page.isHover + Portfolio.isAnimating
		this.page.lastScrolled = '';
		// console.log("Portfolio.page.lastScrolled = " + this.page.lastScrolled);
		this.page.isHover = 'container';
		this.isAnimating = false;
		//allow nav buttons to be scrolled over by revealing the scroll buttons
		if(this.video.clicked == false) $('.animatingPage').css({'display':''});
		// console.log("static home");
		this.activateHeroAnimation();
	}

	//** START ON ANIMATED SCREEN **//
	animateHome(){
		self = this;
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
		this.page.lastScrolled = 'animatingHome';
		// if(videoYeah.paused){
		// 	staticHome();
		// }
		$( window ).resize(function() {
	  		self.staticHome();
		});
		// console.log("animate home");
		//set video vertical position and if the video is completed
		console.log("Portfolio.page.lastScrolled = " + this.page.lastScrolled);
		var videoYeah = document.getElementById("startUpVid");
		if(!videoYeah.paused) {
			console.log("Portfolio.page.lastScrolled = " + this.page.lastScrolled);
			$('video').css({'top':videoHeight + 'px'}).on('ended',function(){
		      if(self.page.lastScrolled == 'animatingHome'){
			      // console.log('Video has ended!');
			      $('video').css({'display':'none'});
			      $('#heroText').css({'font-size':$('#centerImage').width()/8 +'px','display':'block'});
				  self.activateHeroAnimation();
				  $('#heroText').css({'width':self.heroText.heroTotalTextWidth +'px','bottom':0+'px','font-size':0+'px','padding-top':$('#heroText').height()/1.5+'px','padding-left':$('#heroText').width()/1.5+'px',});
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
					  self.page.lastScrolled = '';
					  //reset all variables so that navigation scrolling will work
					  self.page.isHover = 'container';
					  self.isAnimating = false;
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

	activateHeroAnimation(){
		self = this;
		var elem = $('#heroText');
		var charHover, previousCharHover;
		var heroCharNumber = 0, heroSpaceNumber = 0;
		var heroTextHeight = ($('#centerImage').height()-$('#heroCharNumber1').height())/2;
		this.heroText.heroTotalTextWidth = 0;
		if(this.heroText.currentHero == 0) $( "#heroText" ).html(this.heroText.options[0]);
		var chars = jQuery.map(elem.text().split(''), function(c) {
		  if(c != ' '){
			  heroCharNumber++;
			  return '<span class ="heroChar" id = "heroCharNumber'+heroCharNumber+'">' + c + '</span>';
		  }else {
		  	  heroSpaceNumber++;
			  return '<span id = heroCharSpace>' + c + '</span>';
		  }
		});
		if(heroSpaceNumber != 0) this.charLength = chars.length, this.charLengthParser = chars.length-1;
		else this.charLength = chars.length+1, this.charLengthParser = chars.length;
		elem.html(chars.join('')); 
		$( "#heroCharSpace" ).css({'width': $( "#heroCharNumber1" ).width()+'px', 'height':$( "#heroCharNumber1" ).height()+'px'});

		$(".heroChar").mouseenter(function(){
			charHover = $(this).attr('id');
			if ($("#"+charHover).css('opacity')==='1' && self.browserSize()[0] > 1024 && self.isAnimating == false && $('.animatingPage').css('display')==='block') self.growChar(charHover, self.charLengthParser);
		});
		
		// $("#centerImage").mouseenter(function(){
		// 	allowAnimation = true;
		// 	console.log("ALLOW ANIMATION");
		// });
		for(var x = 1;x<this.charLength;x++){
			var heroTextWidth = $('#heroCharNumber'+x).width();
			this.heroText.heroTotalTextWidth += heroTextWidth;
		}
		if(heroSpaceNumber>0) this.heroText.heroTotalTextWidth = this.heroText.heroTotalTextWidth + $("#heroCharSpace").width();
		$('#heroText').css({'height':$('#heroCharNumber1').height() + 'px'});
	  	$('#heroText').css({'top': heroTextHeight + 'px', 'width':this.heroText.heroTotalTextWidth + 'px'});
	}
	
	growChar(selectedChar, numberOfChars){
		this.heroText.grownChars++;
		if(this.heroText.grownChars == numberOfChars) this.changeHero();
		$( "#"+selectedChar ).css({'opacity':'.5'});
		$( "#"+selectedChar ).stop().animate({'margin-top':'-20px'},{complete: function(){
			$( "#"+selectedChar ).stop().animate({'margin-top':'0px'});
		}});
	}

	changeHero(){
		self = this;
		var chosenWord;
		if(this.heroText.currentHero == 0) this.heroText.currentHero++;
		for(var x = 0;x<this.heroText.options.length;x++){
			if(this.heroText.currentHero == x) chosenWord = this.heroText.options[x];
			if(this.heroText.currentHero == this.heroText.options.length) this.heroText.currentHero = 0, chosenWord = this.heroText.options[0];
		}
		$( "#heroText" ).stop().animate({'opacity':'0'},{complete: function(){
			$( "#heroText" ).html(chosenWord);
			$( "#heroText" ).stop().animate({'opacity':'1'});
			self.heroText.grownChars = 0;
			self.activateHeroAnimation();
		}});
		this.heroText.currentHero++;
	}
	//** SCROLLING FUNCTION **//
	//Changes the math movement to match what navigation page the user has chosen
	scrollPortfolio(hovered, posmovement){
		self = this;
	    //set last scrolled to the div that has just been hovered over
		this.page.lastScrolled = '#' + hovered.substring(0,10);
		//if the windowsize is desktop, mouse positions values are there, the height of the browser is over 500 and a video hasnt been clicked
		if(this.browserSize()[0] > 1024 && this.browserSize()[1] >500 && this.video.clicked == false && isNaN(this.mousePos.currentPosX) == false){
			var scrollMovement = this.portfolioMoveValue(this.mousePos.currentPosX, this.mousePos.currentPosY, posmovement);
			//set animation to true
			this.isAnimating = true;
			//animate the container to the position of the item which was scrolled over, Once selected page is animated then set animation to false
			$('#container').stop().animate({'margin-left': scrollMovement[0], 'margin-top': scrollMovement[1]},{complete: function(){self.isAnimating=false;}});
			//add a class which will alow that div to grow
			$(this.page.lastScrolled).removeClass("backgroundImage").addClass("staticImage");
			//Make the selected pages' content appear
			$(this.page.lastScrolled + 'page .content').stop().animate({'opacity': 1});
			//Make the selected pages background image grow and once the image has grown and if the videos have been loaded, then animate the video in.
			$(".staticImage").stop().animate({'width': this.gif.growWSize+'px'},{complete: function(){ if(self.video.isReady == true) self.animateIn(); }}); 
			//Loop through all other pages and shrink them
			$( ".backgroundImage" ).stop().animate({'width': this.gif.shrinkWSize+'px'});
	    	$( "#linksTop, #linksBottom" ).stop().animate({'opacity': 0});	
		}
	}
	//** ANIMATING VIDEOS ON SCROLL OVER **//
	animateIn(){
		//set the last video to what you've just scrolled over
		this.video.lastVideo = (this.page.lastScrolled.substr(this.page.lastScrolled.length - 1))-1;
		//play the selected video
		//stops a bug that tries to play a video that doesn't exist
		if(this.video.lastVideo>=0) this.video.players[this.video.lastVideo].playVideo();
		//if the video is playing and it is currently hidden, then animate it in.
		if (this.video.myPlayerState == 1 && $("#" + this.page.isHover + " .videoContainer").css('opacity') === '0' && this.video.clicked == false) $("#" + this.page.isHover + " .videoContainer").stop().animate({'opacity': 1});	
		// $(".staticImage").stop().animate({'opacity': 0});
	}

	//** OPEN VIDEO **//
	openPortfolio(clicked){
		//if is mobile and previously clicked on the same video
		if(isNaN(this.page.lastScrolled) && this.page.lastScrolled == "container" && this.isMobile) this.video.players[this.video.wasPlayed].unMute().seekTo(0).playVideo();
		//if a video hasn't been clicked yet, the videos have been loaded and the screen height is over 500
		if(this.video.clicked == false && this.video.isReady == true && this.browserSize()[1] > 500){
			//set the last video to what you've just scrolled over
			this.video.lastVideo = (this.page.lastScrolled.substr(this.page.lastScrolled.length - 1))-1;
			//set up a variable which will be able to full screen the selected video
			var number = clicked.substring(9); //gets the substring from index position 3 to the end
			number = parseInt(number)-1; //converts to a number
			this.video.selectedVidLoader = 0;
			this.video.clicked = true;
			// var selectedVideo = document.getElementById("player"+ (lastVideo + 1));
			// opens fullscreen video on mobile
			if(this.isMobile) this.fullScreenMobile();
			//full screen the selected video if on a desktop computer
			if(!this.isMobile) this.fullScreenVideoPlayer(number);
		}
	}
	returnToHome(){
    	// Get the page that was just scrolled out and shrink its background image to its normal size
	    $(this.page.lastScrolled).removeClass("staticImage").addClass("backgroundImage");
	    // $(Portfolio.page.lastScrolled + 'page .content').stop().animate({"opacity":0});
		$('.videoContainer').stop().animate({"opacity": 0});
		//if videos are loaded then pause all of them
		if(this.video.isReady) this.pauseAllVideos();
    }
    scrollOutNav() {
    	self = this;
    	// animation starts
	    if(!this.isMobile) this.isAnimating = true;
	    // console.log("background W size SLUT = " + backgroundWSize+'px');
		if(this.browserSize()[0] < 1900) $(".backgroundImage").stop().animate({'width': this.gif['backgroundWSize']+'px'});
		else if (this.browserSize()[0] > 1900 || this.browserSize()[1] > 1100) $(".backgroundImage").stop().animate({'width': this.gif['backgroundWSize']/1.5+'px'});
		//Hide the scrolled out pages content back to opacity 0
	    // $('#' +lastPage + ' .content').stop().animate({'opacity': 0});
	    $('.content').stop().animate({'opacity': 0});
		//Make the container holding the nav buttons go back to its original size and position
		$('#middleImages').stop().animate({'top':(this.gif.innerGridHSize - this.gif.centerGridHSize)/2 +'px'});
		$('#innerBtnHolder').stop().animate({'top':this.gif.innerGridYPos +'px'});
		$('#outerBtnHolder').stop().animate({'width': this.gif.outerGridWSize +'px', 'height': this.gif.outerGridHSize+'px','margin-right':'','margin-left':'', 'top':this.gif.outerGridYPos+'px'}); 
		if(this.page.lastScrolled != 'newUser' && this.video.clicked == false) $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
		
		if(this.page.lastScrolled == "#portfolio5") {
			$('#portfolio8page').css({"display":"none"});
			setTimeout(function(){ $('#portfolio8page').css({"display":"block"}); }, 700);	
		}
		else if(this.page.lastScrolled == "#portfolio8"){
		 $('#portfolio5page').css({"display":"none"});
			setTimeout(function(){ $('#portfolio5page').css({"display":"block"}); }, 700);	
		}
		//if another navigation item isn't selected, then set hover state to container and animate by normal mouse position
	    for(var pageNumber = 1;pageNumber<8;pageNumber++){
			if(this.page.isHover != 'portfolio'+pageNumber+'page'){ 
				this.page.isHover = 'container';
		        if(this.mousePos.allowAnimation == true) $('#container').stop().animate({'margin-left': this.mousePos.currentPosX+'px', 'margin-top': this.mousePos.currentPosY+'px'},{complete: function(){ self.isAnimating=false; }});
			}
		}
		// console.log("animate page to home position");
    }

    resetScrolledOverItems(){
    	self = this;
    	$(this.page.lastScrolled).removeClass("staticImage").addClass("backgroundImage");
	    if(this.browserSize()[0] < 1900) $(".backgroundImage").css({'width': this.gif['backgroundWSize']+'px'});
		else if (this.browserSize()[0] > 1900 || this.browserSize()[1] > 1100) $(".backgroundImage").css({'width': this.gif['backgroundWSize']/1.5+'px'});
	    $('#container').css({'opacity': 0, 'margin-left': this.mousePos.currentPosX+'px', 'margin-top': this.mousePos.currentPosY+'px'});
	    $('.videoContainer').css({'opacity': 0});
	    $('.content').css({'opacity': 0});
	    // $(Portfolio.page.lastScrolled).css({"opacity":1});
	    setTimeout(function(){
		    self.isAnimating=false;
		    $(self.page.lastScrolled + 'page .content').css({'opacity':0});
		    $('#container').css({'opacity': '1', 'margin-left': self.mousePos.currentPosX+'px', 'margin-top': self.mousePos.currentPosY+'px'});
		    self.page.isHover='container';
		    self.checkPositions();
		    // $('body').css({'background-color': 'orange'});
		}, 50);	
    }
	//** RESET TO HOME POSITION **//
    resetToHome(lastPage){
		// if browser is above 1024 (is a desktop) and a video hasn't been clicked
		if(this.video.clicked == false && this.browserSize()[0] > 1024 && !this.isMobile){
			//shrink all items back to normal home page positions
			this.returnToHome();
			//if you've just scrolled out of a nav button
			if(lastPage != 'reset' && this.page.lastScrolled != '') this.scrollOutNav();
			//if you've just resized the screen.
			else{
				//if the user isn't using special electronics invitation (keyboard inputs)
				if(this.page.lastClicked == ''){
					if(lastPage == 'reset') this.resetScrolledOverItems();
					//else if full screen is exited	    
					else this.page.isHover='container';
				//if the user is navigating the site with the electronics invitation (keyboard inputs)
				} else{
				    this.page.lastScrolled = 'container';
				    this.page.isHover='container';
					this.checkPositions();
				}
			}
		//if a video has been clicked and then you resize the screen, then return to the standard screen navigation
		} else {
			// $('body').css({'background-color': 'red'});
		     // players[lastVideo].stopVideo();
			if(!this.isMobile && !this.isTablet) this.page.isHover = 'container';
		}
    }
}

