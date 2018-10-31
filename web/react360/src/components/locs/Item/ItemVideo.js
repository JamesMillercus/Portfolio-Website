import React from 'react';
import { StyleSheet, Video, asset } from 'react-360';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../actions';

/*
  - open youtube url when click with mobile device / tablet
    1. on mobile/tablet device click
    2. trigger native module in clientjs
    3. which opens an iframe outside of the threejs runtime and plays the youtube video
  - add webvr button on website
  - implement noscript error
  - test on all devices
    - detect browser and if oculus browser, then redirect to /webvr
    - stop device working on devices with no accellerometer
*/

class ItemVideo extends React.Component {

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentDidMount() {
    const { fetchActiveItem, videoLength, deviceType } = this.props;
    this.timeout = setTimeout(() => {
      fetchActiveItem('hidden');
    }, videoLength);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { videoID } = this.props;
    return (
      <Video
        source={asset(videoID)}
        style={styles.videoBackground}
      />
    );
  }
}

const styles = StyleSheet.create({
  videoBackground: {
    width: 800,
    height: 400,
    position: 'absolute',
  }
});

const mapStateToProps = ({ deviceType }) => ({ deviceType });

export default connect(mapStateToProps, { fetchActiveItem })(ItemVideo);
