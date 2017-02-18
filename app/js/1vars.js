/*jslint browser:true*/
/*global window*/

//** SET UP ALL VARIABLES **//

function designPortfolio() {
	//setting up mobile device if statements by detecting touch availability
	var has_touch = 'ontouchstart' in document.documentElement;
	//adjust the below variables to select mobiles and tablets
	var isTablet = /Tablet|ipad/i.test(navigator.userAgent.toLowerCase());
	var isMobile = /webos|iphone|blackberry|ipod|android. +mobile|windows phone/i.test(navigator.userAgent.toLowerCase());

	// Inject YouTube API script asynchronously
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

designPortfolio.prototype = {
	loadPercentage:0,
	//variables for determining mouse pos
	mousePos: {
		x: null,
		y: null,
		currentPosX: null,
		currentPosY: null,
		//movement strength of background
		movementStrength: 10,
		isAnimating: false,
		allowAnimation: false
	},
	browser: {
		greaterThanResizer: [1024, 900, 551, 0],
		lesserThanResizer: [99999999, 1024, 900, 550],
	},

	animationPositions: {
		portfolio1: [.83333333333333333,.7],
		portfolio2: [1.16,.7],
		portfolio3: [.83333333333333333,1.3],
		portfolio4: [1.16,1.3],
		portfolio5: [1,.6],
		portfolio6: [.76923072999,1],
		portfolio7: [1.24,1],
		portfolio8: [1,1.4]
	},

	gif: {
		backgroundWSize: 0,
		backgroundHSize: 0,
		// store values to decide the size of selected and non selected nav buttons
		growWSize:0,
		shrinkWSize:0,
		backgroundWImageResizerArr: [7,7,5,3.3],
		backgroundHImageResizerArr: [5,6,7,3.5],
		outerGridWSize:0,
		outerGridHSize:0,
		outerGridYPos:0,
		innerGridHSize:0,
		innerGridYPos:0,
		centerGridHSize:0
	},

	hitBoxPosAndSizes:{
		desktop: {
			topPagePos:0.5,
			leftPagePos:0.76,
			rightPagePos: 1.675,
			bottomPagePos: 1.7,
			leftCornerPos: 1.5,
			rightCornerPos: 1.734,
			centralPos: 1.272,
			middlePagePos: 1.32
		},
		smallDesktop:{
			topPagePos: 0.58,
			leftPagePos: 0.72,
			rightPagePos: 1.72,
			bottomPagePos: 1.74,
			leftCornerPos: 1.5,
			rightCornerPos: 1.77,
			centralPos: 1.4,
			middlePagePos: 1.345
		},
		tablet:{
			topPagePos: 0.65,
			leftPagePos: 0.42,
			rightPagePos: 1.78,
			bottomPagePos: 1.75,
			leftCornerPos: 2.3,
			rightCornerPos: 1.77,
			centralPos: 1.4,
			middlePagePos: 1.375
		},
		mobile:{
			topPagePos: 0.22,
			leftPagePos: 0.42,
			rightPagePos: 1.78,
			bottomPagePos: 1.635,
			leftCornerPos: 8,
			rightCornerPos: 1.66,
			centralPos: 1.348,
			middlePagePos: 1.375
		},
		newimageResizingarr:[
			newDesktopImageSizes = [],
			newSmallDesktopImageSizes=[],
			newTabletImageSizes=[],
			newMobileImageSizes=[]
		],
	},

	page:{
		height:0,
		width:0,
		xPosition:0,
		yPosition:0,
		// store the last scrolled item
		lastScrolled: 'newUser',
		// variable to check what is being hovered on, set up automatically as container
		isHover: 'container',
		lastClicked: ''
	},

	video:{
		// var to track if a video has been clicked
		clicked:false,
		//stores the latest selected video for iphones
		lastVideo: null,
		// a counter to see how many videos have been loaded
		isLoaded: 0,
		//boolean to allow videos to be played once loaded
		isReady:false,
		//the number of videos that will be loaded
		videoList:null,
		//video players are stored in this array
		players: [],
		//video youtubeids
		playerYoutubeIds: [],
		ID: '',
		//full screen vid player
		player: null,
		myPlayerState: null,
		//a variable to store previously played video when on mobile
		wasPlayed: null,
		//variable to store whether the video is playing or not
		selectedVidLoader: 0,
		//variable to store the state of the mobile device video player
		videoLoaderState: null
	},

	heroText:{
		grownChars:0,
		currentHero:0,
		options: ["James Miller","Design", "Creative","Technology","Electronics", "Node", "Ideation", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"],
		heroTotalTextWidth: 0
	},

	invitation:{
		lowerCase: null,
		upperCase: null,
		count: 0,
		keyboardArr:[/*a*/97,/*A*/65,/*b*/98,/*B*/66,/*c*/99,/*C*/67,/*d*/100,/*D*/68,/*e*/101,/*E*/69,/*f*/102,/*F*/70,/*g*/103,/*G*/71,/*h*/104,/*H*/72,/*m*/109,/*M*/77],
		keyboardEvent: null
	},

	browserSize: function(){
			return [$(window).width(),$(window).height()];
		},
	browserResizer: function(){
		return [this.browser.greaterThanResizer, this.browser.lesserThanResizer];
	},

    portfolioMoveValue : function(xpos, ypos, portfolioItem) {
    	return [xpos*this.animationPositions['portfolio'+(portfolioItem+1)][0] + 'px', ypos*this.animationPositions['portfolio'+(portfolioItem+1)][1]+ 'px'];
    },
    totalNumberOfItems : function(){
    	return Object.keys(this.animationPositions).length+1;
    },
    calcGifSizes : function(width, height){
    	this.gif.backgroundWSize = width, this.gif.backgroundHSize = height;
    	return[this.gif.backgroundWSize, this.gif.backgroundHSize];
    },
    calcHitBoxSizes : function(){
    	//loop through each of the screen sizes for hitbox arrays
    	for(var o = 0; o < Object.keys(this.hitBoxPosAndSizes).length-1; o++)
    	{
    		//loop through arrays of devices that can be used
	    	var userDevice = Object.keys(this.hitBoxPosAndSizes)[o];
	    	//the targetted device whose portfolio hitbox sizes will be defined
	    	var deviceHitBoxSize = this.hitBoxPosAndSizes[userDevice];
	    	//set the height of all large hit boxes heights
	    	deviceHitBoxSize['largeHitBoxHeight'] = this.gif['backgroundHSize']*4;
	    	//set the height of all large hit boxes widths
	    	deviceHitBoxSize['largeHitBoxWidth'] = this.gif['backgroundWSize']*4;
	    	//set the height of desktop med hit boxes widths
	    	if(userDevice == "desktop") deviceHitBoxSize['medHitBoxWidth'] = this.gif['backgroundWSize']*3;
	    	//set the height of small desktop med hit boxes widths
	    	else if(userDevice == "smallDesktop") deviceHitBoxSize['medHitBoxWidth'] = this.gif['backgroundWSize']*1.5;
	    	//set the height of tablet or mobile med hit boxes widths
	    	else if(userDevice == "tablet" || userDevice == "mobile") deviceHitBoxSize['medHitBoxWidth'] = this.gif['backgroundWSize']*1.5;
	    	//set the height of all small hit boxes heights
	    	deviceHitBoxSize['smallHitBoxHeight'] = this.gif['backgroundHSize']*1.8;
	    	//set the height of all but mobile small hit boxes widths
	    	if(userDevice == "desktop" || userDevice == "smallDesktop" || userDevice == "tablet") deviceHitBoxSize['smallHitBoxWidth'] = this.gif['backgroundWSize']*2;
	    	//set the height of only mobile small hit boxes widths
	    	else if (userDevice == "mobile") deviceHitBoxSize['smallHitBoxWidth'] = this.gif['backgroundWSize']*1.348;
	    	//store values of position + sizes of hit boxes from the objects
	    	var devicePositionMaths = Object.values(this.hitBoxPosAndSizes)[o];
	    	//clear current set values in the image resizing array
    		this.hitBoxPosAndSizes.newimageResizingarr[o] = [];
	    	//for each value in each device object
	    	for(var k = 0; k < Object.keys(devicePositionMaths).length; k++){
	    		//store each individual value from the device size object
				var positionMathValues = Object.values(devicePositionMaths)[k];
				//push those values into the new image resizing array
	    		this.hitBoxPosAndSizes.newimageResizingarr[o].push(positionMathValues);
	    	}
    	}
    	//return the new sizes and positions of all hitboxes
		return this.hitBoxPosAndSizes.newimageResizingarr;
    },
    //** CHECK SIZE OF SCREEN + LOAD NEW SIZES **//
    loadHitBoxPosAndSize: function(){
    	var currentSize;
		var browserResizingOptions = this.browserResizer()[0].length;
		//for each screen size (4), set the size of all hit boxes based on the screen size
		for(var x = 0;x < browserResizingOptions; x++) {
			//based on what screen size you are on, load in different arrays that resize the divs on the screen
			var currentBrowserSizeX = this.browserSize()[0];
			var currentBrowserSizeY = this.browserSize()[1];
			var lesserThanValue = this.browserResizer()[0][x];
			var greaterThanValue = this.browserResizer()[1][x];
			if(currentBrowserSizeX > lesserThanValue && currentBrowserSizeX < greaterThanValue) {
				//set the size of all the gifs
				if(!this.isMobile && !this.isTablet) {
					this.calcGifSizes($('#homepage').width()/this.gif.backgroundWImageResizerArr[x],$('#homepage').height()/this.gif.backgroundHImageResizerArr[x]);
					//set the current size of the content based on what size screen was loaded
					currentSize = this.calcHitBoxSizes()[x];
				}
				//if tablet 
				else if(this.isTablet) {
					//set the sizes to load the tablet array
					this.calcGifSizes($('#homepage').width()/this.gif.backgroundWImageResizerArr[2],$('#homepage').height()/this.gif.backgroundHImageResizerArr[2]);
					//load the tablet array
					currentSize = this.calcHitBoxSizes()[2];
				}
				//if mobile 
				else if(this.isMobile) {
					// set the sizes to load the mobile array
					this.calcGifSizes($('#homepage').width()/this.gif.backgroundWImageResizerArr[3],$('#homepage').height()/this.gif.backgroundHImageResizerArr[3]);
					// load the mobile array
					currentSize = this.calcHitBoxSizes()[3];
				}
			}
		}
		//return the size and positions of all hitboxs based on screen size
		return currentSize;
    },
    // ** SORT POSITION DATA FROM ARRAY AND ASSIGN NEW PAGE POSITIONS **
    calcPagePosAndSizes: function(calculatedVals){
    	//store the total length of values within desktopImageSizes
		var desktopImageSizesLength =  this.calcHitBoxSizes()[0].length;
		var hitBoxSizeAndPos = [];
		var currentBrowserSizeX = this.browserSize()[0];
		var currentBrowserSizeY = this.browserSize()[1];

		//STORE NAV HEIGHT, NAV WIDTH, NAV MARGIN LEFT + TOP IN OBJECT
	    for(var resizeNumber = 0; resizeNumber < desktopImageSizesLength; resizeNumber++){
			//store chosen array data in a new array
			hitBoxSizeAndPos[resizeNumber] = calculatedVals[resizeNumber];
			//set the height of all the content
		    this.page.height = [hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[11], hitBoxSizeAndPos[11], hitBoxSizeAndPos[8]];
			//set the width of all the content
			this.page.width = [hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[10], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[10]]; 
			//set the margin left
			this.page.xPosition = [currentBrowserSizeX/hitBoxSizeAndPos[4], currentBrowserSizeX*hitBoxSizeAndPos[5], currentBrowserSizeX/hitBoxSizeAndPos[4], currentBrowserSizeX*hitBoxSizeAndPos[5], currentBrowserSizeX*hitBoxSizeAndPos[6], currentBrowserSizeX*hitBoxSizeAndPos[1], currentBrowserSizeX*hitBoxSizeAndPos[2], currentBrowserSizeX*hitBoxSizeAndPos[6]];
			//set the margin top of all the content
			this.page.yPosition = [currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[3], currentBrowserSizeY*hitBoxSizeAndPos[3], currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[7], currentBrowserSizeY*hitBoxSizeAndPos[7], currentBrowserSizeY*hitBoxSizeAndPos[3]];
	    }
    },
    setPageSizeAndPos: function(){
    	//for each portfolio item on the page, resize and place each item based on screen size
    	for(var pageNumber = 0;pageNumber<this.page.xPosition.length;pageNumber++){
	    	$('#portfolio'+ (pageNumber+1) +'page').css({'height':this.page.height[pageNumber] +'px', 'width':this.page.width[pageNumber] +'px', 'margin-left': this.page.xPosition[pageNumber] +'px', 'margin-top': this.page.yPosition[pageNumber] +'px'});
    	}
    },
    setGifGrid: function(){
    	//SET GRID SIZE AND POSITION
	    this.gif.outerGridWSize = $('#outerBtnHolder').width(), this.gif.outerGridHSize = $('#outerBtnHolder').height(), this.gif.innerGridHSize = $('#innerBtnHolder').height(), this.gif.centerGridHSize = $('#middleImages').height(); 
	    this.gif.outerGridYPos = ($('#homepage').height()-$('#outerBtnHolder').height())/2, this.gif.innerGridYPos = (this.gif.outerGridHSize-this.gif.innerGridHSize)/2;  
	    //reset and re-center all postions of all content
	    $('#outerBtnHolder').css({'width': '', 'height': '', 'top':this.gif.outerGridYPos+'px','margin-left':'', 'margin-right':'', 'left':'', 'right':''}), $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':this.gif.innerGridYPos,'bottom':''});
	    $('#middleImages').css({'top':(this.gif.innerGridHSize - this.gif.centerGridHSize)/2 +'px'});
    },
    setGifSizes: function(){
    	//set the size of the gifs based on the screen size
    	if(this.browserSize()[0] < 1900) $('.backgroundImage').css({'width': this.gif['backgroundWSize'] + 'px ', 'height': this.gif['backgroundHSize'] + 'px'});
		else if(this.browserSize()[0] > 1900 || this.browserSize()[1] > 1100) $('.backgroundImage').css({'width':this.gif['backgroundWSize']/1.5 +'px ', 'height':this.gif['backgroundHSize']/1.5+ 'px'});
		// Selected page background image grows by 1.2 times its current size and other pages have their size divided by 1.8
		this.gif.growWSize = this.gif['backgroundWSize']*1.3, this.gif.shrinkWSize = this.gif['backgroundWSize']/1.9;
    }
}

var Portfolio = new designPortfolio();