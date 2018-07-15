import { connect } from 'react-redux';
import { UserAgent } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';
import { fetchDeviceType } from './../../actions';

// export default GetDevice(connect(mapStateToProps, mapDispatchToProps)(ChildComponent));
export default (ChildComponent) => {
// export default connect(mapStateToProps, { fetchDeviceType })(ChildComponent) => {

	class GetDevice extends Component {

		renderDevice(deviceType) {
			// fetch with deviceType
			if (deviceType !== 'mobile' || deviceType !== 'tablet') this.props.fetchDeviceType('laptop');
			else this.props.fetchDeviceType(deviceType);
			return <ChildComponent {...this.props} />;
		}

		render() {
			return (
				<UserAgent returnfullParser>
					{parser => (
						<div>
							{this.renderDevice(parser.getDevice().type)}
						</div>
					)}
				</UserAgent>
			);
		}
	}

	return connect(mapStateToProps, { fetchDeviceType })(GetDevice);
};

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
  return {
    deviceType: state.deviceType
  };
}
