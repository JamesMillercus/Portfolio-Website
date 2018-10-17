/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import {
  StyleSheet,
  View,
  asset,
  Environment
} from 'react-360';
import { connect } from 'react-redux';
import { fetchR360, fetchHeroText } from './../../actions';

import HeroIcon from './HeroIcon';
import HeroLogo from './HeroLogo';
import HeroText from './HeroText';

// UPDATE ALL COMPONENTS
// either render 360 pano and add locations in react component, or store r360 (from client.js) in redux to use in this component
// - consider the use of "Environment.{xyz}"?
// implement assets from config file via the home page

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
      <View style={styles.heroContainer} onEnter={() => mouseOver()} onExit={() => mouseOut()} >
        <HeroIcon iconName={'centerLeftIcon'} iconImg={'mail.png'} iconUrl={'mailto:hi@jamesmiller.design'} />
        <HeroIcon iconName={'centerRightIcon'} iconImg={'tech.png'} iconUrl={'/webvr'} />
        <HeroLogo />
        <HeroText />
      </View>
    );
  }
}

const mapStateToProps = ({ r360, heroText, heroHover }) => ({ r360, heroHover, heroText });

export default connect(mapStateToProps, { fetchR360, fetchHeroText })(Hero);

const styles = StyleSheet.create({
  heroContainer: {
    width: 600,
    height: 300,
    // backgroundColor: '#639dda'
  }
});
