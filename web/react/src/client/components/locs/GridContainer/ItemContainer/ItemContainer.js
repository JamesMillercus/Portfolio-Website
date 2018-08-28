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

	setClass(number, position) {
    // style of text based on content
    const itemClass = [`item${number} item ${position}`];

		if (this.props.siteAnimating) {
			console.log('hide item elements here');
			// add css to hide elements in center in ItemContainerLaptopAnimation.scss
		} else {
			console.log('reveal item elements here');
			// remove css elements
		}

    return itemClass.join(' ');
	}

	scrolledItem(item) {
		if (!this.props.siteAnimating) this.props.fetchScrolledItem(item);
	}

	clickedItem(item) {
		this.props.fetchActiveItem(item);
		const itemAlreadyClicked = this.props.clickedItems.includes(item);
		if (!itemAlreadyClicked && !this.props.siteAnimating) this.props.fetchClickedItems(item);
	}

	scrolledCheck(number, scrolledItem) {
		if (scrolledItem === number) return true;
		return false;
	}

	render() {
		const scroll = () => this.scrolledItem(this.props.number);
		const click = () => this.clickedItem(this.props.number);
		const scrollCheck = () => this.scrolledCheck(this.props.number, this.props.scrolledItem);
		const number = this.props.number;
		const position = itemContainerConfig[number].position;

		return (
			<div className={this.setClass(number, position)} onMouseOver={scroll} onClick={click}>
				<ItemImage itemNumber={number} clickedItems={this.props.clickedItems} scrolledItem={scrollCheck()} />
				<ItemText itemNumber={number} scrolledItem={scrollCheck()} />
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		scrolledItem: state.scrolledItem,
		activeItem: state.activeItem,
		clickedItems: state.clickedItems,
		siteAnimating: state.siteAnimating
	});

export default connect(
	mapStateToProps, { fetchScrolledItem, fetchActiveItem, fetchClickedItems }
)(ItemContainer);
