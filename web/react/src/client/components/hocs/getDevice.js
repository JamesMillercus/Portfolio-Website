import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetBrowser from './getBrowser';
import { BrowserView, TabletView, MobileOnlyView } from "react-device-detect";

/*
	TO DO:
		1. CREATE (AND TEST) MOBILE AND TABLET VIEWS
		2. ATTEMPT TO STORE USER AGENT (FROM APP.JS) IN REDUX STORE AND LOAD HOME PAGE ONCE THIS DATA IS LOADED INTO FRONT END
		3. DO THIS BY STORING THE USER AGENT IN REDUX STATE AND THEN REFERENCE THAT STATE IN APP.JS
*/

export default (ChildComponent) => {
	class GetDevice extends Component {
		constructor(props) {
	        super(props);
	        this.deviceComponent = () => {
	    		return (
					<BrowserView>
						<GetBrowser />
					</BrowserView>
	    		)
	    	}
    	}

		render() {
			return <ChildComponent deviceComponent = {this.deviceComponent} />
		}
	}

	return GetDevice;
};