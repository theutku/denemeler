//Active Tabs ===========================================

$(document).ready(function() {

    var href = window.location.pathname;

    if(href == '/') {
        $('#home').addClass('active');
    }
    if(href == '/users/register') {
        $('#register').addClass('active');
    }
    if(href == '/users/contacts') {
        $('#contacts').addClass('active');
    }
    if(href == '/users/account') {
        $('#account').addClass('active');
    }
    if(href == '/users/login') {
        $('#login').addClass('active');
    }
});

//Message Slide ========================================

$(document).ready(function() {
    $('.alert-danger').slideToggle('slow');
    $('.alert-success').slideToggle('slow');    
});

//Check User Approval for Deletion =====================

function checkUser() {
    var sure = confirm('Are you sure?');
    if(sure) {
        return true;
    } else {
        return false;
    }
}

// Reveal New Contact Form =============================

function revealForm() {
    $('#newContForm').slideToggle('slow');
    
}