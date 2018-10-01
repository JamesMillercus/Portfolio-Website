import React, { Component } from 'react';
import HeroText from './HeroText/HeroText';
import HeroFooter from './HeroFooter/HeroFooter';
import './assets/scss';

class HeroTextContainer extends Component {

	render() {
		return (
			<div className={'heroTextContainer'}>
				<HeroText />
				<HeroFooter />
			</div>
		);
	}
}

export default HeroTextContainer;
