import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchActiveHeroIcon, fetchDeviceType } from './../../../../../actions';
import './assets/scss';
import './assets/images';

class HeroIcon extends Component {

	setClass() {
		const iconClasses = [`${this.props.className}-${this.props.deviceType}`, 'icon'];
		if (this.props.revealIcons) iconClasses.push('active');
		return iconClasses.join(' ');
	}

	activateHero(className) {
		if (this.props.deviceType === 'laptop') this.props.fetchActiveHeroIcon(className);
	}

	render() {
		const href = this.props.href;
		const rel = 'noreferrer noopener';
		const ovr = this.activateHero.bind(this, this.props.className);
		const out = this.activateHero.bind(this, 'none');
		const css = this.setClass();
		return (
			<a className={css} href={href} target='_blank' rel={rel} onMouseOver={ovr} onMouseOut={out} />
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	deviceType: state.deviceType
});


export default connect(mapStateToProps, { fetchActiveHeroIcon, fetchDeviceType })(HeroIcon);
