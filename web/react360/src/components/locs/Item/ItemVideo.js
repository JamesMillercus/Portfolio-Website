import React from 'react';
import { StyleSheet, Video, asset } from 'react-360';
import { connect } from 'react-redux';
import { fetchActiveItem } from './../../../actions';

/*
  - refactor site to create Items & Hero from client.js, then create all 7 items
  - webvr button on website
  - implement noscript error
  - test on all devices
    - detect browser and if oculus browser, then redirect to /webvr
    - stop device working on devices with no accellerometer
*/

class ItemVideo extends React.Component {

  constructor() {
    super();
    this.timeout = null;
  }

  componentDidMount() {
    const { fetchActiveItem, videoLength } = this.props;
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
    width: 900,
    height: 400,
    position: 'absolute',
  }
});

// export default ItemVideo;

// const mapStateToProps = ({
//   scrolledItem, clickedItems, activeItem
// }) => ({ scrolledItem, clickedItems, activeItem });

export default connect(null, { fetchActiveItem })(ItemVideo);
