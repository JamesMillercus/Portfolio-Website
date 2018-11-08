import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-360';
import { store } from './../store.js';
import VideoComponent from './../components/locs/Video/Video';

export default class MobileVideoContainer extends Component {

  render() {
    return (
      <Provider store={store}>
        <VideoComponent />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MobileVideoContainer', () => MobileVideoContainer);
