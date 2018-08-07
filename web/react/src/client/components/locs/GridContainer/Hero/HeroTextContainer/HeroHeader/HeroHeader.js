import React from 'react';
import heroHeaderConfig from './assets/config/heroHeaderConfig.js';
import './assets/scss';

const HeroHeader = ({ activeHero, scrolledItem, deviceType, allowedAnimation }) => {
  const setClass = (heroTextClass) => {
		const iconClasses = [heroTextClass];
		if (scrolledItem === 4 && deviceType === 'laptop') {
			iconClasses.push('reveal');
		}
		return iconClasses.join(' ');
	};

  const heroHeader = (activeHeroText, selectedItem) => {
    if (selectedItem === 4) {
      if (allowedAnimation) return updateHero(activeHeroText, selectedItem);
      return updateHero('none', null);
    }
    return updateHero(activeHeroText, selectedItem);
	};

  const updateHero = (activeHeroText, selectedItem) => {
    let returntext;
    Reflect.ownKeys(heroHeaderConfig).forEach(key => {
      if (selectedItem === 4 || selectedItem === null) {
        if (activeHeroText === key) {
          returntext = heroHeaderConfig[key];
        }
      } else if (`item${selectedItem}` === key) {
        returntext = heroHeaderConfig[key];
      }
    });
    return returntext;
  };

	return <p className={setClass('heroHeaderText')}> {heroHeader(activeHero, scrolledItem)} </p>;
};

export default HeroHeader;
