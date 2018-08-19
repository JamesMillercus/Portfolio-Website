import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentChars } from './../../../../../../../actions';

class HeroChar extends Component {

  /* to do
    1. Make the chars update 1 by one (currently they all update at once)
    2. Animate chars
  */
  componentDidUpdate() {
    this.animateChars();
  }

  // check the character for a space
  setClass() {
    const heroCharClass = ['herotext start'];
    if (this.props.char === ' ') heroCharClass.push('space');
    return heroCharClass;
	}

  animateChars() {
    // if the current char !== to the char in the char loader
    if (this.props.char !== this.props.charLoader[this.props.number]) {
      // do animation logic here

      // on end of animation logic update char loader
      this.props.fetchCurrentChars(this.props.charLoader);
    }
  }

  render() {
    return (
      // h1 with css style based on the selected item and icon
      <span key={this.props.number} className={this.setClass().join(' ')}>
        { // display hero text based on selected item and icon
          this.props.char
        }
      </span>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	charLoader: state.charLoader
});

export default connect(mapStateToProps, { fetchCurrentChars })(HeroChar);
