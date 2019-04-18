var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Admin Schema
var AdminSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    birthdate: {
        type: String    
    },
    bloodgroup: {
        type: String
    },
    email: {
        type: String,
        //required: true
    },
    mobilenumber: {
        type: String,
        //required: true
    },
    address: {
        type: String,
        //required: true
    },
    username: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    }
});
      
var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = function(newAdmin, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

module.exports.getAdminByUsername = function(username, callback){
    var query = {'username': username};
    Admin.findOne(query, callback);
}

module.exports.getAdminById = function(id, callback){
    Admin.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}
  
// // const User = module.exports = mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User', userSchema);

// // module.exports.getUserById = function(id, callback){
// //     User.findById(id, callback);
// // }

// // module.exports.getUserByUsername = function(username, callback){
// //     const query = {username: username}
// //     User.findOne(query, callback);
// // }

// // module.exports.addUser = function(newUser, callback){
// //     bcrypt.genSalt(10, (err, salt) => {
// //         bcrypt.hash(newUser.password, salt, (err, hash) => {
// //             if(err) throw err;
// //             newUser.password = hash;
// //             newUser.save(callback);
// //         });
// //     });
// // }

// // module.exports.comparePassword = function(candidatePassword, hash, callback){
// //     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
// //         if(err) throw err;
// //         callback(null, isMatch);
// //     });
