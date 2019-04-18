var express = require('express');
var router = express.Router();


//Get Homepage
router.get('/', function(req, res){
    res.render('index');
});

//Get Homepage only if user has signed in
// router.get('/', ensureAuthenticated, function(req, res){
//     res.render('index');
// });

// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     } else{
//         req.flash('error_msg', 'You are not signed in');
//         res.redirect('/users/signin');
//     }
// }

//Get Services Page
router.get('/services', function(req, res){
    res.render('services');
});

//Get About Us Page
router.get('/aboutus', function(req, res){
    res.render('aboutus');
});

//Get Gallery Page
router.get('/gallery', function(req, res){
    res.render('gallery');
});

//Get Sponsorship Page
router.get('/sponsorship', function(req, res){
    res.render('sponsorship');
});

//Get Application Form
router.get('/application', function(req, res){
    res.render('application');
});

//Get Higher Education Form
router.get('/higheredu', function(req, res){
    res.render('higheredu');
});

//Documents Form
router.get('/documents', function(req, res){
    res.render('documents');
});
 
//Standard Result
router.get('/stnd', function(req, res){
    res.render('stnd');
});

//Material Requirement
router.get('/material', function(req, res){
    res.render('material');
});

//Phase Result
router.get('/phase', function(req, res){
    res.render('phase');
});

//Report Page
router.get('/report', function(req, res){
    res.render('report');
});

module.exports = router; 