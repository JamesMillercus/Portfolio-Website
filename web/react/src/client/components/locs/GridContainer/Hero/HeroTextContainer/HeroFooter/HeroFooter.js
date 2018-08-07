import React from 'react';
import heroFooterConfig from './assets/config/heroFooterConfig.js';
import './assets/scss';

const HeroFooter = ({ activeHero, scrolledItem, deviceType, allowedAnimation }) => {
  const setClass = (heroTextClass) => {
		const iconClasses = [heroTextClass];
		if (scrolledItem === 4 && deviceType === 'laptop') {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	};

  const heroFooter = (activeHeroText, selectedItem) => {
    if (selectedItem === 4) {
      if (allowedAnimation) return updateHero(activeHeroText, selectedItem);
      return updateHero('none', null);
    }
    return updateHero(activeHeroText, selectedItem);
	};

  const updateHero = (activeHeroText, selectedItem) => {
    let returntext;
    Reflect.ownKeys(heroFooterConfig).forEach(key => {
      if (selectedItem === 4 || selectedItem === null) {
        if (activeHeroText === key) {
          returntext = heroFooterConfig[key];
        }
      } else if (`item${selectedItem}` === key) {
        returntext = heroFooterConfig[key];
      }
    });
    return returntext;
  };

	return <p className={setClass('heroFooterText')}> {heroFooter(activeHero, scrolledItem)} </p>;
};

export default HeroFooter;
