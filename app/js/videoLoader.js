
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var firstLoaded = false;

    var player;
    var htmlPlayer = 'player1';


    function onYouTubeIframeAPIReady() {
      player = new YT.Player(htmlPlayer, {
        playerVars: {
          'controls': 0,
          'autohide': 1,
          'wmode': 'opaque',
          'showinfo': 0,
          'loop': 1,
          'mute': 1,
          //'start': 15,
          //'end': 110,
          'playlist': 'abU5I9Tj6ZU'
        },
        videoId: 'abU5I9Tj6ZU',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      // console.log("play sexy video slut");
        player.playVideo();
        event.target.mute();
        firstLoaded = true;
    }

    var refreshId = setInterval(function() {    
      if(firstLoaded==true && isLoaded==false){
        var playerTime = player.getCurrentTime();
        console.log(playerTime);
        if(playerTime>0.0001){
          player.pauseVideo();
          isLoaded = true; 
          clearInterval(refreshId);
        }
      }
      console.log("timer");
    }, .1);

    function onPlayerStateChange(event) {
      
    }