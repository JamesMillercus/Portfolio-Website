import React, { Component } from 'react';
import { connect } from 'react-redux';
import Iframe from 'react-iframe';
import Instructions from './Instructions/Instructions';
import { fetchWebMode } from './../../../actions';


class WebVR extends Component {
  constructor() {
    super();
    this.interval = null;
    this.state = {
      videoIsPlaying: false,
      mobileOrientationMessage: false
    };
  }

  componentDidMount() {
    this.setTimer();
    const { deviceType } = this;
    // if(window.orientation) {
    // if(window.orientation === 0) this.setState({ mobileOrientationMessage: true });
    //   // Listen for orientation changes
      window.addEventListener("orientationchange", function() {
        // Announce the new orientation number
        // alert(window.orientation);
      }, false);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTimer() {
    this.interval = setInterval(() => {
      const iframeHref = document.getElementById('player').contentWindow.location;
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
      const { deviceType } = this;
      if(window.location === '/webvr') {
        if(deviceType === 'mobile' || deviceType === undefined ) {
          if(window.orientation === 0) this.setState({ mobileOrientationMessage: true });
          else this.setState({ mobileOrientationMessage: false });
        }
      }
    }, 250);
  }

  displayButton() {
    if (this.state.videoIsPlaying) return 'block';
    return 'none';
  }

  displayMobileOrientation() {
    if (this.state.mobileOrientationMessage === true) return 'block';
    return 'none';
  }

  exit() {
    this.setState({ videoIsPlaying: false });
    this.setTimer();
    document.getElementById('player').src = window.location.pathname;
  }

  loadExperience() {
    const { vrDisplays, deviceType } = this.props;
    // if (!vrDisplays && deviceType === 'mobile') return 'mobilewebvr' (timer)
    return '/webVRbuild/index.html';
  }

  render() {
    const styles = {
      iframeBtn: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '250px',
        height: '250px',
        backgroundImage: `url(${'/assets/images/exitIcon.png'})`,
        backgroundColor: '#cd0b0b',
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
        zIndex: 1,
        display: this.displayButton()
      },
      mobileOrientation: {
        width:'100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'red',
        display: this.displayMobileOrientation()
      }
    };

    const click = () => this.exit();

    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div>
        <div id="mobileOrientation" style={styles.mobileOrientation} />
        <Instructions browserName={this.props.browserName} />
        <div id='iframeButton' style={styles.iframeBtn} onClick={click} />
        <Iframe
          url={this.loadExperience()}
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

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    vrDisplays: state.vrDisplays,
    deviceType: state.deviceType
  };
}

export default connect(mapStateToProps, { fetchWebMode })(WebVR);
