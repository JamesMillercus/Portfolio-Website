import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentChars } from './../../../../../../../actions';

class HeroChar extends Component {

  /* to do
    1. Make the chars update 1 by one (currently they all update at once)
      - each char needs to know if it has been updated (from beginning to end)
      - once that char has updated, that enables the following char to update
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
    const number = this.props.number;
    const currentChar = this.props.charArr[number];
    const newChar = this.props.charLoader[number];
    // console.log(`current char = ${currentChar}`);
    // console.log(`new char = ${newChar}`);

    // // do animation logic here
    /*
      create if statement with number variable to make sure characters are updating in chronological order
      set updateState at the end of each char update to see it change per char
    */

    // on end of animation logic update char loader
    if (currentChar !== newChar) {
      setTimeout(this.updateState.bind(this), 2000);
    }
  }

  updateState() {
    this.props.fetchCurrentChars(this.props.charLoader);
  }

  render() {
    // create newchar which is hidden above current char with 0 opacity
    const currentChar = this.props.charArr[this.props.number];
    return (
      <span key={this.props.number} className={this.setClass().join(' ')}>
        { currentChar }
      </span>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	charLoader: state.charLoader
});

export default connect(mapStateToProps, { fetchCurrentChars })(HeroChar);
