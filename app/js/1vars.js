/*jslint browser:true*/
/*global window*/

//** SET UP ALL VARIABLES **//

//setting up mobile device if statements by detecting touch availability
var has_touch = 'ontouchstart' in document.documentElement;
//adjust the below variables to select mobiles and tablets
var isTablet = /Tablet|ipad/i.test(navigator.userAgent.toLowerCase());
var isMobile = /webos|iphone|blackberry|ipod|android. +mobile|windows phone/i.test(navigator.userAgent.toLowerCase());
//variables for determining mouse pos
var x, y, currentPosX, currentPosY;
//movement strength of background
var movementStrength = 10;
// variables for resizing navigation images
var backgroundWPos, backgroundHPos, smallHitboxWSize, smallHitboxHSize, largeHitboxWSize, largeHitboxHSize, medHitboxWSize, medHitboxHSize;
// variables for resizing the home page when nav images are scrolled over/out
var outerBtnHolderWSize, outerBtnHolderHSize, innerBtnHolderHSize, newouterBtnHolderWSize, newInnerBtnHolderHSize, newouterBtnHolderHSize, innerBtnHolderTop, outerBtnHolderTop, newInnerBtnHolderTop;
// boolean to detect in navigation images are animated once hovered over/out
var isAnimating = false;
//stores the latest selected video for iphones
var lastVideo;
// store values to decide the size of selected and non selected nav buttons
var growBackgroundWSize, shrinkBackgroundWSize;
//calculate the vertical position of the 2 portfolio items in the center of the page
var middleImagesHeight;


