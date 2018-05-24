const parser = require('ua-parser-js');

module.exports = (req, res, next) => {
    const ua = parser(req.headers['user-agent']);
    const allowedBrowsers = ["Chrome", "Safari", "Edge", "Firefox", "Chromium"];

    for(let x = 0; x < allowedBrowsers.length; x++) {
    	if(ua.browser.name == allowedBrowsers[x]) return next();
    	else return res.render('badBrowser', { title : 'Home' }); 
    }
};