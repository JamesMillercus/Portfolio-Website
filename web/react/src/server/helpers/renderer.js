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
			<StaticRouter location={req.path} context={context}>
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
				<!-- Global site tag (gtag.js) - Google Analytics -->
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-126813701-1"></script>
				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'UA-126813701-1');
				</script>
				${helmet.title.toString()}
				${helmet.meta.toString()}
				<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro|Baloo+Bhaina" rel="stylesheet">
		    <link rel="stylesheet" type="text/css" href="/css/bundle.css">
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
				<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
				<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
			</head>
			<body>
				<div id ="root">${content}</div>
				<script>
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src ="/js/vendors~main.js"></script>
				<script src ="/js/bundle.js"></script>
			</body>
		</html>
	`;
};
