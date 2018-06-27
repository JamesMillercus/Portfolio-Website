const parser = require('ua-parser-js');

module.exports = (req, res, next) => {
    var ua = parser(req.headers['user-agent']);
    if (ua.device.type == 'mobile') {
    	req.device = 'mobile';
    }
    else if (ua.device.type == 'tablet') {
    	req.device = 'tablet';
    }
	else {
		req.device = 'desktop';
		next();
	} 
};