module.exports = (app) => {	
	app.get('*', (req, res) => {
		// load content
		require('./../helpers/contentRes')(app, req, res);
	});
}