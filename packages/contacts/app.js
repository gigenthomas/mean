'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Contacts = new Module('contacts');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Contacts.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Contacts.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Contacts.menus.add({
        title: 'Contact Package View',
        link: 'contacts example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    //We are adding a link to the main menu for all authenticated users
    Contacts.menus.add({
        title: 'Contacts',
        link: 'all contacts',
        roles: ['authenticated'],
        menu: 'main'
    });


    //We are adding a link to the main menu for all authenticated users
    Contacts.menus.add({
        title: 'Create New Contact',
        link: 'create contact',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Contacts.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Contacts.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Contacts.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Contacts;
});
