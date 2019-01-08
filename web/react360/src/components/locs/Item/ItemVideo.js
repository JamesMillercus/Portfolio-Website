import React from 'react';
import { StyleSheet, Video, NativeModules, asset, Environment } from 'react-360';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../actions';

const { VideoModule } = NativeModules;

class ItemVideo extends React.Component {

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentDidMount() {
    const { videoLength, deviceType, youtube, webMode, webvrYoutube } = this.props;
    this.timeout = setTimeout(() => {
      fetchActiveItem('hidden');
    }, videoLength);
    if (deviceType !== 'laptop' && webMode === 'web') NativeModules.LinkingManager.openURL(`https://www.youtube.com/embed/${youtube}`);
    else if (deviceType !== 'laptop' && webMode === 'webvr') NativeModules.LinkingManager.openURL(`https://www.youtube.com/embed/${webvrYoutube}`);
    else Environment.clearBackground();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
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

const mapStateToProps = ({ deviceType, webMode }) => ({ deviceType, webMode });

export default connect(mapStateToProps, { fetchActiveItem })(ItemVideo);
