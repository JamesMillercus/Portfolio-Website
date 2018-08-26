import React, { Component } from 'react';
import { connect } from 'react-redux';
import './assets/scss';

class HeroSubChars extends Component {

  componentDidUpdate() {
    if (this.props.currentChars !== this.props.charLoader) this.animateChars();
  }

  setClass(heroTextClass) {
    const currentChars = this.props.currentChars;
    const charLoader = this.props.charLoader;
    const scrolledItem = this.props.scrolledItem;
    const deviceType = this.props.deviceType;
		const iconClasses = [heroTextClass];
    if (this.props.navBarRevealed) iconClasses.push('designSubText');
		if (scrolledItem === 4 && deviceType === 'laptop') iconClasses.push('reveal');
    // animation state
    if (currentChars !== charLoader) iconClasses.push('animateOldSubCharsOut');
    else iconClasses.push('animateNewSubCharsIn');
		return iconClasses.join(' ');
	}

  animateChars() {
    const currentCharUpdated = this.props.charLoader;
    // const opacityValue = window.getComputedStyle(this.refs.animate).getPropertyValue('opacity');
    const that = this;
    setTimeout(() => { that.updateState(currentCharUpdated); }, 100);
  }

  updateState(charArr) {
    this.props.fetchCurrentChars(charArr);
  }

  render() {
    return (
      <p className={this.setClass(this.props.heroTextStyle)}>
        {this.props.currentChars}
      </p>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	deviceType: state.deviceType,
  navBarRevealed: state.navBarRevealed
});

export default connect(mapStateToProps, null)(HeroSubChars);
