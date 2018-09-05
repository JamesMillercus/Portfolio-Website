import React, { Component } from 'react';
import Error from './../../components/locs/Error/Error';

class BadOS extends Component {

  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    const htext = "This device can't display this website";
    const ptext = 'Please visit this website on a different device.';
    
    return <Error header={htext} paragraph={ptext} />;
  }
}

// take props from admins and pass them into require Auth
export default BadOS;
