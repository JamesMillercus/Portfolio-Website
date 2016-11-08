// Inject YouTube API script asynchronously
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// a counter to see how many videos have been loaded
var isLoaded = 0;
//boolean to allow videos to be played once loaded
var isReady = false;
//the number of videos that will be loaded
var videoList;
//video players are stored in this array
var players = [];
var myPlayerState;
var fullScreenCounter = 0;

//loop through each iframe and create a video player for it
function onYouTubeIframeAPIReady() {
  var iframes = document.querySelectorAll('iframe')
  for(videoList = 0; videoList < iframes.length;videoList++) {
    players[videoList] = createPlayer(iframes[videoList]);
  }   
}
//create a player and call a function when its ready to play
function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
       events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange      
       }
    });
}
//when its ready to be played make sure that all the other videos are loaded, and then allow users to play the videos
function onPlayerReady(event){
  //bind events
  isLoaded++;
  event.target.mute();
  if(isLoaded == videoList){
    console.log("videos ready");
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
  if(clickedVideo == true) {
    players[lastVideo].playVideo();
    // players[lastVideo].unMute();
  }
}


function fullScreen (element){
  console.log('video = ' + element);
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.webkitRequestFullScreen ) {
    element.webkitRequestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', fn);

function fn(){
  fullScreenCounter++;
  if(fullScreenCounter == 2) {
    clickedVideo = false;
    fullScreenCounter = 0;
    // players[lastVideo].mute();
  }
  console.log(fullScreenCounter);
}
