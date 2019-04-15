import React, { Component } from 'react';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getOSVersion from './../../components/hocs/getOSVersion';
import getBrowser from './../../components/hocs/getBrowser';
import getNoScript from './../../components/hocs/getNoScript';
import WebVR from './../../components/locs/WebVR/WebVR';

class WebVRPage extends Component {
  render() {
    return <WebVR browserName={this.props.browserName} browser={this.props.browser} />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(
    getBrowser, getDevice, getOSVersion, getNoScript,
  )(WebVRPage)
};
