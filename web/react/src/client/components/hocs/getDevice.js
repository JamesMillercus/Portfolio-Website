import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetBrowser from './getBrowser';
import { UserAgent } from '@quentin-sommer/react-useragent';


/*
	TO DO:
		1. TEST MOBILE AND TABLET VIEWS
		2. ATTEMPT TO STORE USER AGENT (FROM APP.JS) IN REDUX STORE AND LOAD HOME PAGE ONCE THIS DATA IS LOADED INTO FRONT END
		3. DO THIS BY STORING THE USER AGENT IN REDUX STATE AND THEN REFERENCE THAT STATE IN APP.JS
*/

export default (ChildComponent) => {
	class GetDevice extends Component {
		constructor(props) {
	        super(props);
    	}

        deviceComponent () {
    		return (
    			<div>
		            <UserAgent computer>
						<GetBrowser />
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

		render() {
			return <ChildComponent deviceComponent = {this.deviceComponent} />
		}
	}

	return GetDevice;
};