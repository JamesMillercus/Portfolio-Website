import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchScrolledItem,
  fetchScrolledHeroIcon,
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

  componentDidMount() {
    document.addEventListener('keypress', this.keyPress.bind(this));
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
    const { scrolledItem, deviceType } = this.props;
    const gridContainerClasses = [`grid-container-${deviceType}`];
    if (deviceType === 'laptop') gridContainerClasses.push(`item${scrolledItem}scroll`);
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

  keyPress(event) {
    //  [0,1,2] if press down on 0, scrolledItem = 0 + 3 || if press left on 0, scrolledItem = 0 + 2
    //  [3,4,5]
    //  [6,7,8]
    const { scrolledItem, scrolledHeroIcon, activeItem, fetchScrolledItem, fetchScrolledHeroIcon } = this.props;
    // const menuScroll = [[1, 's'], [3, 'd'], [5, 'a'], [7, 'w'], [4, 'a'], [4, 'd']];
    let scrollNumber;
    const scrollToItem = (scrollToNumber) => fetchScrolledItem(this.scrollCalc(scrollToNumber, event.key, scrolledHeroIcon));
    // const scrollToHeroIcon = (scrollToIcon) => fetchScrolledHeroIcon(this.scrollCalc(scrollToIcon, event.key, scrolledHeroIcon)); // menu item scroll
    if (scrolledItem === null) scrollNumber = 4; // if scrolled item is in center or hasn't begun
    else scrollNumber = scrolledItem;
    // console.log(scrollNumber);
    // for (let x = 0; x < menuScroll.length; x++) {
    //   if (scrolledItem === menuScroll[x][0] && event.key === menuScroll[x][1]) {
    //     if (scrolledItem === menuScroll[0][0] && event.key === menuScroll[0][1]) scrollToItem(scrollNumber + 3);
    //     else if (scrolledItem === menuScroll[1][0] && event.key === menuScroll[1][1]) scrollToItem(scrollNumber + 1);
    //     else if (scrolledItem === menuScroll[2][0] && event.key === menuScroll[2][1]) scrollToItem(scrollNumber - 1);
    //     else if (scrolledItem === menuScroll[3][0] && event.key === menuScroll[3][1]) scrollToItem(scrollNumber - 3);
    //     else if (scrolledItem === menuScroll[3][0] && event.key === menuScroll[3][1]) scrollToItem(scrollNumber - 3);
    //     else if (scrolledItem === menuScroll[4][0] && event.key === menuScroll[4][1]) scrollToItem(scrollNumber - 1);
    //     else if (scrolledItem === menuScroll[5][0] && event.key === menuScroll[5][1]) scrollToItem(scrollNumber + 1);
    //     scrollToHeroIcon(scrollNumber + 20); // menu item scroll
    //     heroScroll = true;
    //     // if on zone 3 and click right
    //   }
    // }

    // if click on item, open link
    // if click on hero, open hero menu
      // scroll left or right to open icons
    if (event.key === 'a') scrollToItem(scrollNumber - 1);
    else if (event.key === 'd') scrollToItem(scrollNumber + 1);
    else if (event.key === 'w') scrollToItem(scrollNumber - 3);
    else if (event.key === 's') scrollToItem(scrollNumber + 3);
  }

  scrollCalc(scrolled, key, heroIcon) {
    // console.log(heroIcon);
    let returnedScroll;
    // console.log(scrolled);
    // edge item scroll
    // if (heroIcon === 'none') {
      if (scrolled === -1 && key === 'w') returnedScroll = 8; // on 2 and scroll up
      else if (scrolled === 3 && key === 'd') returnedScroll = 0; // on 2 and scroll right
      else if (scrolled === -2 && key === 'w') returnedScroll = 7; // on 1 and scroll up
      else if (scrolled === -3 && key === 'w') returnedScroll = 6; // on 0 and scroll up
      else if (scrolled === -1 && key === 'a') returnedScroll = 2; // on 0 and scroll left
      else if (scrolled === 6 && key === 'd') returnedScroll = 3; // on 5 and scroll right
      else if (scrolled === 2 && key === 'a') returnedScroll = 5; // on 3 and scroll left
      else if (scrolled === 5 && key === 'a') returnedScroll = 8; // on 6 and scroll left
      else if (scrolled === 9 && key === 's') returnedScroll = 0; // on 6 and scroll down
      else if (scrolled === 10 && key === 's') returnedScroll = 1; // on 7 and scroll down
      else if (scrolled === 11 && key === 's') returnedScroll = 2; // on 8 and scroll down
      else if (scrolled === 9 && key === 'd') returnedScroll = 6; // on 8 and scroll right
      // normal item scroll
      else returnedScroll = scrolled;
    // }
     // else {
    //   //menu item scroll
    //   if (scrolled === 21 && key === 's') returnedScroll = 'webvr';
    //   else if (scrolled === 23 && key === 'd') returnedScroll = 'centerLeftIcon';
    //   else if (scrolled === 24 && key === 'a') returnedScroll = 'centerLeftIcon';
    //   else if (scrolled === 24 && key === 'd') returnedScroll = 'centerRightIcon';
    //   else if (scrolled === 25 && key === 'a') returnedScroll = 'centerRightIcon';
    //   else if (scrolled === 27 && key === 'w') returnedScroll = 'webvr';
    // }

    return returnedScroll;
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
    scrolledHeroIcon: state.scrolledHeroIcon,
    activeItem: state.activeItem,
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
  fetchScrolledHeroIcon,
  fetchDeviceType,
  fetchBackgroundPos,
  fetchSiteAnimating,
  fetchUpdateUrl
})(GridContainer);
