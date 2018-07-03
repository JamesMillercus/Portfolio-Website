import React, { Component } from 'react';
import './HomePage.scss';
import './react.png';
import { BrowserView, TabletView, MobileOnlyView, browserName, CustomView } from "react-device-detect";

class Home extends Component {
  render() {
    return (
      <BrowserView>  
        <div className = "class"> 
          <h3> Home page </h3>
          <p> Built in ssr React and Redux </p>
          <img src="/assets/images/react.png" />
        </div>
      </BrowserView>,
      // get browsername from action http request
      <CustomView condition={browserName === "Chrome"}>
        <div>"lol?"</div>
      </CustomView>
      
	  )
  }
};

export default {
  component: Home
};
