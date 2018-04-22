var jwt = require('jsonwebtoken');
var secret = 'saggy2secret'; 

module.exports = function(router,db) {
	var user=require('./user')(router,db);
	var contact=require('./contact')(router,db);
	router.use('/user',user);

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token']; 
    
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); 
                } else {
                    req.decoded = decoded; 
                    next(); 
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); 
        }
    });

	router.use('/contact',contact);

	return router;
}