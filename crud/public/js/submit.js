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

function listAll() {
	$.get("/listpersons", records
	).done(function() {
		for(var i; i<records.length; i++){
			$('#recordList').append('<li> ' + records[i] + '</li>');
		}
	}).fail(function() {
		alert('Error displaying results');
	})
};
