import React from 'react';
import {itemConfig} from './../config/itemConfig'

// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import './Hero.scss';

const Hero = () => {

	return (
		<div className = "item4 middlecenter">
			<p> { heroParagraph() } </p>
			<a className = "mail icon" href = 'mailto:hi@jamesmiller.design' />
			<a className = "linkedin icon" href = 'https://uk.linkedin.com/in/james-miller-b0bb4478/' target='_blank' />
			<a className = "github icon" href = 'https://github.com/JamesMillercus/' target='_blank' />
			<a className = "twitter icon" href = 'https://twitter.com/JamesMillerArt/' target='_blank' />
			<a className = "instagram icon" href = 'https://www.instagram.com/jamesmillerart/' target='_blank' />
			<a className = "pinterest icon" href = 'https://www.pinterest.co.uk/jameswcmiller/' target='_blank' />
		</div>
	)
};

let heroParagraph = () => {
	return itemConfig[4].paragraph.map((character, index) =>{
		return <span key = {index} className = "herotext start"> {character} </span>
	});
}


export default Hero;