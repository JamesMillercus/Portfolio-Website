
class VideoLoader extends LoadingFunctions {
  
  constructor(){
    super();
    this.youtubeVidArr = ['abU5I9Tj6ZU','yVKqqdlHPLI','AlvdRkRewvA','K3N18cqnzHg','d_NQcNYMKG8','8ycTf2TDH_I','Swuka5XJRcw','wviBk2BYAzw','5hHonl2hmiU'];

    this.video = {
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
    }
  }

  loadIframes(){
    for(var x = 0;x<this.youtubeVidArr.length;x++){
      console.log("happening?");
      if(x == 0) $( "#viewport" ).append( '<iframe id = "fullscreenVideoPlayer" src="https://www.youtube.com/embed/'+this.youtubeVidArr[x]+'?enablejsapi=1&loop=1&modestbranding=1&playlist='+this.youtubeVidArr[x]+'&rel=0&showinfo=0"></iframe>' );
      else $( "#portfolio"+x+"page .videoPlayer" ).append( '<iframe src="https://www.youtube.com/embed/'+this.youtubeVidArr[x]+'?enablejsapi=1&loop=1&modestbranding=1&playlist='+this.youtubeVidArr[x]+'&rel=0&showinfo=0" frameborder="0" allowfullscreen id="player'+x+'" class = "yPlayer" width="560" height="315"></iframe>' );
      $( "#loadPercentage p" ).html((this.loadPercentage+=5) +'%')
    }
  }

  createPortfolioPlayers(playerInfo, idNumber, noOfVideos) {
    console.log("cunt");
    var src = $("#"+playerInfo.id).attr('src');
    this.YouTubeGetID(src);
    this.video.playerYoutubeIds[idNumber]=this.video.ID;
    self = this;
    // console.log("player info "+ playerInfo.id+ " = " +idNumber);
    // if(idNumber == noOfVideos-1) console.log('ALL IS LOADED!');
    return new YT.Player(playerInfo.id, {
       events: {
          'onReady': self.onPortfolioPlayerReady,
          'onStateChange': self.onPortfolioPlayerStateChange      
       }
    });
  }
  loadFullScreenVideoPlayer(){
    self = this;
    this.video.player = new YT.Player('fullscreenVideoPlayer', {
      height: '100%',
      width: '100%',
      // videoId: 'M7lc1UVf-VE',
      events: {
         'onReady': self.onFullScreenPlayerReady,
         'onStateChange': self.onFullScreenPlayerStateChange
      }
    });
  }

  onFullScreenPlayerReady(event){
    // var playerID = YT.get('#player3');
    // alert(playerID)
  }

  onPortfolioPlayerReady(event){
    //bind events
    Portfolio.video.isLoaded++;
    var src = $('iframe',this).attr('src');
    // console.log("video id = "+playerInfoID);
    event.target.mute();
    console.log('isLoaded = ' + Portfolio.video.isLoaded);
    console.log('videoList = ' + Portfolio.video.videoList);
    $( "#loadPercentage p" ).html((Portfolio.loadPercentage+=6) +'%')
    if(Portfolio.video.isLoaded == Portfolio.video.videoList){
      // YouTubeGetID("https://www.youtube.com/embed/abU5I9Tj6ZU?enablejsapi=1&loop=1&modestbranding=1&playlist=abU5I9Tj6ZU&rel=0&showinfo=0");
      $( "#loadPercentage p" ).html((Portfolio.loadPercentage+=7) +'%')
      console.log("videos ready");
      Portfolio.video.isReady = true;

      Portfolio.startWebsite();
    } 
  }
  //loop through and pause all videos
  pauseAllVideos(){
    for(var x = 0; x < this.video.videoList; x++){
      this.video.players[x].pauseVideo();
    }
  }

  onPortfolioPlayerStateChange(event) {
    Portfolio.video.myPlayerState = event.data;
    if (Portfolio.page.isHover!= 'container' && Portfolio.video.isReady == true) Portfolio.animateIn();
    //if video is played on mobile
    if(Portfolio.video.myPlayerState == 1) if(Portfolio.isMobile) Portfolio.video.players[Portfolio.video.lastVideo].seekTo(0).unMute();
    //if video is paused or stopped on mobile
    if(Portfolio.video.myPlayerState == 2 || Portfolio.video.myPlayerState == 0) if(Portfolio.isMobile) Portfolio.video.players[Portfolio.video.lastVideo].mute();
     
  }

