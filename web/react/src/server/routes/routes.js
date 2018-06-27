const browserCheck = require('./../middlewares/browserCheck');
const deviceCheck = require('./../middlewares/deviceCheck');

module.exports = (app) => {	
	app.get('*', deviceCheck, browserCheck, (req, res) => {
		// load content
		require('./../helpers/contentRes')(app, req, res);
	});
}