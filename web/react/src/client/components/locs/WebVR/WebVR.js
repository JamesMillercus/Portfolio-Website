import React, { Component } from 'react';
import Iframe from 'react-iframe';

class WebVR extends Component {
  constructor() {
    super();
    this.interval = null;
    this.state = {
      videoIsPlaying: false,
      browser: null
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillReceiveProps() {
    this.setState({ browser: this.props.browser });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTimer() {
    this.interval = setInterval(() => {
      const iframeHref = document.getElementById('player').contentWindow.location;
      if (Object.keys(iframeHref).length < 8 && this.state.browser !== 'Oculus Browser') {
        clearInterval(this.interval);
        this.setState({ videoIsPlaying: true });
      } else if (iframeHref.pathname === '/') window.location = '/';
        else if (iframeHref.pathname === '/services') window.location = '/services';
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
    const iframeStyle = {
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
    };

    const click = () => this.exit();

    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div>
        <div id='iframeButton' style={iframeStyle} onClick={click} />
        <Iframe
          url="/webVRbuild/index.html"
          width="100%"
          height="100%"
          id="player"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen
          allowvr
        />
      </div>
    );
  }
}

export default WebVR;
