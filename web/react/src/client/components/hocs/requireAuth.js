import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
	class RequireAuth extends Component {
		render() {
			switch (this.props.auth) {
				// accessed is not authorised
				case false:
					return <Redirect to="/" />
				// if not yet fetehed the auth state
				case null:
					return <div>Loading...</div>
				// if is authorised, then load child component and load props from render auth into child
				default:
					return <ChildComponent {...this.props} />
			}
		}
	}

	// chech the auth state
	function mapStateToProps({ auth }) {
		return { auth };
	}

	return connect(mapStateToProps)(RequireAuth);
};