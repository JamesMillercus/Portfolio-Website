
import React from 'react';
import { StyleSheet, VrButton, View } from 'react-360';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchClickedItems, fetchActiveItem } from './../../../actions';
import ItemImage from './ItemImage';
import ItemText from './ItemText';
import ItemVideo from './ItemVideo';

class Item extends React.Component {

  clicked(page, item) {
    this.props.fetchActiveItem(item);

    const { clickedItems } = this.props;
    if (Object.getOwnPropertyNames(clickedItems).length === 0 || clickedItems[page] === undefined) {
      // console.log('page has not been clicked');
			this.props.fetchClickedItems(page, item);
		} else {
      // console.log("page has been clicked, item hasn't");
			const itemAlreadyClicked = clickedItems[page].includes(item);
      // if item hasn't already been clicked
			if (!itemAlreadyClicked) this.props.fetchClickedItems(page, item);
		}
  }

  scrolledOut() {
    this.props.fetchScrolledItem(null);
    this.props.fetchActiveItem('hidden');
  }

  content() {
    const { activeItem, itemNumber, videoID, videoLength } = this.props;
    if (activeItem === itemNumber) {
      return (
        <ItemVideo
          videoID={videoID}
          videoLength={videoLength}
        />
      );
    }

    return (
      <View>
        <ItemImage
          unscrolledImage={this.props.unscrolledImage}
          scrolledImage={this.props.scrolledImage}
          clickedImage={this.props.clickedImage}
          itemNumber={this.props.itemNumber}
          page={this.props.page}
        />
        <ItemText
          textHeader={this.props.textHeader}
          textBody={this.props.textBody}
        />
      </View>
    );
  }


  render() {
    const mouseOver = () => this.props.fetchScrolledItem(this.props.itemNumber);
    const mouseOut = () => this.scrolledOut();
    const mouseClick = () => this.clicked(this.props.page, this.props.itemNumber);

    const style = () => {
      const { scrolledItem, itemNumber } = this.props;
      if (scrolledItem === itemNumber) return styles.scrolledItem;
      return styles.item;
    };

    const styles = StyleSheet.create({
      item: {
        width: 900,
        height: 400,
        marginLeft: this.props.marginLeft,
        marginTop: this.props.marginTop,
        paddingTop: 90,
        paddingLeft: 100,
        position: 'absolute',
        backgroundColor: '#fff',
      },
      scrolledItem: {
        width: 900,
        height: 400,
        backgroundColor: '#fff',
        position: 'absolute',
        marginLeft: this.props.marginLeft,
        marginTop: this.props.marginTop,
        paddingTop: 90,
        paddingLeft: 100,
        borderWidth: 1,
        borderColor: '#008f9c'
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
  scrolledItem, clickedItems, activeItem
}) => ({ scrolledItem, clickedItems, activeItem });

export default connect(mapStateToProps, {
  fetchScrolledItem, fetchClickedItems, fetchActiveItem
})(Item);
