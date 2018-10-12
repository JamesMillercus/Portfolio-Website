import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './../../client/routes/Routes';
//
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
	return content;
};
