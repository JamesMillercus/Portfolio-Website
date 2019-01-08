
import React from 'react';
import { StyleSheet, VrButton, View } from 'react-360';
import { connect } from 'react-redux';
import {
  fetchScrolledItem, fetchClickedItems, fetchActiveItem, fetchLoadingContent
} from './../../../actions';
import ItemImage from './ItemImage';
import ItemText from './ItemText';
import ItemVideo from './ItemVideo';
import LoadingBar from './../LoadingBar/LoadingBar';

class Item extends React.Component {

  componentDidUpdate() {
    const { webMode, scrolledItem, itemNumber, fetchLoadingContent } = this.props;
    if (webMode === 'webvr' && scrolledItem === itemNumber) fetchLoadingContent(scrolledItem);
    else if (scrolledItem === null) fetchLoadingContent('');
  }

  clicked(page, item) {
    const { webMode, fetchActiveItem, fetchClickedItems, clickedItems } = this.props;
    if (webMode === 'web') {
      fetchActiveItem(item);
      if (Object.getOwnPropertyNames(clickedItems).length === 0 || clickedItems[page] === undefined) {
        // console.log('page has not been clicked');
        fetchClickedItems(page, item);
      } else {
        // console.log("page has been clicked, item hasn't");
        const itemAlreadyClicked = clickedItems[page].includes(item);
        // if item hasn't already been clicked
        if (!itemAlreadyClicked) fetchClickedItems(page, item);
      }
    }
  }

  scrolledOut() {
    this.props.fetchScrolledItem(null);
    this.props.fetchActiveItem('hidden');
  }

  scrolledOver() {
    const { fetchScrolledItem, itemNumber, webMode } = this.props;
    if (webMode === 'web') fetchScrolledItem(itemNumber);
  }

  content() {
    const {
      activeItem,
      itemNumber,
      videoID,
      videoLength,
      youtube,
      page,
      webvrYoutube,
      marginLeft,
      marginTop,
      clickedMarginTop,
      clickedMarginLeft
    } = this.props;
    if (activeItem === itemNumber) {
      return (
        <ItemVideo
          videoID={videoID}
          videoLength={videoLength}
          itemNumber={itemNumber}
          youtube={youtube}
          webvrYoutube={webvrYoutube}
        />
      );
    }

    return (
      <View>
        <LoadingBar
          content={'Opening video'}
          marginTop={0}
          marginLeft={465}
          marginBottom={0}
          width={210}
          id={itemNumber}
          url={videoID}
          position={'absolute'}
          page={page}
        />
        <ItemImage
          unscrolledImage={this.props.unscrolledImage}
          scrolledImage={this.props.scrolledImage}
          clickedImage={this.props.clickedImage}
          itemNumber={this.props.itemNumber}
          page={this.props.page}
          marginLeft={marginLeft}
          marginTop={marginTop}
          clickedMarginLeft={clickedMarginLeft}
          clickedMarginTop={clickedMarginTop}
        />
        <ItemText
          textHeader={this.props.textHeader}
          textBody={this.props.textBody}
        />
      </View>
    );
  }

  display() {
    const { activeItem, itemNumber } = this.props;
    if (activeItem === itemNumber || activeItem === 'hidden') return 'flex';
    return 'none';
  }

  borderWidth() {
    const { webMode } = this.props;
    if (webMode === 'web') return 1;
    return 0;
  }

  borderColor() {
    const { webMode } = this.props;
    if (webMode === 'web') return '#008f9c';
    return null;
  }

  render() {
    const mouseOver = () => this.scrolledOver();
    const mouseOut = () => this.scrolledOut();
    const mouseClick = () => this.clicked(this.props.page, this.props.itemNumber);

    const style = () => {
      const { scrolledItem, itemNumber } = this.props;
      if (scrolledItem === itemNumber) return styles.scrolledItem;
      return styles.item;
    };

    const styles = StyleSheet.create({
      item: {
        width: 800,
        height: 400,
        paddingTop: 90,
        paddingLeft: 100,
        position: 'absolute',
        backgroundColor: '#fff',
        display: this.display()
      },
      scrolledItem: {
        width: 800,
        height: 400,
        backgroundColor: '#fff',
        position: 'absolute',
        paddingTop: 90,
        paddingLeft: 100,
        borderWidth: this.borderWidth(),
        borderColor: this.borderColor()
      },
    });

    return (
      <VrButton
        style={style()}
        onEnter={() => mouseOver()}
        onExit={() => mouseOut()}
        onClick={() => mouseClick()}
      >
        {this.content()}
      </VrButton>
    );
  }
}


const mapStateToProps = ({
  scrolledItem, clickedItems, activeItem, webMode
}) => ({ scrolledItem, clickedItems, activeItem, webMode });

export default connect(mapStateToProps, {
  fetchScrolledItem, fetchClickedItems, fetchActiveItem, fetchLoadingContent
})(Item);
