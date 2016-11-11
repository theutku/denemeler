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

// Reveal New Contact Form & Edit Contact =====================
var id = "";

$(document).ready(function() {

    var visible = false;

    //Return to Original State of Page ========================
    var rollBack = function() {
        $('#editing').remove(); 
        $('.col-lg-12').css('background-color', '#eee');
        $('#editName').val('');
        $('#editEmail').val('');
        $('#editPhone').val('');
        id = "";
    }

    //Close Forms with Button =================================
    $('.btn-xs').click(function() {
        $('#newContForm').slideUp('slow');
        $('#editContForm').slideUp('slow');
        rollBack();
        visible = false;
        
    });

    //Reveal New Contact Form =================================
    $('#formButton').click(function() {
        $('#newContForm').slideToggle('slow');
        $('#editContForm').slideUp('slow');
        rollBack();
        visible = false;
    });

    //Reveal and Fill Edit Contact Form =======================
    $('.editBtn').click(function() {
         
        if(!visible) {
            
            $('#editContForm').slideToggle('slow');
            $('#newContForm').slideUp('slow');

            $(this).closest('#contactCont').css('background-color', '#d0e1f2').prepend("<div id='editing'><i class='fa fa-cog fa-spin fa-3x fa-fw'></i></div>");
            
            var name = $(this).closest(':has(h1 i)').find('h1 span').text().trim();
            var email = $(this).closest(':has(p i)').find('p .contemail').text().trim();
            var phone = $(this).closest(':has(p i)').find('p .contphone').text().trim();
            id = $(this).closest('.eachCont').attr('id');

            $('#editName').val(name);
            $('#editEmail').val(email);
            $('#editPhone').val(phone);
            $('#editId').val(id);

            visible = true;

        } else {

            $('#editContForm').slideToggle('slow');
            $('#newContForm').slideUp('slow');
            rollBack();
            
            visible = false;
        }
        
    });
});