import React, { Component } from 'react';
import { fetchScrolledItem } from './../../../../actions';
import { connect } from 'react-redux';
import heroConfig from './assets/config/heroConfig.js';
import HeroIcon from './HeroIcon/HeroIcon';
import HeroText from './HeroText/HeroText';

class Hero extends Component {

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	revealHeroIcons() {
		if(this.props.scrolledItem == 4) return true;
		else return false;
	}

	renderHeroIcons(){
		const icons = [];
		// push all content into the items array
		for(let x = 0; x<6; x++) {
			icons.push(<HeroIcon className={heroConfig[x].className} href={heroConfig[x].href} revealIcons={this.revealHeroIcons()} key={x} />);
		}

  		return icons;
	}

	render() {
		const number = this.props.number;
		const heroContainerMouseOver = () => this.scrolledItem(number);

		return (
			<div className = "item4 middlecenter" onMouseOver={heroContainerMouseOver}>
				<HeroText />
				{this.renderHeroIcons()}
			</div>
		)
	}
};


// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => {
	return { 
		scrolledItem: state.scrolledItem
	};
}


export default connect(mapStateToProps, { fetchScrolledItem })(Hero);