import React from 'react';
import heroTextConfig from './assets/config/heroTextConfig.js';
import './assets/scss';

/*
1. updateHero
  - create updateChar DONE
  - if charLoader is returned from updateChar, then return animate css DONE
  - update currentChar reducer

2. updateChar
  - create and return the value of currentChar and charLoader DONE

3. currentChar
  - create a reducer which initial state is heroLogo
  - follow up state of currentChars in this reducer will be posted from updateHero

4. charLoader
  - create a reducer whose initial state is null
  - create and return a heroCharDetect function which gets the char from the config file
*/

const HeroText = ({ activeHero, scrolledItem, deviceType, allowedAnimation }) => {
  const setHeroStyle = (selectedIcon, selectedItem) => {
		if (selectedItem === null) return 'heroLogo';
		if (selectedIcon === 'none' && selectedItem === 4) return 'heroLogo';
    if (allowedAnimation || selectedItem !== 4) {
      if (selectedIcon === 'topLeftIcon') return 'heroEmailText';
      return 'heroIconText';
    }
    return 'heroLogo';
	};

  const heroText = (activeHeroText, selectedItem) => {
    // if hero area is scrolled over
    if (selectedItem === 4) {
      // if icon animation is allowed return the updated herotext
      if (allowedAnimation) return updateHero(activeHeroText, selectedItem);
      // else return the hero logo
      return updateHero('none', null);
    }
    // else update hero text based on scrolled item
    return updateHero(activeHeroText, selectedItem);
	};

  // update the hero text based on what has been scrolled over
  const updateHero = (activeHeroText, selectedItem) => {
    // if (updateChar(activeHeroText, selectedItem).charLoader) {
    //   // - if charLoader is returned from updateChar, then return animate css
    //   // - update currentChar reducer on animation conmplete
    // }
    // console.log(updateChar(activeHeroText, selectedItem).charLoader);
    console.log('test');
    return updateChar(activeHeroText, selectedItem).charLoader;
  };

  // returns the value of currentChar and the char that needs updating in the charLoader
  const updateChar = (activeHeroText, selectedItem) => (
    {
      charLoader: charLoader(activeHeroText, selectedItem),
      currentChar: currentChar()
    }
  );

  const currentChar = () => {
    //   - create a reducer which initial state is heroLogo
    //   - follow up state of currentChars in this reducer will be posted from updateHero

  };

  const charLoader = (activeHeroText, selectedItem) => {
    // loop through each key within heroTextConfig
      let returnedCharArr;
      Reflect.ownKeys(heroTextConfig).forEach(key => {
        // if scrolled over 4, or the page has just loaded
        if (selectedItem === 4 || selectedItem === null) {
          // if the scrolled over icon (or none for logo) === key
          if (activeHeroText === key) returnedCharArr = heroCharDetect(key);
          // else if scrolled over an item
        } else if (`item${selectedItem}` === key) returnedCharArr = heroCharDetect(key);
      });
      //   - create a reducer whose initial state is null
      //   - push the array of characters into the charLoader reducer
      console.log(returnedCharArr[0].props.children[1]);
      return returnedCharArr;
  };

  const heroCharDetect = (key) => {
    // console.log(key);
    // return the mapped value of each char into the returntext string
    const returnCharArr = heroTextConfig[confirmLaptop(key)].map((character, index) => (
      // check each char for space and create appropriate distance
      checkCharForSpace(character, index)
    ));
    return returnCharArr;
  };

  // check the character for a space
  const checkCharForSpace = (character, index) => {
    // if character is a space return appropriate css, otherwise return normal css
		if (character === ' ') return <span key={index} className="herotext start space"> {character} </span>;
		return <span key={index} className="herotext start"> {character} </span>;
	};

  // confirm this device is a laptop
  const confirmLaptop = (key) => {
		let newKey;
    // if device isn't a laptop only display the herologo
		if (deviceType !== 'laptop') newKey = 'none';
    // else display scrolled over item/icon content
		else newKey = key;
		return newKey;
	};

  return (
    // h1 with css style based on the selected item and icon
    <h1 className={setHeroStyle(activeHero, scrolledItem)}>
      { // display hero text based on selected item and icon
        // heroText(activeHero, scrolledItem)
        heroText(activeHero, scrolledItem)
      }
    </h1>
  );
};

export default HeroText;
