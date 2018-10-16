import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  VrButton,
  Environment,
  NativeModules,
  AppRegistry
} from 'react-360';
import { ImageBackground } from 'react-native';

export default class Hero extends React.Component {
  state = {
    hover: '',
    heroText: ''
  };

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  heroImageStyle() {
    if (this.state.heroText === 'scrolled') return styles.heroImage;
    return styles.unscrolledHeroImage;
  }

  heroImage() {
    if (this.state.heroText === 'scrolled') return asset('design.png');
    return asset('heroLogo.png');
  }

  heroIconStyle() {
    if (this.state.heroText === 'scrolled') return styles.heroIcon;
    return styles.unscrolledHeroIcon;
  }

  heroIconShadowStyle() {
    if (this.state.heroText === 'scrolled') return styles.heroIconShadow;
  }

  textStyle() {
    if (this.state.heroText === 'scrolled') {
      if (this.state.hover === 'left') return styles.leftHeroText;
      else if (this.state.hover === 'right') return styles.rightHeroText;
      return styles.heroText;
    }
    return styles.unscrolledHeroText;
  }

  renderText() {
    if (this.state.heroText === 'scrolled') {
      if (this.state.hover === 'left') return 'Tell me about your ideas on: hi@jamesmiller.design';
      else if (this.state.hover === 'right') return 'How I can help launch your ideas with technology';
      return 'Creative Technology projects I have worked on';
    }
      return 'DESIGN AND TECHNOLOGY TECHNOLOGY CONSULTANCY';
  }

  render() {
    return (
          <View style={styles.heroContainer} onEnter={() => this.setState({ heroText: 'scrolled' })} onExit={() => this.setState({ heroText: '' })}>
            <View style={[styles.leftIcon, this.state.hover === 'left' ? styles.leftIconHover : null]}>
              <ImageBackground source={asset('mail.png')} style={styles.leftIconImage} />
            </View>
            <VrButton
              onEnter={() => this.setState({ hover: 'left' })} onExit={() => this.setState({ hover: '' })}
              onClick={() => NativeModules.LinkingManager.openURL('mailto:hi@jamesmiller.design')}
              style={styles.leftIconHitBox}
            />
            <View style={[styles.rightIcon, this.state.hover === 'right' ? styles.rightIconHover : null]}>
              <ImageBackground source={asset('tech.png')} style={styles.rightIconImage} />
            </View>
            <VrButton
              onEnter={() => this.setState({ hover: 'right' })} onExit={() => this.setState({ hover: '' })}
              onClick={() => NativeModules.LinkingManager.openURL('/webvr/services')}
              style={styles.rightIconHitBox}
            />
            <View style={this.heroIconShadowStyle()} />
            <View style={this.heroIconStyle()} />
            <Image source={this.heroImage()} style={this.heroImageStyle()} />
            <Text style={this.textStyle()} >
              {this.renderText()}
            </Text>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  heroContainer: {
    width: 600,
    height: 300,
    // backgroundColor: '#639dda'
  },
  heroIcon: {
    marginTop: 20,
    marginLeft: 215,
    borderRadius: 200 / 2,
    width: 160,
    height: 160,
    backgroundColor: '#008f9c',
    position: 'absolute'
  },
  unscrolledHeroIcon: {
    marginTop: 35,
    marginLeft: 230,
    borderRadius: 200 / 2,
    width: 140,
    height: 140,
    backgroundColor: '#7d7d7d',
    position: 'absolute'
  },
  heroIconShadow: {
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
  },
  heroText: {
    marginTop: 220,
    fontSize: 25,
    color: '#008f9c',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: 600,
    height: 80
  },
  unscrolledHeroText: {
    marginTop: 220,
    fontSize: 20,
    color: '#7d7d7d',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: 600,
    height: 80
  },
  leftHeroText: {
    marginTop: 220,
    fontSize: 25,
    color: '#1d9c00',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: 600,
    height: 80
  },
  rightHeroText: {
    marginTop: 220,
    fontSize: 25,
    color: '#e4bc02',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: 600,
    height: 80
  },
  leftIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 23,
    borderRadius: 100 / 2
  },
  leftIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#269a18',
    position: 'absolute',
    marginTop: 60,
    borderRadius: 100 / 2
  },
  leftIconHitBox: {
    width: 150,
    height: 150,
    // backgroundColor: '#ff0006',
    marginTop: '4.5%',
    position: 'absolute',
    borderRadius: 150 / 2
  },
  leftIconImage: {
    width: 50,
    height: 33,
    marginTop: 33,
    marginLeft: '25%'
  },
  rightIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 475,
    borderRadius: 100 / 2,
  },
  rightIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#e3bb2a',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 475,
    borderRadius: 100 / 2
  },
  rightIconImage: {
    width: 50,
    height: 33,
    marginTop: 33,
    marginLeft: '26%'
  },
  rightIconHitBox: {
    width: 150,
    height: 150,
    // backgroundColor: '#ff0006',
    marginTop: '5.8%',
    position: 'absolute',
    borderRadius: 150 / 2,
    marginLeft: 450
  },
});

AppRegistry.registerComponent('Hero', () => Hero);
