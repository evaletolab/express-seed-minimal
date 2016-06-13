var db = require('mongoose'),
    validator = require('../app/validator'),
    check = validator.check,
    ifCheck = validator.ifCheck;


exports.check   = check;
exports.ifCheck = ifCheck;



exports.config = function(conf){
}


