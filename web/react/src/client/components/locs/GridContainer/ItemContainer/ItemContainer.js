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
	fetchClickedItems,
	fetchDeviceType
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
		const device = this.props.deviceType;

		return (
			<div className={`${device}-item${number} ${device}-item ${position}`} onMouseOver={scroll} onClick={click}>
				<ItemImage itemNumber={number} clickedItems={this.props.clickedItems} />
				<div className={'video'} />
				<ItemText itemNumber={number} />
				<div className={'spacer'} />
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		scrolledItem: state.scrolledItem,
		activeItem: state.activeItem,
		clickedItems: state.clickedItems,
		deviceType: state.deviceType
	});

export default connect(
	mapStateToProps, { fetchScrolledItem, fetchActiveItem, fetchClickedItems, fetchDeviceType }
)(ItemContainer);
