import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeroHeader from './HeroHeader/HeroHeader';
import HeroText from './HeroText/HeroText';
import HeroFooter from './HeroFooter/HeroFooter';
import './assets/scss';

class HeroTextContainer extends Component {

	render() {
		const activeHero = this.props.activeHeroIcon;
		const scrolledItem = this.props.scrolledItem;
		const deviceType = this.props.deviceType;
		return (
			<div className={'heroTextContainer'}>
				<HeroHeader activeHero={activeHero} scrolledItem={scrolledItem} deviceType={deviceType} />
				<HeroText
					activeHero={activeHero}
					scrolledItem={scrolledItem}
					deviceType={deviceType}
				/>
				<HeroFooter activeHero={activeHero} scrolledItem={scrolledItem} deviceType={deviceType} />
			</div>
		);
	}
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	deviceType: state.deviceType
});

export default connect(mapStateToProps, null)(HeroTextContainer);
