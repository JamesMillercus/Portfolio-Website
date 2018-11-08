import React, { Component } from 'react';
import NoScript from 'react-noscript';
import NoScriptPage from './../../pages/NoScript/NoScriptPage';

export default (ChildComponent) => {
	class GetNoScript extends Component {
		render() {
			return (
        <div>
          <NoScript key={0}>
  					<NoScriptPage />
            <style dangerouslySetInnerHTML={{ __html: ' .mouseMovementContainer { display: none } ' }} />
  				</NoScript>
          <ChildComponent key={1} {...this.props} />
        </div>
			);
		}
  }
  return GetNoScript;
};
