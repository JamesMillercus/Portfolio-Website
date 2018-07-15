import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchActiveHeroIcon } from './../../../../../actions';
import './assets/scss/HeroIcons.scss';
import './assets/scss/HeroIconAnimation.scss';
import './assets/images/github.jpg';
import './assets/images/instagram.jpg';
import './assets/images/linkedIn.jpg';
import './assets/images/mail.jpg';
import './assets/images/pinterest.jpg';

class HeroIcon extends Component {

	setClass() {
		const iconClasses = [this.props.className, 'icon'];
		if (this.props.revealIcons) iconClasses.push('active');
		return iconClasses.join(' ');
	}

	activateHero(className) {
		this.props.fetchActiveHeroIcon(className);
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
	activeHeroIcon: state.activeHeroIcon
});


export default connect(mapStateToProps, { fetchActiveHeroIcon })(HeroIcon);
