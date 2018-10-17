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
      if (heroHover === 'centerLeftIcon') return styles.leftHeroText;
      else if (heroHover === 'centerRightIcon') return styles.rightHeroText;
      return styles.heroText;
    }
    return styles.unscrolledHeroText;
  }

  renderText() {
    const { heroText, heroHover } = this.props;
    if (heroText === 'scrolled') {
      if (heroHover === 'centerLeftIcon') return 'Tell me about your ideas on: hi@jamesmiller.design';
      else if (heroHover === 'centerRightIcon') {
        return 'How I can help launch your ideas with technology';
      }
      return 'Creative Technology projects I have worked on';
    }
    return 'INTERACTIVE EXPERIENCE & PRODUCT DESIGN SERVICES';
  }

  render() {
    return (
        <View>
          <Text style={this.textStyle()} >
            {this.renderText()}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});


const mapStateToProps = ({ heroHover, heroText }) => ({ heroHover, heroText });

export default connect(mapStateToProps, null)(HeroText);
