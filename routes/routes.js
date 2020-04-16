var express = require('express');
var routing= express.Router();
var busLog=require('../public/javascripts/BL.js');




routing.post('/login',function(request,response,next){
    var username=request.body.username;
    var password=request.body.password;
    return busLog.loginUser(username,password)
            .then(function(data){
                response.json(data);
            }).catch(function (error){
                next(error);
            });
});





routing.post('/signup',function(req,res,next){
    var credentials={
        "fname":req.body.firstname,
        "lname":req.body.lastname,
        "uname":req.body.username,
        "pass":req.body.password
    }
    return busLog.signupUser(credentials)
            .then(function(item){
                res.json(item);
            }).catch(function (err){
                next(err);
            });
});

routing.get('/books/:type',function(req,res,next){
    var type=req.params.type
    return busLog.getBooks(type)
            .then(function(item){
                res.json(item);
            }).catch(function (err){
                next(err);
            });
})

module.exports=routing;