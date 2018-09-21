/*eslint max-len: ["error", { "code": 200 }]*/
/*eslint-env browser*/
/*eslint no-script-url: "error"*/

import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem,
	fetchSiteAnimating,
	fetchUpdateUrl
} from './../../../../../actions';
import './assets/scss';
import './assets/images';

class HeroIcon extends Component {

	componentDidUpdate() {
		const elem = this.refs.icon;
		this.icon = window.getComputedStyle(elem).getPropertyValue('opacity');
		if (this.icon > 0 && this.icon < 0.5) this.props.fetchHeroTextAnimation(false);
		else this.props.fetchHeroTextAnimation(true);
		this.activeHero(this.props.scrolledHeroIcon);
	}

	setClass() {
		const revealIcons = this.props.revealIcons;
		const iconClasses = [`${this.props.className}`, 'icon'];
		if (revealIcons) iconClasses.push('active');
		return iconClasses.join(' ');
	}

	getStyle() {
		const heroIconContent = this.props.content.heroIcon;
		const activeHeroIcon = this.props.activeHeroIcon;
		const siteAnimating = this.props.siteAnimating;
		const returnstyles = {};
		Reflect.ownKeys(heroIconContent).forEach(key => {
			if (this.props.className === key) {
				returnstyles.backgroundImage = `url(/assets/images/${heroIconContent[key].image})`;
				if (activeHeroIcon === key) returnstyles.backgroundColor = heroIconContent[key].backgroundColor;
			}
		});
		return returnstyles;
	}

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
		setTimeout(() => this.props.fetchUpdateUrl(href), 1000);
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

		if (target === '_self') return <a className={css} ref={'icon'} href={voidHREF} onClick={updateHREF} rel={rel} onMouseOver={ovr} onMouseOut={out} style={style} />;
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
	updateUrl: state.updateUrl
});


export default connect(mapStateToProps, {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem,
	fetchSiteAnimating,
	fetchUpdateUrl
})(HeroIcon);
