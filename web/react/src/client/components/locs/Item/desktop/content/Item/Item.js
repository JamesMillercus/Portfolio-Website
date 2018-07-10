import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from './../Image/Image';
import { fetchScrolledItem } from './../../../../../../actions';
import { fetchActiveItem } from './../../../../../../actions';
import { fetchClickedItems } from './../../../../../../actions';
import {itemConfig} from './../../../config/itemConfig'
import './scss/ItemContainer.scss';
import './scss/ItemText.scss';
import './scss/ItemTextAnimation.scss';

class Item extends Component {

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	clickedItem(item) {
		this.props.fetchActiveItem(item);
		let itemAlreadyClicked = this.props.clickedItems.includes(item);
		if(!itemAlreadyClicked) this.props.fetchClickedItems(item);
	}

	render(){
		let scroll = () => this.scrolledItem(this.props.number);
		let click = () => this.clickedItem(this.props.number);

		const number = this.props.number;
		const position = itemConfig[number].position;
		const header = itemConfig[number].header;
		const paragraph = itemConfig[number].paragraph;

		return (
			<div className = {`item${number} item ${position}`} onMouseOver={scroll} onClick={click}>
				<Image itemNumber={number} />
				<div className = "video" />
				<div className = "text"> 
					<h1> {header} </h1>
					<p> {paragraph} </p>
				</div>
				<div className = "spacer" />
			</div>
		)
	}

}


// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		scrolledItem: state.scrolledItem,
		activeItem: state.activeItem,
		clickedItems: state.clickedItems
	};
}

export default connect(mapStateToProps, { fetchScrolledItem, fetchActiveItem, fetchClickedItems })(Item);