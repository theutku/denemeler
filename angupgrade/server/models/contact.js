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
var insertItem = 'INSERT INTO contactslist(belongId, contname, contemail, contphone, updated, updateDate, contdate) VALUE(?, ?, ?, ?, ?, ?, ?)';
var deleteItem = 'DELETE from contactslist where id = ?';
var updateItem = 'UPDATE contactslist SET contname=?, contemail=?, contphone=?, updated = ?, updateDate=? where id = ?';

//Add New Contact to Database =========================================

contactModel.addContact = function(newContact, callback) {

    var hashes = [];
    var date = new Date();
    newContact.date = date;    
    newContact.updated = "false";
    newContact.updateDate = "";
    // for(var x in newContact) {
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

    db.query(insertItem, [newContact.belongId, newContact.contname, newContact.contemail, newContact.contphone, newContact.updated, newContact.updateDate, newContact.date], function (err) {
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
           callback(null, false, "");
       } else {
           
           for(var i=0; i<results.length; i++) {
               if(results[i].updateDate) {
                    var trimDate = results[i].updateDate.substring(0,16);
                    results[i].updateDate =trimDate;                   
               }
           }
           console.log('Contacts successfully found.');
           console.log(results);
           callback(null, true, results);
       }
    });
}

// DELETE Contact From Database ======================================

contactModel.deleteContact = function(contId, callback) {
    db.query(deleteItem, contId, function(err) {
        if(err) {
            console.log('Error deleting contact.');
            callback(err);
        } else {
            console.log('Contact deleted.');
            callback(null);
        }
    });
}

// EDIT Contact in Database =========================================

contactModel.editContact = function(editedContact, callback) {

    var editDate = new Date();
    editedContact.updateDate = editDate;
    editedContact.updated = "true";

    db.query(updateItem, [editedContact.name, editedContact.email, editedContact.phone, editedContact.updated, editedContact.updateDate, editedContact.contId], function(err) {
        if(err) {
            console.log('Error updating contact.');
            callback(err);
        } else {
            console.log('Contact updated successfully');
            callback(null);
        }
    })
}