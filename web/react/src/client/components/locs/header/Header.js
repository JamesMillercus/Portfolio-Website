import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';

const Header = ({ auth }) => {
	// if auth button = logged in then display log out
	// else allow log in
	const authButton = auth ? (
		<a href="/api/logout">Logout</a>
	) : (
		<a href="/api/auth/google">Login</a>
	);

	return (
		<nav>
			<div>
				<Link to="/">React SSR</Link>
				<ul>
					<li>
						<Link to="/users">Users</Link>
					</li>
					<li>
						<Link to="/admins">Admins</Link>
					</li>
					<li> 
						{authButton} 
					</li>
				</ul>
			</div>
		</nav>
	)
};

function mapStateToProps({auth}) {
	return {auth};
}

export default connect(mapStateToProps)(Header);