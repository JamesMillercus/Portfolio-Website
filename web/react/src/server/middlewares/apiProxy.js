import proxy from 'express-http-proxy';

module.exports = (app) => {	
	// redirect api requests to api server
	app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
		// oauth demo options
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	}));
}