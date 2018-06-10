export let animate = () => {
	 // on hero text hover
	 $(".herotext").hover(function() {
	 	// if no icons have been revealed yet, allow mail animation to activate
		if ($(this).hasClass( "start" )) startAnimation(this, 0);
		// if all mail text has been scrolled over, allow linkedin animation to activate
		else if ( ($(this).hasClass( "mailrevealed" )) && ($('.start').length == 0) ) startAnimation(this, 1);
		// if all linkedin text has been scrolled over, allow github animation to activate
		else if ( ($(this).hasClass( "linkedinrevealed" )) && ($('.mailrevealed').length == 0) ) startAnimation(this, 2);
		// if all github text has been scrolled over, allow twitter animation to activate
		else if ( ($(this).hasClass( "githubrevealed" )) && ($('.linkedinrevealed').length == 0) ) startAnimation(this, 3);
		// if all twitter text has been scrolled over, allow instagram animation to activate
		else if ( ($(this).hasClass( "twitterrevealed" )) && ($('.githubrevealed').length == 0) ) startAnimation(this, 4);
		// if all instagram text has been scrolled over, allow pinterest animation to activate
		else if ( ($(this).hasClass( "instagramrevealed" )) && ($('.twitterrevealed').length == 0) ) startAnimation(this, 5);
	 });	
}

let animationConfig = {
	addAnimation: ['animatestart', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	removeAnimation: ['start animatestart', 'animatelinkedin', 'animategithub', 'animatetwitter', 'animateinstagram', 'animatepinterest'],
	revealedIcon: ['mailrevealed', 'linkedinrevealed', 'githubrevealed', 'twitterrevealed', 'instagramrevealed', 'pinterestrevealed'],
	unlockedIcon: ['mail', 'linkedin', 'github', 'twitter', 'instagram', 'pinterest']

}

let startAnimation = (scrolled, trigger) => {
	// add the 1st animation style
	$(scrolled).addClass(animationConfig.addAnimation[trigger]);
	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		// remove this animation style and class
    	$(scrolled).removeClass(animationConfig.removeAnimation[trigger]);
    	// if already scrolled over, remove previous scrolled class
    	if(trigger > 0) $(scrolled).removeClass(animationConfig.revealedIcon[trigger-1]);
    	// add the next animation class
    	$(scrolled).addClass(animationConfig.revealedIcon[trigger]);
    	// if all items have been scrolled over, unlock mail icon
    	if($('.' + animationConfig.revealedIcon[trigger]).length == $('.herotext').length-1) $('.item4 .' + animationConfig.unlockedIcon[trigger] +'.icon').addClass('unlocked active');
    });
}

// let startAnimation = (scrolled) => {
// 	// add the 1st animation style
// 	$(scrolled).addClass('animatestart');
// 	// once this animation ends
// 	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
// 		// remove this animation style and class
//     	$(scrolled).removeClass('start animatestart');
//     	// add the next animation class
//     	$(scrolled).addClass('mailrevealed');
//     	// if all items have been scrolled over, unlock mail icon
//     	if($('.mailrevealed').length == $('.herotext').length-1) $('.item4 .mail.icon').addClass('unlocked active');
//     });
// }

// let linkedinAnimation = (scrolled) => {
// 	// add the 1st animation style
// 	$(scrolled).addClass('animatelinkedin');
// 	$(scrolled).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
// 		// remove this animation style and class
//     	$(scrolled).removeClass('animatelinkedin');
//     	// add the next animation class
//     	$(scrolled).addClass('linkedinrevealed');
//     	// if all items have been scrolled over, unlock mail icon
//     	if($('.linkedinrevealed').length == $('.herotext').length-1) $('.item4 .linkedin.icon').addClass('unlocked active');
//     });
// }
