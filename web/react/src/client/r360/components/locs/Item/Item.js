
import React from 'react';
import { StyleSheet, VrButton } from 'react-360';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchItemClicked, fetchActiveItem } from './../../../actions';
import ItemImage from './ItemImage';
import ItemText from './ItemText';

class Item extends React.Component {

  clicked(page, item) {
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
    const mouseOver = () => this.props.fetchScrolledItem(this.props.itemNumber);
    const mouseOut = () => this.props.fetchScrolledItem(null);
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


const mapStateToProps = ({ scrolledItem, itemClicked }) => ({ scrolledItem, itemClicked });

export default connect(mapStateToProps, {
  fetchScrolledItem, fetchItemClicked, fetchActiveItem
})(Item);
