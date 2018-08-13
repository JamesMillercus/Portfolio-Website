import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
	fetchActiveHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation
} from './../../../../../actions';
import './assets/scss';
import './assets/images';

class HeroIcon extends Component {

	componentDidUpdate() {
		const elem = this.refs.icon;
		this.icon = window.getComputedStyle(elem).getPropertyValue('opacity');
		if (this.icon > 0 && this.icon < 0.5) this.props.fetchHeroTextAnimation(false);
		else this.props.fetchHeroTextAnimation(true);
	}

	setClass() {
		const iconClasses = [`${this.props.className}`, 'icon'];
		if (this.props.revealIcons) iconClasses.push('active');
		return iconClasses.join(' ');
	}

	activateHero(className) {
		if (this.props.deviceType === 'laptop') this.props.fetchActiveHeroIcon(className);
	}

	checkTarget() {
		if (this.props.className === 'topLeftIcon') return '_self';
		return '_blank';
	}

	render() {
		const href = this.props.href;
		const rel = 'noreferrer noopener';
		const ovr = this.activateHero.bind(this, this.props.className);
		const out = this.activateHero.bind(this, 'none');
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
	deviceType: state.deviceType,
	scrolledItem: state.scrolledItem
});


export default connect(mapStateToProps, {
	fetchActiveHeroIcon,
	fetchDeviceType,
	fetchHeroTextAnimation
})(HeroIcon);
