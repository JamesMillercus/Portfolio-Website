
//** VIDEO LOGIC **//
//loop through each iframe and create a video player for it
function onYouTubeIframeAPIReady() {
  var iframes = document.querySelectorAll('.yPlayer')
  for(videoList = 0; videoList < iframes.length;videoList++) players[videoList] = createPlayer(iframes[videoList], videoList);
  if(isTablet) loadMobileDevice();
}
//create a player and call a function when its ready to play
function createPlayer(playerInfo, idNumber) {
  var src = $("#"+playerInfo.id).attr('src');
  YouTubeGetID(src);
  playerYoutubeIds[idNumber]=ID;
  // console.log("player info "+ idNumber+ " = " +playerYoutubeIds[idNumber]);
  return new YT.Player(playerInfo.id, {
     events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange      
     }
  });
}
function loadMobileDevice(){
  player = new YT.Player('mobileVideoLoader', {
    height: '100%',
    width: '100%',
    // videoId: 'M7lc1UVf-VE',
    events: {
       'onReady': onMobileDevicePlayerReady,
       'onStateChange': onMobileDevicePlayerStateChange
    }
  });
}
function onMobileDevicePlayerReady(event){
  // var playerID = YT.get('#player3');
  // alert(playerID)
}

//when its ready to be played make sure that all the other videos are loaded, and then allow users to play the videos
function onPlayerReady(event){
  //bind events
  isLoaded++;
  // var id = players[isLoaded].getVideoData()['video_id'];
  // console.log("video id = "+id);
  var src = $('iframe',this).attr('src');
  // console.log("video id = "+playerInfoID);
  event.target.mute();
  if(isLoaded == videoList){
    console.log("videos ready");
    // YouTubeGetID("https://www.youtube.com/embed/abU5I9Tj6ZU?enablejsapi=1&loop=1&modestbranding=1&playlist=abU5I9Tj6ZU&rel=0&showinfo=0");
    isReady = true;
  } 
}
//loop through and pause all videos
function pauseAllVideos(){
  for(var x = 0; x < videoList; x++){
    players[x].pauseVideo();
  }
}

function onPlayerStateChange(event) {
  myPlayerState = event.data;
  if (isHover!= 'container' && isReady == true) animateIn();
  // if(isMobile) fn();
  // if(isHover == 'container' && isMobile) return;
  // if(myPlayerState == 3) {
  //   console.log("YES");
  //   players[lastVideo].playVideo();
  // }
  
  //if video is played on mobile
  if(myPlayerState == 1) if(isMobile) players[lastVideo].seekTo(0).unMute();
  //if video is paused or stopped on mobile
  if(myPlayerState == 2 || myPlayerState == 0) if(isMobile) players[lastVideo].mute();
   
}

function onMobileDevicePlayerStateChange(event){
  videoLoaderState = event.data;
  if(selectedVidLoader == 1 && videoLoaderState == 3) player.playVideo();
  if(videoLoaderState == 1) selectedVidLoader ++;
  

  // if(event.data == 3) $('#mobileVideoExit').css({'background-color':'green'}); 
  // if(event.data == -1) $('#mobileVideoExit').css({'background-color':'red'}); 
  // if(event.data == 0) $('#mobileVideoExit').css({'background-color':'orange'}); 
  // if(event.data == 1) $('#mobileVideoExit').css({'background-color':'blue'}); 
  // if(event.data == 2) $('#mobileVideoExit').css({'background-color':'cyan'}); 
  // if(event.data == 5) $('#mobileVideoExit').css({'background-color':'white'}); 
}


function fullScreen (element){
  // console.log('video = ' + element);
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.webkitRequestFullScreen ) {
    element.webkitRequestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
  //set boolean to true to stop other unwanted functions from activating
  clickedVideo = true;
}

function YouTubeGetID(url){
  ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
  return ID;
}

function fullScreenMobile(){
  players[lastVideo].playVideo();
  wasPlayed = lastVideo;
  staticHome();
}

function fullScreenTouchDevice(portfolioSelection){
  if(playerYoutubeIds[portfolioSelection] != wasPlayed) player.loadVideoById(playerYoutubeIds[portfolioSelection]);
  wasPlayed = playerYoutubeIds[portfolioSelection];
  $('#container, .animatingPage, iframe').css({'display':'none'}); 
  $('#mobileVideoLoader, #mobileVideoExit').css({'display':'block'}); 
  if(selectedVidLoader == 0) {
    selectedVidLoader++;
  }
  // alert(playerYoutubeIds[portfolioSelection]);
}

function exitMobileFullScreen(){
  clickedVideo = false; 
  player.mute().pauseVideo();
  $('#mobileVideoLoader, #mobileVideoExit, #container, .animatingPage').css({'display':''});
  checkPositions();
}

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', fn);

function fn(){
  fullScreenCounter++;
  if(fullScreenCounter == 1) {
    players[lastVideo].unMute().seekTo(0).playVideo();
  }
  if(fullScreenCounter >= 2) {
    clickedVideo = false;
    fullScreenCounter = 0;
    players[lastVideo].mute();
    $('.videoContainer').css({"opacity": 0});
    if(clickedVideo != '') checkPositions();
  }
}

