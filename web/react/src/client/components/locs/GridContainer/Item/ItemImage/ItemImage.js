import React from 'react';
import './assets/scss';
import './assets/images';

const ItemImage = ({ itemNumber, clickedItems }) => {
	const setClass = () => {
		if (clickedItems.includes(itemNumber)) return 'activeImg';
		return 'img';
	};

	return <div className={setClass()} />;
};

export default ItemImage;
