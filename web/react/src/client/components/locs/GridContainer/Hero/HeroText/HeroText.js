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

	setHeroStyle(selectedIcon, selectedItem) {
		console.log('selectedItem');
		console.log(selectedItem);
		if (selectedItem === null) return 'heroLogo';
		if (selectedIcon === 'none' && selectedItem === 4) return 'heroLogo';
		return 'heroIconText';
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

	checkCharacter(character, index) {
		if (character === ' ') {
			return <span key={index} className="herotext start space"> {character} </span>;
		}
		return <span key={index} className="herotext start"> {character} </span>;
	}

// detect if scrolled in zone 4
// if so then update icons as normal
// if not then update with new logic

	heroParagraph(activeHeroText, selectedItem) {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (selectedItem === 4 || selectedItem === null) {
				if (activeHeroText === key) {
					returntext = heroTextConfig[this.confirmLaptop(key)].paragraph.map((character, index) => (
						this.checkCharacter(character, index)
					));
				}
			} else if (`item${selectedItem}` === key) {
				returntext = heroTextConfig[this.confirmLaptop(key)].paragraph.map((character, index) => (
					this.checkCharacter(character, index)
				));
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
		const scrolledItem = this.props.scrolledItem;
		return (
			<div className={'heroTextContainer'}>
				<p className={this.setClass('heroHeaderText')}> {this.heroHeader(activeHero)} </p>
				<h1 className={this.setHeroStyle(activeHero, scrolledItem)}> { this.heroParagraph(activeHero, scrolledItem) } </h1>
				<p className={this.setClass('heroFooterText')}> {this.heroFooter(activeHero)} </p>
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
