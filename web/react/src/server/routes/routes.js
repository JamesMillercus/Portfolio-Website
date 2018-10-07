const contentRes = require('./../helpers/contentRes');
// 
module.exports = (app) => {
	app.get('*', (req, res) => {
		// load content
		contentRes(app, req, res);
	});
};
