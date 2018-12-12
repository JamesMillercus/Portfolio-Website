import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScrolledItem, fetchScrolledHeroIcon, fetchHeroKeyPress } from './../../../../actions';
import HeroIcon from './HeroIcon/HeroIcon';
import HeroHeader from './HeroHeader/HeroHeader';
import HeroTextContainer from './HeroTextContainer/HeroTextContainer';

class Hero extends Component {
	componentDidMount() {
		document.addEventListener('keypress', this.keyPress.bind(this));
	}

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

	scrolledHero(className) {
		const { deviceType, siteAnimating, fetchScrolledHeroIcon } = this.props;
		if (siteAnimating === 'finishedAnimating') {
			if (deviceType === 'laptop') fetchScrolledHeroIcon(className);
		}
	}

	keyPress(event) {
		/*
		1. create a reducer which triggers HeroIcon once they key 'f' is pressed
		2. create a function in HeroIcon which opens the link based on when the reducer is triggered
		*/

		const {
			heroKeyPress, scrolledHeroIcon, scrolledItem, activeHeroIcon, fetchHeroKeyPress
		} = this.props;

		const scrollOut = () => {
			this.scrolledHero('none');
			fetchHeroKeyPress(false);
		};

		if (scrolledItem === 4 && heroKeyPress) {
			if (scrolledHeroIcon === null || scrolledHeroIcon === 'none') {
				if (activeHeroIcon === null || activeHeroIcon === 'none') {
					if (event.key === 'a' || event.key === 'A') this.scrolledHero('centerLeftIcon');
					else if (event.key === 'd' || event.key === 'D') this.scrolledHero('centerRightIcon');
					else if (event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') scrollOut();
				}
			} else if (scrolledHeroIcon === 'centerRightIcon' && activeHeroIcon === 'centerRightIcon') {
				if (event.key === 'a' || event.key === 'A') this.scrolledHero('none');
				else if (event.key === 'd' || event.key === 'D' || event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') scrollOut();
			} else if (scrolledHeroIcon === 'centerLeftIcon' && activeHeroIcon === 'centerLeftIcon') {
				if (event.key === 'd' || event.key === 'D') this.scrolledHero('none');
				else if (event.key === 'a' || event.key === 'A' || event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') scrollOut();
			}
		}
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
				<HeroHeader />
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
	content: state.content,
	activeHeroIcon: state.activeHeroIcon,
	scrolledHeroIcon: state.scrolledHeroIcon,
	heroKeyPress: state.heroKeyPress
});


export default connect(mapStateToProps, { fetchScrolledItem, fetchScrolledHeroIcon, fetchHeroKeyPress })(Hero);
