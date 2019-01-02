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

  componentDidUpdate() {
    const { loadingContent, id, fetchLoadingProgress, loadingProgress } = this.props;
    if (loadingContent === id) {
      if (loadingProgress !== 0) this.animateTimer();
      else this.animateTimeout = setTimeout(() => this.openLink(), 1000);
    } else if (loadingContent !== id && this.animateTimeout !== null) {
      clearTimeout(this.animateTimeout);
      this.animateTimeout = null;
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
    const { marginTop, marginBottom, marginLeft, loadingContent, loadingProgress, id, width } = this.props;

    const progressAnimated = this.calcProgressAnimation(loadingProgress);

    const styles = StyleSheet.create({
      progressContainer: {
        marginTop,
        marginLeft,
        marginBottom
      },
      progressText: {
        textAlign: 'center',
        color: '#7d7d7d',
        fontSize: 23,
        width
      }
    });

    if (loadingContent === id) {
      return (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}> {this.props.content} in... {loadingProgress} </Text>
          <Progress.Bar progress={progressAnimated} width={width} />
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ loadingContent, loadingProgress }) => ({ loadingContent, loadingProgress });

export default connect(mapStateToProps, { fetchLoadingProgress })(LoadingBar);
