const parser = require('ua-parser-js');

module.exports = (req, res, next) => {
    var ua = parser(req.headers['user-agent']);
    if (ua.device.type == 'mobile') res.render('mobile', { title : 'Home'});
    else if (ua.device.type == 'tablet') res.render('tablet', { title : 'Home'})
	else next();
};