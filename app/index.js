//TO DO
// SERVE HTML FILES IN PUG
// ADJUST GULP TO SERVE WORK WITH PUG FORMAT INSTEAD OF HTML
// SET UP SOCKET IO?
// TEST JOHNNY FIVE SET UP

var app = require('express')();
var http = require('http').Server(app);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//*** SET UP HTML/CSS/JS FILES WITH THE SERVER ***//
var serveFileLocations = [
//html & css
'/', '/css/styles.css','/css/mobile.css', 
//js files
'/js/1vars.js', '/js/2imageLoader.js', '/js/3videoLoader.js', '/js/4main.js', '/js/5nav.js', '/js/6animationFunctions.js','/js/lib/jquery-3.1.1.min.js', '/js/lib/imagesLoaded.min.js',
//gifs
'/assets/moodTree.gif','/assets/krispyKreme.gif','/assets/MSMgif.gif','/assets/hackyXmasGif.gif','/assets/beerGif.gif','/assets/wiywiGIF.gif','/assets/leapTassimo.gif','/assets/makerGifFinal.gif',
//images
'/assets/instagram.jpg','/assets/twitter.jpg','/assets/linkedIn.jpg','/assets/github.jpg','/assets/mail.jpg','/assets/pinterest.jpg',
//video
'/assets/logoAnimation.mp4'];

var serveFiles = [
//html & css
'/index.html', '/css/styles.css', '/css/mobile.css', 
//js files
'/js/1vars.js', '/js/2imageLoader.js', '/js/3videoLoader.js', '/js/4main.js', '/js/5nav.js', '/js/6animationFunctions.js', '/js/lib/jquery-3.1.1.min.js', '/js/lib/imagesLoaded.min.js',
//gifs
'/assets/moodTree.gif','/assets/krispyKreme.gif','/assets/MSMgif.gif','/assets/hackyXmasGif.gif','/assets/beerGif.gif','/assets/wiywiGIF.gif','/assets/leapTassimo.gif','/assets/makerGifFinal.gif',
//images
'/assets/instagram.jpg','/assets/twitter.jpg','/assets/linkedIn.jpg','/assets/github.jpg','/assets/mail.jpg','/assets/pinterest.jpg',
//video
'/assets/logoAnimation.mp4'];

//loop to call the file server function
for(var x = 0;x<serveFileLocations.length;x++) fileServer(x);
//serves all files from both of the above arrays
function fileServer(x){
	app.get(serveFileLocations[x], function(req, res){
	  res.sendFile(__dirname + serveFiles[x]);
	});
	console.log(x);
}