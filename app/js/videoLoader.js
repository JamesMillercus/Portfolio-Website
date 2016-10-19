
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var firstLoaded = 0;

    var player;
    var htmlPlayer1 = 'player1';
    var htmlPlayer2 = 'player2';

    function onYouTubeIframeAPIReady() {
      player1 = new YT.Player(htmlPlayer1, {
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
          'onReady': onPlayer1Ready,
          'onStateChange': onPlayer1StateChange
        }
      });
      player2 = new YT.Player(htmlPlayer2, {
        playerVars: {
          'controls': 0,
          'autohide': 1,
          'wmode': 'opaque',
          'showinfo': 0,
          'loop': 1,
          'mute': 1,
          //'start': 15,
          //'end': 110,
          'playlist': 'uc8N-uWyTus'
        },
        videoId: 'uc8N-uWyTus',
        events: {
          'onReady': onPlayer2Ready,
          'onStateChange': onPlayer2StateChange
        }
      });
    }

    // function onYouTubeIframeAPIReady() {
    //   player = new YT.Player(htmlPlayer2, {
    //     playerVars: {
    //       'controls': 0,
    //       'autohide': 1,
    //       'wmode': 'opaque',
    //       'showinfo': 0,
    //       'loop': 1,
    //       'mute': 1,
    //       //'start': 15,
    //       //'end': 110,
    //       'playlist': 'uc8N-uWyTus'
    //     },
    //     videoId: 'uc8N-uWyTus',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }

    function onPlayer1Ready(event) {
      // console.log("play sexy video slut");
        player1.playVideo();
        event.target.mute();
        firstLoaded++;
    }
    function onPlayer2Ready(event) {
      // console.log("play sexy video slut");
        player2.playVideo();
        event.target.mute();
        firstLoaded++;
    }

    var refreshId = setInterval(function() {    
      if(firstLoaded==2 && isLoaded!=2){
        var playerTime1 = player1.getCurrentTime();
        var playerTime2 = player2.getCurrentTime();
        
        if(playerTime1>0.0001){
          player1.pauseVideo();
          isLoaded++; 
        }
        if(playerTime2>0.0001){
          player2.pauseVideo();
          isLoaded++; 
        }
      }
      if(isLoaded == 2) clearInterval(refreshId);
      console.log("timer");
    }, .1);

    function onPlayer1StateChange(event) {
      
    }
    function onPlayer2StateChange(event) {
      
    }