import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActiveHeroIcon, fetchScrolledItem } from './../../../../../actions';
import heroTextConfig from './assets/config/heroTextConfig.js';
import './assets/scss/HeroText.scss';
import './assets/scss/HeroTextAnimation.scss';

class HeroText extends Component {

	setClass(heroTextClass) {
		const iconClasses = [heroTextClass];
		if (this.props.scrolledItem === 4) {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	}

	heroHeader(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (activeHeroText === key) returntext = heroTextConfig[key].header;
		});
		return returntext;
	}

	heroParagraph(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (activeHeroText === key) {
				returntext = heroTextConfig[key].paragraph.map((character, index) => (
					<span key={index} className="herotext start"> {character} </span>)
				);
			}
		});
		return returntext;
	}

	heroFooter(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (activeHeroText === key) returntext = heroTextConfig[key].footer;
		});
		return returntext;
	}

	render() {
		const activeHero = this.props.activeHeroIcon;
		return (
			<div className="heroTextContainer">
				<p className={this.setClass('heroHeaderText')}> { this.heroHeader(activeHero) } </p>
				<h1> { this.heroParagraph(this.props.activeHeroIcon) } </h1>
				<p className={this.setClass('heroFooterText')}> { this.heroFooter(activeHero) } </p>
			</div>
		);
	}


}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		activeHeroIcon: state.activeHeroIcon,
		scrolledItem: state.scrolledItem
	});


export default connect(mapStateToProps, { fetchActiveHeroIcon, fetchScrolledItem })(HeroText);
