/**
 * Created by gigen on 7/4/14.
 */

'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact'),
    _ = require('lodash');



/**
 * Find contact  by id
 */
exports.contact = function(req, res, next, id) {
    Contact.load(id, function(err, contact ) {
        if (err) return next(err);
        if (!contact ) return next(new Error('Failed to load Contact ' + id));
        req.contact = contact ;
        next();
    });
};


/**
 * Create a contact
 */
exports.create = function(req, res) {
    var contact = new Contact(req.body);
    contact.user = req.user;

    contact.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the contact'
            });
        }
        res.jsonp(contact);

    });
};



/**
 * Update a contact
 */
exports.update = function(req, res) {
    var contact= req.article;

    contact= _.extend(contact, req.body);

    contact.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the contact'
            });
        }
        res.jsonp(contact);

    });
};





/**
 * Delete a contact */
exports.destroy = function(req, res) {
    var contact= req.contact;

    contact.remove(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the contact '
            });
        }
        res.jsonp(contact);

    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.contact);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Contact.find().sort('-created').populate('user', 'name username').exec(function(err, contacts) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the contacts'
            });
        }
        res.jsonp(contacts);

    });
};
