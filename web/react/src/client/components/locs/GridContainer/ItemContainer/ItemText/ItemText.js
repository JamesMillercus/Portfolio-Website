import React from 'react';
import './assets/scss';

const ItemText = ({ itemNumber, scrolledItem, content }) => {
const header = content[itemNumber].header;
const paragraph = content[itemNumber].paragraph;

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
