import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, NativeModules, VrButton, Video } from 'react-360';
import { fetchActiveItem } from './../../../actions';

const { VideoModule } = NativeModules;

/*
  - integrate r360 app into csr app
  - Ensure video is loading and displaying properly when item is clicked
  - create 7 other items
  - implement noscript error
  - test on all devices
  - animate heroText(if possible)
*/

class VideoComponent extends React.Component {

  componentDidUpdate() {
    const { activeItem } = this.props;
    if (activeItem !== 'hidden') VideoModule.resizeVideo(1590, 860);
  }

  click() {
    console.log('LOL');
  }

  render() {
    const click = () => this.click();

    return (
      <VrButton onClick={click()} style={styles.videoBackground}>
        <Text> Test </Text>
        <Video source={{ uri: 'https://youtu.be/-7AI_yvB4nc' }} />
      </VrButton>
    );
  }
}

const styles = StyleSheet.create({
  videoBackground: {
    width: 1590,
    height: 860,
    backgroundColor: 'red',
  }
});

const mapStateToProps = ({ activeItem }) => ({ activeItem });

export default connect(mapStateToProps, {
  fetchActiveItem
})(VideoComponent);

// AppRegistry.registerComponent('Video', () => Video);
