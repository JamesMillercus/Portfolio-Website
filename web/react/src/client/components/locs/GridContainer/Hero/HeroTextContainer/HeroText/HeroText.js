import React from 'react';
import heroTextConfig from './assets/config/heroTextConfig.js';
import './assets/scss';

const HeroText = ({ activeHero, scrolledItem, deviceType }) => {
  const setHeroStyle = (selectedIcon, selectedItem) => {
    // const element = document.getElementByC("slidingMenu");
		//   element.addEventListener("transitionend", function(event) {
		//   element.innerHTML = "Done!";
		// }, false);

		if (selectedItem === null) return 'heroLogo';
		if (selectedIcon === 'none' && selectedItem === 4) return 'heroLogo';
    else if (selectedIcon === 'topLeftIcon') return 'heroEmailText';
		return 'heroIconText';
	};

  const heroText = (activeHeroText, selectedItem) => {
		let returntext;
		Reflect.ownKeys(heroTextConfig).forEach(key => {
			if (selectedItem === 4 || selectedItem === null) {
				if (activeHeroText === key) {
					returntext = heroTextConfig[confirmLaptop(key)].map((character, index) => (
						checkCharacter(character, index)
					));
				}
			} else if (`item${selectedItem}` === key) {
				returntext = heroTextConfig[confirmLaptop(key)].map((character, index) => (
					checkCharacter(character, index)
				));
			}
		});
		return returntext;
	};

  const checkCharacter = (character, index) => {
		if (character === ' ') {
			return <span key={index} className="herotext start space"> {character} </span>;
		}
		return <span key={index} className="herotext start"> {character} </span>;
	};

  const confirmLaptop = (key) => {
		let newKey;
		if (deviceType !== 'laptop') newKey = 'none';
		else newKey = key;
		return newKey;
	};

  return (
    <h1 className={setHeroStyle(activeHero, scrolledItem)}>
      { heroText(activeHero, scrolledItem) }
    </h1>
  );
};

export default HeroText;
