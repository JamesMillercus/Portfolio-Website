import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { store } from './../Store.js';
import Reticle from './../components/locs/Reticle/Reticle';
// import config from './../config/homeConfig';

export default class ReticleContainer extends Component {

  constructor(props) {
    super(props);
    this.webMode = 'webvr';
    // this.webMode = 'webvr'; // comment in production
  }

  componentWillMount() {
    this.userAgent = navigator.userAgent;
  }

  render() {
    return (
      <UserAgentProvider ua={this.userAgent} store={store}>
        <Provider store={store}>
          <Reticle />
        </Provider>
      </UserAgentProvider>
    );
  }
}
