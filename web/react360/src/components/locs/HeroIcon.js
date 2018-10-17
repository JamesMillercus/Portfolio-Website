/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  asset,
  VrButton,
  NativeModules,
  StyleSheet
} from 'react-360';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { fetchHeroHover } from './../../actions';

class HeroIcon extends React.Component {

  iconStyle() {
    if (this.props.iconName === 'centerLeftIcon') return styles.leftIcon;
    return styles.rightIcon;
  }

  iconHoverStyle() {
    if (this.props.iconName === 'centerLeftIcon') return styles.leftIconHover;
    return styles.rightIconHover;
  }

  iconHitBoxStyle() {
    if (this.props.iconName === 'centerLeftIcon') return styles.leftIconHitBox;
    return styles.rightIconHitBox;
  }

  iconImgStyle() {
    if (this.props.iconName === 'centerLeftIcon') return styles.leftIconImage;
    return styles.rightIconImage;
  }

  render() {
    const { heroHover } = this.props;
    return (
        <View>
          <View style={[this.iconStyle(), heroHover === this.props.iconName ? this.iconHoverStyle() : null]}>
            <ImageBackground source={asset(this.props.iconImg)} style={this.iconImgStyle()} />
          </View>
          <VrButton
            onEnter={() => this.props.fetchHeroHover(this.props.iconName)} onExit={() => this.props.fetchHeroHover('')}
            onClick={() => NativeModules.LinkingManager.openURL(this.props.iconUrl)}
            style={this.iconHitBoxStyle()}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});


const mapStateToProps = ({ heroHover }) => ({ heroHover });

export default connect(mapStateToProps, { fetchHeroHover })(HeroIcon);
