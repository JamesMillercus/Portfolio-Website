/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  NativeModules,
  Text
} from 'react-360';
import * as Progress from 'react-native-progress';
import { fetchLoadingProgress } from './../../../actions';

class LoadingBar extends React.Component {

  constructor(props) {
    super(props);
    this.animateTimeout = null;
    this.endCount = -1;
    this.beginCount = 5;
    this.animateCounter = this.beginCount;
    this.openLink = this.openLink.bind(this);
  }

  componentDidMount() {
    // when component is mounted, state is confused because it is taking values from both instantiated components
    // solution 1: try to find solution by editting this component
    // solution 2: dynamically instantiate each Loading Bar based on heroHover
  }

  componentDidUpdate() {
    const { loadingContent, id, fetchLoadingProgress, loadingProgress } = this.props;
    if (loadingContent === id) {
      if (loadingProgress !== 0) this.animateTimer();
      else this.animateTimeout = setTimeout(() => this.openLink(), 1000);
    } else {
      clearTimeout(this.animateTimeout);
      this.animateCounter = this.beginCount;
      fetchLoadingProgress(this.animateCounter);
    }
  }


  animateTimer() {
    const { fetchLoadingProgress } = this.props;
    if (this.animateCounter !== (this.endCount + 1)) {
      this.animateCounter = this.animateCounter - 1;
      this.animateTimeout = setTimeout(() => fetchLoadingProgress(this.animateCounter), 1000);
    }
  }

  openLink() {
    const { url } = this.props;
    NativeModules.LinkingManager.openURL(url);
  }

  calcProgressAnimation(loadingProgress) {
    const countDown = (loadingProgress / 100).toFixed(2) * 20;
    if (countDown === 1) return 0;
    else if (countDown === 0.8) return 0.2;
    else if (countDown === 0.6) return 0.4;
    else if (countDown === 0.4) return 0.6;
    else if (countDown === 0.2) return 0.8;
    return 1;
  }

  render() {
    const { marginTop, marginLeft, loadingContent, loadingProgress, id } = this.props;

    const progressAnimated = this.calcProgressAnimation(loadingProgress);

    const styles = StyleSheet.create({
      progressContainer: {
        marginTop,
        marginLeft
      },
      progressText: {
        textAlign: 'center',
        color: '#7d7d7d',
        marginBottom: 10,
        fontSize: 23,
        width: 200
      }
    });

    if (loadingContent === id) {
      return (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}> {this.props.content} in... {loadingProgress} </Text>
          <Progress.Bar progress={progressAnimated} width={200} />
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ loadingContent, loadingProgress }) => ({ loadingContent, loadingProgress });

export default connect(mapStateToProps, { fetchLoadingProgress })(LoadingBar);
