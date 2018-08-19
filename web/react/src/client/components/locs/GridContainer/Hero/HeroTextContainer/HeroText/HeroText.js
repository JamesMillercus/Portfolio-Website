import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroTextConfig from './assets/config/heroTextConfig.js';
import { fetchCharLoader } from './../../../../../../actions';
import HeroChar from './HeroChar/HeroChar';
import './assets/scss';

class HeroText extends Component {

  componentDidUpdate() {
    this.prepCharLoader(this.props.activeHeroIcon, this.props.scrolledItem);
  }

  getChar(activeHeroText, selectedItem) {
    // loop through each key within heroTextConfig
    let returnedCharArr;
    Reflect.ownKeys(heroTextConfig).forEach(key => {
      // if scrolled over 4, or the page has just loaded
      if (selectedItem === 4 || selectedItem === null) {
        // if the scrolled over icon (or none for logo) === key
        if (activeHeroText === key) {
          returnedCharArr = heroTextConfig[key];
        }
        // else if scrolled over an item
      } else if (`item${selectedItem}` === key) {
        returnedCharArr = heroTextConfig[key];
      }
    });
    return returnedCharArr;
  }

  setHeroStyle(selectedIcon, selectedItem) {
    if (selectedItem === null) return 'heroLogo';
    if (selectedIcon === 'none' && selectedItem === 4) return 'heroLogo';
    if (this.props.heroTextAnimation || selectedItem !== 4) {
      if (selectedIcon === 'topLeftIcon') return 'heroEmailText';
      return 'heroIconText';
    }
    return 'heroLogo';
  }

  prepCharLoader(activeHeroText, selectedItem) {
    // if hero area is scrolled over
    if (selectedItem === 4) {
      // if icon animation is allowed return the updated herotext
      if (this.props.heroTextAnimation) this.updateCharLoader(activeHeroText, selectedItem);
      // else return the hero logo
      else this.updateCharLoader('none', null);
      // else update hero text based on scrolled item
    } else this.updateCharLoader(activeHeroText, selectedItem);
  }

  updateCharLoader(activeHeroText, selectedItem) {
    const heroChar = this.getChar(activeHeroText, selectedItem);
    const heroCharsArr = [];
    // push all content into the items array
    for (let x = 0; x < heroChar.length; x++) heroCharsArr.push(heroChar[x]);
    this.props.fetchCharLoader(heroCharsArr);
  }

  // update the hero text based on what has been scrolled over
  heroText() {
    const heroCharsArr = [];
    // push all content into the items array
    for (let x = 0; x < this.props.currentChars.length; x++) {
      heroCharsArr.push(<HeroChar number={x} key={x} char={this.props.currentChars[x]} />);
    }
    // return this.updateChar(activeHeroText, selectedItem).charLoader;
    return heroCharsArr;
  }

  render() {
    return (
      // h1 with css style based on the selected item and icon
      <h1 className={this.setHeroStyle(this.props.activeHeroIcon, this.props.scrolledItem)}>
        { // display hero text based on selected item and icon
          this.heroText()
        }
      </h1>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	deviceType: state.deviceType,
	heroTextAnimation: state.heroTextAnimation,
	currentChars: state.currentChars
});

export default connect(mapStateToProps, { fetchCharLoader })(HeroText);