var Portfolio = {
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
		growWSize:0,
		shrinkWSize:0,
		backgroundWImageResizerArr: [7,7,5,3.3],
		backgroundHImageResizerArr: [5,6,7,3.5],
		outerGridWSize:0,
		outerGridHSize:0,
		outerGridYPos:0,
		innerGridHSize:0,
		innerGridYPos:0,
		centerGridHSize:0,
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
			middlePagePos: 1.32,
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
		clicked:false
	},

    portfolioMoveValue : function(xpos, ypos, portfolioItem) {
    	return [xpos*Portfolio.animationPositions['portfolio'+(portfolioItem+1)][0] + 'px', ypos*Portfolio.animationPositions['portfolio'+(portfolioItem+1)][1]+ 'px'];
    },
    totalNumberOfItems : function(){
    	return Object.keys(Portfolio.animationPositions).length+1;
    },
    calcGifSizes : function(width, height){
    	Portfolio.gif.backgroundWSize = width, Portfolio.gif.backgroundHSize = height;
    	return[Portfolio.gif.backgroundWSize, Portfolio.gif.backgroundHSize];
    },
    calcHitBoxSizes : function(){
    	//loop through each of the screen sizes for hitbox arrays
    	for(var o = 0; o < Object.keys(Portfolio.hitBoxPosAndSizes).length-1; o++)
    	{
    		//loop through arrays of devices that can be used
	    	var userDevice = Object.keys(Portfolio.hitBoxPosAndSizes)[o];
	    	//the targetted device whose portfolio hitbox sizes will be defined
	    	var deviceHitBoxSize = Portfolio.hitBoxPosAndSizes[userDevice];
	    	//set the height of all large hit boxes heights
	    	deviceHitBoxSize['largeHitBoxHeight'] = Portfolio.gif['backgroundHSize']*4;
	    	//set the height of all large hit boxes widths
	    	deviceHitBoxSize['largeHitBoxWidth'] = Portfolio.gif['backgroundWSize']*4;
	    	//set the height of desktop med hit boxes widths
	    	if(userDevice == "desktop") deviceHitBoxSize['medHitBoxWidth'] = Portfolio.gif['backgroundWSize']*3;
	    	//set the height of small desktop med hit boxes widths
	    	else if(userDevice == "smallDesktop") deviceHitBoxSize['medHitBoxWidth'] = Portfolio.gif['backgroundWSize']*1.5;
	    	//set the height of tablet or mobile med hit boxes widths
	    	else if(userDevice == "tablet" || userDevice == "mobile") deviceHitBoxSize['medHitBoxWidth'] = Portfolio.gif['backgroundWSize']*1.5;
	    	//set the height of all small hit boxes heights
	    	deviceHitBoxSize['smallHitBoxHeight'] = Portfolio.gif['backgroundHSize']*1.8;
	    	//set the height of all but mobile small hit boxes widths
	    	if(userDevice == "desktop" || userDevice == "smallDesktop" || userDevice == "tablet") deviceHitBoxSize['smallHitBoxWidth'] = Portfolio.gif['backgroundWSize']*2;
	    	//set the height of only mobile small hit boxes widths
	    	else if (userDevice == "mobile") deviceHitBoxSize['smallHitBoxWidth'] = Portfolio.gif['backgroundWSize']*1.348;
	    	
	    	//store values of position + sizes of hit boxes from the objects
	    	var devicePositionMaths = Object.values(Portfolio.hitBoxPosAndSizes)[o];
	    	//clear current set values in the image resizing array
    		Portfolio.hitBoxPosAndSizes.newimageResizingarr[o] = [];
	    	//for each value in each device object
	    	for(var k = 0; k < Object.keys(devicePositionMaths).length; k++){
	    		//store each individual value from the device size object
				var positionMathValues = Object.values(devicePositionMaths)[k];
				//push those values into the new image resizing array
	    		Portfolio.hitBoxPosAndSizes.newimageResizingarr[o].push(positionMathValues);
	    	}
    	}
    	//return the new sizes and positions of all hitboxes
		return Portfolio.hitBoxPosAndSizes.newimageResizingarr;
    },
    //** CHECK SIZE OF SCREEN + LOAD NEW SIZES **//
    loadHitBoxPosAndSize: function(){
    	var currentSize;
		var browserResizingOptions = BrowserInfo.browserResizer()[0].length;
		//for each screen size (4), set the size of all hit boxes based on the screen size
		for(var x = 0;x < browserResizingOptions; x++) {
			//based on what screen size you are on, load in different arrays that resize the divs on the screen
			var currentBrowserSizeX = BrowserInfo.browserSize()[0];
			var currentBrowserSizeY = BrowserInfo.browserSize()[1];
			var lesserThanValue = BrowserInfo.browserResizer()[0][x];
			var greaterThanValue = BrowserInfo.browserResizer()[1][x];
			if(currentBrowserSizeX > lesserThanValue && currentBrowserSizeX < greaterThanValue) {
				//set the size of all the gifs
				if(isMobile == false && isTablet == false) {
					Portfolio.calcGifSizes($('#homepage').width()/Portfolio.gif.backgroundWImageResizerArr[x],$('#homepage').height()/Portfolio.gif.backgroundHImageResizerArr[x]);
					//set the current size of the content based on what size screen was loaded
					currentSize = Portfolio.calcHitBoxSizes()[x];
				}
				//if tablet 
				else if(isTablet) {
					//set the sizes to load the tablet array
					Portfolio.calcGifSizes($('#homepage').width()/Portfolio.gif.backgroundWImageResizerArr[2],$('#homepage').height()/Portfolio.gif.backgroundHImageResizerArr[2]);
					//load the tablet array
					currentSize = Portfolio.calcHitBoxSizes()[2];
				}
				//if mobile 
				else if(isMobile) {
					// set the sizes to load the mobile array
					Portfolio.calcGifSizes($('#homepage').width()/Portfolio.gif.backgroundWImageResizerArr[3],$('#homepage').height()/Portfolio.gif.backgroundHImageResizerArr[3]);
					// load the mobile array
					currentSize = Portfolio.calcHitBoxSizes()[3];
				}
				//return the size and positions of all hitboxs based on screen size
			}
		}
		return currentSize;
    },
    // ** SORT POSITION DATA FROM ARRAY AND ASSIGN NEW PAGE POSITIONS **
    calcPagePosAndSizes: function(calculatedVals){
    	//store the total length of values within desktopImageSizes
		var desktopImageSizesLength =  Portfolio.calcHitBoxSizes()[0].length;
		var hitBoxSizeAndPos = [];
		var currentBrowserSizeX = BrowserInfo.browserSize()[0];
		var currentBrowserSizeY = BrowserInfo.browserSize()[1];

		//STORE NAV HEIGHT, NAV WIDTH, NAV MARGIN LEFT + TOP IN OBJECT
	    for(var resizeNumber = 0; resizeNumber < desktopImageSizesLength; resizeNumber++){
			//store chosen array data in a new array
			hitBoxSizeAndPos[resizeNumber] = calculatedVals[resizeNumber];
			//set the height of all the content
		    Portfolio.page.height = [hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[8], hitBoxSizeAndPos[11], hitBoxSizeAndPos[11], hitBoxSizeAndPos[8]];
			//set the width of all the content
			Portfolio.page.width = [hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[10], hitBoxSizeAndPos[9], hitBoxSizeAndPos[9], hitBoxSizeAndPos[10]]; 
			//set the margin left
			Portfolio.page.xPosition = [currentBrowserSizeX/hitBoxSizeAndPos[4], currentBrowserSizeX*hitBoxSizeAndPos[5], currentBrowserSizeX/hitBoxSizeAndPos[4], currentBrowserSizeX*hitBoxSizeAndPos[5], currentBrowserSizeX*hitBoxSizeAndPos[6], currentBrowserSizeX*hitBoxSizeAndPos[1], currentBrowserSizeX*hitBoxSizeAndPos[2], currentBrowserSizeX*hitBoxSizeAndPos[6]];
			//set the margin top of all the content
			Portfolio.page.yPosition = [currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[3], currentBrowserSizeY*hitBoxSizeAndPos[3], currentBrowserSizeY*hitBoxSizeAndPos[0], currentBrowserSizeY*hitBoxSizeAndPos[7], currentBrowserSizeY*hitBoxSizeAndPos[7], currentBrowserSizeY*hitBoxSizeAndPos[3]];
	    }
    },
    setPageSizeAndPos: function(){
    	//for each portfolio item on the page, resize and place each item based on screen size
    	for(var pageNumber = 0;pageNumber<Portfolio.page.xPosition.length;pageNumber++){
	    	$('#portfolio'+ (pageNumber+1) +'page').css({'height':Portfolio.page.height[pageNumber] +'px', 'width':Portfolio.page.width[pageNumber] +'px', 'margin-left': Portfolio.page.xPosition[pageNumber] +'px', 'margin-top': Portfolio.page.yPosition[pageNumber] +'px'});
    	}
    },
    setGifGrid: function(){
    	//SET GRID SIZE AND POSITION
	    Portfolio.gif.outerGridWSize = $('#outerBtnHolder').width(), Portfolio.gif.outerGridHSize = $('#outerBtnHolder').height(), Portfolio.gif.innerGridHSize = $('#innerBtnHolder').height(), Portfolio.gif.centerGridHSize = $('#middleImages').height(); 
	    Portfolio.gif.outerGridYPos = ($('#homepage').height()-$('#outerBtnHolder').height())/2, Portfolio.gif.innerGridYPos = (Portfolio.gif.outerGridHSize-Portfolio.gif.innerGridHSize)/2;  
	    //reset and re-center all postions of all content
	    $('#outerBtnHolder').css({'width': '', 'height': '', 'top':Portfolio.gif.outerGridYPos+'px','margin-left':'', 'margin-right':'', 'left':'', 'right':''}), $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':Portfolio.gif.innerGridYPos,'bottom':''});
	    $('#middleImages').css({'top':(Portfolio.gif.innerGridHSize - Portfolio.gif.centerGridHSize)/2 +'px'});
    },
    setGifSizes: function(){
    	//set the size of the gifs based on the screen size
    	if(BrowserInfo.browserSize()[0] < 1900) $('.backgroundImage').css({'width': Portfolio.gif['backgroundWSize'] + 'px ', 'height': Portfolio.gif['backgroundHSize'] + 'px'});
		else if(BrowserInfo.browserSize()[0] > 1900 || BrowserInfo.browserSize()[1] > 1100) $('.backgroundImage').css({'width':Portfolio.gif['backgroundWSize']/1.5 +'px ', 'height':Portfolio.gif['backgroundHSize']/1.5+ 'px'});
		// Selected page background image grows by 1.2 times its current size and other pages have their size divided by 1.8
		Portfolio.gif.growWSize = Portfolio.gif['backgroundWSize']*1.3, Portfolio.gif.shrinkWSize = Portfolio.gif['backgroundWSize']/1.9;
    }
}

