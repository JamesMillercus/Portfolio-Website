import React, { Component } from 'react';
import Error from './../../components/locs/Error/Error';

class NoScript extends Component {
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    const htext = 'This website can only be viewed when javascript is enabled.';
    const ptext = 'Please enable javascirpt and revisit this web page.';
    return <Error header={htext} paragraph={ptext} />;
  }
}

// take props from admins and pass them into require Auth
export default NoScript;
