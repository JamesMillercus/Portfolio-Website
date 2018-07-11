import React, { Component } from 'react';
// import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import { UserAgent } from '@quentin-sommer/react-useragent';
import Desktop from './../../pages/home/Desktop/Desktop';
import { compose } from 'redux'

class Home extends Component {
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
      <div> 
        <UserAgent computer>
            <Desktop />
        </UserAgent>
        
        <UserAgent tablet>
            <div> Tablet view </div>
        </UserAgent>

        <UserAgent mobile>
            <div> Mobile view </div>
        </UserAgent>

      </div>
    )
  }
};

export default {
  // take props from admins and pass them into require Auth
  component: getBrowser(Home)
};
