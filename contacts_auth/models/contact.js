//Require Modules =====================================================

var bcrypt = require('bcryptjs');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3400',
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

contactModel.addContact = function(newContact, callback) {

    var hashes = [];
    var date = new Date();
    newContact.date = date;

    //Contact Creation Function ==========================================
    var createNewContact = function() {

        for(i in newContact) {
            if(newContact[i].length == 0) {
                hashes.push("NA");
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newContact[i], salt, function (err, hash) {
                        newContact[i] = hash;
                        hashes.push(newContact[i]);
                    });
                });
            }         
        }
 
    }

        db.query(insertItem, [hashes[0], hashes[1], hashes[2], hashes[3], newContact.date], function (err) {
            if (err) {
                console.log('Database write error.');
                callback(err);
            } else {
                console.log('Contact successfully created.');
                callback(null);
                createNewContact();
            }
        });

}



