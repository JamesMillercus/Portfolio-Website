/*eslint max-len: ["error", { "code": 200 }]*/

import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem
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
		if (this.props.className === 'centerLeftIcon') return '_self';
		return '_blank';
	}

	scrolledItem(scrolledItem, className) {
		const deviceType = this.props.deviceType;
		if (deviceType === 'laptop') {
			if (scrolledItem !== null) this.props.fetchScrolledItem(scrolledItem);
			this.props.fetchScrolledHeroIcon(className);
		}
	}

	render() {
		const href = this.props.href;
		const rel = 'noreferrer noopener';
		const ovr = () => this.scrolledItem(4, this.props.className);
		const out = () => this.scrolledItem(null, 'none');
		const css = this.setClass();
		const target = this.checkTarget();
		return (
			<a className={css} ref={'icon'} href={href} target={target} rel={rel} onMouseOver={ovr} onMouseOut={out} />
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledHeroIcon: state.scrolledHeroIcon,
	deviceType: state.deviceType,
	scrolledItem: state.scrolledItem
});


export default connect(mapStateToProps, {
	fetchActiveHeroIcon,
	fetchScrolledHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation,
	fetchScrolledItem
})(HeroIcon);
