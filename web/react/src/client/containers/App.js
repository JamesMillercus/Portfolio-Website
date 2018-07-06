import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { UserAgentProvider, UserAgent } from '@quentin-sommer/react-useragent'
import { fetchCurrentUser } from './../actions';
import './App.scss';
// check which route has been pased into App
// load that routes components under the header component

class App extends Component {
  render() {
  	const route = this.props.route;
  	const userAgent = getUserAgent(this);
  	
    return (
      	<UserAgentProvider ua={userAgent}>
			<div>
				<div>{renderRoutes(route.routes)}</div>
			</div>
		</UserAgentProvider>
	  )
  }
}

const getUserAgent = (obj) => {
	if(obj.props.staticContext) return String(obj.props.staticContext.userAgent);
	else if (window.navigator.userAgent) return String(window.navigator.userAgent); 
}; 

// load current user from actions
export default {
	component: App
};