  onFullScreenPlayerStateChange(event){
    Portfolio.video.videoLoaderState = event.data;
    if(Portfolio.video.selectedVidLoader == 1 && Portfolio.video.videoLoaderState == 3) Portfolio.video.player.unMute().playVideo();
    if(Portfolio.video.videoLoaderState == 1) Portfolio.video.selectedVidLoader ++;
  }

  YouTubeGetID(url){
    this.video.ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      this.video.ID = url[2].split(/[^0-9a-z_\-]/i);
      this.video.ID = this.video.ID[0];
    }
    else {
      this.video.ID = url;
    }
    return this.video.ID;
  }

  fullScreenMobile(){
    this.video.players[this.video.lastVideo].playVideo();
    this.video.wasPlayed = this.video.lastVideo;
    staticHome();
    this.video.clicked=false;
  }

  fullScreenVideoPlayer(portfolioSelection){
    self = this;
    if(this.video.playerYoutubeIds[portfolioSelection] != this.video.wasPlayed) this.video.player.loadVideoById(this.video.playerYoutubeIds[portfolioSelection]);
    else this.video.player.unMute().playVideo();
    this.video.wasPlayed = this.video.playerYoutubeIds[portfolioSelection];
    //animate video
    $("#" + this.page.isHover + " .videoContainer").css({'height': '100%', 'width':'100%','bottom':0,'right':0,'left':0, 'top':'0'});
    $("#" + this.page.isHover ).css({'position':'fixed'});
    $("#" + this.page.isHover + " .content" ).css({'display':'none'});
    $("#" + this.page.isHover + " .videoPlayer").css({'overflow': 'visible','bottom':0,'right':0,'left':0, 'top':0});
    $("#" + this.page.isHover + " .videoPlayer iframe").css({'width': '100%', 'height': '100%','bottom':0,'right':0,'left':0, 'top':0});
    $("#" + Portfolio.page.isHover).stop().animate({'width':'100%', 'height':'100%', 'left':0, 'top':0, 'right':0, 'bottom':0, 'margin-top': 0, 'margin-left':0},{complete: function(){ 
          $("#" + Portfolio.page.isHover ).css({'z-index': '-1000'});
          $('#fullscreenVideoPlayer').css({'display':'block'});  
          $('#container, .animatingPage, iframe').css({'display':'none'}); 
          $('#fullscreenVideoPlayer, #videoExit').css({'display':'block'}); 
    }}); 
    $('#fullscreenVideoPlayer, #videoExit').stop().animate({'opacity':'1', 'background-color':"black"});

    this.video.players[portfolioSelection].pauseVideo().seekTo(0);
    if(this.video.selectedVidLoader == 0) {
      this.video.selectedVidLoader++;
    }
  }

  exitFullScreen(){
    this.video.player.mute().pauseVideo();
    $('#fullscreenVideoPlayer, #videoExit, #container, .animatingPage, #' + this.page.isHover + ' .videoContainer, #'+ this.page.isHover+', #'+this.page.isHover+' .content, #'+this.page.isHover+' .videoPlayer, #'+this.page.isHover+' .videoPlayer iframe, #container, .animatingPage, iframe').css({'height': '', 'width':'','bottom':'','right':'','left':'', 'top':'', 'display': '', 'opacity':'', 'overflow': '', 'position':'', 'z-index':''});
    this.mousePos.allowAnimation = false;
    this.page.lastScrolled = '';
    this.page.isHover= 'container';
    // $("#" + Portfolio.page.isHover + " .videoContainer, #fullscreenVideoPlayer, #videoExit, #container, .animatingPage, #" + Portfolio.page.isHover + " .content", "#" + Portfolio.page.isHover + " .videoPlayer iframe, #" + Portfolio.page.isHover + " .videoPlayer").css({'height': '', 'width':'','bottom':'','right':'','left':'', 'top':'', 'display': '', 'opacity':'', 'overflow': '', 'position':''});
    this.video.clicked = false; 
    this.checkPositions();
  }

}

// loop through each iframe and create a video player for it
function onYouTubeIframeAPIReady() {
  var iframes = document.querySelectorAll('.yPlayer')
  for(Portfolio.video.videoList = 0; Portfolio.video.videoList < iframes.length;Portfolio.video.videoList++) Portfolio.video.players[Portfolio.video.videoList] = Portfolio.createPortfolioPlayers(iframes[Portfolio.video.videoList], Portfolio.video.videoList, iframes.length);
  Portfolio.loadFullScreenVideoPlayer();
}

