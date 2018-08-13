import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchDeviceType, fetchBackgroundPos } from './../../../actions';
import ItemContainer from './ItemContainer/ItemContainer';
import Hero from './Hero/Hero';
import Video from './Video/Video';
import './assets/scss';

class GridContainer extends Component {

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  onMouseMove(e) {
    const elem = this.refs.background;

    const backgroundX = window.getComputedStyle(elem).getPropertyValue('margin-left');
    const backgroundY = window.getComputedStyle(elem).getPropertyValue('margin-top');
    const background = { x: backgroundX, y: backgroundY };
    // console.log('background pos y');
    // console.log(background.y);

    const lMouseX = ((window.innerWidth * 1.24) / 2) - e.screenX;
    const lMouseY = ((window.innerHeight * 1.15) / 2) - e.screenY;
    const mouse = { x: lMouseX, y: lMouseY };

    this.calcBackgroundMovement(mouse, background);
  }

  calcBackgroundMovement(mousePos, backgroundPos) {
    const x = parseInt(((parseInt(mousePos.x) - window.innerWidth) + parseInt(backgroundPos.x)) * 0.25);
    const y = parseInt(((parseInt(mousePos.y) - window.innerHeight) + parseInt(backgroundPos.y)) * 0.046);
    const background = { x, y };
    this.backgroundMovement(background);
  }

  backgroundMovement(background) {
    let posX,
    posY;
    // console.log(this.props.scrolledItem);
    if (this.props.scrolledItem == 1) {
      console.log(background.y);
      posY = background.y * 0.01;
      console.log(posY);
      posX = background.x;
    } else {
      posX = background.x;
      posY = background.y;
    }
    const backgroundPos = { x: posX, y: posY };
    this.props.fetchBackgroundPos(backgroundPos);
  }

  setClass() {
    const deviceType = this.props.deviceType;
    const gridContainerClasses = [`grid-container-${deviceType}`];
    if (deviceType === 'laptop') gridContainerClasses.push(`item${this.props.scrolledItem}scroll`);
    return gridContainerClasses;
  }

  renderItems() {
    const items = [];
    // push all content into the items array
    for (let x = 0; x < 9; x++) {
      if (x === 4) items.push(<Hero number={x} key={x} />);
      else items.push(<ItemContainer number={x} key={x} />);
    }
    items.push(<Video key={9} />);
    return items;
  }


  render() {
    const divStyle = {
      marginLeft: `${this.props.backgroundPos.x}px`,
      marginTop: `${this.props.backgroundPos.y}px`
    };
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
        <div className={this.setClass().join(' ')} ref={'background'} onMouseMove={this.onMouseMove.bind(this)} style={divStyle}>
          {this.renderItems()}
        </div>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    scrolledItem: state.scrolledItem,
    deviceType: state.deviceType,
    backgroundPos: state.backgroundPos
  };
}

export default connect(mapStateToProps, {
  fetchScrolledItem,
  fetchDeviceType,
  fetchBackgroundPos
})(GridContainer);
