import template from './../helpers/template';

const contentRes = require('./../helpers/contentRes');


module.exports = (app) => {
	app.get('/arbout', (req, res) => {
		// load content
		const response = template(app, null, null);
		res.send(response);
	});

	app.get('*', (req, res) => {
		// load content
		contentRes(app, req, res);
	});
};
