/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import {
  StyleSheet,
  View,
  asset,
  Environment,
} from 'react-360';
import { connect } from 'react-redux';
import { fetchR360, fetchHeroText } from './../../../actions';

import HeroIcon from './HeroIcon';
import HeroLogo from './HeroLogo';
import HeroText from './HeroText';

class Hero extends React.Component {

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }


  render() {
    const mouseOver = () => this.props.fetchHeroText('scrolled');
    const mouseOut = () => this.props.fetchHeroText('');
    return (
      <View style={styles.hero} onEnter={() => mouseOver()} onExit={() => mouseOut()} >
        <HeroIcon
          iconName={this.props.centerLeftIconName}
          iconImg={this.props.centerLeftIconImage}
          iconUrl={this.props.centerLeftIconHref}
        />
        <HeroIcon
          iconName={this.props.centerRightIconName}
          iconImg={this.props.centerRightIconImage}
          iconUrl={this.props.centerRightIconHref}
        />
        <HeroLogo />
        <HeroText />
      </View>
    );
  }
}

const mapStateToProps = ({ r360, heroText, heroHover }) => ({ r360, heroHover, heroText });

export default connect(mapStateToProps, { fetchR360, fetchHeroText })(Hero);

const styles = StyleSheet.create({
  hero: {
    width: 600,
    height: 300,
    marginLeft: 2050,
    marginTop: 300,
    // backgroundColor: '#639dda'
  }
});
