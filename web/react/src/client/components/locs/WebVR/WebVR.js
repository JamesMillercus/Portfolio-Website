import React, { Component } from 'react';
import Iframe from 'react-iframe';
import Instructions from './Instructions/Instructions';

class WebVR extends Component {
  constructor() {
    super();
    this.interval = null;
    this.state = {
      videoIsPlaying: false
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  // componentWillReceiveProps() {
  //   this.setState({ browser: this.props.browser });
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTimer() {
    this.interval = setInterval(() => {
      const iframeHref = document.getElementById('player').contentWindow.location;
      // console.log(`iframeHref ${iframeHref.pathname}`);
      if (Object.keys(iframeHref).length < 8 && ('ontouchstart' in window)) {
        clearInterval(this.interval);
        this.setState({ videoIsPlaying: true });
      } else if (iframeHref.pathname === '/') window.location = '/';
      else if (iframeHref.pathname === '/services') window.location = '/services';
      else if (iframeHref.pathname === '/webvr') window.location = '/webvr';
      // else if (iframeHref.pathname !== '/webVRbuild/index.html' && this.state.browser !== 'Oculus Browser') {
      //   clearInterval(this.interval);
      //   this.setState({ videoIsPlaying: true });
      // }
    }, 250);
  }

  displayButton() {
    if (this.state.videoIsPlaying) return 'block';
    return 'none';
  }

  exit() {
    this.setState({ videoIsPlaying: false });
    this.setTimer();
    document.getElementById('player').src = '/webVRbuild/index.html';
  }

  render() {
    const styles = {
      iframe: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 100,
        backgroundImage: `url(${'/assets/images/exitIcon.png'})`,
        backgroundColor: '#cd0b0b',
        backgroundSize: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
        zIndex: 1,
        display: this.displayButton()
      },
      webvrContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed'
      }
    };

    const click = () => this.exit();

    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div style={styles.webvrContainer}>
        <Instructions />
        <div id='iframeButton' style={styles.iframe} onClick={click} />
        <Iframe
          url={this.props.href}
          width="100%"
          height="100%"
          id="player"
          className="myClassname"
          display="block"
          position="fixed"
          allowFullScreen
          allowvr
        />
      </div>
    );
  }
}

export default WebVR;
