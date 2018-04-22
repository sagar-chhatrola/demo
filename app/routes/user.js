var User = require('../models/user'); 
var jwt = require('jsonwebtoken'); 
var secret = 'saggy2secret';

module.exports = function(router,db) {
 
    router.post('/users', function(req, res) {
        var user = new User(); 
        user.username = req.body.username; 
        user.password = req.body.password; 
        user.email = req.body.email; 
        user.name = req.body.name; 
        user.temporarytoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail

       
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            
            user.save(function(err) {
                    console.log(err);
                    
                    if (err!== null) {
                        console.log(err);
                        if (err.code == 11000) {
                            
                                res.json({ success: false, message: 'That username is already taken Or email is already taken' }); // Display error if username already taken
                            
                        }
                        else if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); 
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); 
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message }); 
                        } else {
                            res.json({ success: false, message: err }); 
                        }
                    }
                 else {
                  
                   
                    res.json({ success: true, message: 'you are successfully registratered' }); 
                }
            });
        }
    });

   
    router.post('/checkusername', function(req, res) {
        User.findOne({ username: req.body.username }).select('username').exec(function(err, user) {
            if (err) {
                
                res.json({ success: false, message: 'Something went wrong.' });
            } else {
                if (user) {
                    res.json({ success: false, message: 'That username is already taken' }); 
                } else {
                    res.json({ success: true, message: 'Valid username' }); 
                }
            }
        });
    });

   
    router.post('/checkemail', function(req, res) {
        User.findOne({ email: req.body.email }).select('email').exec(function(err, user) {
            if (err) {
               
                res.json({ success: false, message: 'Something went wrong. ' });
            } else {
                if (user) {
                    res.json({ success: false, message: 'That e-mail is already taken' }); 
                } else {
                    res.json({ success: true, message: 'Valid e-mail' }); 
                }
            }
        });
    });

    router.post('/authenticate', function(req, res) {
        var loginUser = (req.body.username).toLowerCase(); 
        User.findOne({ username: loginUser }).select('email username password active').exec(function(err, user) {
            if (err) {
             
                res.json({ success: false, message: 'Something went wrong. ' });
            } else {
                           
                if (!user) {
                    res.json({ success: false, message: 'Username not found' }); 
                } else if (user) {
                   
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' }); 
                    } else {
                        var validPassword = user.comparePassword(req.body.password);  
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' }); 
                        } else {
                            var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); 
                            res.json({ success: true, message: 'User authenticated!', token: token }); 
                        }
                    }
                }
            }
        });
    });
  
    return router; 
};
