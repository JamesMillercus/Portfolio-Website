/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  asset,
  VrButton,
  StyleSheet,
  Image,
  Video
} from 'react-360';
import { connect } from 'react-redux';

class ItemImage extends React.Component {

  itemImage() {
    const { itemScrolled, itemClicked, itemNumber, page } = this.props;
    // if itemClicked reducer isn't empty
    if (Object.getOwnPropertyNames(itemClicked).length !== 0 && itemClicked[page] !== undefined) {
      // return gif if the current item is clicked
      const itemIsClicked = itemClicked[page].includes(itemNumber);
      if (itemIsClicked) {
        return <Video source={asset(this.props.clickedImage)} style={styles.clickedImage} loop />;
      }
      // else if the current item is scrolled, return the scrolled png
    } else if (itemScrolled === itemNumber) {
      return <Image source={asset(this.props.scrolledImage)} style={styles.image} />;
    }
    return <Image source={asset(this.props.unscrolledImage)} style={styles.image} />;
  }

  render() {
    return (
      <View>
        <VrButton>
          {this.itemImage()}
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
    marginLeft: 550
  },
  clickedImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    marginLeft: 550
  }
});

const mapStateToProps = ({ itemScrolled, itemClicked }) => ({ itemScrolled, itemClicked });

export default connect(mapStateToProps, null)(ItemImage);
