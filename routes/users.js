var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var messagebird = require('messagebird')('                  ');  

var User = require('../models/user');
  
//Register
router.get('/register',function(req, res){
    res.render('register');
});

//Signin
router.get('/signin',function(req, res){
    res.render('signin');
});

//Register user
router.post('/register',function(req, res){
    var name = req.body.name;
    var birthdate = req.body.birthdate;
    var bloodgroup = req.body.bloodgroup;
    var email = req.body.email;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var schoolname = req.body.schoolname;
    var schooladdress = req.body.schooladdress;
    var standard = req.body.standard;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;              

    //Validation
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else{
        var newUser = new User({
            name: name,
            birthdate: birthdate,
            bloodgroup: bloodgroup,
            email: email,
            mobilenumber: mobilenumber,
            address: address,
            schoolname: schoolname,
            schooladdress: schooladdress,
            standard: standard,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now sign in');

        res.redirect('/users/signin');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                console.log(user);
                console.log("Hello");
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
      
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});    
    
router.post('/signin',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/signin', failureFlash: true}),
  function(req, res) {
    res.redirect('/');     
  });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are signed out');

    res.redirect('/users/signin');
});

//Display page to ask the user for its phone number
// router.get('/forgot',function(req, res){
//     res.render('forgot');
// });

//Handle phone number submission
// router.post('/reset', function(req, res){
//     var mobilenumber = req.body.mobilenumber;

//     //Make request to verify API
//     messagebird.verify.create(mobilenumber, {
//         template: 'Your OTP is %token'
//     }, function(err, response){
//         if (err) {
//             //Request has failed
//             console.log(err);
//             res.render('forgot', {
//                 error : err.errors[0].description
//             });
//         } else {
//             //Request was successful
//             console.log(response);
//             res.render('reset', {
//                 id : response.id
//             });
//         }
//     });
// });

//Verify whether the token is correct
// router.post('/update', function(req, res){
//     var id = req.body.id;
//     var token = req.body.token;

//     //Make request to verify API
//     messagebird.verify.verify(id, token, function(err, response){
//         if (err) {
//             //Verification has failed
//             res.render('reset', {
//                 error: err.errors[0].description,
//                 id : id
//             });
//         } else {
//             //Verification was successful
//             res.render('update');
//         }
//     });
// });

//Application Form
router.post('/application', function(req, res){
    var name = req.body.name;
    var address = req.body.address;
    var mobilenumber = req.body.mobilenumber;
    var date = req.body.date;
    var options = req.body.options;
    var locationname = req.body.locationname;
    var birthdate = req.body.birthdate;
    var schoolname = req.body.schoolname;
    var standard = req.body.standard;
    res.redirect('/application');
});
  
//Higher Education Form
router.post('/higheredu', function(req, res){
    var name = req.body.name;
});

//Documents Form
router.post('/documents', function(req, res){
    var filenumber = req.body.filenumber;
    var file = req.body.file;
});
 
//Standard Result
router.post('/stnd', function(req, res){
    var name = req.body.name;
    var date = req.body.date;
    var standard = req.body.standard;
    var std1 = req.body.std1;
    var std2 = req.body.std2;
    var std3 = req.body.std3;
    var std4 = req.body.std4;
    var std5 = req.body.std5;
    var std6 = req.body.std6;
    var std7 = req.body.std7;
    var std8 = req.body.std8;
    var std9 = req.body.std9;
    var std10 = req.body.std10;
    var std11 = req.body.std11;
    var std12 = req.body.std12;
    var marks = req.body.marks;
    var file = req.body.file;
});

module.exports = router;   


  