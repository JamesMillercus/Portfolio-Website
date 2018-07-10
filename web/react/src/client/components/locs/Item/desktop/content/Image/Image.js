import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClickedItems } from './../../../../../../actions';
import { fetchActiveItem } from './../../../../../../actions';
import './scss/ItemImg.scss';
import './scss/ItemActiveImg.scss';
import './../../../assets/item/bottomcenter.png';
import './../../../assets/item/bottomleft.png';
import './../../../assets/item/bottomright.png';
import './../../../assets/item/middleleft.png';
import './../../../assets/item/middleright.png';
import './../../../assets/item/topcenter.png';
import './../../../assets/item/topleft.png';
import './../../../assets/item/topright.png';
import './../../../assets/item/bottomcenter.gif';
import './../../../assets/item/bottomleft.gif';
import './../../../assets/item/bottomright.gif';
import './../../../assets/item/middleleft.gif';
import './../../../assets/item/middleright.gif';
import './../../../assets/item/topcenter.gif';
import './../../../assets/item/topleft.gif';
import './../../../assets/item/topright.gif';

class Image extends Component {

	// this.props.clickedItems


	render(){
		// console.log(Provider);
		const itemNumber = this.props.itemNumber;
		console.log(itemNumber);
	
		return (
			<div className = {this.setClass(itemNumber)} />
		)
	}

	setClass(itemNumber) {
		if(this.props.clickedItems.includes(itemNumber)) {
			// console.log("TRIGGERED" + itemNumber);
			return "activeImg";
		}
		else {
			// console.log("NOT TRIGGERED" + itemNumber);
			return "img";
		}
	}

}


// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		clickedItems: state.clickedItems,
		activeItem: state.activeItem
	};
}

export default connect(mapStateToProps, { fetchClickedItems, fetchActiveItem })(Image);