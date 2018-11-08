import React from 'react';
import { StyleSheet, Video, asset, NativeModules, } from 'react-360';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../actions';

const { VideoModule } = NativeModules;


/*
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
    const { videoLength, deviceType, youtube } = this.props;
    this.timeout = setTimeout(() => {
      fetchActiveItem('hidden');
    }, videoLength);

    if (deviceType !== 'laptop') NativeModules.LinkingManager.openURL(`https://www.youtube.com/embed/${youtube}`);
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
