import React, { Component } from 'react';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import GridContainer from './../../components/locs/GridContainer/GridContainer';

class Home extends Component {

  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return <GridContainer />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(getDevice, getBrowser)(Home)
};
