import React from 'react';
import { renderRoutes } from 'react-router-config';
import { fetchCurrentUser } from './../actions';
import './App.scss';
// check which route has been pased into App
// load that routes components under the header component
const App = ({ route }) => {
	return (
		<div>
			<div>{renderRoutes(route.routes)}</div>
		</div>
	)
}
// load current user from actions
export default {
	component: App
};