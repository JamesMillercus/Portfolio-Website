/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  asset,
  VrButton,
  NativeModules,
  AppRegistry
} from 'react-360';
import { ImageBackground } from 'react-native';

export default class HeroIcon extends React.Component {
  state = {
    hover: ''
  };

  render() {
    return (
        <View>
          <View style={[this.props.iconStyle, this.state.hover === this.props.iconName ? this.props.iconHoverStyle : null]}>
            <ImageBackground source={asset(this.props.iconImg)} style={this.props.iconImgStyle} />
          </View>
          <VrButton
            onEnter={() => this.setState({ hover: this.props.iconName })} onExit={() => this.setState({ hover: '' })}
            onClick={() => NativeModules.LinkingManager.openURL(this.props.iconUrl)}
            style={this.props.iconHitBoxStyle}
          />
        </View>
    );
  }
}

AppRegistry.registerComponent('HeroIcon', () => HeroIcon);
