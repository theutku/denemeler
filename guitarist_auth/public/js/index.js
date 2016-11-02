//Validation Error Slide ====================================

$(document).ready(function() {
    $('.alert-danger').slideToggle('slow');
    $('.alert-success').slideToggle('slow');
});

//Active Tab on Page ========================================

$(document).ready(function () {
    
    var href = window.location.pathname;
       
    if(href == '/') {
        $('#home').addClass('active');
    }
    if(href == '/users/login') {
        $('#login').addClass('active');
    }
    if(href == '/users/register') {
        $('#register').addClass('active');
    }
});

