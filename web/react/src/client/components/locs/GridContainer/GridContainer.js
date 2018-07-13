import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserAgent } from '@quentin-sommer/react-useragent';
import { compose } from 'redux'
import { fetchScrolledItem, fetchDeviceType } from './../../../actions';
import Item from './Item/Item';
import Hero from './Hero/Hero';
import Video from './Video/Video';
import './assets/scss/gridContainer.scss';
import './assets/scss/gridContainerAnimation.scss';

class GridContainer extends Component {

  renderItems() {  
    const items = [];
    // push all content into the items array
    for(let x = 0; x<9; x++) {
      if (x == 4) items.push(<Hero number={x} key={x} />);
      else items.push(<Item number={x} key={x} />);
    }
      items.push(<Video key={9} />);
      return items;
  }

  setClass() {
    // console.log(this.props.deviceType);
    /* include deviceType into the class name of:
      - GridContainer
      - HeroIcon
      - HeroText
      - Rename Item to ItemContainer (Create child called ItemText and move code to there) then include in there
    */ 
    let gridContainerClasses = ["grid-container"];
    gridContainerClasses.push('item' + this.props.scrolledItem + 'scroll');
    return gridContainerClasses;
  }


  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (  
        <div className = {this.setClass().join(' ')}> 
          {this.renderItems()}
        </div>      
    )
  }
};

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return { 
    scrolledItem: state.scrolledItem,
    deviceType: state.deviceType
  };
}

export default connect(mapStateToProps, { fetchScrolledItem, fetchDeviceType })(GridContainer);