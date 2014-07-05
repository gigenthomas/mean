'use strict';

var contacts = require('../controllers/contacts');


// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};


// The Package is past automatically as first parameter
module.exports = function(Contacts, app, auth, database) {


    app.route('/contacts')
        .get(contacts.findByUser)
        .post(auth.requiresLogin, contacts.create);
    app.route('/contacts/:contactId')
        .get(contacts.show)
        .put(auth.requiresLogin, hasAuthorization, contacts.update)
        .delete(auth.requiresLogin, hasAuthorization, contacts.destroy);


    app.get('/contacts/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/contacts/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/contacts/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/contacts/example/render', function(req, res, next) {
        Contacts.render('index', {
            package: 'contacts'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });



    // Finish with setting up the articleId param
    app.param('contactId', contacts.contact);
};
