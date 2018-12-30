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
import LoadingBar from './LoadingBar';
import { fetchHeroHover, fetchLoadingContent } from './../../../actions';

class HeroIcon extends React.Component {

  componentDidUpdate() {
    const { webMode, heroHover, fetchLoadingContent, iconName } = this.props;
    if (webMode === 'webvr' && heroHover === iconName) fetchLoadingContent(heroHover);
    else if (heroHover === '') fetchLoadingContent('');
  }

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
    const { heroHover, iconName, iconUrl } = this.props;
    return (
        <View>
          <View style={[this.iconStyle(), heroHover === iconName ? this.iconHoverStyle() : null]}>
            <LoadingBar content={'Opening link'} marginTop={-70} marginLeft={-15} id={iconName} url={iconUrl} />
            <ImageBackground source={asset(this.props.iconImg)} style={this.iconImgStyle()} />
          </View>
          <VrButton
            onEnter={() => this.props.fetchHeroHover(iconName)}
            onExit={() => this.props.fetchHeroHover('')}
            onClick={() => NativeModules.LinkingManager.openURL(iconUrl)}
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
    marginTop: 110,
    marginLeft: 40,
    borderRadius: 100 / 2
  },
  leftIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#269a18',
    position: 'absolute',
    marginTop: 110,
    borderRadius: 100 / 2
  },
  leftIconHitBox: {
    width: 150,
    height: 150,
    marginLeft: 15,
    // backgroundColor: '#ff0006',
    marginTop: 90,
    position: 'absolute',
    borderRadius: 150 / 2
  },
  leftIconImage: {
    height: 33,
    width: 70,
    marginTop: 33,
    marginLeft: '15%'
  },
  rightIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    marginTop: 110,
    marginLeft: 558,
    borderRadius: 100 / 2,
  },
  rightIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#e3bb2a',
    position: 'absolute',
    marginTop: 110,
    borderRadius: 100 / 2
  },
  rightIconImage: {
    width: 70,
    height: 33,
    marginTop: 33,
    marginLeft: '15%'
  },
  rightIconHitBox: {
    width: 150,
    height: 150,
    // backgroundColor: '#ff0006',
    marginTop: 90,
    position: 'absolute',
    borderRadius: 150 / 2,
    marginLeft: 535
  }
});


const mapStateToProps = ({ heroHover, webMode }) => ({ heroHover, webMode });

export default connect(mapStateToProps, { fetchHeroHover, fetchLoadingContent })(HeroIcon);
