import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroFooterConfig from './assets/config/heroFooterConfig.js';
import HeroSubChars from './../HeroSubChars/HeroSubChars';
import { fetchCurrentFooterChars } from './../../../../../../actions';
import './assets/scss';

class HeroFooter extends Component {

  heroFooter(activeHeroText, selectedItem) {
    if (selectedItem === 4) {
      if (this.props.heroTextAnimation) return this.updateHero(activeHeroText, selectedItem);
      return this.updateHero('none', null);
    }
    return this.updateHero(activeHeroText, selectedItem);
	}

  updateHero(activeHeroText, selectedItem) {
    let returntext;
    Reflect.ownKeys(heroFooterConfig).forEach(key => {
      if (selectedItem === 4 || selectedItem === null) {
        if (activeHeroText === key) {
          returntext = heroFooterConfig[key];
        }
      } else if (`item${selectedItem}` === key) {
        returntext = heroFooterConfig[key];
      }
    });

    return returntext;
  }

  render() {
    return (
      <HeroSubChars
        charLoader={this.heroFooter(this.props.activeHeroIcon, this.props.scrolledItem)}
        scrolledItem={this.props.scrolledItem}
        currentChars={this.props.currentFooterChars}
        fetchCurrentChars={this.props.fetchCurrentFooterChars}
        heroTextStyle={'heroFooterText'}
      />
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	heroTextAnimation: state.heroTextAnimation,
  currentFooterChars: state.currentFooterChars
});

export default connect(mapStateToProps, { fetchCurrentFooterChars })(HeroFooter);
