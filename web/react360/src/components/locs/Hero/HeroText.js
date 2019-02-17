/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-360';
import { connect } from 'react-redux';

class HeroText extends React.Component {

  textStyle() {
    const { heroHover, heroText } = this.props;
    if (heroText === 'scrolled') {
      if (heroHover === 'centerLeftIcon') return this.styles.leftHeroText;
      else if (heroHover === 'centerRightIcon') return this.styles.rightHeroText;
      return this.styles.heroText;
    }
    return this.styles.unscrolledHeroText;
  }

  renderText() {
    const {
      heroText, heroHover, textNoScroll, textScrollHero, textScrollCenterLeftIcon, textScrollCenterRightIcon, logoTextScrolled, centerLogoIconName
    } = this.props;
    if (heroText === 'scrolled') {
      if (heroHover === 'centerLeftIcon') return textScrollCenterLeftIcon;
      else if (heroHover === 'centerRightIcon') return textScrollCenterRightIcon;
      else if (heroHover === centerLogoIconName) return logoTextScrolled;
      return textScrollHero;
    }
    return textNoScroll;
  }

  render() {
    this.styles = StyleSheet.create({
      heroText: {
        marginTop: 270,
        fontSize: 25,
        color: this.props.textColorScrollHero,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        width: 700,
        height: 80
      },
      unscrolledHeroText: {
        marginTop: 270,
        fontSize: 20,
        color: this.props.textColorNoScroll,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        width: 700,
        height: 80
      },
      leftHeroText: {
        marginTop: 270,
        fontSize: 25,
        color: this.props.textColorScrollCenterLeftIcon,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        width: 700,
        height: 80
      },
      rightHeroText: {
        marginTop: 270,
        fontSize: 25,
        color: this.props.textColorScrollCenterRightIcon,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        width: 700,
        height: 80
      }
    });
    return (
        <View>
          <Text style={this.textStyle()} >
            {this.renderText()}
          </Text>
        </View>
    );
  }
}


const mapStateToProps = ({ heroHover, heroText }) => ({ heroHover, heroText });

export default connect(mapStateToProps, null)(HeroText);
