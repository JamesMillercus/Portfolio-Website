// import heroText animations
import * as heroText from './heroTextAnimations.js';

// animation set up
export let setup = () => {
 // for each portfolio item
 for(let x = 0; x < $(".grid-container").children().length; x++ ){
 	// check if a portfolio item has been hovered on
	$( ".item" + x ).hover(function() {
		// if any item other than the center has been selected, transition between animation classes to move background
  		if(x != 4) {
  			$( ".grid-container" ).toggleClass("item"+x+"scroll");
  			$(".item4 p span").addClass("grey");
  		}
  		// else if the chosen is selected
  		else {
  			// reveal icons
  			$(".item4 .unlocked").addClass("active");
  			// trigger the heroText to animate
			heroText.animate();
  		}
  	// check if a portfolio item has been hovered out
	}, function() {
		// if any item other than the center has been selected, transition between animation classes to move background
		if(x != 4) {
			$( ".grid-container" ).toggleClass("item"+x+"scroll");
			$(".item4 p span").removeClass("grey");
		}
  		// else if the chosen is selected
		else {
			//trigger the heroText to animate
			$(".item4 .unlocked").removeClass("active");
  		}
	});
 }
}