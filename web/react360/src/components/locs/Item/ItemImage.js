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

class ItemImage extends React.Component {

  // <View>
  //   <View style={[this.iconStyle(), heroHover === this.props.iconName ? this.iconHoverStyle() : null]}>
  //     <ImageBackground source={asset(this.props.iconImg)} style={this.iconImgStyle()} />
  //   </View>
  //   <VrButton
  //     onEnter={() => this.props.fetchHeroHover(this.props.iconName)} onExit={() => this.props.fetchHeroHover('')}
  //     onClick={() => NativeModules.LinkingManager.openURL(this.props.iconUrl)}
  //     style={this.iconHitBoxStyle()}
  //   />
  // </View>

  render() {
    return (
      <View>
        <ImageBackground source={asset('moodtree.png')} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    // backgroundColor: '#7d7d7d',
    position: 'absolute',
    // marginTop: 60,
    marginLeft: 400,
  }
});

// const mapStateToProps = ({ heroHover }) => ({ heroHover });

export default connect(null, null)(ItemImage);
