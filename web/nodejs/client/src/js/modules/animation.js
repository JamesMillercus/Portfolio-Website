export function animationSetup() {
 for(let x = 0; x < $(".grid-container").children().length; x++ ){
	$( ".item" + x ).hover(function() {
		// if (item x has class "active") {}
		// else {}
  		if(x != 4) $( ".grid-container" ).toggleClass("item"+x+"scroll");
  		else {
  			console.log("4 scrolled in");
  			// $(".icon").toggleClass("iconActive");
  			// $(".item4 .mail").toggleClass("mailnonActive");
  			// $(".item4 .mail").toggleClass("nonActive");
  			$(".item4 .unlocked").toggleClass("active");
  		}
	}, function() {
		if(x != 4) $( ".grid-container" ).toggleClass("item"+x+"scroll");
		else {
			$(".item4 .unlocked").toggleClass("active");
  			// $(".item4 .mail").toggleClass("nonActive");
			// $(".item4 .mail").toggleClass("nonActive");
			// $(".icon").toggleClass("iconActive");
  		}
	  	// $( ".grid-container" ).removeClass("animate"+x+"in");
	  	// $( ".grid-container" ).addClass("animate"+x+"out");
	    // $( this ).find( "span:last" ).remove();
	});
 }
}