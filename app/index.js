//TO DO
// TEST JOHNNY FIVE SET UP

//implement mongoDB to seen who has accessed the site and what they looked at.
//Add CMS KEYSTONE / WORDPRESS

//** SET UP ALL VARIABLES **//
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var j5 = require("johnny-five");
var board = new j5.Board();
var heroTextNumber=0;
var arduinoReady = false;
// var j5 = {};
 
var LEDPIN = 13;
var OUTPUT = 1;

//** BESPOKE HERO TEXT ARRAYS **//
// 1
var isabelHeroText = ["Isabel Robson","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
// 2
var trevorHeroText = ["Trevor Atterton","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
// array to contain all other hero text arrays
var totalHeroTexts = [isabelHeroText,trevorHeroText];

//** SERVE PUG FILES **//
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//*** DECLARE LOCATIONS OF THE FILES THAT THE FRONT END NEEDS ***//
var serveFileLocations = [
//html & css
'/', '/css/styles.css','/css/mobile.css', 
//js files
'/js/0sockets.js','/js/1vars.js', '/js/2imageLoader.js', '/js/3videoLoader.js', '/js/4main.js', '/js/5nav.js', '/js/6animationFunctions.js','/js/lib/jquery-3.1.1.min.js', '/js/lib/imagesLoaded.min.js',
//gifs
'/assets/moodTree.gif','/assets/krispyKreme.gif','/assets/MSMgif.gif','/assets/hackyXmasGif.gif','/assets/beerGif.gif','/assets/wiywiGIF.gif','/assets/leapTassimo.gif','/assets/makerGifFinal.gif',
//images
'/assets/closeButton.png','/assets/instagram.jpg','/assets/twitter.jpg','/assets/linkedIn.jpg','/assets/github.jpg','/assets/mail.jpg','/assets/pinterest.jpg',
//video
'/assets/logoAnimation.mp4'];

//** SERVE FILES FROM BACKEND TO FRONT END **//
var serveFiles = [
//html & css
'/views/index.pug', '/css/styles.css', '/css/mobile.css', 
//js files
'/js/0sockets.js','/js/1vars.js', '/js/2imageLoader.js', '/js/3videoLoader.js', '/js/4main.js', '/js/5nav.js', '/js/6animationFunctions.js', '/js/lib/jquery-3.1.1.min.js', '/js/lib/imagesLoaded.min.js',
//gifs
'/assets/moodTree.gif','/assets/krispyKreme.gif','/assets/MSMgif.gif','/assets/hackyXmasGif.gif','/assets/beerGif.gif','/assets/wiywiGIF.gif','/assets/leapTassimo.gif','/assets/makerGifFinal.gif',
//images
'/assets/closeButton.png','/assets/instagram.jpg','/assets/twitter.jpg','/assets/linkedIn.jpg','/assets/github.jpg','/assets/mail.jpg','/assets/pinterest.jpg',
//video
'/assets/logoAnimation.mp4'];

//** DISPLAY FILES ON FRONT END **//
//loop to call the file server function
for(var x = 0;x<serveFileLocations.length;x++) fileServer(x);
//serves all files from both of the above arrays
function fileServer(x){
	app.get(serveFileLocations[x], function(req, res){
	  //if first item of array, render pug file
	  if(x==0) res.render('index.pug');
	  //for everything else, submit files
	  else res.sendFile(__dirname + serveFiles[x]);
	});
}

//** ELECTRONICS CODE **//
board.on("ready", function(){
  var val = 0;
  var heroTextNumber = 1;
  arduinoReady = true;
  // Set pin 13 to OUTPUT mode
  // this.pinMode(LEDPIN, OUTPUT);
 
  // Create a loop to "flash/blink/strobe" an led
  // this.loop( 100, function() {
  //   this.digitalWrite(LEDPIN, (val = val ? 0 : 1));
  // });

  
  this.each(function(board){
    // Set up LED on board B
    for(var x = 0;x<totalHeroTexts.length;x++) {
	    if(board.io.firmware.name == x+".ino"){
	      j5.ledA = new five.Led({
	        pin: 13,
	        board: board
	      });
	      heroTextChanger(totalHeroTexts[x]);
	    }
	}
  });
  j5.ledA.toggle();
});

//** SOCKET COMMUNICATION **//
io.on('connection', function(socket){
  console.log('a user connected');
  // socket.on('userSocket', function(msg){
    // if(msg == 'startUp') heroTextChanger(heroTextNumber);
    // else if(msg != 'startUp' && arduinoReady == true) loadArduino(msg);
  // });
});

//** CHANGE BESPOKE HERO TEXT **//
function heroTextChanger(chosenHero){
	io.emit('userSocket', chosenHero);
}