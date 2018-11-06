import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchCharLoader, fetchSiteAnimating, fetchScrolledHeroIcon, fetchUpdateUrl } from './../../../../../../actions';
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
    const { scrolledItem, deviceType, scrolledHeroIcon, content } = this.props;
    const heroTextStyle = content.heroText;
    const webvr = heroTextStyle.centerIcon.scrollableHeroIcon;
    const webvrBackground = heroTextStyle.centerIcon.scrolledBackgroundImage;
    const style = {};

    if (scrolledItem === 4 && !this.checkAnimationState()) {
      style.backgroundColor = heroTextStyle.centerIcon.backgroundColor;
      style.backgroundImage = `url(/assets/images/${heroTextStyle.centerIcon.backgroundImage})`;
      if (scrolledHeroIcon === webvr) {
        style.backgroundImage = `url(/assets/images/${webvrBackground})`;
      }
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

  updateHref(href) {
    const { fetchSiteAnimating, fetchUpdateUrl } = this.props;
    console.log(href);
		fetchSiteAnimating('changingPage');
		setTimeout(() => { fetchUpdateUrl(href); }, 1000);
	}

  scroll(icon) {
    const { fetchScrolledHeroIcon } = this.props;
    if (icon !== undefined) fetchScrolledHeroIcon(icon);
  }

  // h1 with css style based on the selected item and icon
  render() {
    const { content, updateUrl } = this.props;
    const href = content.heroText.centerIcon.href;
    const scrollOver = () => this.scroll(content.heroText.centerIcon.scrollableHeroIcon);
    const scrollOut = () => this.scroll('none');
    const click = () => this.updateHref(href);
    if (updateUrl === href) return <Redirect push to={href} />;
    return <h1 className={this.setClass()} style={this.getStyle()} onMouseOver={scrollOver} onMouseOut={scrollOut} onClick={click}> { this.heroText() } </h1>;
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
  scrolledHeroIcon: state.scrolledHeroIcon,
	scrolledItem: state.scrolledItem,
	deviceType: state.deviceType,
	heroTextAnimation: state.heroTextAnimation,
	currentChars: state.currentChars,
  siteAnimating: state.siteAnimating,
  content: state.content,
  updateUrl: state.updateUrl
});

export default connect(mapStateToProps, { fetchCharLoader, fetchSiteAnimating, fetchScrolledHeroIcon, fetchUpdateUrl })(HeroText);
