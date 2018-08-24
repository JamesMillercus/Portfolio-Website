import React, { Component } from 'react';
import HeroHeader from './HeroHeader/HeroHeader';
import HeroText from './HeroText/HeroText';
import HeroFooter from './HeroFooter/HeroFooter';
import './assets/scss';

class HeroTextContainer extends Component {

	render() {
		return (
			<div className={'heroTextContainer'}>
				<HeroHeader />
				<HeroText />
				<HeroFooter />
			</div>
		);
	}
}

export default HeroTextContainer;
