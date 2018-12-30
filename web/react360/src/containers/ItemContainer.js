import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { store } from './../Store.js';
import Item from './../components/locs/Item/Item';
import config from './../config/homeConfig';

export default class ItemContainer extends Component {

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
          <Item
            itemNumber={0}
            page={config.page}
            unscrolledImage={config.itemImage[0].unscrolled}
            scrolledImage={config.itemImage[0].scrolled}
            clickedImage={config.itemImage[0].clicked}
            textHeader={config.itemText[0].header}
            textBody={config.itemText[0].paragraph}
            videoID={config.itemVideo[0].videoID}
            videoLength={config.itemVideo[0].videoLength}
            youtube={config.itemVideo[0].youtube}
            webMode={this.webMode}
          />
        </Provider>
      </UserAgentProvider>
    );
  }
}
