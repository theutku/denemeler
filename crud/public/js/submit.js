//Submit User Data to Database ====================================

function submitForm() {
	var firstName = document.forms['comment']['first_name'].value;
	var lastName = document.forms['comment']['last_name'].value
	var emailAdd = document.forms['comment']['email'].value;
	var comment = document.forms['comment']['comments'].value;

	if (comment.length > 300) {
		alert("Your comment must have maximum 300 characters!");
		return false;
	}

	if (firstName == null || firstName == "") {
		alert('Enter a valid Name');
		return false;
	}

	if (lastName == null || lastName == "") {
		alert('Enter a valid Surname');
		return false;
	}

	if (emailAdd == null || emailAdd == "") {
		alert('Enter a valid E - Mail Address');
		return false;
	}

	if (comment == null || comment == "") {
		alert('Please enter your comment');
		return false;
	}
	
	$.post("/saveperson",
		{
			first_name: firstName,
			last_name:  lastName,
			email: emailAdd,
			comments: comment

		}).done(function () {
			location.href = "/submitted.html";
		}).fail(function () {
			alert("Error saving person");
		});

	return false;
};


//List all the Records in the Database to the Submitted Page =========

var itemIds = [];
var visible = false;
function listAll() {
	$.get("/listpersons"
	).done(function(results) {

		//List The Records ===================

		if(!visible){
			for(var i=0; i<results.length; i++){
				var name = results[i].firstname;
				var last = results[i].lastname;
				var mail = results[i].email;
				var com = results[i].comments;
				var id = results[i].id;
				$('#recordList').append("<div class='rows'><h3>+ " + name + ' ' + last + "</h3><div class='buttons'><button class='update'> | Update</button><br/><button class='delete'> | Delete</button></div><div class='cred'><p>E - Mail: " + mail + '<br>Comments: ' + com + "</p></div></div>");
				itemIds.push(id);
			}

			//Call Delete and Update Functions on Click============

			$('.delete').on('click', deleteItem);
			$('.update').on('click', updateItem);

			//Display Total Records ==================

			$('#recnum').text(results.length);
			$('#recordList').slideToggle('slow');
			visible = true;

			//Display Update and Delete Buttons on Hover ==============

			$('.rows').on('mouseenter', function() {
				$(this).children('.buttons').slideToggle('fast');
			})
			.on('mouseleave', function() {
				$(this).children('.buttons').slideToggle('fast');
			});

			//Accordion Credentials ============

			$('div h3').on('click', function() {
				$(this).nextAll('.cred').eq(0).slideToggle('fast')
					.siblings('.cred').slideUp('fast');
			});
		} 

	}).fail(function() {
		alert('Error displaying results');
	})
};


//Delete Record from Database =================

function deleteItem() {
	var $parent = $(this).closest('.rows');
	var index = $parent.index('.rows');
	var id = itemIds[index];

	var sure = confirm('Are you sure?');

	if(sure){
		$.post("/delete/" + id, id
	).done(function() {
		$(this).closest('h3').css('background', 'red');
	})
	.fail(function() {
		alert('Error deleting record.');
	})
	}
	
};


//Update Record in Database ====================

function updateItem() {
	location.href = "/update.html";
}

//Character Count and Warning ===========

$(document).ready(function() {
	var maxLength = 300;
		$('textarea').keyup(function() {
			var charLength = $(this).val().length;
			var char = maxLength - charLength;
			$('#charcount').text(char);
			if(charLength > 250) {
				$('#charcount').addClass('charExceed');
			} else {
				$('#charcount').removeClass('charExceed');
			}
		});
})