import { UserAgent } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';
import BadBrowser from './../../pages/BadBrowser/BadBrowserPage';


export default (ChildComponent) => {
	class GetBrowser extends Component {

		browserComponent() {
			return (
				<UserAgent returnfullParser>
					{parser => (
						<div className="class"> {this.content(parser.getBrowser().name)} </div>
					)}
				</UserAgent>
			);
		}

		content(browserName) {
			switch (this.allowedBrowser(browserName)) {
				// browser not authorised
				case false:
					return <BadBrowser />;
				// if is authorised, then load child component and load props from render page into child
				default:
					return <ChildComponent {...this.props} />;
			}
		}

		allowedBrowser(browserName) {
			const allowedBrowsers = ['Chrome', 'Safari', 'Mobile Safari', 'Firefox', 'Edge', 'Chromium'];
			for (let x = 0; x < allowedBrowsers.length; x++) {
				if (browserName === allowedBrowsers[x]) return true;
				else if (browserName !== allowedBrowsers[x] && x === allowedBrowsers.length - 1) {
					return false;
				}
			}
		}

		render() {
			return this.browserComponent();
		}
	}
	return GetBrowser;
};
