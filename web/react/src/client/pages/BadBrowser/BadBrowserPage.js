import React, { Component } from 'react';

class BadBrowser extends Component {
  
  render() {
    /** LOGIC FOR DISPLAYING CONTENT CORRECLTY ON DEVICE + BROWSER **/
    return (
    <div className = "class"> 
        <h3> Bad Browser hahaa </h3>
    </div>
    )
  }
};

// take props from admins and pass them into require Auth
export default BadBrowser;

