var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema({
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
    schoolname: {
        type: String,
        //required: true
    },
    schooladdress: {
        type: String,
        //required: true
    },
    standard: {
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
    },
    filenumber: {
        type: String
    },
    std1: {
        type: String
    },
    std2: {
        type: String
    },
    std3: {
        type: String
    },
    std4: {
        type: String
    },
    std5: {
        type: String
    },
    std6: {
        type: String
    },
    std7: {
        type: String
    },
    std8: {
        type: String
    },
    std9: {
        type: String
    },
    std10: {
        type: String
    },
    std11: {
        type: String
    },
    std12: {
        type: String
    },
    phase1_1: {
        type: String
    },
    phase1_2: {
        type: String
    },
    phase1_3: {
        type: String
    },
    phase1_4: {
        type: String
    },
    phase1_5: {
        type: String
    },
    phase2_1: {
        type: String
    },
    phase2_2: {
        type: String
    },
    phase2_3: {
        type: String
    },
    phase3_1: {
        type: String
    },
    phase3_2: {
        type: String
    },
    phase3_3: {
        type: String
    },
    phase3_4: {
        type: String
    },
    phase3_5: {
        type: String
    },
    phase3_6: {
        type: String
    },
    phase3_7: {
        type: String
    },
    phase4_1: {
        type: String
    },
    phase4_2: {
        type: String
    },
    phase4_3: {
        type: String
    },
    result: {
        type: String
    },
    hpgsbook: {
        type: String
    },
    tpgsbook: {
        type: String
    },
    hpgsregister: {
        type: String
    },
    artsbook: {
        type: String
    },
    longbook: {
        type: String
    },
    compassbox: {
        type: String
    },
    pencil68: {
        type: String
    },
    pencil910: {
        type: String
    },
    bluepen: {
        type: String
    },
    calculator: {
        type: String
    },
    postercolor: {
        type: String
    },
    projectfile: {
        type: String
    }
});
      
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {'username': username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
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
