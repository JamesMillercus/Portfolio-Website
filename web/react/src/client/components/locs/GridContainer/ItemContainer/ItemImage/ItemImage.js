import React from 'react';
import './assets/scss';
import './assets/images';

// do same for scrolled text
// make sure you're happy with this section
// apply it to all other sections

const ItemImage = ({ itemNumber, clickedItems, scrolledItem }) => {
	const setClass = () => {
		const itemImageClass = ['img'];
		if (scrolledItem) itemImageClass.push('scrolledImg');
		if (clickedItems.includes(itemNumber)) itemImageClass.push('activeImg');
		return itemImageClass;
	};

	return <div className={setClass().join(' ')} />;
};

export default ItemImage;
