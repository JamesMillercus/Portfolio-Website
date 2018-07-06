import React, { Component } from 'react';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import { compose } from 'redux'

class Home extends Component {
  
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div> 
        {this.props.deviceComponent()} 
      </div>
    )
  }
};

export default {
  // take props from admins and pass them into require Auth
  component: getDevice(Home)
};
