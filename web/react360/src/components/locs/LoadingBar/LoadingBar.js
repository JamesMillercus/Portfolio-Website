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
import { fetchLoadingProgress, fetchActiveItem, fetchClickedItems } from './../../../actions';

class LoadingBar extends React.Component {

  constructor(props) {
    super(props);
    this.animateTimeout = null;
    this.endCount = -1;
    this.beginCount = 5;
    this.animateCounter = this.beginCount;
    this.openLink = this.openLink.bind(this);
    this.openVideo = this.openVideo.bind(this);
  }

  componentDidUpdate() {
    const { loadingContent, id, fetchLoadingProgress, loadingProgress, content } = this.props;
    if (loadingContent === id) {
      if (loadingProgress !== 0) this.animateTimer();
      else this.timerFinished();
    } else if (loadingContent !== id && this.animateTimeout !== null) this.resetTimer();
  }

  timerFinished() {
    const { content } = this.props;
    if (content === 'Opening link') this.animateTimeout = setTimeout(() => this.openLink(), 1000);
    else this.animateTimeout = setTimeout(() => this.openVideo(), 1000);
  }

  animateTimer() {
    const { fetchLoadingProgress } = this.props;
    if (this.animateCounter !== (this.endCount + 1)) {
      this.animateCounter = this.animateCounter - 1;
      this.animateTimeout = setTimeout(() => fetchLoadingProgress(this.animateCounter), 1000);
    }
  }

  resetTimer() {
    clearTimeout(this.animateTimeout);
    this.animateTimeout = null;
    this.animateCounter = this.beginCount;
    this.props.fetchLoadingProgress(this.animateCounter);
  }

  openVideo() {
    const { fetchActiveItem, fetchClickedItems, clickedItems, id, page } = this.props;
    fetchActiveItem(id);
    if (Object.getOwnPropertyNames(clickedItems).length === 0 || clickedItems[page] === undefined) {
      // console.log('page has not been clicked');
      fetchClickedItems(page, id);
    } else {
      // console.log("page has been clicked, item hasn't");
      const itemAlreadyClicked = clickedItems[page].includes(id);
      // if item hasn't already been clicked
      if (!itemAlreadyClicked) fetchClickedItems(page, id);
    }
    this.resetTimer();
  }

  openLink() {
    const { url, loadingContent, id } = this.props;
    if (loadingContent === id) NativeModules.LinkingManager.openURL(url);
    else this.resetTimer();
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
    const { marginTop, marginBottom, marginLeft, loadingContent, loadingProgress, id, width, position } = this.props;

    const progressAnimated = this.calcProgressAnimation(loadingProgress);

    const styles = StyleSheet.create({
      progressContainer: {
        marginTop,
        marginLeft,
        marginBottom,
        position
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

const mapStateToProps = ({ loadingContent, loadingProgress, clickedItems }) => ({ loadingContent, loadingProgress, clickedItems });

export default connect(mapStateToProps, { fetchLoadingProgress, fetchActiveItem, fetchClickedItems })(LoadingBar);
