import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentChars, fetchScrolledItem } from './../../../../../../../actions';
import './assets/scss';

class HeroTextChars extends Component {

  componentDidUpdate() {
    // setTimeout(() => this.animateChars(), 2000);
    if (!this.arraysEqual(this.props.currentChars, this.props.charLoader)) {
      if (this.props.charLoader.length > 0) this.animateChars();
      else this.updateState(['j', 'm']);
    }
  }

  setClass() {
    // style of text based on content
    const heroCharClass = ['herotext start'];
    if (this.props.chars.length <= 2) heroCharClass.push('heroLogo');
    else if (this.props.chars.length > 2 && this.props.chars.length <= 15) {
      if (this.props.char === ' ') heroCharClass.push('space');
      heroCharClass.push('heroIconText');
    } else if (this.props.chars.length > 15) heroCharClass.push('heroEmailText');

    // animation state
    const currentChars = this.props.currentChars;
    const charsToLoad = this.props.charLoader;
    if (this.props.charLoader.length > 0) {
      if (!this.arraysEqual(currentChars, charsToLoad)) heroCharClass.push('animateOldCharsOut');
      else heroCharClass.push('animateNewCharsIn');
    }
    return heroCharClass;
	}

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--;) if (arr1[i] !== arr2[i]) return false;
    return true;
  }

  animateChars() {
    const currentCharUpdated = this.props.charLoader;
    // const opacityValue = window.getComputedStyle(this.refs.animate).getPropertyValue('opacity');
    const that = this;
    setTimeout(() => {
        that.updateState(currentCharUpdated);
    }, 150);
  }

  updateState(charArr) {
    this.props.fetchCurrentChars(charArr);
  }

  scrolledItem() {
    const deviceType = this.props.deviceType;
    if (deviceType === 'laptop') this.props.fetchScrolledItem(4);
  }

  render() {
    // create newchar which is hidden above current char with 0 opacity
    const currentChar = this.props.chars;
    const ovr = () => this.scrolledItem();
    return (
      <span ref={'animate'} className={this.setClass().join(' ')} onMouseOver={ovr}>
        { currentChar }
      </span>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	charLoader: state.charLoader,
  currentChars: state.currentChars,
  deviceType: state.deviceType
});

export default connect(mapStateToProps, {
  fetchCurrentChars,
  fetchScrolledItem
})(HeroTextChars);
