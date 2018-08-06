import React from 'react';
import heroFooterConfig from './assets/config/heroFooterConfig.js';
import './assets/scss';

const HeroFooter = ({ activeHero, scrolledItem, deviceType }) => {
  const setClass = (heroTextClass) => {
		const iconClasses = [heroTextClass];
		if (scrolledItem === 4 && deviceType === 'laptop') {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	};

  const heroFooter = (activeHeroText) => {
		let returntext;
		Reflect.ownKeys(heroFooterConfig).forEach(key => {
			if (activeHeroText === key) {
				returntext = heroFooterConfig[key];
			}
		});
		return returntext;
	};

	return <p className={setClass('heroFooterText')}> {heroFooter(activeHero)} </p>;
};

export default HeroFooter;
