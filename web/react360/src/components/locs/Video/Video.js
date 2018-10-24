import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, Text, StyleSheet } from 'react-360';
import { fetchActiveItem } from './../../../actions';

class Video extends React.Component {
  render() {
    return (
      <View style={styles.videoBackground}>
        <Text> Test </Text>
      </View>
    );
  }
}

// const TopPosts = props => {
//   if (!props.posts) {
//     return (
//       <View style={styles.wrapper}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

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
})(Video);

AppRegistry.registerComponent('Video', () => Video);
