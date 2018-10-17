/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  AppRegistry,
  Image
} from 'react-360';

export default class HeroLogo extends React.Component {

  render() {
    return (
        <View>
          <View style={this.props.heroLogoShadowStyle} />
          <View style={this.props.heroLogoStyle} />
          <Image source={this.props.heroImage} style={this.props.heroImageStyle} />
        </View>
    );
  }
}

AppRegistry.registerComponent('HeroLogo', () => HeroLogo);