var BrowserInfo = {
	greaterThanResizer: [1024, 900, 551, 0],
	lesserThanResizer: [99999999, 1024, 900, 550],
	browserSize: function(){
		return [$(window).width(),$(window).height()];
	},
	browserResizer: function(){
		return [BrowserInfo.greaterThanResizer, BrowserInfo.lesserThanResizer];
	}
}

//Array to store how portfolio items are animated based on mouse positions
var PortfolioX, PortfolioY;

var grownChars = 0;
var currentHero = 0;
var allowAnimation = false;
var heroTextOptions = ["James Miller","Design", "Creative","Technology","Electronics", "Node", "Ideation", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
$(document).ready(function () {
	// Inject YouTube API script asynchronously
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
// a counter to see how many videos have been loaded
var isLoaded = 0;
//boolean to allow videos to be played once loaded
var isReady = false;
//the number of videos that will be loaded
var videoList;
//video players are stored in this array
var players = [];
//video youtubeids
var playerYoutubeIds = [];
var ID = '';
//video player for mobile devices
var player;
var myPlayerState;
var fullScreenCounter = 0;
//a variable to store previously played video when on mobile
var wasPlayed;
//variable to store whether the video is playing or not
var selectedVidLoader = 0;
//variable to store the state of the mobile device video player
var videoLoaderState;
var selectedVideo;

var keyboardArr = [/*a*/97,/*A*/65,/*b*/98,/*B*/66,/*c*/99,/*C*/67,/*d*/100,/*D*/68,/*e*/101,/*E*/69,/*f*/102,/*F*/70,/*g*/103,/*G*/71,/*h*/104,/*H*/72,/*m*/109,/*M*/77];
var count = 0;
var keyboardEvent;
var lowerCase, upperCase;
var wasHover;
var oldHover;
var heroTotalTextWidth = 0;
var loadPercentage = 0;


