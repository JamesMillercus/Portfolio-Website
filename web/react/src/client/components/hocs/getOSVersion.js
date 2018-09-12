import { UserAgent } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';
import BadOS from './../../pages/BadOS/BadOS';

// export default GetDevice(connect(mapStateToProps, mapDispatchToProps)(ChildComponent));
export default (ChildComponent) => {
// export default connect(mapStateToProps, { fetchDeviceType })(ChildComponent) => {

	class GetOSVersion extends Component {

    osIsCompatible(os) {
			const osVersion = os.version;
			const osName = os.name;
			let osString;
			let osFloat;
			let compatible;
			console.log(osName);
			console.log(os.version);
			if (osName === 'Android') {
				osString = String(osVersion);
				osFloat = parseFloat(osString.replace('.', ''));
				compatible = 40; //.4
			} else if (osName === 'Windows') {
				osFloat = String(osVersion);
				compatible = 10; // windows 10
			} else {
				osString = String(osVersion).substring(0, 5);
				osFloat = parseFloat(osString.replace('.', ''));
				compatible = 103; // 10.3
			}

      if (osFloat >= compatible) return true;
      return false;
    }

		renderDevice(deviceVersion) {
      switch (this.osIsCompatible(deviceVersion)) {
				// OS not authorised
				case false:
					return <BadOS />;
				// if is authorised, then load child component and load props from render page into child
				default:
					return <ChildComponent {...this.props} />;
			}
		}

		render() {
			return (
				<UserAgent returnfullParser>
					{parser => (
						<div>
							{this.renderDevice(parser.getOS())}
						</div>
					)}
				</UserAgent>
			);
		}
	}

	return GetOSVersion;
};
