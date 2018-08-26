import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroTextConfig from './assets/config/heroTextConfig.js';
import { fetchCharLoader, fetchNavBarRevealed } from './../../../../../../actions';
import HeroTextChars from './HeroTextChars/HeroTextChars';
import './assets/scss';

/*
  1. update icon images
  2. update colours of scrolled texts
  3. make with of sub text 50%
  4. make hero logo animate bigger when hovered hover
*/

class HeroText extends Component {

  componentDidUpdate() {
    this.prepCharLoader(this.props.activeHeroIcon, this.props.scrolledItem);
  }

  setClass() {
    // style of text based on content
    const heroCharClass = [];
    if (this.props.navBarRevealed) heroCharClass.push('designIcon');
    else if (this.props.scrolledItem !== 4 && this.props.scrolledItem !== null) {
      heroCharClass.push('nonLogo');
    }
    return heroCharClass;
	}

  getChar(activeHeroText, selectedItem) {
    // loop through each key within heroTextConfig
    let returnedCharArr;
    Reflect.ownKeys(heroTextConfig).forEach(key => {
      // if scrolled over 4, or the page has just loaded
      // if (selectedItem === 4 || selectedItem === null) {
      if (selectedItem === 4 || selectedItem === null) {
        // if the scrolled over icon (or none for logo) === key
        if (activeHeroText === key) returnedCharArr = heroTextConfig[key];
        else if (this.props.navBarRevealed) returnedCharArr = [''];
        else returnedCharArr = heroTextConfig.none;
        // else if scrolled over an item
      } else if (`item${selectedItem}` === key) returnedCharArr = heroTextConfig[key];
    });
    return returnedCharArr;
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
      heroCharsArr.push(this.props.currentChars[x]);
    }
    // do animation of HeroChars within that component
    return <HeroTextChars chars={heroCharsArr} />;
  }

  // h1 with css style based on the selected item and icon
  render() {
    const click = this.props.fetchNavBarRevealed.bind(this, !this.props.navBarRevealed);

    return <h1 onClick={click} className={this.setClass().join(' ')}> { this.heroText() } </h1>;
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	deviceType: state.deviceType,
	heroTextAnimation: state.heroTextAnimation,
	currentChars: state.currentChars,
  navBarRevealed: state.navBarRevealed
});

export default connect(mapStateToProps, { fetchCharLoader, fetchNavBarRevealed })(HeroText);
