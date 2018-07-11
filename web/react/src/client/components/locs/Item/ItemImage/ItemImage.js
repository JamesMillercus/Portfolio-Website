import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClickedItems, fetchActiveItem } from './../../../../actions';
import './assets/scss/ItemImg.scss';
import './assets/scss/ItemActiveImg.scss';
import './assets/images/bottomcenter.png';
import './assets/images/bottomleft.png';
import './assets/images/bottomright.png';
import './assets/images/middleleft.png';
import './assets/images/middleright.png';
import './assets/images/topcenter.png';
import './assets/images/topleft.png';
import './assets/images/topright.png';
import './assets/images/bottomcenter.gif';
import './assets/images/bottomleft.gif';
import './assets/images/bottomright.gif';
import './assets/images/middleleft.gif';
import './assets/images/middleright.gif';
import './assets/images/topcenter.gif';
import './assets/images/topleft.gif';
import './assets/images/topright.gif';

const ItemImage = ({itemNumber, clickedItems}) => {

	const setClass = (itemNumber) => {
		if(clickedItems.includes(itemNumber)) return "activeImg";
		else return "img";
	}

	return <div className = {setClass(itemNumber)} />;
	
}

export default ItemImage;

// dumb component with access to the store
// const Image = ({ itemNumber, clickedItems, activeItem }) => {

// 	const setClass = (itemNumber) => {
// 		if(clickedItems.includes(itemNumber)) return "activeImg";
// 		else return "img";
// 	}

// 	return (
// 		<div className = {setClass(itemNumber)} />
// 	)

// }


// // map the state of data called from fetchUsers to users[state.users]
// const mapStateToProps = ({clickedItems, activeItem}) => {
// 	return { clickedItems, activeItem };
// }

// export default connect(mapStateToProps)(Image);