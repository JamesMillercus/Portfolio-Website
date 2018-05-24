const browserCheck = require('../middlewares/browserCheck');
const deviceCheck = require('../middlewares/deviceCheck');

module.exports = (app) => {	
	app.get('/', deviceCheck, browserCheck, function(req, res) {    
	    res.render('desktop', { title : 'Home'} )
	});
}