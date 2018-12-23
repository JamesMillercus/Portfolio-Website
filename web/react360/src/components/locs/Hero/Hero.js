/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import { StyleSheet, View } from 'react-360';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchHeroText, fetchHeroHover } from './../../../actions';
import HeroIcon from './HeroIcon';
import HeroLogo from './HeroLogo';
import HeroText from './HeroText';
import getDevice from './../../hocs/getDevice';

class Hero extends React.Component {

  render() {
    const mouseOver = () => this.props.fetchHeroText('scrolled');
    const mouseOut = () => this.props.fetchHeroText('');
    return (
      <View style={styles.hero} onEnter={() => mouseOver()} onExit={() => mouseOut()} >
        <HeroIcon
          iconName={this.props.centerLeftIconName}
          iconImg={this.props.centerLeftIconImage}
          iconUrl={this.props.centerLeftIconHref}
          webMode={this.props.webMode}
        />
        <HeroIcon
          iconName={this.props.centerRightIconName}
          iconImg={this.props.centerRightIconImage}
          iconUrl={this.props.centerRightIconHref}
          webMode={this.props.webMode}
        />
        <HeroLogo
          logoImage={this.props.logoImage}
          logoImageScrolled={this.props.logoImageScrolled}
          centerLogoIconName={this.props.centerLogoIconName}
          centerHref={this.props.centerHref}
          heroText={this.props.heroText}
          heroHover={this.props.heroHover}
          fetchHeroHover={this.props.fetchHeroHover}
          webMode={this.props.webMode}
        />
        <HeroText
          textNoScroll={this.props.textNoScroll}
          textColorNoScroll={this.props.textColorNoScroll}
          textScrollHero={this.props.textScrollHero}
          textColorScrollHero={this.props.textColorScrollHero}
          textScrollCenterLeftIcon={this.props.textScrollCenterLeftIcon}
          textColorScrollCenterLeftIcon={this.props.textColorScrollCenterLeftIcon}
          textScrollCenterRightIcon={this.props.textScrollCenterRightIcon}
          textColorScrollCenterRightIcon={this.props.textColorScrollCenterRightIcon}
          logoTextScrolled={this.props.logoTextScrolled}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ r360, heroText, heroHover }) => ({ r360, heroHover, heroText });

// export default connect(mapStateToProps, { fetchHeroText, fetchHeroHover })(Hero);
export default compose(getDevice, connect(mapStateToProps, { fetchHeroText, fetchHeroHover }))(Hero);

const styles = StyleSheet.create({
  hero: {
    width: 700,
    height: 300
    // backgroundColor: '#639dda'
  }
});
