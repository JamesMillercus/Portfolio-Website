import { VideoLoader } from './3videoLoader'; 

//** MOUSE MOVEMENT NAVIGATION **//

export class Navigation extends VideoLoader {
  constructor(){
    super();
    //variables for determining mouse pos
    this.mousePos = {
      x: null,
      y: null,
      currentPosX: null,
      currentPosY: null,
      //movement strength of background
      movementStrength: 10,
      isAnimating: false,
      allowAnimation: false
    }

    this.initNav();
  }
  initNav(){
    self = this;
    console.log("neeeewbie");
    // prevent touch screen from srolling 
    $(document).bind('touchmove', function(e) {
      e.preventDefault();
    });
    // Execute on load
    this.checkWidth();


    //if mobile device make background move with accelerometer data
    if(this.has_touch){
      window.addEventListener('devicemotion', deviceMotionHandler, false);
        function deviceMotionHandler(eventData) {
        // $('#container').css({'background-color': 'red'});
          //check size of browser and decide background position every time accelerometer data comes in
          this.checkWidth();
          //reduce strength of movement on mobile
          this.mousePos.movementStrength = 3;
          //if landscape reverse y & x values and multiply the data to compensate for screen size, else remain normal
          var deviceY = (Math.round(event.accelerationIncludingGravity.y)) * ($('.backgroundImage').height()*3);
          var deviceX = (Math.round(event.accelerationIncludingGravity.x)) * ($('.backgroundImage').width()*2);
            if ($(window).height() < $(window).width()) {
              deviceY = (Math.round(event.accelerationIncludingGravity.x) * $('.backgroundImage').width());
              deviceX = (Math.round(event.accelerationIncludingGravity.y) * $('.backgroundImage').height()*6);
            }
            //change mouse position to accelerometer data in the checkWidth() function
            this.mousePos.x = deviceX;          
            this.mousePos.y = deviceY; 
        };
    } else {
      //if desktop then use mouse pos to move background
      $("body").mousemove(function(e){
            self.checkWidth();
            //x & y = mouse position    
            self.mousePos.x = e.pageX;
            self.mousePos.y = e.pageY;
      });
    }
  }
  //check size of browser + mouse position and move background accordingly
  checkWidth(){
  	//restraining the movement of the background so that it the browser size
    var restrainedBrowserHeight = this.mousePos.movementStrength / $(window).height();
    var restrainedBrowserWidth = this.mousePos.movementStrength / $(window).width();

    //set current position of browser as negative ints, so it can be used to moved via css
    //windowSize variables are referenced from homepage.js
    var backgroundCurrentYPos = -this.browserSize()[1], backgroundCurrentXPos = -this.browserSize()[0];

    //creates a pace which is a half of the users mouse speed: currentMousePosX = current mouse position - (window width / 2)
    var currentMousePosY = this.mousePos.y - ($(window).height() / 2);
    var currentMousePosX = this.mousePos.x - ($(window).width() / 2);

    //decides position: move background down by ((10 / height of browser) * (currentMousePosY speed)) + (the negative height of the browser)
    var newBackgroundPosX = restrainedBrowserWidth * currentMousePosX * -1 + backgroundCurrentXPos;
    var newBackgroundPosY = restrainedBrowserHeight * currentMousePosY * -1 + backgroundCurrentYPos;

    // // set view port as browser size (prevent mobile devices from scrolling)
    // $('#viewport').css({'height':BrowserInfo.browserSize()[1] +'px ', 'width':BrowserInfo.browserSize()[0] + 'px'});

    //send values to other js files that control each page
    if(this.page.lastScrolled != "newUser" && this.page.lastScrolled != "animatingHome"){  
      this.updatePosition(newBackgroundPosX,newBackgroundPosY);
    }
  }

  updatePosition(posX, posY) {
    //move background container based on mouse positions
    this.mousePos.currentPosX = posX, this.mousePos.currentPosY = posY;
    var currentBrowserSizeX = this.browserSize()[0], currentBrowserSizeY = this.browserSize()[1];

    //if animation between navigation buttons isn't happening 
    if (this.isAnimating == false && this.video.clicked == false && currentBrowserSizeY >550){
      //detect what navigation button is being scrolled over and adjust maths mouse position accordingly
      for(var pageNumber = 0;pageNumber<this.totalNumberOfItems();pageNumber++) if(this.page.isHover == 'portfolio'+pageNumber+'page' && this.page.lastScrolled != '' && this.mousePos.allowAnimation == true) this.scrollingPage(this.page.isHover, pageNumber-1, currentBrowserSizeX);
      //if not hovering on a nav button
      if(this.page.isHover == 'container' || currentBrowserSizeX < 1024) {
        //animate based on normal mouse position
        $('#container').css({'opacity': 1,'margin-left': posX+'px', 'margin-top': posY+'px'});
        //clear any inline styles on navigation images that were created with js
        if(currentBrowserSizeX < 1900) $('.backgroundImage').css({'width':this.gif['backgroundWSize'] +'px ', 'height':this.gif['backgroundHSize']+ 'px'});
        else if(currentBrowserSizeX > 1900 || currentBrowserSizeY > 1100) $('.backgroundImage').css({'width':this.gif['backgroundWSize']/1.5 +'px ', 'height':this.gif['backgroundHSize']/1.5+ 'px'});
        $('#innerBtnHolder').css({'width':'', 'height': '','margin-left':'', 'margin-right':'', 'left':'', 'right':'','bottom':''}); 
        $('.videoContainer').css({'opacity':''});
        if(this.page.isHover == 'container') this.page.lastScrolled = 'container', this.mousePos.allowAnimation = true;
      }
          //if the initial start up video played, then hide it to reveal the still jpg
      if($("video").css('display') === 'block') $('video').css({'display': 'none'});
    }
    // console.log("last Scrolled = "+ Portfolio.page.lastScrolled);
    // console.log("is hover = "+ Portfolio.page.isHover);
  }

