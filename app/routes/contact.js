var User = require('../models/user'); 
var jwt = require('jsonwebtoken');
var secret = 'saggy2secret'; 
var ObjectId = require('mongodb').ObjectID;
module.exports = function(router,db) {
    router.post('/addContact',function(req,res){
        var contactNo=req.body.contactNo;
        var userId=req.body.userId;
        console.log(req.body);
        var decoded = jwt.decode(userId);
        var payload={'_id':ObjectId(),'contactNo':contactNo};
        User.findOneAndUpdate({'username':decoded.username},{$push:{'contact':payload}},function(err,data){
            console.log(data);
            if(err==null){
                res.json({success:true,contact:payload});
            }
            else{

            }
        });
    });
    
    router.post('/updateContact',function(req,res){
         var userId=req.body.userId;
        var contactId=req.body.contactId;
        var contactNo=req.body.contactNo;
        User.findOneAndUpdate({_id:new ObjectId(userId),"contact._id":new ObjectId(contactId)},{$set:{'contact.$.contactNo':contactNo}},function(err,data){
            console.log("data",data);
            if(err!=null){
                console.log("data",data);
                 res.json({success:true,contactId:contactId,contactNo:contactNo});
            }
            else{
                res.json({success:false});
            }
            
        });
    });
    router.post('/getContact',function(req,res){
        var userId=req.body.userId;
        var decoded = jwt.decode(userId);
        User.find({'username':decoded.username},{'contact':1},function(err,data){
            console.log(data);
            if(err==null){
                res.json({success:true,contact:data[0]});
            }
            else{

            }
        });
    });
    router.post('/deleteContact',function(req,res){
        var userId=req.body.userId;
        var contactId=req.body.contactId;
        User.findOneAndUpdate({_id:new ObjectId(userId)},{'$pull':{'contact': { '_id':new ObjectId(contactId) } }},{safe:true},function(err,data){
            if(err!=null){
                console.log(data);
                 res.json({success:true,contactId:contactId});
            }
            else{
                res.json({success:false});
            }
            
        });
    });
    router.post('/me', function(req, res) {
    	console.log(req.headers);
        console.log(jwt.decode(req.headers['x-access-token']));
        res.send(req.decoded); 
    });

    return router; 
};
