/*eslint max-len: ["error", { "code": 200 }]*/
/*eslint-env browser*/
/*eslint no-script-url: "error"*/

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem,
	fetchSiteAnimating,
	fetchUpdateUrl,
	fetchHeroKeyPress
} from './../../../../../actions';
import './assets/scss';
import './assets/images';

class HeroIcon extends Component {
	componentDidMount() {
		// document.addEventListener('keypress', this.keyPress.bind(this));
	}

	componentDidUpdate() {
		// const elem = this.refs.icon;
		// this.icon = window.getComputedStyle(elem).getPropertyValue('opacity');
		// if (this.icon > 0 && this.icon < 0.5) this.props.fetchHeroTextAnimation(false);
		// else this.props.fetchHeroTextAnimation(true);
		// console.log('this.props.scrolledHeroIcon');
		// console.log(this.props.scrolledHeroIcon);
		this.activeHero(this.props.scrolledHeroIcon);
	}


	setClass() {
		const { revealIcons, className, scrolledHeroIcon } = this.props;
		const iconClasses = [`${className}`, 'icon'];
		if (revealIcons) iconClasses.push('active');
		if (scrolledHeroIcon === className) iconClasses.push('hover');

		return iconClasses.join(' ');
	}

	getStyle() {
		const heroIconContent = this.props.content.heroIcon;
		const activeHeroIcon = this.props.activeHeroIcon;
		const scrolledHeroIcon = this.props.scrolledHeroIcon;
		const returnstyles = {};
		Reflect.ownKeys(heroIconContent).forEach(key => {
			if (this.props.className === key) {
				returnstyles.backgroundImage = `url(/assets/images/${heroIconContent[key].image})`;
				if (this.props.deviceType === 'laptop') {
					returnstyles.backgroundSize = heroIconContent[key].backgroundSize;
					returnstyles.backgroundPosition = heroIconContent[key].backgroundPosition;
				}
				if (activeHeroIcon === key) {
					returnstyles.backgroundColor = heroIconContent[key].backgroundColor;
					returnstyles.backgroundPosition = heroIconContent[key].scrolledBackgroundPosition;
					returnstyles.backgroundSize = heroIconContent[key].scrolledBackgroundSize;
				}
			}
		});
		return returnstyles;
	}

	// keyPress(event) {
	// 	const { heroKeyPress, href, scrolledHeroIcon, scrolledItem, activeHeroIcon } = this.props;
	// 	// console.log(event.key);
	// 	// console.log('scrolledHeroIcon');
	// 	// console.log(scrolledHeroIcon);
	// 	// console.log('activeHeroIcon');
	// 	// console.log(activeHeroIcon);
	// 	if (scrolledItem === 4 && heroKeyPress) {
	// 		if (scrolledHeroIcon === null || scrolledHeroIcon === 'none') {
	// 			if (activeHeroIcon === null || activeHeroIcon === 'none') {
	// 				if (event.key === 'a' || event.key === 'A') this.scrolledItem(4, 'centerLeftIcon');
	// 				if (event.key === 'd' || event.key === 'D') this.scrolledItem(4, 'centerRightIcon');
	// 			}
	// 		} else if (scrolledHeroIcon === 'centerRightIcon' && activeHeroIcon === 'centerRightIcon') {
	// 			if (event.key === 'a' || event.key === 'A') this.scrolledItem(4, 'none');
	// 			// else if (event.key === 'd' || event.key === 'D') this.scrolledItem(5, 'none');
	// 			// console.log('left');
	// 		} else if (scrolledHeroIcon === 'centerLeftIcon' && activeHeroIcon === 'centerLeftIcon') {
	// 			if (event.key === 'd' || event.key === 'D') this.scrolledItem(4, 'none');
	// 			else if (event.key === 'a' || event.key === 'A') {
	// 				/*
	// 					1. move this keypress function to Hero.js
	// 					2. create a reducer which triggers HeroIcon once they key 'f' is pressed
	// 					3. create a function in HeroIcon which opens the link based on when the reducer is triggered
	// 				*/
	// 				console.log('lol');
	// 				// this.props.fetchScrolledItem(3);
	// 				// this.props.fetchScrolledHeroIcon(null);
	// 				// this.props.fetchHeroKeyPress(false);
	// 			}
	// 		}
	// 	}
	// 	// if (event.key === 'f' && this.allowKeypress) this.clickedItem(this.props.scrolledItem);
	// }

	activeHero(className) {
		let timer;
		const that = this;
		if (this.props.deviceType === 'laptop') {
			if (className !== 'none') {
				clearTimeout(timer);
				this.props.fetchActiveHeroIcon(className);
			}	else {
				timer = setTimeout(() => {
					if (this.props.scrolledHeroIcon === 'none') {
						that.props.fetchActiveHeroIcon(className);
					}
				}, 150);
			}
		}
	}

	checkTarget() {
		const heroIconContent = this.props.content.heroIcon;
		const activeHeroIcon = this.props.activeHeroIcon;
		let returnstyles;
		Reflect.ownKeys(heroIconContent).forEach(key => {
			if (activeHeroIcon === key) returnstyles = heroIconContent[key].target;
		});
		return returnstyles;
	}

	scrolledItem(scrolledItem, className) {
		if (this.props.siteAnimating === 'finishedAnimating') {
			const deviceType = this.props.deviceType;
			if (deviceType === 'laptop') {
				if (scrolledItem !== null) this.props.fetchScrolledItem(scrolledItem);
				this.props.fetchScrolledHeroIcon(className);
			}
		}
	}

	updateHREF(href) {
		this.props.fetchSiteAnimating('changingPage');
		setTimeout(() => { this.props.fetchUpdateUrl(href); }, 1000);
	}

	render() {
		const href = this.props.href;
		const rel = 'noreferrer noopener';
		const ovr = () => this.scrolledItem(4, this.props.className);
		const out = () => this.scrolledItem(null, 'none');
		const css = this.setClass();
		const target = this.checkTarget();
		const style = this.getStyle();
		const voidHREF = 'javascript:void(0);';
		const updateHREF = () => this.updateHREF(href);

		if (this.props.updateUrl === href) return <Redirect push to={href} />;
		else if (target === '_self') return <a className={css} ref={'icon'} href={voidHREF} onClick={updateHREF} rel={rel} onMouseOver={ovr} onMouseOut={out} style={style} />;
		return <a className={css} ref={'icon'} href={href} target={target} rel={rel} onMouseOver={ovr} onMouseOut={out} style={style} />;
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledHeroIcon: state.scrolledHeroIcon,
	deviceType: state.deviceType,
	scrolledItem: state.scrolledItem,
	content: state.content,
	siteAnimating: state.siteAnimating,
	updateUrl: state.updateUrl,
	heroKeyPress: state.heroKeyPress
});


export default connect(mapStateToProps, {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem,
	fetchSiteAnimating,
	fetchUpdateUrl,
	fetchHeroKeyPress
})(HeroIcon);
