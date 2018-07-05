import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomePage.scss';
// import './react.png';
import { IEView } from "react-device-detect";
import { UserAgent } from '@quentin-sommer/react-useragent';

/*
	TO DO:
		1. REPLICATE THE ALLOWED BROWSERS FUNCTION FROM PREVIOUS APP
		2. CREATE A SWITCH STATEMENT BASED ON THE RESULT OF THE FUNCTION
		3. SERVE 'ALLOWED BROWSER PAGE' VS 'NOT ALLOWED BROWSER PAGE'
		4. ATTEMPT TO STORE USER AGENT (FROM APP.JS) IN REDUX STORE AND LOAD HOME PAGE ONCE THIS DATA IS LOADED INTO FRONT END
*/

export default (ChildComponent) => {
	class GetBrowser extends Component {
		constructor(props) {
	        super(props);
	        this.browserComponent = () => {
	    		return (
	    			<div> 
						<UserAgent returnfullParser>
              				{parser => (
								<div className = "class"> 
								    <h3> Home page </h3>
								    <p> Built in ssr React and Redux </p>
			                        {console.log('getBrowser', parser.getBrowser().name)}
								    // <img src="/assets/images/react.png" />
								</div>
							)}
						</UserAgent>

						<IEView>
						  <div className = "class"> 
						    oops lol
						  </div>
						</IEView>
	    			</div>
	    		)
	    	}
    	}

		render() {
			return(
				<ChildComponent browserComponent = {this.browserComponent} deviceComponent = {this.props.deviceComponent} />
			)
		}
	}

	return GetBrowser;
};
