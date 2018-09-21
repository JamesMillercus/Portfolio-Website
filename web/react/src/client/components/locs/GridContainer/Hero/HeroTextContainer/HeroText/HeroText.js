import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCharLoader, fetchSiteAnimating } from './../../../../../../actions';
import HeroTextChars from './HeroTextChars/HeroTextChars';
import './assets/scss';

class HeroText extends Component {

  componentDidUpdate() {
    const deviceType = this.props.deviceType;
      if (deviceType === 'laptop') {
        this.prepCharLoader(this.props.activeHeroIcon, this.props.scrolledItem);
      }
  }

  setClass() {
    const selectedItem = this.props.scrolledItem;
    // style of text based on content
    const heroCharClass = [];
    if (this.props.siteAnimating === 'notAnimated') {
      heroCharClass.push('hideLogo');
    } else if (this.props.siteAnimating === 'finishedAnimating') {
      if (selectedItem === 4 && selectedItem !== null) heroCharClass.push('centerIcon');
    }

    return heroCharClass.join(' ');
	}

  getChar(activeHeroText, selectedItem) {
    // loop through each key within heroTextConfig
    const heroTextContent = this.props.content.heroText;
    const siteAnimating = this.props.siteAnimating;
    let returnedCharArr;
    if (siteAnimating !== 'finishedAnimating') returnedCharArr = heroTextContent.none.text;
    else if (siteAnimating === 'finishedAnimating') {
      if (selectedItem === 4) {
        returnedCharArr = heroTextContent.centerIcon.text;
      } else returnedCharArr = heroTextContent.none.text;
    }
    return returnedCharArr;
  }

  getStyle() {
    const heroTextStyle = this.props.content.heroText;
    const selectedItem = this.props.scrolledItem;
    const deviceType = this.props.deviceType;
    const style = {};
    if (selectedItem === 4 && !this.checkAnimationState()) {
      style.backgroundColor = heroTextStyle.centerIcon.backgroundColor;
      style.backgroundImage = `url(/assets/images/${heroTextStyle.centerIcon.backgroundImage})`;
    } else if (deviceType === 'laptop') style.backgroundColor = heroTextStyle.none.backgroundColor;
    return style;
	}

  checkAnimationState() {
    const siteAnimating = this.props.siteAnimating;
    if (siteAnimating !== 'finishedAnimating') return true;
    return false;
  }

  prepCharLoader(activeHeroText, selectedItem) {
    // if hero area is scrolled over
    if (selectedItem === 4) {
      // if icon animation is allowed return the updated herotext
      this.updateCharLoader(activeHeroText, selectedItem);
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
    return <h1 className={this.setClass()} style={this.getStyle()}> { this.heroText() } </h1>;
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	deviceType: state.deviceType,
	heroTextAnimation: state.heroTextAnimation,
	currentChars: state.currentChars,
  siteAnimating: state.siteAnimating,
  content: state.content
});

export default connect(mapStateToProps, { fetchCharLoader, fetchSiteAnimating })(HeroText);
