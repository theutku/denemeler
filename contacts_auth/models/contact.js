//Require Modules =====================================================

var bcrypt = require('bcryptjs');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '12345',
    database: 'quiz'
});

//Export User Model Function ==========================================

var contactModel = module.exports;

//Database User Query Variables =======================================

var findByName = 'SELECT * from contactslist where contname = ?';
var findByUserId = 'SELECT * from contactslist where belongId = ?';
var findByEmail = 'SELECT * from contactslist where contemail = ?';
var insertItem = 'INSERT INTO contactslist(belongId, contname, contemail, contphone, contdate) VALUE(?, ?, ?, ?, ?)';
var deleteItem = 'DELETE from contactslist where id = ?';

//Add New Contact to Database =========================================

contactModel.addContact = function(newContact, callback) {

    var hashes = [];
    var date = new Date();
    newContact.date = date;    

    // for(x in newContact) {
    //     if(newContact[x].length == 0) {
    //         hashes.push("NA");
    //     } else {
    //         bcrypt.genSalt(10, function (err, salt) {
    //             bcrypt.hash(newContact[x], salt, function (err, hash) {
    //                 newContact[x] = hash;
    //                 hashes.push(newContact[x]);
    //             });
    //         });
    //     }         
    // }

    db.query(insertItem, [newContact.belongId, newContact.contname, newContact.contemail, newContact.contphone, newContact.date], function (err) {
        if (err) {
            console.log('Database write error.');
            callback(err);
        } else {
            console.log('Contact successfully created.');
            callback(null);
        }
    });

}

//Search for Contacts in Database =====================================

contactModel.listContacts = function(userId, callback) {
    db.query(findByUserId, userId, function(err, results) {
       if(err) {
           console.log('Error searching database for contacts.');
           callback(err);
       } else if(!results.length) {
           console.log('No contact records.');
           callback(null, false, null);
       } else {
           console.log('Contacts successfully found.');
           callback(null, true, results);
       }
    });
}


