import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {

	renderUsers() {
		return this.props.users.map(user => {
			return <li key={user.id}>{user.name}</li>;
		});
	}

	head() {
		return (
			<Helmet>
				<title>{`${this.props.users.length} Users Loaded`}</title>
				<meta property="og:title" content="Users App" />
			</Helmet>
		);
	}

	// return the following html
	render() {
		return (
			<div>
				{this.head()}
				<div> Here is a list of users: </div>
				<ul>{this.renderUsers()}</ul>
			</div>
		);
	}

	componentDidMount() {
		// once component is rendered it will attempt to use the fetch users via the action creator
		this.props.fetchUsers();
	}

}

// map the state of data called from fetchUsers to users[state.users]
function mapStateToProps(state) {
	return { users: state.users };
}

function loadData(store) {
	// fetchUsers will return a promise representing the req
	return store.dispatch(fetchUsers());
}

export { loadData };
// Pass the state of fetchUsers into UsersList React Component
export default {
	loadData,
	component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
