import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-360';
import Hero from './Hero';

export default class HeroContainer extends React.Component {
  render() {
    return (
      <View style={styles.heroContainer}>
        <Hero
          centerLeftIconName={this.props.centerLeftIconName}
          centerLeftIconImage={this.props.centerLeftIconImage}
          centerLeftIconHref={this.props.centerLeftIconHref}
          centerRightIconName={this.props.centerRightIconName}
          centerRightIconImage={this.props.centerRightIconImage}
          centerRightIconHref={this.props.centerRightIconHref}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heroContainer: {
    width: 4700,
    height: 1000,
    // backgroundColor: '#000'
  }
});

AppRegistry.registerComponent('HeroContainer', () => HeroContainer);
