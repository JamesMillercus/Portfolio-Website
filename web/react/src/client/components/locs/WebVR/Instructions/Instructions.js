import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVrInstructions } from './../../../../actions';
import instructionsConfig from './assets/config/instructionsConfig';
import './assets/scss';

class Instructions extends Component {
  /*
    1. Design layout of instruction page
    2. Instruction page content is pulled from config file
  */

  constructor(props) {
    super(props);
    this.state = {
      pageHref: null
    };
  }

  componentDidMount() {
    this.setState({ pageHref: window.location.pathname });
  }

  displayInstructions() {
    if (this.props.vrInstructions) return 2;
    return 0;
  }

  whiteOutZindex() {
    if (this.props.vrInstructions) return 1;
    return 0;
  }

  whiteOutOpacity() {
    if (this.props.vrInstructions) return 0.5;
    return 0;
  }

  clickedInstruction() {
    this.props.fetchVrInstructions(false);
  }

  instructions() {
    const { deviceType } = this.props;
    const returnedInstructions = [];
    // loop through instruction page type
    // return content[0].device;
    for (let x = 0; x < instructionsConfig.length; x++) {
      if (this.state.pageHref === instructionsConfig[x].page && deviceType === instructionsConfig[x].device) {
        // loop through each instruction for that page type
        for (let y = 0; y < instructionsConfig[x].instructions.length; y++) {
          const instructionNumber = y + 1;
          returnedInstructions.push(
            <div className={`instruction instruction${instructionNumber}`}>
              <div className="instructionText">
                <h2> {instructionsConfig[x].instructions[y].header} </h2>
                <p> {instructionsConfig[x].instructions[y].paragraph} </p>
              </div>
              <div className="instructionImage" />
            </div>
          );
        }
      }
    }
    return returnedInstructions;
  }

  render() {
    const { deviceType } = this.props;
    const click = () => this.clickedInstruction();

    return (
      <div>
        <div className={`${deviceType}InstructionsContainer`} style={{ zIndex: this.displayInstructions() }}>
          <div className={`${deviceType}Instructions`}>
            {this.instructions()}
            <div className="instructionsButton" onClick={click}> <p> Click to continue </p> </div>
          </div>
        </div>
        <div className={'webvrWhiteout'} style={{ opacity: this.whiteOutOpacity(), zIndex: this.whiteOutZindex() }} />
      </div>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    vrInstructions: state.vrInstructions,
    webMode: state.webMode,
    deviceType: state.deviceType
  };
}

export default connect(mapStateToProps, { fetchVrInstructions })(Instructions);
