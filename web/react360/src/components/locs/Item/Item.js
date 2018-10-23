
import React from 'react';
import { StyleSheet, VrButton } from 'react-360';
import { connect } from 'react-redux';
import { fetchItemScrolled, fetchItemClicked, fetchActiveItem } from './../../../actions';
import ItemImage from './ItemImage';
import ItemText from './ItemText';

class Item extends React.Component {


// create video component with "head locked movement" functionality
// create other 7 Item Components

  clicked(page, item) {
    // NativeModules.LinkingManager.openURL(this.props.iconUrl)
    // this.props.fetchItemClicked(0);
    const { itemClicked } = this.props;
    this.props.fetchActiveItem(item);
    if (Object.getOwnPropertyNames(itemClicked).length === 0 || itemClicked[page] === undefined) {
      // console.log('page has not been clicked');
			this.props.fetchItemClicked(page, item);
		} else {
      // console.log("page has been clicked, item hasn't");
			const itemAlreadyClicked = itemClicked[page].includes(item);
      // if item hasn't already been clicked
			if (!itemAlreadyClicked) this.props.fetchItemClicked(page, item);
		}
  }


  render() {
    const mouseOver = () => this.props.fetchItemScrolled(this.props.itemNumber);
    const mouseOut = () => this.props.fetchItemScrolled(null);
    const mouseClick = () => this.clicked(this.props.page, this.props.itemNumber);

    const style = () => {
      const { itemScrolled, itemNumber } = this.props;
      if (itemScrolled === itemNumber) return styles.scrolledItem;
      return styles.item;
    };

    const styles = StyleSheet.create({
      item: {
        width: 900,
        height: 400,
        marginLeft: this.props.marginLeft,
        marginTop: this.props.marginTop,
        paddingTop: 80,
        paddingLeft: 70,
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
        paddingTop: 80,
        paddingLeft: 70,
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
      </VrButton>
    );
  }
}


const mapStateToProps = ({ itemScrolled, itemClicked }) => ({ itemScrolled, itemClicked });

export default connect(mapStateToProps, {
  fetchItemScrolled, fetchItemClicked, fetchActiveItem
})(Item);
