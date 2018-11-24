/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  asset,
  NativeModules,
  VrButton
} from 'react-360';
import { fetchHeroHover } from './../../../actions';

class HeroLogo extends React.Component {

  heroImageStyle() {
    const { heroText } = this.props;
    if (heroText === 'scrolled') return styles.heroImage;
    return styles.unscrolledHeroImage;
  }

  heroImage() {
    const { heroText, logoImage, heroHover, centerLogoIconName, logoImageScrolled } = this.props;
    if (heroText === 'scrolled') {
      if (heroHover === centerLogoIconName) return asset(logoImageScrolled);
      return asset(logoImage);
    }
    return asset('heroLogo.png');
  }

  heroLogoStyle() {
    const { heroText } = this.props;
    if (heroText === 'scrolled') return styles.heroLogo;
    return styles.unscrolledHeroLogo;
  }

  heroLogoShadowStyle() {
    const { heroText } = this.props;
    if (heroText === 'scrolled') return styles.heroLogoShadow;
  }

  render() {
    const { fetchHeroHover, centerLogoIconName, centerHref } = this.props;
    return (
        <View>
          <View style={this.heroLogoShadowStyle()} />
          <View style={this.heroLogoStyle()} />
          <Image source={this.heroImage()} style={this.heroImageStyle()} />
          <VrButton
            onEnter={() => fetchHeroHover(centerLogoIconName)} onExit={() => fetchHeroHover('')}
            onClick={() => NativeModules.LinkingManager.openURL(centerHref)}
            style={styles.heroLogoHitBox}
          />
        </View>
    );
  }
}

const mapStateToProps = ({ heroText, heroHover }) => ({ heroText, heroHover });

export default connect(mapStateToProps, { fetchHeroHover })(HeroLogo);

const styles = StyleSheet.create({
  heroLogo: {
    marginTop: 20,
    marginLeft: 215,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    backgroundColor: '#008f9c',
    position: 'absolute'
  },
  heroLogoHitBox: {
    marginTop: 20,
    marginLeft: 215,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    position: 'absolute'
  },
  unscrolledHeroLogo: {
    marginTop: 35,
    marginLeft: 230,
    borderRadius: 200 / 2,
    width: 140,
    height: 140,
    backgroundColor: '#7d7d7d',
    position: 'absolute'
  },
  heroLogoShadow: {
    marginTop: 22,
    marginLeft: 227,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    backgroundColor: '#000',
    position: 'absolute'
  },
  heroImage: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginLeft: 245,
    position: 'absolute'
  },
  unscrolledHeroImage: {
    width: 80,
    height: 80,
    marginTop: 65,
    marginLeft: 262,
    position: 'absolute'
  }
});
