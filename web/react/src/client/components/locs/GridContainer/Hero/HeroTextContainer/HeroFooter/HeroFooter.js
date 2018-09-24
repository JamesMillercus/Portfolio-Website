import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeroSubChars from './HeroSubChars/HeroSubChars';
import { fetchCurrentFooterChars } from './../../../../../../actions';
import './assets/scss';

class HeroFooter extends Component {

  heroFooter(activeHeroText, selectedItem) {
    if (this.props.siteAnimating === 'finishedAnimating') {
      if (selectedItem === 4) {
        // if (this.props.heroTextAnimation) {
          return this.updateHero(activeHeroText, selectedItem);
        // }
        // return this.updateHero('none', null);
      }
      return this.updateHero(activeHeroText, selectedItem);
    }
	}

  updateHero(activeHeroText, selectedItem) {
    const footerContent = this.props.content.heroFooterText;
    let returntext;
    Reflect.ownKeys(footerContent).forEach(key => {
      if (selectedItem === 4) {
        if (activeHeroText === key) returntext = footerContent[key].text;
        if (activeHeroText === 'none') returntext = footerContent.centerIcon.text;
      } else returntext = footerContent.none.text;
    });
    return returntext;
  }

  divStyle(activeHeroText, selectedItem) {
    const footerContent = this.props.content.heroFooterText;
    let selectedcolor;
    Reflect.ownKeys(footerContent).forEach(key => {
      if (selectedItem === 4) {
        if (activeHeroText === key) selectedcolor = footerContent[key].color;
        if (activeHeroText === 'none') selectedcolor = footerContent.centerIcon.color;
      } else selectedcolor = footerContent.none.color;
    });

		const returncolor = { color: selectedcolor };
    return returncolor;
	}

  render() {
    return (
      <HeroSubChars
        charLoader={this.heroFooter(this.props.activeHeroIcon, this.props.scrolledItem)}
        scrolledItem={this.props.scrolledItem}
        currentChars={this.props.currentFooterChars}
        fetchCurrentChars={this.props.fetchCurrentFooterChars}
        heroTextStyle={'heroFooterText'}
        activeHeroIcon={this.props.activeHeroIcon}
        style={this.divStyle(this.props.activeHeroIcon, this.props.scrolledItem)}
      />
    );
    // return <div className={setClass().join(' ')} style={divStyle} />;
  }
}

// map the state of data called from fetchUsers to users[state.users]
const mapStateToProps = (state) => ({
	activeHeroIcon: state.activeHeroIcon,
	scrolledItem: state.scrolledItem,
	heroTextAnimation: state.heroTextAnimation,
  currentFooterChars: state.currentFooterChars,
  siteAnimating: state.siteAnimating,
  content: state.content
});

export default connect(mapStateToProps, { fetchCurrentFooterChars })(HeroFooter);
