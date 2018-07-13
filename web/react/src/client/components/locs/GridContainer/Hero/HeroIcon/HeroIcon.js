import React, { Component } from 'react';
import { fetchActiveHeroIcon } from './../../../../../actions';
import { connect } from 'react-redux';
import './assets/scss/HeroIcons.scss';
import './assets/scss/HeroIconAnimation.scss';
import './assets/images/github.jpg';
import './assets/images/instagram.jpg';
import './assets/images/linkedin.jpg';
import './assets/images/mail.jpg';
import './assets/images/pinterest.jpg';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

class HeroIcon extends Component {

	activateHero(className){
		this.props.fetchActiveHeroIcon(className);
	}
	
	setClass (){
		let iconClasses = [this.props.className, "icon"];
		if(this.props.revealIcons) iconClasses.push("active");
		return iconClasses;
	}

	render(){
		return <a className = {this.setClass().join(' ')} href = {this.props.href} target = '_blank' onMouseOver={this.activateHero.bind(this, this.props.className)} onMouseOut={this.activateHero.bind(this, "none")} />;
	}

	
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		activeHeroIcon: state.activeHeroIcon
	};
}


export default connect(mapStateToProps, { fetchActiveHeroIcon })(HeroIcon);