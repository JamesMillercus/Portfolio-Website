import React, { Component } from 'react';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import getOSVersion from './../../components/hocs/getOSVersion';
import WebVR from './../../components/locs/WebVR/WebVR';

class WebVRPage extends Component {
  render() {
    return <WebVR />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(
    getDevice, getOSVersion, getBrowser
  )(WebVRPage)
};
