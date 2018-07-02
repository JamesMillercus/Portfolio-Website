import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from './../../client/routes/Routes';

export default (req, store, context) => {
	// load react components
	const content = renderToString(
		// connect the redux store to the react application
		// send the route req and redux store to the react router
		<Provider store={store}>
			<StaticRouter location = {req.path} context={context}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>
	);
	// returns an object that contains tags from loaded components
	const helmet = Helmet.renderStatic();

	// load front end js
	return `
		<html>
			<head> 
				${helmet.title.toString()}
				${helmet.meta.toString()}
			    <link rel="stylesheet" type="text/css" href="/css/bundle.css">
			</head>
			<body> 
				<div id ="root">${content}</div>
				<script> 
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src ="/js/bundle.js"></script>
			</body>
		</html>
	`;
};