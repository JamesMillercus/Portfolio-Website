import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { fetchUserAgent } from './../actions';
import './assets/scss';
import './assets/images';

class App extends Component {
	componentWillMount() {
		if (!this.props.userAgent) this.userAgent = navigator.userAgent;
		else this.userAgent = this.props.userAgent;
	}

	render() {
		const route = this.props.route;
		return (
			<UserAgentProvider ua={this.userAgent}>
				<div>{renderRoutes(route.routes)}</div>
			</UserAgentProvider>
		);
	}
}

// map the data from the state of fetchUserAgent, to a prop called userAgent
function mapStateToProps(state) {
	return { userAgent: state.userAgent };
}

// load this component with the data that is requires from redux - mapped as props from state
export default {
	component: connect(mapStateToProps, { fetchUserAgent })(App),
	// allow us to accessthe data from the dispatch function of fetchUserAgent in this component
	loadData: ({ dispatch }) => dispatch(fetchUserAgent())
};
