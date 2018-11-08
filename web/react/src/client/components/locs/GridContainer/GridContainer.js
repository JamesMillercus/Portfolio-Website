import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchScrolledItem,
  fetchDeviceType,
  fetchBackgroundPos,
  fetchSiteAnimating,
  fetchUpdateUrl
} from './../../../actions';
import ItemContainer from './ItemContainer/ItemContainer';
import Hero from './Hero/Hero';
import './assets/scss';

class GridContainer extends Component {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  componentWillMount() {
    const that = this;
    if (this.props.deviceType !== 'laptop') this.props.fetchSiteAnimating('finishedAnimating');
    else if (this.props.siteAnimating === 'notAnimated') {
      setTimeout(() => { that.props.fetchSiteAnimating('logoAnimating'); }, 500);
    }
  }

  componentDidUpdate() {
    if (this.props.deviceType === 'laptop') {
      const that = this;
      if (this.props.siteAnimating === 'logoAnimating') {
        setTimeout(() => that.props.fetchSiteAnimating('logoFinishedAnimating'), 200);
      } else if (this.props.siteAnimating === 'logoFinishedAnimating') {
        setTimeout(() => that.props.fetchSiteAnimating('startAnimating'), 100);
        setTimeout(() => that.props.fetchSiteAnimating('finishedAnimating'), 1000);
      } else if (this.props.siteAnimating === 'changingPage') {
        // animation back to logo
        setTimeout(() => {
          setTimeout(() => that.props.fetchSiteAnimating('logoAnimating'), 400);
        }, 500);
      }
    }
  }

  onMouseMove(e) {
    const yMouseAlign = 0.75;
    const xMouseAlign = 0.5;
    const lMouseX = (window.innerWidth * xMouseAlign) - e.screenX;
    const lMouseY = (window.innerHeight * yMouseAlign) - e.screenY;
    const mouse = { x: lMouseX, y: lMouseY };
    if (this.props.browser === 'Chrome') this.calcBackgroundMovement(mouse);
  }

  setClass() {
    const deviceType = this.props.deviceType;
    const gridContainerClasses = [`grid-container-${deviceType}`];
    if (deviceType === 'laptop') gridContainerClasses.push(`item${this.props.scrolledItem}scroll`);
    return gridContainerClasses;
  }

  calcBackgroundMovement(mousePos) {
    const speed = 0.1;
    const x = mousePos.x * speed;
    const y = mousePos.y * speed;
    const background = { x, y };
    if (this.props.deviceType === 'laptop' && this.props.siteAnimating === 'finishedAnimating') {
      this.props.fetchBackgroundPos(background);
    }
  }

  renderItems() {
    const items = [];
    // push all content into the items array
    for (let x = 0; x < 9; x++) {
      if (x === 4) items.push(<Hero number={x} key={x} />);
      else items.push(<ItemContainer number={x} key={x} />);
    }

    if (this.props.asyncVideoComponent !== null) {
      const Video = this.props.asyncVideoComponent;
      items.push(<Video key={9} />);
    }
    return items;
  }


  render() {
    const divStyle = {
      marginLeft: `${this.props.backgroundPos.x}px`,
      marginTop: `${this.props.backgroundPos.y}px`
    };
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
        <div className='mouseMovementContainer' onMouseMove={this.onMouseMove.bind(this)} style={divStyle}>
          <div className={this.setClass().join(' ')}>
            {this.renderItems()}
          </div>
        </div>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    scrolledItem: state.scrolledItem,
    deviceType: state.deviceType,
    backgroundPos: state.backgroundPos,
    siteAnimating: state.siteAnimating,
    browser: state.browser,
    updateUrl: state.updateUrl,
    urlRequest: state.urlRequest,
    asyncVideoComponent: state.asyncVideoComponent
  };
}

export default connect(mapStateToProps, {
  fetchScrolledItem,
  fetchDeviceType,
  fetchBackgroundPos,
  fetchSiteAnimating,
  fetchUpdateUrl
})(GridContainer);
