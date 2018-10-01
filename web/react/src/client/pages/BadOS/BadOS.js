import React, { Component } from 'react';
import Error from './../../components/locs/Error/Error';

class BadOS extends Component {

  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    const htext = "This website can't be displayed on old devices";
    const ptext = 'Please update your device so it is running either iOS version 10.3 or Android version 4 (or higher). Alternatively please view this site on a newer device.';

    return <Error header={htext} paragraph={ptext} />;
  }
}

// take props from admins and pass them into require Auth
export default BadOS;
