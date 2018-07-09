import React, { Component } from 'react';
import { fetchScrolledItem } from './../../../../../actions';
import { connect } from 'react-redux';
import {itemConfig} from './../../config/itemConfig'
import './scss/HeroText.scss';
import './scss/HeroTextAnimation.scss';
import './scss/HeroIcons.scss';
import './scss/HeroIconAnimation.scss';
import './assets/github.jpg';
import './assets/instagram.jpg';
import './assets/linkedin.jpg';
import './assets/mail.jpg';
import './assets/pinterest.jpg';
import './assets/twitter.jpg';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

class Hero extends Component {

	heroParagraph() {
		return itemConfig[4].paragraph.map((character, index) =>{
			return <span key = {index} className = "herotext start"> {character} </span>
		});
	}

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	setClass(keyIcon) {
		let iconClasses = [keyIcon, "icon"];
		if(this.props.scrolledItem == 4) {
			iconClasses.push('active');
		}
		return iconClasses;
	}

	render() {
		const number = this.props.number;
		let mouseOver = () => this.scrolledItem(this.props.number);
		return (
			<div className = "item4 middlecenter" onMouseOver={mouseOver}>
				<p> { this.heroParagraph() } </p>
				<a className = {this.setClass("mail").join(' ')} href = 'mailto:hi@jamesmiller.design' />
				<a className = {this.setClass("linkedin").join(' ')} href = 'https://uk.linkedin.com/in/james-miller-b0bb4478/' target='_blank' />
				<a className = {this.setClass("github").join(' ')} href = 'https://github.com/JamesMillercus/' target='_blank' />
				<a className = {this.setClass("twitter").join(' ')} href = 'https://twitter.com/JamesMillerArt/' target='_blank' />
				<a className = {this.setClass("instagram").join(' ')} href = 'https://www.instagram.com/jamesmillerart/' target='_blank' />
				<a className = {this.setClass("pinterest").join(' ')} href = 'https://www.pinterest.co.uk/jameswcmiller/' target='_blank' />
			</div>
		)
	}
};


// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { scrolledItem: state.scrolledItem };
}


export default connect(mapStateToProps, { fetchScrolledItem })(Hero);