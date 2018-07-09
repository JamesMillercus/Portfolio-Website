import React, { Component } from 'react';
import { fetchScrolledItem } from './../../../../../actions';
import { connect } from 'react-redux';
import {itemConfig} from './../../config/itemConfig'
import './scss/ItemContainer.scss';
import './scss/ItemImg.scss';
import './scss/ItemText.scss';
import './scss/ItemTextAnimation.scss';
import './assets/bottomcenter.png';
import './assets/bottomleft.png';
import './assets/bottomright.png';
import './assets/middleleft.png';
import './assets/middleright.png';
import './assets/topcenter.png';
import './assets/topleft.png';
import './assets/topright.png';
// import { Link } from 'react-router-dom';

class Item extends Component {

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	render(){
		let mouseOver = () => this.scrolledItem(this.props.number);
		const number = this.props.number;
		const position = itemConfig[number].position;
		const header = itemConfig[number].header;
		const paragraph = itemConfig[number].paragraph;

		return (
			<div className = {`item${number} item ${position}`} onMouseOver={mouseOver}>
				<div className = "img" />
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
	return { scrolledItem: state.scrolledItem };
}

export default connect(mapStateToProps, { fetchScrolledItem })(Item);