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
    const { fetchScrolledItem, webMode } = this.props;
    if (webMode === 'webvr') fetchScrolledItem(null);
  }

  itemImage(styles) {
    const { scrolledItem, clickedItems, itemNumber, page, webMode, clickedImage } = this.props;

    let itemIsClicked;
    // if clickedItems reducer isn't empty
    if (Object.getOwnPropertyNames(clickedItems).length === 0 && clickedItems[page] === undefined) itemIsClicked = false;
    else itemIsClicked = clickedItems[page].includes(itemNumber);
    // return gif if the current item is clicked
    if (itemIsClicked) {
      return <Video source={asset(clickedImage)} style={styles.clickedImage} loop />;
    // else if the current item is scrolled, return the scrolled png
    } else if (scrolledItem === itemNumber) {
      return <Image source={asset(this.props.scrolledImage)} style={styles.image} />;
    }
    return <Image source={asset(this.props.unscrolledImage)} style={styles.image} />;
  }

  vrButtonStyle(styles) {
    const { scrolledItem, itemNumber } = this.props;

    if (scrolledItem === itemNumber) return styles.scrolledVrButton;
    return styles.vrButton;
  }

  borderWidth() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return 2;
    return 0;
  }

  borderColor() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return '#7c7c7c';
    return null;
  }

  scrolledBorderColor() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return '#008f9c';
    return null;
  }

  render() {
    const { marginTop, marginLeft, clickedMarginTop, clickedMarginLeft } = this.props;
    const mouseOver = () => this.scrolledOver();
    const mouseOut = () => this.scrolledOut();

    // MAKE CLICKED IMAGE APPEAR

    const styles = StyleSheet.create({
      image: {
        width: 128,
        height: 128,
        borderRadius: 64,
        marginTop,
        marginLeft
      },
      vrButton: {
        width: 150,
        height: 150,
        marginLeft: 500,
        marginTop: 70,
        position: 'absolute',
        borderColor: this.borderColor(),
        borderWidth: this.borderWidth(),
        borderRadius: 75
      },
      scrolledVrButton: {
        width: 150,
        height: 150,
        marginLeft: 500,
        marginTop: 70,
        position: 'absolute',
        borderColor: this.scrolledBorderColor(),
        borderWidth: this.borderWidth(),
        borderRadius: 75
      },
      clickedImage: {
        width: 100,
        height: 100,
        marginTop: clickedMarginTop,
        marginLeft: clickedMarginLeft
      }
    });

    return (
      <View>
        <VrButton style={this.vrButtonStyle(styles)} onEnter={() => mouseOver()} onExit={() => mouseOut()}>
          {this.itemImage(styles)}
        </VrButton>
      </View>
    );
  }
}


const mapStateToProps = ({ scrolledItem, clickedItems, webMode }) => ({ scrolledItem, clickedItems, webMode });

export default connect(mapStateToProps, { fetchScrolledItem })(ItemImage);
