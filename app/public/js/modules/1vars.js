/*jslint browser:true*/
/*global window*/

//** SET UP ALL VARIABLES **//

export class Variables{
	constructor(){
		this.init();
		this.loadPercentage = 0;

		this.browser = {
			greaterThanResizer: [1024, 900, 551, 0],
			lesserThanResizer: [99999999, 1024, 900, 550],
		}

		this.animationPositions = {
			portfolio1: [.83333333333333333,.7],
			portfolio2: [1.16,.7],
			portfolio3: [.83333333333333333,1.3],
			portfolio4: [1.16,1.3],
			portfolio5: [1,.6],
			portfolio6: [.76923072999,1],
			portfolio7: [1.24,1],
			portfolio8: [1,1.4]
		}

		this.gif = {
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
		}

		this.hitBoxPosAndSizes = {
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
				this.newDesktopImageSizes = [],
				this.newSmallDesktopImageSizes=[],
				this.newTabletImageSizes=[],
				this.newMobileImageSizes=[]
			]
		}

		this.page = {
			height:0,
			width:0,
			xPosition:0,
			yPosition:0,
			// store the last scrolled item
			lastScrolled: 'newUser',
			// variable to check what is being hovered on, set up automatically as container
			isHover: 'container',
			lastClicked: ''
		}

		this.heroText = {
			grownChars:0,
			currentHero:0,
			options: ["James Miller","Design", "Creative","Technology","Electronics", "Node", "Ideation", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"],
			heroTotalTextWidth: 0
		}

		this.invitation = {
			lowerCase: null,
			upperCase: null,
			count: 0,
			keyboardArr:[/*a*/97,/*A*/65,/*b*/98,/*B*/66,/*c*/99,/*C*/67,/*d*/100,/*D*/68,/*e*/101,/*E*/69,/*f*/102,/*F*/70,/*g*/103,/*G*/71,/*h*/104,/*H*/72,/*m*/109,/*M*/77],
			keyboardEvent: null
		}
	}

	init(){
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
}
