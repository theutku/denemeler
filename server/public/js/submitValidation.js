function submitLogin(){
	var nameInput = document.forms['userInput']['username'].value;
	var emailInput = document.forms['userInput']['emailAdd'].value;
	
	if(nameInput == null || nameInput == ""){
		alert("Please enter valid Name & Surname");
		return false;
	} 

	if(emailInput == null || emailInput == ""){
		alert("Please enter a valid E - Mail Address");
		return false;
	} 
}
