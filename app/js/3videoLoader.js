
//** VIDEO LOGIC **//
// put all link names into an array
// loop through each item in array and push them through a function that creates appends html on a page
// call on youtubeiframeapiready function

var youtubeVidArr = ['abU5I9Tj6ZU','yVKqqdlHPLI','AlvdRkRewvA','K3N18cqnzHg','d_NQcNYMKG8','8ycTf2TDH_I','Swuka5XJRcw','wviBk2BYAzw','5hHonl2hmiU'];

function loadIframes(){
  for(var x = 0;x<youtubeVidArr.length;x++){
    if(x == 0) $( "#viewport" ).append( '<iframe id = "fullscreenVideoPlayer" src="https://www.youtube.com/embed/'+youtubeVidArr[x]+'?enablejsapi=1&loop=1&modestbranding=1&playlist='+youtubeVidArr[x]+'&rel=0&showinfo=0"></iframe>' );
    else $( "#portfolio"+x+"page .videoPlayer" ).append( '<iframe src="https://www.youtube.com/embed/'+youtubeVidArr[x]+'?enablejsapi=1&loop=1&modestbranding=1&playlist='+youtubeVidArr[x]+'&rel=0&showinfo=0" frameborder="0" allowfullscreen id="player'+x+'" class = "yPlayer" width="560" height="315"></iframe>' );
    $( "#loadPercentage p" ).html((Portfolio.loadPercentage+=5) +'%')
  }
}

//loop through each iframe and create a video player for it
function onYouTubeIframeAPIReady() {
  var iframes = document.querySelectorAll('.yPlayer')
  for(Portfolio.video.videoList = 0; Portfolio.video.videoList < iframes.length;Portfolio.video.videoList++) Portfolio.video.players[Portfolio.video.videoList] = createPortfolioPlayers(iframes[Portfolio.video.videoList], Portfolio.video.videoList, iframes.length);
  loadFullScreenVideoPlayer();
}
//create a player and call a function when its ready to play
function createPortfolioPlayers(playerInfo, idNumber, noOfVideos) {
  var src = $("#"+playerInfo.id).attr('src');
  YouTubeGetID(src);
  Portfolio.video.playerYoutubeIds[idNumber]=Portfolio.video.ID;
  // console.log("player info "+ playerInfo.id+ " = " +idNumber);
  // if(idNumber == noOfVideos-1) console.log('ALL IS LOADED!');
  return new YT.Player(playerInfo.id, {
     events: {
        'onReady': onPortfolioPlayerReady,
        'onStateChange': onPortfolioPlayerStateChange      
     }
  });
}
function loadFullScreenVideoPlayer(){
  Portfolio.video.player = new YT.Player('fullscreenVideoPlayer', {
    height: '100%',
    width: '100%',
    // videoId: 'M7lc1UVf-VE',
    events: {
       'onReady': onFullScreenPlayerReady,
       'onStateChange': onFullScreenPlayerStateChange
    }
  });
}
function onFullScreenPlayerReady(event){
  // var playerID = YT.get('#player3');
  // alert(playerID)
}

//when its ready to be played make sure that all the other videos are loaded, and then allow users to play the videos
function onPortfolioPlayerReady(event){
  //bind events
  Portfolio.video.isLoaded++;
  // var id = players[isLoaded].getVideoData()['video_id'];
  // console.log("video id = "+id);
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

    startWebsite();
  } 
}
//loop through and pause all videos
function pauseAllVideos(){
  for(var x = 0; x < Portfolio.video.videoList; x++){
    Portfolio.video.players[x].pauseVideo();
  }
}

function onPortfolioPlayerStateChange(event) {
  Portfolio.video.myPlayerState = event.data;
  if (Portfolio.page.isHover!= 'container' && Portfolio.video.isReady == true) animateIn();
  //if video is played on mobile
  if(Portfolio.video.myPlayerState == 1) if(Portfolio.isMobile) Portfolio.video.players[Portfolio.video.lastVideo].seekTo(0).unMute();
  //if video is paused or stopped on mobile
  if(Portfolio.video.myPlayerState == 2 || Portfolio.video.myPlayerState == 0) if(Portfolio.isMobile) Portfolio.video.players[Portfolio.video.lastVideo].mute();
   
}

