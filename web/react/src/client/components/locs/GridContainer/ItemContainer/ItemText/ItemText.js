import React from 'react';
import itemTextConfig from './assets/config/itemTextConfig';
import './assets/scss';

const ItemText = ({ itemNumber, scrolledItem }) => {
const header = itemTextConfig[itemNumber].header;
const paragraph = itemTextConfig[itemNumber].paragraph;

const setClass = () => {
	const itemTextClass = ['text'];
	if (scrolledItem) itemTextClass.push('scrolledText');
	return itemTextClass;
};

	return (
    <div className={setClass().join(' ')}>
			<span className='textContainer'>
				<h1> {header} </h1>
				<p> {paragraph} </p>
			</span>
    </div>
  );
};

export default ItemText;