  scrollingPage(currentHover, posMovement, currentBrowserSizeX){
    if(currentBrowserSizeX > 1024) $('#container').css({'margin-left': this.portfolioMoveValue(this.mousePos.currentPosX, this.mousePos.currentPosY, posMovement)[0], 'margin-top': Portfolio.portfolioMoveValue(this.mousePos.currentPosX, this.mousePos.currentPosY, posMovement)[1]});
  }

  //** CHECK POSITIONS **//
  checkPositions() {
      // set size + position of each page within the website container
    var currentBrowserSizeX = this.browserSize()[0];
    var currentBrowserSizeY = this.browserSize()[1];
    $('#homepage').css({'margin-left': currentBrowserSizeX + 'px', 'margin-top': currentBrowserSizeY + 'px'});
    // set size + position of background
    $('#container').css({'height':currentBrowserSizeY*3 +'px ', 'width':currentBrowserSizeX*3 + 'px', 'margin-left': '-'+currentBrowserSizeX + 'px', 'margin-top': '-'+currentBrowserSizeY + 'px'});  
    //resize portfolio pages, once the check size function has calculated positions and heights of hitboxes
    this.calcPagePosAndSizes(this.loadHitBoxPosAndSize());
    this.setGifSizes();
    this.setGifGrid();

      if(this.video.clicked == false){
        // RESET PORTFOLIO HIT BOXS
        this.setPageSizeAndPos();
        // if the page isn't loading for the first time
        if(this.page.lastScrolled != "newUser") this.resetPositions();
        else $('#heroText').css({'opacity':0, 'display':'none'});
      //if resize the browser window whilst scrolled over a menu item then activate complete home page reset
      if(this.page.isHover!= 'container' && this.page.lastClicked == '') this.resetToHome('reset');
      // $('#heroText').css({'top':($('#centerImage').height()-$('#heroText').height())/2});
      this.activateHeroAnimation();
      }else{
        //if video has been clicked and page then resized
      }
      if(this.page.lastScrolled == "newUser") $('#topImage, #bottomImage, #portfolio1, #portfolio2, #portfolio3, #portfolio4, #portfolio6, #portfolio7').css({'opacity':0});
  }

  resetPositions(){
    //center the middle two portfolio items
    $('#heroText').css({'font-size':$('#centerImage').width()/8 +'px', 'top':($('#centerImage').height()-$('#heroText').height())/2});
    //RESET POSITIONS OF ITEMS ON SCREEN
    $('#container').css({'opacity':1,'display':'block'});
    if(!this.isMobile) $( "#linksTop, #linksBottom" ).stop().animate({'opacity': 1});
    $('#heroText').css({'opacity':1, 'display':'block'});
    $('.videoContainer').css({'opacity': 0});
    $('.content').css({'opacity': 0});
    this.page.lastScrolled ='';
  }

  triggerResponse(newHover, keyp){
    if ( keyp == this.invitation.keyboardArr[this.invitation.lowerCase] || keyp == this.invitation.keyboardArr[this.invitation.upperCase] ) {
      var counter = this.invitation.count-1;
      if(this.video.clicked==false && counter<(this.invitation.keyboardArr.length/2)-1){
        if(newHover != this.page.isHover){
            this.resetToHome(newHover);
            this.page.isHover = newHover;
          this.page.lastScrolled = '#' + newHover.substring(0,10);
          this.scrollPortfolio(newHover, counter);  
        }else this.openPortfolio(this.page.isHover);
      }else this.exitFullScreen(); 
      if (counter==(this.invitation.keyboardArr.length/2)-1 && this.page.lastScrolled != '') this.resetToHome(newHover);
    }
    if(this.invitation.count>=(this.invitation.keyboardArr.length/2)) this.invitation.count =0;
  }
}