const parser = require('ua-parser-js');

module.exports = (req, res, next) => {
    const ua = parser(req.headers['user-agent']);
    const allowedBrowsers = ["Chrome", "Safari", "Firefox", "Edge", "Chromium"];

    for(let x = 0; x < allowedBrowsers.length; x++) {
    	if(ua.browser.name == allowedBrowsers[x]) {
    		return next();
    	}
    	else if(ua.browser.name != allowedBrowsers[x] && x == allowedBrowsers.length-1) return res.render('badBrowser', { title : 'Home' }); 
    }
};