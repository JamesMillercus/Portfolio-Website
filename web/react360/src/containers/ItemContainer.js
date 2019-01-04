import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { store } from './../Store.js';
import Item from './../components/locs/Item/Item';
import config from './../config/config';

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
    const { itemNumber } = this.props;
    if (this.props.webMode === 'web') return config.itemImage[itemNumber].unscrolled;
    return config.itemImage[itemNumber].webvr;
  }

  scrolledImage() {
    const { itemNumber } = this.props;
    if (this.props.webMode === 'web') return config.itemImage[itemNumber].scrolled;
    return config.itemImage[itemNumber].webvrScrolled;
  }

  render() {
    const { itemNumber } = this.props;
    return (
      <UserAgentProvider ua={this.userAgent} store={store}>
        <Provider store={store}>
          <Item
            itemNumber={itemNumber}
            page={config.page}
            unscrolledImage={this.unscrolledImage()}
            scrolledImage={this.scrolledImage()}
            clickedImage={config.itemImage[itemNumber].clicked}
            textHeader={config.itemText[itemNumber].header}
            textBody={config.itemText[itemNumber].paragraph}
            videoID={config.itemVideo[itemNumber].videoID}
            videoLength={config.itemVideo[itemNumber].videoLength}
            youtube={config.itemVideo[itemNumber].youtube}
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
