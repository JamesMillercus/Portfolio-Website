import React from 'react';
import heroHeaderConfig from './assets/config/heroHeaderConfig.js';
import './assets/scss';

const HeroHeader = ({ activeHero, scrolledItem, deviceType }) => {
  const setClass = (heroTextClass) => {
		const iconClasses = [heroTextClass];
		if (scrolledItem === 4 && deviceType === 'laptop') {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	};

  const heroHeader = (activeHeroText) => {
		let returntext;
		Reflect.ownKeys(heroHeaderConfig).forEach(key => {
			if (activeHeroText === key) {
				returntext = heroHeaderConfig[key];
			}
		});
		return returntext;
	};

	return <p className={setClass('heroHeaderText')}> {heroHeader(activeHero)} </p>;
};

export default HeroHeader;
