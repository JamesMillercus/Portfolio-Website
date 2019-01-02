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
import LoadingBar from './LoadingBar';
import { fetchHeroHover, fetchLoadingContent } from './../../../actions';

class HeroLogo extends React.Component {

  componentDidUpdate() {
    const { webMode, heroHover, centerLogoIconName, fetchLoadingContent } = this.props;
    if (webMode === 'webvr' && heroHover === centerLogoIconName) fetchLoadingContent(heroHover);
    else if (heroHover === '') fetchLoadingContent('');
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
    NativeModules.LinkingManager.openURL(centerHref);
  }

  render() {
    const { fetchHeroHover, centerLogoIconName, webMode, centerHref } = this.props;
    return (
        <View>
          <View style={this.heroLogoShadowStyle()} />
          <View style={this.heroLogoStyle()}>
            <LoadingBar content={'Opening link'} marginTop={-70} marginLeft={-15} marginBottom={10} width={200} id={centerLogoIconName} url={centerHref} />
            <Image source={this.heroImage()} style={this.heroImageStyle()} />
          </View>
          <VrButton
            onEnter={() => fetchHeroHover(centerLogoIconName)}
            onExit={() => fetchHeroHover('')}
            onClick={() => this.modeCheck(webMode)}
            style={styles.heroLogoHitBox}
          />
        </View>
    );
  }
}

const mapStateToProps = ({ heroText, heroHover, webMode }) => ({ heroText, heroHover, webMode });

export default connect(mapStateToProps, { fetchHeroHover, fetchLoadingContent })(HeroLogo);

const styles = StyleSheet.create({
  heroLogo: {
    marginTop: 70,
    marginLeft: 267,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    backgroundColor: '#008f9c',
    position: 'absolute',
    overflow: 'hidden',
  },
  heroLogoHitBox: {
    marginTop: 70,
    marginLeft: 267,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    position: 'absolute',
  },
  unscrolledHeroLogo: {
    marginTop: 85,
    marginLeft: 282,
    borderRadius: 200 / 2,
    width: 140,
    height: 140,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    overflow: 'hidden',
  },
  heroLogoShadow: {
    marginTop: 72,
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
    marginTop: 30,
    marginLeft: 30,
    position: 'absolute'
  },
  unscrolledHeroImage: {
    width: 90,
    height: 80,
    marginTop: 28,
    marginLeft: 27,
    position: 'absolute'
  }
});
