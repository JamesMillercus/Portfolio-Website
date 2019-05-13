import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVrInstructions } from './../../../../actions';
import instructionsConfig from './assets/config/instructionsConfig';
import './assets/scss';
import './assets/images';

class Instructions extends Component {
  /*
    1. Test on tablet
    2. Test on oculus rift and windows headset
    3. Create content for each screen layout
  */

  constructor(props) {
    super(props);
    this.state = {
      pageHref: null,
      touchDevice: false
    };
  }

  componentDidMount() {
    this.setState({ pageHref: window.location.pathname });
    // if (('ontouchstart' in window)) {
    //   this.setState({ touchDevice: true });
    // }
  }

  displayInstructions() {
    const { vrInstructions, webMode, deviceType } = this.props;
    // if (deviceType === 'laptop' || deviceType === 'tablet' && this.state.touchDevice || deviceType === 'mobile' && this.state.touchDevice) {
    // }
    if (vrInstructions) return 2;
    return 0;
  }

  whiteOutZindex() {
    if (this.props.vrInstructions) return 1;
    return 0;
  }

  whiteOutOpacity() {
    if (this.props.vrInstructions) return 0.8;
    return 0;
  }

  clickedInstruction() {
    this.props.fetchVrInstructions(false);
  }

  instructions() {
    const { deviceType, browser, browserName } = this.props;
    const returnedInstructions = [];
    // loop through instruction page type
    // if(browserName === 'Oculus Browser' || browserName === undefined) {
    //   let instructionNumber = instructionsConfig[instructionsConfig.length-1];
    //   returnedInstructions.push(
    //     <div className={`instruction instruction${instructionNumber}`}>
    //     <div className="instructionText">
    //     <h2> {instructionNumber.instructions[0].header} </h2>
    //     <p> {instructionNumber.instructions[0].paragraph} </p>
    //     </div>
    //     <div className="instructionImage" />
    //     </div>
    //   );
    // } else {
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
            <div className="instructionImage" style={this.instructionsStyle(instructionsConfig[x].instructions[y].image)} />
            </div>
          );
        }
      }
    }
    // }

    return returnedInstructions;
  }

  instructionsStyle(image) {
    return {
      backgroundImage: `url(/assets/images/${image})`
    }
  }

  instructionsButton(deviceType) {
    if (deviceType !== 'laptop') return 'Tap to continue';
    return 'Click to continue';
  }

  render() {
    const { deviceType } = this.props;
    const click = () => this.clickedInstruction();

    return (
      <div>
        <div className={`${deviceType}InstructionsContainer`} style={{ zIndex: this.displayInstructions() }} onClick={ click }>
          <div className={`${deviceType}Instructions`}>
            {this.instructions()}
            <div className="instructionsButton"> <p> {this.instructionsButton(deviceType)} </p> </div>
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
    deviceType: state.deviceType,
    browser: state.browser
  };
}

export default connect(mapStateToProps, { fetchVrInstructions })(Instructions);
