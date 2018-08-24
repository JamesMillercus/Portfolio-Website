import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroHeaderConfig from './assets/config/heroHeaderConfig.js';
import HeroSubChars from './../HeroSubChars/HeroSubChars';
import { fetchCurrentHeaderChars } from './../../../../../../actions';
import './assets/scss';

class HeroHeader extends Component {

  heroHeader(activeHeroText, selectedItem) {
    if (selectedItem === 4) {
      if (this.props.heroTextAnimation) return this.updateHero(activeHeroText, selectedItem);
      return this.updateHero('none', null);
    }
    return this.updateHero(activeHeroText, selectedItem);
	}

  updateHero(activeHeroText, selectedItem) {
    let returntext;
    Reflect.ownKeys(heroHeaderConfig).forEach(key => {
      if (selectedItem === 4 || selectedItem === null) {
        if (activeHeroText === key) {
          returntext = heroHeaderConfig[key];
        }
      } else if (`item${selectedItem}` === key) {
        returntext = heroHeaderConfig[key];
      }
    });
    return returntext;
  }

  render() {
    return (
      <HeroSubChars
        charLoader={this.heroHeader(this.props.activeHeroIcon, this.props.scrolledItem)}
        scrolledItem={this.props.scrolledItem}
        currentChars={this.props.currentHeaderChars}
        fetchCurrentChars={this.props.fetchCurrentHeaderChars}
        heroTextStyle={'heroHeaderText'}
      />
    );
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	heroTextAnimation: state.heroTextAnimation,
  currentHeaderChars: state.currentHeaderChars
});

export default connect(mapStateToProps, { fetchCurrentHeaderChars })(HeroHeader);
