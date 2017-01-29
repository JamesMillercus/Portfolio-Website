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
var backgroundWSize, backgroundHSize, backgroundWPos, backgroundHPos, smallHitboxWSize, smallHitboxHSize, largeHitboxWSize, largeHitboxHSize, medHitboxWSize, medHitboxHSize;
// variables for resizing the home page when nav images are scrolled over/out
var outerBtnHolderWSize, outerBtnHolderHSize, innerBtnHolderHSize, newouterBtnHolderWSize, newInnerBtnHolderHSize, newouterBtnHolderHSize, innerBtnHolderTop, outerBtnHolderTop, newInnerBtnHolderTop;
// global variables for window sizes
var windowSizeWidth, windowSizeHeight;
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

var PortfolioMovePos = {
	portfolio1: [.83333333333333333,.7],
	portfolio2: [1.16,.7],
	portfolio3: [.83333333333333333,1.3],
	portfolio4: [1.16,1.3],
	portfolio5: [1,.6],
	portfolio6: [.76923072999,1],
	portfolio7: [1.24,1],
	portfolio8: [1,1.4],
    portfolioMoveValue : function(xpos, ypos, portfolioItem) {
    	return [xpos*this[Object.keys(this)[portfolioItem]][0] + 'px', ypos*this[Object.keys(this)[portfolioItem]][1]+ 'px'];
    },
    totalPortfolioItems : function(){
    	// return Object.keys(this).length-1;
    	return 9;
    },
};

//Array to store how portfolio items are animated based on mouse positions
var portfolioMovePosX, portfolioMovePosY;
//math to decide positions of portfolio hit boxes (dynamically assigned)
var topPagePos, bottomPagePos, leftPagePos, rightPagePos, bottomPagePos, leftCornerPos, rightCornerPos, centralPos, middlePagePos;
var desktopImageSizes, smallDesktopImageSizes, tabletImageSizes, mobileImageSizes, imageResizingArr;
var imageSizeVariables = [topPagePos, leftPagePos, rightPagePos, bottomPagePos, leftCornerPos, rightCornerPos, centralPos, middlePagePos, largeHitboxHSize, largeHitboxWSize, medHitboxWSize, smallHitboxHSize, smallHitboxWSize];
//add greater than code here for large desktops ( < 1900)
var greaterThanResizer = [1024, 900, 551, 0];
var lesserThanResizer = [99999999, 1024, 900, 550];
//what size large desktop items should be
var backgroundWImageResizerArr = [7, 7, 5, 3.3];
var backgroundHImageResizerArr = [5, 6, 7, 3.5];
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


