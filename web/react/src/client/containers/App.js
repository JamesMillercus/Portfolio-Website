import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './../components/locs/header/Header';
import { fetchCurrentUser } from './../actions';
import './App.scss';
// check which route has been pased into App
// load that routes components under the header component
const App = ({ route }) => {
	return (
		<div>
			<Header />
			<div>{renderRoutes(route.routes)}</div>
		</div>
	)
}
// load current user from actions
export default {
	component: App,
	loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};