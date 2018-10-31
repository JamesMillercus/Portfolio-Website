import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-360';
import { store } from './../store.js';
import Item from './../components/locs/Item/Item';

export default class ItemContainer extends Component {

  render() {
    return (
      <Provider store={store}>
        <Item
          itemNumber={this.props.itemNumber}
          page={this.props.page}
          unscrolledImage={this.props.unscrolledImage}
          scrolledImage={this.props.scrolledImage}
          clickedImage={this.props.clickedImage}
          textHeader={this.props.textHeader}
          textBody={this.props.textBody}
          marginLeft={this.props.marginLeft}
          marginTop={this.props.marginTop}
          videoID={this.props.videoID}
          videoLength={this.props.videoLength}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ItemContainer', () => ItemContainer);
