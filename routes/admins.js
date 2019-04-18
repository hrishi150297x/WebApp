var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var messagebird = require('messagebird')('                  ');  
  
var Admin = require('../models/user');
  
//Register
router.get('/adminreg',function(req, res){
    res.render('adminreg');
});
        
//Signin
router.get('/adminsignin',function(req, res){
    res.render('adminsignin');
});

//Register admin
router.post('/adminreg',function(req, res){
    var name = req.body.name;
    var birthdate = req.body.birthdate;
    var bloodgroup = req.body.bloodgroup;
    var email = req.body.email;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;              

    //Validation
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('adminreg',{
            errors:errors
        });
    } else{
        var newAdmin  = new Admin({
            name: name,
            birthdate: birthdate,
            bloodgroup: bloodgroup,
            email: email,
            mobilenumber: mobilenumber,
            address: address,
            username: username,
            password: password
        });

        Admin.createAdmin(newAdmin, function(err, admin){
            if(err) throw err;
            console.log(admin);
        });

        req.flash('success_msg', 'You are registered and can now sign in');

        res.redirect('/admins/adminsignin');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        Admin.getAdminByUsername(username, function(err, admin){
            if(err) throw err;
            if(!admin){
                return done(null, false, {message: 'Unknown User'});
            }
            Admin.comparePassword(password, admin.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, admin);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
});
      
passport.deserializeUser(function(id, done) {
    Admin.getAdminById(id, function(err, admin) {
        done(err, admin);
    });
});    
    
router.post('/adminsignin',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/admins/adminsignin', failureFlash: true}),
  function(req, res) {
    res.redirect('/');     
  });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are signed out');

    res.redirect('/admins/adminsignin');
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

  


router.post('/report',function(req, res){
    var srno = req.body.srno;
    var reportname = req.body.reportname;
    var date = req.body.date;
    var file = req.body.file;
    res.redirect('/admins/report');
});



router.post('/phase',function(req, res){
    var filenumber = req.body.filenumber;
    var phase = req.body.phase;
    var marks = req.body.marks;
    var phase1_1 = req.body.phase1_1;
    var phase1_2 = req.body.phase1_2;
    var phase1_3 = req.body.phase1_3;
    var phase1_4 = req.body.phase1_4;
    var phase1_5 = req.body.phase1_5;
    var phase2_1 = req.body.phase2_1;
    var phase2_2 = req.body.phase2_2;
    var phase2_3 = req.body.phase2_3;
    var phase3_1 = req.body.phase3_1;
    var phase3_2 = req.body.phase3_2;
    var phase3_3 = req.body.phase3_3;
    var phase3_4 = req.body.phase3_4;
    var phase3_5 = req.body.phase3_5;
    var phase3_6 = req.body.phase3_6;
    var phase3_7 = req.body.phase3_7;
    var phase4_1 = req.body.phase4_1;
    var phase4_2 = req.body.phase4_2;
    var phase4_3 = req.body.phase4_3;
    var result = req.body.result;
});



router.post('/material',function(req, res){
    var filenumber = req.body.filenumber;
    var name = req.body.name;
    var date = req.body.date;
    var standard = req.body.standard;
    var hpgsbook = req.body.hpgsbook;
    var tpgsbook = req.body.tpgsbook;
    var hpgsregister = req.body.hpgsregister;
    var artsbook = req.body.artsbook;
    var longbook = req.body.longbook;
    var compassbox = req.body.compassbox;
    var pencil68 = req.body.pencil68;
    var pencil910 = req.body.pencil910;
    var bluepen = req.body.bluepen;
    var calculator = req.body.calculator;
    var postercolor = req.body.postercolor;
    var projectfile = req.body.projectfile;
});     

module.exports = router; 