import React, { Component } from 'react';
import Iframe from 'react-iframe';

// url="/webvr/index.html"
class WebVR extends Component {
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div>
        <Iframe
          url="/webVRbuild/index.html"
          width="100%"
          height="100%"
          id="myId"
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
