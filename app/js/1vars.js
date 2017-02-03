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
// variable to check what is being hovered on, set up automatically as container
var isHover = 'container';
// store the last scrolled item
var lastScrolled = 'newUser';
//stores the latest selected video for iphones
var lastVideo;
// store values to decide the size of selected and non selected nav buttons
var growBackgroundWSize, shrinkBackgroundWSize;
//calculate the vertical position of the 2 portfolio items in the center of the page
var middleImagesHeight;
// var to track if a video has been clicked
var clickedVideo = false;

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

	gifSizes: {
		backgroundWSize: 0,
		backgroundHSize: 0
	},

	deviceSpecificImgResizer: {
		backgroundWImageResizerArr: [7,7,5,3.3],
		backgroundHImageResizerArr: [5,6,7,3.5]
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

    portfolioMoveValue : function(xpos, ypos, portfolioItem) {
    	return [xpos*Portfolio.animationPositions['portfolio'+(portfolioItem+1)][0] + 'px', ypos*Portfolio.animationPositions['portfolio'+(portfolioItem+1)][1]+ 'px'];
    },
    totalNumberOfItems : function(){
    	return Object.keys(Portfolio.animationPositions).length+1;
    },
    setGifSizes : function(width, height){
    	Portfolio.gifSizes.backgroundWSize = width, Portfolio.gifSizes.backgroundHSize = height;
    	return[Portfolio.gifSizes.backgroundWSize, Portfolio.gifSizes.backgroundHSize];
    },
    setHitBoxSizes : function(){

    	Portfolio.hitBoxPosAndSizes.desktop['largeHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*4;
    	Portfolio.hitBoxPosAndSizes.desktop['largeHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*4;
    	Portfolio.hitBoxPosAndSizes.desktop['medHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*3;
    	Portfolio.hitBoxPosAndSizes.desktop['smallHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*1.8;
    	Portfolio.hitBoxPosAndSizes.desktop['smallHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*2;

		Portfolio.hitBoxPosAndSizes.smallDesktop['largeHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*4;
    	Portfolio.hitBoxPosAndSizes.smallDesktop['largeHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*4;
    	Portfolio.hitBoxPosAndSizes.smallDesktop['medHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*1.5;
    	Portfolio.hitBoxPosAndSizes.smallDesktop['smallHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*1.8;
    	Portfolio.hitBoxPosAndSizes.smallDesktop['smallHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*2;

    	Portfolio.hitBoxPosAndSizes.tablet['largeHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*4;
    	Portfolio.hitBoxPosAndSizes.tablet['largeHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*4;
    	Portfolio.hitBoxPosAndSizes.tablet['medHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize'];
    	Portfolio.hitBoxPosAndSizes.tablet['smallHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*1.8;
    	Portfolio.hitBoxPosAndSizes.tablet['smallHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*2;

    	Portfolio.hitBoxPosAndSizes.mobile['largeHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*4;
    	Portfolio.hitBoxPosAndSizes.mobile['largeHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*4;
    	Portfolio.hitBoxPosAndSizes.mobile['medHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize'];
    	Portfolio.hitBoxPosAndSizes.mobile['smallHitBoxHeight'] = Portfolio.gifSizes['backgroundHSize']*1.8;
    	Portfolio.hitBoxPosAndSizes.mobile['smallHitBoxWidth'] = Portfolio.gifSizes['backgroundWSize']*1.348;

    	for(var o = 0; o < Object.keys(Portfolio.hitBoxPosAndSizes).length-1; o++)
    	{
	    	var tempKeys = Object.keys(Portfolio.hitBoxPosAndSizes)[o];
	    	var tempVals = Object.values(Portfolio.hitBoxPosAndSizes)[o];
	    	for(var k = 0; k < Object.keys(Object.keys(Portfolio.hitBoxPosAndSizes)[o]).length; k++){
	    		Portfolio.hitBoxPosAndSizes.newimageResizingarr[o].push(Object.values(Portfolio.hitBoxPosAndSizes)[o])[k];
			}
	    	// console.log(Object.keys(Portfolio.hitBoxPosAndSizes.newimageResizingarr)[o]);
	    	// Portfolio.hitBoxPosAndSizes.newimageResizingarr.push(Portfolio.hitBoxPosAndSizes.newimageResizingarr[o]);
	    	console.log(Portfolio.hitBoxPosAndSizes.newimageResizingarr[o]);
    	}

    	//put values from each object into each array inside of newimageResizingarr
	


			// Portfolio.hitBoxPosAndSizes.newImageResizingarr[o].push(Object.values(Portfolio.hitBoxPosAndSizes.desktop)[k]);
	  //   	console.log(Object.values(Portfolio.hitBoxPosAndSizes.desktop)[k]);

		return Portfolio.hitBoxPosAndSizes.newimageResizingarr;
    }
};

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
//math to decide positions of portfolio hit boxes (dynamically assigned)
var topPagePos, bottomPagePos, leftPagePos, rightPagePos, bottomPagePos, leftCornerPos, rightCornerPos, centralPos, middlePagePos;
var desktopImageSizes, smallDesktopImageSizes, tabletImageSizes, mobileImageSizes, imageResizingArr;
var imageSizeVariables = [topPagePos, leftPagePos, rightPagePos, bottomPagePos, leftCornerPos, rightCornerPos, centralPos, middlePagePos, largeHitboxHSize, largeHitboxWSize, medHitboxWSize, smallHitboxHSize, smallHitboxWSize];

//what size large desktop items should be
var navHeight = [imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[8], imageSizeVariables[11], imageSizeVariables[11], imageSizeVariables[8]];
var navWidth, navMarginLeft, navMarginTop;
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
var lastClicked;
var oldHover;
var heroTotalTextWidth = 0;
var loadPercentage = 0;


