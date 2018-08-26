import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScrolledItem } from './../../../../actions';
import heroConfig from './assets/config/heroConfig.js';
import HeroIcon from './HeroIcon/HeroIcon';
import HeroTextContainer from './HeroTextContainer/HeroTextContainer';

class Hero extends Component {

	scrolledItem(item) {
		this.props.fetchScrolledItem(item);
	}

	revealHeroIcons() {
		if (this.props.navBarRevealed === true) return true;
		return false;
	}

	renderHeroIcons() {
		const icons = [];
		const reveal = this.revealHeroIcons();
		// push all content into the items array
		for (let x = 0; x < heroConfig.length; x++) {
			const css = heroConfig[x].className;
			const href = heroConfig[x].href;
			icons.push(<HeroIcon className={css} href={href} revealIcons={reveal} key={x} />);
		}
		return icons;
	}

	render() {
		const number = this.props.number;
		const heroContainerMouseOver = () => this.scrolledItem(number);

		return (
			<div className="item4 middlecenter" onMouseOver={heroContainerMouseOver}>
				<HeroTextContainer />
				{this.renderHeroIcons()}
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	scrolledItem: state.scrolledItem,
	navBarRevealed: state.navBarRevealed
});


export default connect(mapStateToProps, { fetchScrolledItem })(Hero);
