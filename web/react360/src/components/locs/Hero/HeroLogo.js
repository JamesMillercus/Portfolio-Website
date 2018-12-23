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

  constructor(props) {
    super(props);
    this.animateTimeout = null;
    this.openLink = this.openLink.bind(this);
  }

  componentDidUpdate() {
    const { webMode, heroHover, centerLogoIconName } = this.props;
    if (webMode === 'webvr' && heroHover === centerLogoIconName) this.animateProgress();
    else if (heroHover === '') clearTimeout(this.animateTimeout);
  }

  animateProgress() {
    this.animateTimeout = setTimeout(this.openLink, 1000);
  }

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

  modeCheck(webMode) {
    if (webMode === 'web') this.openLink();
  }

  openLink() {
    const { centerHref } = this.props;
    console.log(centerHref);
    NativeModules.LinkingManager.openURL(centerHref);
  }

  render() {
    const { fetchHeroHover, centerLogoIconName, webMode, centerHref } = this.props;
    return (
        <View>
          <View style={this.heroLogoShadowStyle()} />
          <View style={this.heroLogoStyle()} />
          <Image source={this.heroImage()} style={this.heroImageStyle()} />
          <VrButton
            onEnter={() => fetchHeroHover(centerLogoIconName)} onExit={() => fetchHeroHover('')}
            onClick={() => this.modeCheck(webMode)}
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
    marginLeft: 267,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    backgroundColor: '#008f9c',
    position: 'absolute'
  },
  heroLogoHitBox: {
    marginTop: 20,
    marginLeft: 267,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    position: 'absolute'
  },
  unscrolledHeroLogo: {
    marginTop: 35,
    marginLeft: 282,
    borderRadius: 200 / 2,
    width: 140,
    height: 140,
    backgroundColor: '#7d7d7d',
    position: 'absolute'
  },
  heroLogoShadow: {
    marginTop: 22,
    marginLeft: 279,
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
    marginLeft: 297,
    position: 'absolute'
  },
  unscrolledHeroImage: {
    width: 80,
    height: 80,
    marginTop: 65,
    marginLeft: 314,
    position: 'absolute'
  }
});
