import React from 'react';
import './assets/scss';
import './assets/images';

const ItemImage = ({ itemNumber, clickedItems, scrolledItem, content }) => {
	const backgroundImage = () => {
		for (let x = 0; x < content.length; x++) {
			if (itemNumber === x) {
				if (clickedItems.includes(itemNumber)) {
					if (content[x].gif !== null) return content[x].gif;
				} else if (content[x].png !== null) return content[x].png;
			}
		}
	};

	const divStyle = {
		backgroundImage: `url(/assets/images/${backgroundImage()})`
	};

	const setClass = () => {
		const itemImageClass = ['img'];
		if (scrolledItem) itemImageClass.push('scrolledImg');
		if (clickedItems.includes(itemNumber)) itemImageClass.push('activeImg');
		return itemImageClass;
	};

	return <div className={setClass().join(' ')} style={divStyle} />;
};

export default ItemImage;
