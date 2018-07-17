import React from 'react';
import itemTextConfig from './assets/config/itemTextConfig';
import './assets/scss';

const ItemText = ({ itemNumber }) => {
const header = itemTextConfig[itemNumber].header;
const paragraph = itemTextConfig[itemNumber].paragraph;

	return (
    <div className="text">
      <h1> {header} </h1>
      <p> {paragraph} </p>
    </div>
  );
};

export default ItemText;
