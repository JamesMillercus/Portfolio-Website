import React from 'react';
import {itemConfig} from './../config/itemConfig'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import './Item.scss';

const Item = (settings) => {
	const number = settings.number;
	const position = itemConfig[number].position;
	const header = itemConfig[number].header;
	const paragraph = itemConfig[number].paragraph;

	return (
		<div className = {`item${number} item${position}`}>
			<div className = "img" />
			<div className = "video" />
			<div className = "text" />
				<h1> {header} </h1>
				<p> {paragraph} </p>
			<div className = "spacer" />
		</div>
	)
};

export default Item;