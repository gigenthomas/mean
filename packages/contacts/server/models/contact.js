/**
 * Created by gigen on 7/4/14.
 */

'use strict' ;


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/**
 * Contact Schema
 */
var ContactSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },

    cellPhone: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});




/**
 * Validations
 */
ContactSchema.path('firstName').validate(function(firstName) {
    return !!firstName;
}, 'First Name cannot be blank');

ContactSchema.path('cellPhone').validate(function(cellPhone) {
    return !!cellPhone;
}, 'Cell Phone cannot be blank');


/**
* Statics
*/
ContactSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Contact', ContactSchema);