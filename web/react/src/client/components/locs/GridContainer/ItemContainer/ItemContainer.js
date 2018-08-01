/*eslint max-len: ["error", { "code": 200 }]*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemImage from './ItemImage/ItemImage';
import ItemText from './ItemText/ItemText';
import itemContainerConfig from './assets/config/itemContainerConfig';
import './assets/scss';
import {
	fetchScrolledItem,
	fetchActiveItem,
	fetchClickedItems
} from './../../../../actions';

class ItemContainer extends Component {

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	clickedItem(item) {
		this.props.fetchActiveItem(item);
		const itemAlreadyClicked = this.props.clickedItems.includes(item);
		if (!itemAlreadyClicked) this.props.fetchClickedItems(item);
	}

	render() {
		const scroll = () => this.scrolledItem(this.props.number);
		const click = () => this.clickedItem(this.props.number);

		const number = this.props.number;
		const position = itemContainerConfig[number].position;

		return (
			<div className={`item${number} item ${position}`} onMouseOver={scroll} onClick={click}>
				<ItemImage itemNumber={number} clickedItems={this.props.clickedItems} />
				<ItemText itemNumber={number} />
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		scrolledItem: state.scrolledItem,
		activeItem: state.activeItem,
		clickedItems: state.clickedItems
	});

export default connect(
	mapStateToProps, { fetchScrolledItem, fetchActiveItem, fetchClickedItems }
)(ItemContainer);
