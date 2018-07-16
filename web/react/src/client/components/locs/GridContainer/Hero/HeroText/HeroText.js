import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActiveHeroIcon, fetchScrolledItem, fetchDeviceType } from './../../../../../actions';
import heroTextConfig from './assets/config/heroTextConfig.js';
import './assets/scss';

class HeroText extends Component {

	setClass(heroTextClass) {
		const iconClasses = [heroTextClass];
		if (this.props.scrolledItem === 4 && this.props.deviceType === 'laptop') {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	}

	heroHeader(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (activeHeroText === key) {
				returntext = heroTextConfig[key].header;
			}
		});
		return returntext;
	}

	heroParagraph(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (activeHeroText === key) {
				returntext = heroTextConfig[this.confirmLaptop(key)].paragraph.map((character, index) => (
					<span key={index} className="herotext start"> {character} </span>)
				);
			}
		});
		return returntext;
	}

	confirmLaptop(key) {
		let newKey;
		if (this.props.deviceType !== 'laptop') newKey = 'none';
		else newKey = key;
		return newKey;
	}

	heroFooter(activeHeroText) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
				if (activeHeroText === key) {
					returntext = heroTextConfig[key].footer;
				}
		});
		return returntext;
	}

	render() {
		const activeHero = this.props.activeHeroIcon;
		const device = this.props.deviceType;
		return (
			<div className={`heroTextContainer-${device}`}>
				<p className={this.setClass(`heroHeaderText-${device}`)}> {this.heroHeader(activeHero)} </p>
				<h1> { this.heroParagraph(activeHero) } </h1>
				<p className={this.setClass(`heroFooterText-${device}`)}> {this.heroFooter(activeHero)} </p>
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		activeHeroIcon: state.activeHeroIcon,
		scrolledItem: state.scrolledItem,
		deviceType: state.deviceType
	});

export default connect(mapStateToProps, {
	fetchActiveHeroIcon,
	fetchScrolledItem,
	fetchDeviceType
})(HeroText);
