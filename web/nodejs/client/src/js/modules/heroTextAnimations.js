export let animate = () => {
	 // on hero text hover
	 $(".herotext").hover(function() {
	 	// if no icons have been revealed yet, allow mail animation to activate
		if ($(this).hasClass( "start" )) startAnimation(this, 0);
		// if all mail text has been scrolled over, allow linkedin animation to activate
		else if ( $(this).hasClass( "mailrevealed" ) && ($(this).hasClass( "complete" ) || $('.start').length == 0)) startAnimation(this, 1);
		// if all linkedin text has been scrolled over, allow github animation to activate
		else if ( $(this).hasClass( "linkedinrevealed" ) && ($(this).hasClass( "complete" ) || $('.mailrevealed').length == 0)) startAnimation(this, 2);
		// if all github text has been scrolled over, allow twitter animation to activate
		else if ( $(this).hasClass( "githubrevealed" ) && ($(this).hasClass( "complete" ) || $('.linkedinrevealed').length == 0)) startAnimation(this, 3);
		// if all twitter text has been scrolled over, allow instagram animation to activate
		else if ( $(this).hasClass( "twitterrevealed" ) && ($(this).hasClass( "complete" ) || $('.githubrevealed').length == 0)) startAnimation(this, 4);
		// if all instagram text has been scrolled over, allow pinterest animation to activate
		else if ( $(this).hasClass( "instagramrevealed" ) && ($(this).hasClass( "complete" ) || $('.twitterrevealed').length == 0)) startAnimation(this, 5);
			// if all pinterest text has been scrolled over, allow final animation to activate
		else if ( $(this).hasClass( "pinterestrevealed" ) && ($(this).hasClass( "complete" ) || $('.instagramrevealed').length == 0)) resetAnimation(this, 0);
	 });	
}

let animationConfig = {
	addAnimation: ['animatemail', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	removeAnimation: ['animatemail', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	revealedIcon: ['mailrevealed', 'linkedinrevealed', 'githubrevealed', 'twitterrevealed', 'instagramrevealed', 'pinterestrevealed'],
	unlockedIcon: ['mail', 'linkedin', 'github', 'twitter', 'instagram', 'pinterest']
	// permaColour: ['permamail', 'permalinkedin', 'permagithub', 'permatwitter', 'permainstagram', 'permapinterest']
	// allowedScrolled: [ 1, 3, 5, 7, 9, 10],
	// permaText: ['.j, .a', '.m', '.e, .s', '.mm, .i', '.l, .ll', '.ee, .r']

}

let startAnimation = (scrolled, trigger) => {
	// add the 1st animation style
	$(scrolled).addClass(animationConfig.addAnimation[trigger]);
	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		// remove this animation style and class
    	$(scrolled).removeClass(animationConfig.removeAnimation[trigger]);
    	// if already scrolled over, remove previous scrolled class
    	if(trigger > 0) $(scrolled).removeClass(animationConfig.revealedIcon[trigger-1]);
    	// else remove the class that triggers the initial scroll to mail
    	else $(scrolled).removeClass("start");
    	// add the next animation class
    	$(scrolled).addClass(animationConfig.revealedIcon[trigger]);
    	// if all items have been scrolled over
    	if($('.' + animationConfig.revealedIcon[trigger]).length == ($('.herotext').length - 1)) {
    		// if class hasn't already been unlocked
    		if(!$('.item4 .' + animationConfig.unlockedIcon[trigger] +'.icon').hasClass('unlocked')){
	    		// unlock new icon
	    		$('.item4 .' + animationConfig.unlockedIcon[trigger] +'.icon').addClass('unlocked active');
    		}
    		// set permanent colour to text
    		// $(animationConfig.permaText[trigger]).addClass(animationConfig.permaColour[trigger]);
    	}
    });
}

let resetAnimation = (scrolled, trigger) => {
	console.log("reset");
	$(scrolled).addClass("animatereset");
	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		$(scrolled).removeClass("animatereset pinterestrevealed");
		if(!$(this).hasClass("start") $(scrolled).addClass("start");
		if(!$(this).hasClass("complete") $(scrolled).addClass("complete");
	});
}

let clickAnimation = (scrolled) => {
	//add random scrolls


	// make on click
	// $(scrolled).addClass("animateboomarang");
	// $(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 	$(scrolled).removeClass("animateboomarang");
	// });

	// assign random animation to each letter that ultimately comes back like a boomerang
}