function onFullScreenPlayerStateChange(event){
  Portfolio.video.videoLoaderState = event.data;
  if(Portfolio.video.selectedVidLoader == 1 && Portfolio.video.videoLoaderState == 3) Portfolio.video.player.unMute().playVideo();
  if(Portfolio.video.videoLoaderState == 1) Portfolio.video.selectedVidLoader ++;
}

function YouTubeGetID(url){
  Portfolio.video.ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    Portfolio.video.ID = url[2].split(/[^0-9a-z_\-]/i);
    Portfolio.video.ID = Portfolio.video.ID[0];
  }
  else {
    Portfolio.video.ID = url;
  }
  return Portfolio.video.ID;
}

function fullScreenMobile(){
  Portfolio.video.players[Portfolio.video.lastVideo].playVideo();
  Portfolio.video.wasPlayed = Portfolio.video.lastVideo;
  staticHome();
  Portfolio.video.clicked=false;
}

function fullScreenVideoPlayer(portfolioSelection){
  if(Portfolio.video.playerYoutubeIds[portfolioSelection] != Portfolio.video.wasPlayed) Portfolio.video.player.loadVideoById(Portfolio.video.playerYoutubeIds[portfolioSelection]);
  else Portfolio.video.player.unMute().playVideo();
  Portfolio.video.wasPlayed = Portfolio.video.playerYoutubeIds[portfolioSelection];
  //animate video
  $("#" + Portfolio.page.isHover + " .videoContainer").css({'height': '100%', 'width':'100%','bottom':0,'right':0,'left':0, 'top':'0'});
  $("#" + Portfolio.page.isHover ).css({'position':'fixed'});
  $("#" + Portfolio.page.isHover + " .content" ).css({'display':'none'});
  $("#" + Portfolio.page.isHover + " .videoPlayer").css({'overflow': 'visible','bottom':0,'right':0,'left':0, 'top':0});
  $("#" + Portfolio.page.isHover + " .videoPlayer iframe").css({'width': '100%', 'height': '100%','bottom':0,'right':0,'left':0, 'top':0});
  $("#" + Portfolio.page.isHover).stop().animate({'width':'100%', 'height':'100%', 'left':0, 'top':0, 'right':0, 'bottom':0, 'margin-top': 0, 'margin-left':0},{complete: function(){ 
        $("#" + Portfolio.page.isHover ).css({'z-index': '-1000'});
        $('#fullscreenVideoPlayer').css({'display':'block'});  
        $('#container, .animatingPage, iframe').css({'display':'none'}); 
        $('#fullscreenVideoPlayer, #videoExit').css({'display':'block'}); 
  }}); 
  $('#fullscreenVideoPlayer, #videoExit').stop().animate({'opacity':'1', 'background-color':"black"});

  // setTimeout(function(){
  //   $('#container, .animatingPage, iframe').css({'display':'none'}); 
  //   $('#fullscreenVideoPlayer, #videoExit').css({'display':'block'}); 
  // }, 3000);   

  Portfolio.video.players[portfolioSelection].pauseVideo().seekTo(0);
  if(Portfolio.video.selectedVidLoader == 0) {
    Portfolio.video.selectedVidLoader++;
  }
}

function exitFullScreen(){
  Portfolio.video.player.mute().pauseVideo();
  $('#fullscreenVideoPlayer, #videoExit, #container, .animatingPage, #' + Portfolio.page.isHover + ' .videoContainer, #'+ Portfolio.page.isHover+', #'+Portfolio.page.isHover+' .content, #'+Portfolio.page.isHover+' .videoPlayer, #'+Portfolio.page.isHover+' .videoPlayer iframe, #container, .animatingPage, iframe').css({'height': '', 'width':'','bottom':'','right':'','left':'', 'top':'', 'display': '', 'opacity':'', 'overflow': '', 'position':'', 'z-index':''});
  Portfolio.mousePos.allowAnimation = false;
  Portfolio.page.lastScrolled = '';
  Portfolio.page.isHover= 'container';
  // $("#" + Portfolio.page.isHover + " .videoContainer, #fullscreenVideoPlayer, #videoExit, #container, .animatingPage, #" + Portfolio.page.isHover + " .content", "#" + Portfolio.page.isHover + " .videoPlayer iframe, #" + Portfolio.page.isHover + " .videoPlayer").css({'height': '', 'width':'','bottom':'','right':'','left':'', 'top':'', 'display': '', 'opacity':'', 'overflow': '', 'position':''});
  Portfolio.video.clicked = false; 
  checkPositions();
}

