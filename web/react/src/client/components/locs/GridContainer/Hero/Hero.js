import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScrolledItem } from './../../../../actions';
import HeroIcon from './HeroIcon/HeroIcon';
import HeroTextContainer from './HeroTextContainer/HeroTextContainer';

class Hero extends Component {
	scrolledItem(item) {
		const deviceType = this.props.deviceType;
		if (deviceType === 'laptop') this.props.fetchScrolledItem(item);
	}

	revealHeroIcons() {
		const siteAnimating = this.props.siteAnimating;
		const scrolledItem = this.props.scrolledItem;
		if (scrolledItem === 4 && siteAnimating === 'finishedAnimating') return true;
		return false;
	}

	renderHeroIcons() {
		const icons = [];
		const reveal = this.revealHeroIcons();
		const heroIconContent = this.props.content.heroIcon;
		// push all content into the items array

		Reflect.ownKeys(heroIconContent).forEach(key => {
			const css = key;
			const href = heroIconContent[key].href;
			icons.push(<HeroIcon className={css} href={href} revealIcons={reveal} key={key} />);
		});

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
	siteAnimating: state.siteAnimating,
	deviceType: state.deviceType,
	content: state.content
});


export default connect(mapStateToProps, { fetchScrolledItem })(Hero);
