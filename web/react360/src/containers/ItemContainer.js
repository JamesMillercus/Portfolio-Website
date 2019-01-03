import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { store } from './../Store.js';
import Item from './../components/locs/Item/Item';
import config from './../config/homeConfig';

class ItemContainer extends Component {

  constructor(props) {
    super(props);
    this.webMode = 'webvr';
    // this.webMode = 'webvr'; // comment in production
  }

  componentWillMount() {
    this.userAgent = navigator.userAgent;
  }

  unscrolledImage() {
    if (this.props.webMode === 'web') return config.itemImage[0].unscrolled;
    return config.itemImage[0].webvr;
  }

  scrolledImage() {
    if (this.props.webMode === 'web') return config.itemImage[0].scrolled;
    return config.itemImage[0].webvrScrolled;
  }

  render() {
    return (
      <UserAgentProvider ua={this.userAgent} store={store}>
        <Provider store={store}>
          <Item
            itemNumber={0}
            page={config.page}
            unscrolledImage={this.unscrolledImage()}
            scrolledImage={this.scrolledImage()}
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

const mapStateToProps = ({ webMode }) => ({ webMode });

function connectWithStore(store, WrappedComponent, ...args) {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function (props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

const ConnectedApp = connectWithStore(store, ItemContainer, mapStateToProps, null);

export default ConnectedApp;
