import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { UserAgentProvider, UserAgent } from '@quentin-sommer/react-useragent'
import { fetchUserAgent } from './../actions';
import './App.scss';

class App extends Component {
	render() {
		const route = this.props.route;
		const userAgent = this.props.userAgent;

		return (
		  	<UserAgentProvider ua={userAgent}>
				<div>
					<div>{renderRoutes(route.routes)}</div>
				</div>
			</UserAgentProvider>
	  	)
	}

	componentDidMount() {
		// once component loads, call the fetchUserAgent action creator
		this.props.fetchUserAgent();
	}
}

// map the data from the state of fetchUserAgent, to a prop called userAgent 
function mapStateToProps(state) {
	return { userAgent: state.userAgent }
}

// load this component with the data that is requires from redux - mapped as props from state
export default {
	component: connect(mapStateToProps, { fetchUserAgent })(App),
	// allow us to accessthe data from the dispatch function of fetchUserAgent in this component
	loadData: ({ dispatch }) => dispatch(fetchUserAgent())
};