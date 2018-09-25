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
	fetchAsyncVideoComponent
} from './../../../../actions';

class ItemContainer extends Component {

	setClass(number, position) {
    // style of text based on content
    const itemClass = [`item${number} item ${position}`];
		if (this.checkAnimationState()) itemClass.push('itemHide');
    return itemClass.join(' ');
	}

	scrolledItem(item) {
		const deviceType = this.props.deviceType;
		if (!this.checkAnimationState() && deviceType === 'laptop') this.props.fetchScrolledItem(item);
	}

	checkAnimationState() {
		if (this.props.siteAnimating !== 'finishedAnimating' && this.props.siteAnimating !== 'startAnimating') return true;
		else if (this.props.siteAnimating === 'startAnimating') return false;
		return false;
	}

	clickedItem(item) {
		const page = this.props.content.page;
		this.props.fetchActiveItem(item);
		// console.log(this.props.clickedItems);
		// console.log(this.props.content.page);
		// const currentPage = this.props.content.page;

		/*
			1. if page has not been clicked yet, then send both page and item
			2. if page has been clicked, send both page and item
		*/

		if(Object.getOwnPropertyNames(this.props.clickedItems).length === 0 || this.props.clickedItems[page] === undefined) {
			this.props.fetchClickedItems(page, item);
		} else {
			const itemAlreadyClicked = this.props.clickedItems[page].includes(item);
			if (!itemAlreadyClicked && !this.checkAnimationState()) this.props.fetchClickedItems(page, item);
		}

		import(/* webpackChunkName: "video" */ './Video/Video').then(VideoComponent => {
      this.props.fetchAsyncVideoComponent(VideoComponent.default);
    });
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
		const imageContent = this.props.content.itemImage;
		const textContent = this.props.content.itemText;
		const page = this.props.content.page;
		const clickedItems = this.props.clickedItems[page];

		return (
			<div className={this.setClass(number, position)} onMouseOver={scroll} onClick={click}>
				<ItemImage itemNumber={number} clickedItems={clickedItems} scrolledItem={scrollCheck()} content={imageContent} />
				<ItemText itemNumber={number} scrolledItem={scrollCheck()} content={textContent} />
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
		scrolledItem: state.scrolledItem,
		activeItem: state.activeItem,
		clickedItems: state.clickedItems,
		siteAnimating: state.siteAnimating,
		deviceType: state.deviceType,
		content: state.content
	});

export default connect(
	mapStateToProps, { fetchScrolledItem, fetchActiveItem, fetchClickedItems, fetchAsyncVideoComponent }
)(ItemContainer);
