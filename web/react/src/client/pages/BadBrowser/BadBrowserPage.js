import React, { Component } from 'react';
import Error from './../../components/locs/Error/Error';

class BadBrowser extends Component {

  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    const htext = "Your browser isn't compatible with this website.";
    const ptext = 'Please visit this web page on chrome, safari, firefox or edge browsers.';
    return <Error header={htext} paragraph={ptext} />;
  }
}

// take props from admins and pass them into require Auth
export default BadBrowser;
