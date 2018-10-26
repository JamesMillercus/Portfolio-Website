import React from 'react';
import { View } from 'react-360';
import Item from './Item';
import config from './../../../config/homeConfig';

export default class ItemContainer extends React.Component {
  render() {
    return (
      <View>
        <Item
          itemNumber={0}
          page={config.page}
          unscrolledImage={config.itemImage[0].unscrolled}
          scrolledImage={config.itemImage[0].scrolled}
          clickedImage={config.itemImage[0].clicked}
          textHeader={config.itemText[0].header}
          textBody={config.itemText[0].paragraph}
          marginLeft={config.itemPosition[0].marginLeft}
          marginTop={config.itemPosition[0].marginTop}
        />
      </View>
    );
  }
}
