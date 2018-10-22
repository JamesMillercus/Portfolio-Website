/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import { StyleSheet, Text, VrButton } from 'react-360';
import { connect } from 'react-redux';
import { fetchItemScrolled, fetchItemClicked, fetchActiveItem } from './../../../actions';
import ItemImage from './ItemImage';

class Item extends React.Component {


// create ItemText Component
// pass in component props from config file into ItemText & ItemImage
// create video component with "head locked movement" functionality
// ensure component is fully dynamic
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
    const mouseOver = () => this.props.fetchItemScrolled(0);
    const mouseOut = () => this.props.fetchItemScrolled(null);
    const mouseClick = () => this.clicked('home', 0);

    return (
      <VrButton style={styles.item} onEnter={() => mouseOver()} onExit={() => mouseOut()} onClick={() => mouseClick()} >
        <ItemImage />
        <Text style={styles.textHeader}>
          Mood Tree
        </Text>
        <Text style={styles.textBody}>
          D&AD wanted to promote social activity during their design festival. I created the electronics for an installation that utilised Twitter’s API and Stanfords Natural Language parser, to analyse live tweets on the events ‘#’. A keyword and colour was displayed on each of the trees leaves, based on that tweets collected sentiment.
        </Text>
      </VrButton>
    );
  }
}


const mapStateToProps = ({ itemScrolled, itemClicked }) => ({ itemScrolled, itemClicked });

export default connect(mapStateToProps, { fetchItemScrolled, fetchItemClicked, fetchActiveItem })(Item);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 40,
    color: '#7d7d7d',
  },
  textBody: {
    width: 500,
    color: '#7d7d7d',
    marginTop: 20
  },
  item: {
    width: 900,
    height: 400,
    marginLeft: 800,
    marginTop: 230,
    paddingTop: 80,
    paddingLeft: 70,
    position: 'absolute',
    // backgroundColor: 'red',
  }
});
