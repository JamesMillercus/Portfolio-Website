import React, { Component } from 'react';
import './Desktop.scss';
import './../assets/react.png';

class Desktop extends Component {
  
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
		<div className = "class"> 
		    <h3> Home page Desktop </h3>
		    <p> Built in ssr React and Redux </p>
		    <img src="/assets/images/react.png" />
		</div>
    )
  }
};

// take props from admins and pass them into require Auth
export default Desktop;

