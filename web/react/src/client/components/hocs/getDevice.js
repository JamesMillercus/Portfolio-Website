import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomePage.scss';
// import './react.png';
import { BrowserView, TabletView, MobileOnlyView } from "react-device-detect";

export default (ChildComponent) => {
	class GetDevice extends Component {
		constructor(props) {
	        super(props);
	        this.deviceComponent = () => {
	    		return (
					<BrowserView>
						<div> device view lol </div>
					</BrowserView>
	    		)
	    	}
    	}

		render() {
			return(
				<ChildComponent deviceComponent = {this.deviceComponent} />
			)
		}
	}

	return GetDevice;
};
// <UserAgent chrome safari firefox edge>
//   <div className = "class"> 
//     <h3> Home page </h3>
//     <p> Built in ssr React and Redux </p>
//     // <img src="/assets/images/react.png" />
//   </div>
// </UserAgent>

// <IEView>
//   <div className = "class"> 
//     oops lol
//   </div>
// </IEView>
