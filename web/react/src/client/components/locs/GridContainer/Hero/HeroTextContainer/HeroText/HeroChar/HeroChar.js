import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentChars } from './../../../../../../../actions';

class HeroChar extends Component {

  /* to do
    1. pass style from heroText into heroChar (make sure the styles of the text do not change on state change)
    2. rename heroChar to heroChars
    3. create a function that adds an animate out animation class
    4. create a function that reads ths opacity of the animated element
    5. when the animated element is at 0, animate in the new chars and update the state
  */
  componentDidUpdate() {
    // setTimeout(() => this.animateChars(), 2000);
    // console.log('charLoader');
    // console.log(this.props.charLoader.length);
    // console.log('currentChars');
    // console.log(this.props.currentChars);
    if (!this.arraysEqual(this.props.currentChars, this.props.charLoader)) {
      if (this.props.charLoader.length > 0) this.animateChars();
      else this.updateState(['j', 'm']);
    }
  }


  // check the character for a space
  setClass() {
    const heroCharClass = ['herotext start'];
    if (this.props.char === ' ') heroCharClass.push('space');
    return heroCharClass;
	}

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--;) if (arr1[i] !== arr2[i]) return false;
    return true;
  }

  animateChars() {
    // if the current char !== to the char in the char loader
    const currentChar = this.props.currentChars;
    const currentCharUpdated = this.props.charLoader;

    // if (this.props.charArr !== this.props.charLoader) {
      console.log('beginning animation');
      console.log('currentChar');
      console.log(currentChar);
      console.log('currentCharUpdated');
      console.log(currentCharUpdated);
      if (!this.arraysEqual(currentChar, currentCharUpdated)) {
        console.log('end animation');
        const that = this;
        setTimeout(() => { that.updateState(currentCharUpdated); }, 1000);
        // console.log('current char updated');
      }
    // }
  }

  updateState(charArr) {
    // console.log('update char');
    // console.log(this.props.charLoader);
    this.props.fetchCurrentChars(charArr);
  }

  render() {
    // create newchar which is hidden above current char with 0 opacity
    const currentChar = this.props.chars;
    // console.log('currentChar');
    // console.log(currentChar);
    return (
      <span className={this.setClass().join(' ')}>
        { currentChar }
      </span>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	charLoader: state.charLoader,
  currentChars: state.currentChars
});

export default connect(mapStateToProps, { fetchCurrentChars })(HeroChar);
