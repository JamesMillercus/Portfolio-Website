export let animate = () => {
	for( let x = 0; x < animationConfig.addAnimation.length; x++ ) {
		 // on hero text hover
		 $(".herotext").hover(function() {
		 	animateLogic(this, x);
		 });	
		 // on hero text click
		 $(".herotext").click(function() {
		 	animateLogic(this, x);
	 	});
	}
}

// declare css styles that need to be added / removed to reveal icons & animate hero text
let animationConfig = {
	addAnimation: ['animatemail', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	removeAnimation: ['animatemail', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	revealedIcon: ['mailrevealed', 'linkedinrevealed', 'githubrevealed', 'twitterrevealed', 'instagramrevealed', 'pinterestrevealed'],
	unlockedIcon: ['mail', 'linkedin', 'github', 'twitter', 'instagram', 'pinterest']
}

// figure out how the hero text should animate based on what has already been scrolled over
let animateLogic = (selected, trigger) => {
	// if no icons have been revealed yet, allow mail animation to activate
	if ($(selected).hasClass( "start" ) && trigger == 0) startAnimation(selected, trigger);
	// if all mail text has been scrolled over, allow linkedin animation to activate
	else if(trigger == 1){
		if($(selected).hasClass( "mailrevealed" ) && ($(selected).hasClass( "complete" ) || $('.start').length == 0)) startAnimation(selected, trigger);
	}
	// if the looped text has been scrolled over, allow the following animation to activate
	else if ( $(selected).hasClass( animationConfig.revealedIcon[trigger-1] ) && ($(selected).hasClass( "complete" ) || $('.' + animationConfig.revealedIcon[trigger-2]).length == 0)) startAnimation(selected, trigger);
	// if all text has been scrolled over, reset the animation
	else if ( $(selected).hasClass( "pinterestrevealed" ) && ($(selected).hasClass( "complete" ) || $('.instagramrevealed').length == 0)) resetAnimation(selected, 0);
}

// start the hero text animation
let startAnimation = (scrolled, trigger) => {
	// add the 1st animation style
	$(scrolled).addClass(animationConfig.addAnimation[trigger]);
	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		endStyles(scrolled, trigger);
    });
}

// once the hero text animation is complete, return to normal + remove css animation + unlock icon if appropriate
let endStyles = (scrolled, trigger) => {
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
	}
}

// once all animations are complete, reset to first animation
let resetAnimation = (scrolled, trigger) => {
	// add reset animation class
	$(scrolled).addClass("animatereset");
	// when this has finished animating
	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		// remove animation reset and pinterest revealed classes
		$(scrolled).removeClass("animatereset pinterestrevealed");
		// if "start" class isn't already assigned to the herotext element, then add it
		if(!$(this).hasClass("start")) $(scrolled).addClass("start");
		// if "complete" class isn't already assigned to the herotext element, then add it
		if(!$(this).hasClass("complete")) $(scrolled).addClass("complete");
	});
}

// on click
let clickAnimation = (clicked, count) => {
	// randomise click animation
	$(clicked).addClass("animateboomarang"+count+"");
	// on animation end
	$(clicked).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		// remove css animation
		$(clicked).removeClass("animateboomarang"+count+"");
	});
}