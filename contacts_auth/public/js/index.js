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

