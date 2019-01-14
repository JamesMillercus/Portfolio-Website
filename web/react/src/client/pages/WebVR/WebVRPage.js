import React, { Component } from 'react';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getOSVersion from './../../components/hocs/getOSVersion';
// import getBrowser from './../../components/hocs/getBrowser';
import WebVR from './../../components/locs/WebVR/WebVR';

class WebVRPage extends Component {
  render() {
    return <WebVR browser={this.props.browser} href={'/webVRbuild/index.html'} />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(getDevice, getOSVersion)(WebVRPage)
};
