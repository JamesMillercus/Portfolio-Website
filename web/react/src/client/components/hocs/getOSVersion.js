import { UserAgent } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';
import BadOS from './../../pages/BadOS/BadOS';

// export default GetDevice(connect(mapStateToProps, mapDispatchToProps)(ChildComponent));
export default (ChildComponent) => {
// export default connect(mapStateToProps, { fetchDeviceType })(ChildComponent) => {

	class GetOSVersion extends Component {

    osIsCompatible(os) {
			console.log(os);
			const osVersion = os.version;
      const osString = String(osVersion).substring(0, 5);
      const osFloat = parseFloat(osString.replace('.', ''));
      const compatible = 103;


      if (osFloat >= compatible) return true;
			else if (os.name === 'Android' && osVersion <= 4) return true; 
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
