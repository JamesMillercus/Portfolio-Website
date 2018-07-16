import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchDeviceType } from './../../../actions';
import Item from './Item/Item';
import Hero from './Hero/Hero';
import Video from './Video/Video';
import './assets/scss';

class GridContainer extends Component {

  setClass() {
    // console.log(this.props.deviceType);
    /* include deviceType into the class name of:
      - GridContainer (LAPTOP DONE, NEED TABLET + MOBILE STYLING)
      - HeroIcon (LAPTOP DONE, PREVENTED HERO TEXT UPDATING)
      - HeroText
      - Rename Item to ItemContainer (Create child called ItemText and move code to there)
      - then include ItemText there
    */
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
      else items.push(<Item number={x} key={x} />);
    }
    items.push(<Video key={9} />);
    return items;
  }

  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
        <div className={this.setClass().join(' ')}>
          {this.renderItems()}
        </div>
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    scrolledItem: state.scrolledItem,
    deviceType: state.deviceType
  };
}

export default connect(mapStateToProps, { fetchScrolledItem, fetchDeviceType })(GridContainer);
