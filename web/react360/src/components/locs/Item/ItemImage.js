/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  asset,
  VrButton,
  NativeModules,
  StyleSheet,
  Image
} from 'react-360';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';

class ItemImage extends React.Component {

  itemImage() {
    const { itemScrolled } = this.props;
    if (itemScrolled === 0) return asset('moodtree-scrolled.png');
    return asset('moodtree.png');
  }

  itemImageStyle() {
    const { itemScrolled } = this.props;
    console.log(itemScrolled);
    if (itemScrolled === 0) return styles.scrolledImage;
    return styles.image;
  }

  render() {
    return (
      <View>
        <VrButton>
          <Image source={this.itemImage()} style={this.itemImageStyle()} />
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    marginLeft: 550,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: '#7d7d7d'
  },
  scrolledImage: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    marginLeft: 550,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: '#008f9c'
  }
});

const mapStateToProps = ({ itemScrolled }) => ({ itemScrolled });

export default connect(mapStateToProps, null)(ItemImage);
