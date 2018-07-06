import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from './../../pages/home/desktop/Desktop';
import BadBrowser from './../../pages/bad-browser/BadBrowserPage';
import { UserAgent } from '@quentin-sommer/react-useragent';

class GetBrowser extends Component {

    browserComponent() {
		return (
			<UserAgent returnfullParser>
  				{parser => (
					<div className = "class"> {this.content(parser.getBrowser().name)} </div>
				)}
			</UserAgent>
		)
	}

	content(browserName) {
		switch (this.allowedBrowser(browserName)) {
			// accessed is not authorised
			case false:
				return <BadBrowser />
			// if not yet fetehed the auth state
			case null:
				return <BadBrowser />
			// if is authorised, then load child component and load props from render auth into child
			default:
				return <Desktop />
		}
	}

	allowedBrowser(browserName) {
		const allowedBrowsers = ["Chrome", "Safari", "Firefox", "Edge", "Chromium"];
		for(let x = 0; x < allowedBrowsers.length; x++) {
			if(browserName == allowedBrowsers[x]) return true;
			else if(browserName != allowedBrowsers[x] && x == allowedBrowsers.length-1) return false; 
		}
	}

	render() {
		return (
			<div>
				{this.browserComponent()}
			</div>
		)
	}
}

export default GetBrowser;