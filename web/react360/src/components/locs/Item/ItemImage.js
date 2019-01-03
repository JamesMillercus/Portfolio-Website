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
import { fetchScrolledItem } from './../../../actions';

class ItemImage extends React.Component {

  scrolledOver() {
    const { fetchScrolledItem, itemNumber, webMode } = this.props;
    if (webMode === 'webvr') fetchScrolledItem(itemNumber);
  }

  scrolledOut() {
    this.props.fetchScrolledItem(null);
  }

  itemImage() {
    const { scrolledItem, clickedItems, itemNumber, page, webMode } = this.props;
    // if clickedItems reducer isn't empty
    if (Object.getOwnPropertyNames(clickedItems).length !== 0 && clickedItems[page] !== undefined) {
      // return gif if the current item is clicked
      const itemIsClicked = clickedItems[page].includes(itemNumber);
      if (itemIsClicked) {
        return <Video source={asset(this.props.clickedImage)} style={styles.clickedImage} loop />;
      }
      // else if the current item is scrolled, return the scrolled png
    } else if (scrolledItem === itemNumber) {
      return <Image source={asset(this.props.scrolledImage)} style={styles.image} />;
    }
    return <Image source={asset(this.props.unscrolledImage)} style={styles.image} />;
  }

  render() {
    const mouseOver = () => this.scrolledOver();
    const mouseOut = () => this.scrolledOut();

    return (
      <View>
        <VrButton onEnter={() => mouseOver()} onExit={() => mouseOut()}>
          {this.itemImage()}
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    backgroundColor: '#fff',
    position: 'absolute',
    marginLeft: 500,
    marginTop: 70
  },
  clickedImage: {
    width: 128,
    height: 128,
    position: 'absolute',
    marginLeft: 500,
    marginTop: 70
  }
});

const mapStateToProps = ({ scrolledItem, clickedItems, webMode }) => ({ scrolledItem, clickedItems, webMode });

export default connect(mapStateToProps, { fetchScrolledItem })(ItemImage);
