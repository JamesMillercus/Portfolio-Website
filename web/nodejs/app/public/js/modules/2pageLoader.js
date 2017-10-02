import { Variables } from './1vars'; 

// //** LOAD IN ALL IMAGES **//
// //CHANGE THIS FILE TO A PAGELOADER.JS
// // PUT ALL FUNCITIONS FROM VARS.JS IN HERE
//LoadingFunctions
export class LoadingFunctions extends Variables{
	constructor(){
		super();
	}

	browserSize(){
		return [$(window).width(),$(window).height()];
	}

	browserResizer(){
		return [this.browser.greaterThanResizer, this.browser.lesserThanResizer];
	}

    portfolioMoveValue(xpos, ypos, portfolioItem) {
    	return [xpos*this.animationPositions['portfolio'+(portfolioItem+1)][0] + 'px', ypos*this.animationPositions['portfolio'+(portfolioItem+1)][1]+ 'px'];
    }
    totalNumberOfItems(){
    	return Object.keys(this.animationPositions).length+1;
    }
    calcGifSizes(width, height){
    	this.gif.backgroundWSize = width, this.gif.backgroundHSize = height;
    	return[this.gif.backgroundWSize, this.gif.backgroundHSize];
    }
    calcHitBoxSizes(){
    	//loop through each of the screen sizes for hitbox arrays
    	for(var o = 0; o < Object.keys(this.hitBoxPosAndSizes).length-1; o++){
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
    }
    //** CHECK SIZE OF SCREEN + LOAD NEW SIZES **//
    loadHitBoxPosAndSize(){
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
    }
    // ** SORT POSITION DATA FROM ARRAY AND ASSIGN NEW PAGE POSITIONS **
    calcPagePosAndSizes(calculatedVals){
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
    }
    setPageSizeAndPos(){
    	//for each portfolio item on the page, resize and place each item based on screen size
    	for(var pageNumber = 0;pageNumber<this.page.xPosition.length;pageNumber++){
	    	$('#portfolio'+ (pageNumber+1) +'page').css({'height':this.page.height[pageNumber] +'px', 'width':this.page.width[pageNumber] +'px', 'margin-left': this.page.xPosition[pageNumber] +'px', 'margin-top': this.page.yPosition[pageNumber] +'px'});
    	}
    }
    setGifGrid(){
    	//SET GRID SIZE AND POSITION
	    this.gif.outerGridWSize = $('#outerBtnHolder').width(), this.gif.outerGridHSize = $('#outerBtnHolder').height(), this.gif.innerGridHSize = $('#innerBtnHolder').height(), this.gif.centerGridHSize = $('#middleImages').height(); 
	    this.gif.outerGridYPos = ($('#homepage').height()-$('#outerBtnHolder').height())/2, this.gif.innerGridYPos = (this.gif.outerGridHSize-this.gif.innerGridHSize)/2;  
	    //reset and re-center all postions of all content
	    $('#outerBtnHolder').css({'width': '', 'height': '', 'top':this.gif.outerGridYPos+'px','margin-left':'', 'margin-right':'', 'left':'', 'right':''}), $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','top':this.gif.innerGridYPos,'bottom':''});
	    $('#middleImages').css({'top':(this.gif.innerGridHSize - this.gif.centerGridHSize)/2 +'px'});
    }
    setGifSizes(){
    	//set the size of the gifs based on the screen size
    	if(this.browserSize()[0] < 1900) $('.backgroundImage').css({'width': this.gif['backgroundWSize'] + 'px ', 'height': this.gif['backgroundHSize'] + 'px'});
		else if(this.browserSize()[0] > 1900 || this.browserSize()[1] > 1100) $('.backgroundImage').css({'width':this.gif['backgroundWSize']/1.5 +'px ', 'height':this.gif['backgroundHSize']/1.5+ 'px'});
		// Selected page background image grows by 1.2 times its current size and other pages have their size divided by 1.8
		this.gif.growWSize = this.gif['backgroundWSize']*1.3, this.gif.shrinkWSize = this.gif['backgroundWSize']/1.9;
    }
	loadGifs(){
		$.fn.bgLoaded = function(custom) {
	        var self = this;

		    // Default plugin settings
		    var defaults = {
		        afterLoaded : function(){
		            this.addClass('bg-loaded');
		        }
		    };

		    // Merge default and user settings
		    var settings = $.extend({}, defaults, custom);

			    // console.log("you're all penus's")
		    // Loop through element
		    self.each(function(){
		        var $this = $(this),
	            bgImgs = $this.css('background-image').split(', ');
		        $this.data('loaded-count',0);

		        $.each( bgImgs, function(key, value){
		            var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
		            $('<img/>').attr('src', img).load(function() {
		                $(this).remove(); // prevent memory leaks
		                $this.data('loaded-count',$this.data('loaded-count')+1);
		                if ($this.data('loaded-count') >= bgImgs.length) {
		                    settings.afterLoaded.call($this);
		                }
		            });
		        });

		    });
	    };
	}
    startWebsite(){
    	self = this;
		$("#loadScreen, #loadPercentage").stop().animate({'opacity': 0},{ duration: 2000,
	    specialEasing: {
	      width: "linear",
	      height: "easeOutBounce"
	    }, complete: function(){ 
	    	// var v = window.document.createElement("video");
			//if there is a video that can be played, the window size is for desktops and if the use has just loaded the page then play video. 
		    if(!!document.getElementById("startUpVid").canPlayType == true && self.browserSize()[0] > 1024 && self.page.lastScrolled == "newUser") self.animateHome(); //change this to animateHome when not in dev mode
		    //else load the page without video
		    else if(!!document.getElementById("startUpVid").canPlayType == false || self.browserSize()[0] < 1024 || self.isMobile) self.staticHome();
		}}); 
    }
}