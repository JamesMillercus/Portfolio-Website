import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, NativeModules, VrButton, Video } from 'react-360';
import { fetchActiveItem } from './../../../actions';

const { VideoModule } = NativeModules;

/*
  - refactor the following actions & reducers in r360 so they match normal react app:
    2. ItemClicked
    3. ItemScrolled
  - refactor r360's homeConfig file to match normal react app
  - integrate r360 app into csr app
  - Ensure video is loading and displaying properly when item is clicked
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
