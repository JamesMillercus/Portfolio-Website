import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, NativeModules, VrButton, Video, asset } from 'react-360';
import { fetchActiveItem } from './../../../actions';

const { VideoModule } = NativeModules;

class VideoComponent extends React.Component {
  componentDidUpdate() {
    const { activeItem } = this.props;
    if (activeItem !== 'hidden') VideoModule.showVideo();
  }

  // click() {
  //   const { activeItem } = this.props;
  //   // console.log('LOL');
  //   if (activeItem !== 'hidden') {
  //   }
  // }

  content() {
    const { activeItem } = this.props;
    // const click = () => this.click();
    if (activeItem === 'hidden') return <View />;

    // <VrButton onClick={click()}>
    // <Text style={styles.text}> Click/tap to close this video </Text>
    // <Video
    // source={asset('sap.mp4')}
    // style={styles.videoBackground}
    // />
    // </VrButton>
    return (
      <View />
    );
  }

  render() {
    return (
      <View style={styles.videoBackground}>
        {this.content()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoBackground: {
    width: 1020,
    height: 560,
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ activeItem }) => ({ activeItem });

export default connect(mapStateToProps, {
  fetchActiveItem
})(VideoComponent);
