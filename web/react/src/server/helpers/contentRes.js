// import routes
import { matchRoutes } from 'react-router-config';
import Routes from './../../client/routes/Routes';
import renderer from './renderer';
import createStore from './createStore';

module.exports = (app, req, res) => {
	// set up the redux store on the server side
	const store = createStore(req);
	// check all react routes vs req path and return a list of components to be rendered
	const promises = matchRoutes(Routes, req.path).map(({ route }) => (
		// if route.loadData exists then call loadData(), else do nothing
		route.loadData ? route.loadData(store) : null)
	).map(promise => {
		// if null value from promise (something went wrong)
		if (promise) {
			return new Promise((resolve) => {
				// return a resolved promise
				promise.then(resolve).catch(resolve);
			});
		}
		return null;
	});

	// once all our data requests have been completed
	Promise.all(promises).then(() => {
		const context = {};
		const content = renderer(req, store, context);
		// context.url = req.path;
		// if a url is loaded into the context then redirect to the url in the context
		if (context.url) return res.redirect(301, context.url);
		// if context has not found stored then respond with 404 error
		if (context.notFound) res.status(404);
		// send initialised store to the renderer
		res.send(content);
	});
};
