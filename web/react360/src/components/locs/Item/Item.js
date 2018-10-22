/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import { StyleSheet, Text, VrButton } from 'react-360';
import { connect } from 'react-redux';
import { fetchItemScrolled, fetchItemClicked } from './../../../actions';
import ItemImage from './ItemImage';

class Item extends React.Component {

  // clickedItem(item) {
	// 	const page = this.props.content.page;
	// 	this.props.fetchActiveItem(item);
  //
	// 	if(Object.getOwnPropertyNames(this.props.clickedItems).length === 0 || this.props.clickedItems[page] === undefined) {
	// 		this.props.fetchClickedItems(page, item);
	// 	} else {
	// 		const itemAlreadyClicked = this.props.clickedItems[page].includes(item);
	// 		if (!itemAlreadyClicked && !this.checkAnimationState()) this.props.fetchClickedItems(page, item);
	// 	}
	// 	if(this.props.content.itemVideo){
	// 		import(/* webpackChunkName: "video" */ './Video/Video').then(VideoComponent => {
	// 			this.props.fetchAsyncVideoComponent(VideoComponent.default);
	// 		});
	// 	} else if(this.props.content.itemLink) window.open(this.props.content.itemLink[item].href, '_blank');
	// }

  clicked() {
    // NativeModules.LinkingManager.openURL(this.props.iconUrl)
    // this.props.fetchItemClicked(0);
    // const page = 'home';
    // this.props.fetchActiveItem(videoThatNeedsToBeActive)

    //
  }

  render() {
    const mouseOver = () => this.props.fetchItemScrolled(0);
    const mouseOut = () => this.props.fetchItemScrolled(null);
    const mouseClick = () => this.clicked(0);

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

export default connect(mapStateToProps, { fetchItemScrolled, fetchItemClicked })(Item);

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
    width: 750,
    height: 200,
    marginLeft: 800,
    marginTop: 300,
    position: 'absolute',
  }
});
