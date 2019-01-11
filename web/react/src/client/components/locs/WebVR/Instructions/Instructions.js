import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVrInstructions } from './../../../../actions';
import './assets/scss';

class Instructions extends Component {
  /*
    1. Design layout of instruction page
    2. Instruction page content is pulled from config file
  */

  displayInstructions() {
    if (this.props.vrInstructions) return 'block';
    return 'none';
  }

  clickedInstruction() {
    this.props.fetchVrInstructions(false);
  }

  render() {
    const divStyle = {
      display: this.displayInstructions()
    };
    const click = () => this.clickedInstruction();

    return (
      <div className="instructions" style={divStyle}>
        <h1> Instructions </h1>
        <div className="instructionOne">
          <div className="instructionImage" />
          <div className="instructionText">
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel ante velit. Nulla ut dignissim purus. Duis fermentum non odio sit amet rutrum. Integer nec lacus rhoncus, rhoncus magna sit amet, lacinia ex. Maecenas efficitur velit non suscipit accumsan. Integer iaculis fringilla elementum. </p>
          </div>
        </div>
        <div className="instructionsButton" onClick={click}> <p> Click to continue </p> </div>
      </div>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    vrInstructions: state.vrInstructions
  };
}

export default connect(mapStateToProps, { fetchVrInstructions })(Instructions);
