//Parse User Info from URL
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();


//Display User Info
$(document).ready(init);

function init() {
  // dom hazır
  doDisplay();
};

function doDisplay() {

  //User Information Display
  var vars = QueryString;
  //document.getElementById("username").innerHTML = vars["username"];
  document.getElementById("useremail").innerHTML = "<span>E - mail: </span>" + vars["emailAdd"];

  document.querySelector("#username").innerHTML = "<span>Username: </span>" + vars["username"];

  //$(".username").html(vars["username"]);

};




//Submit the answers of the User
function submitAnswers(){
  var total = 10;
  var score = 0;

  //Validation
  for(i = 1; i <= total; i++){
    var q = document.forms['quizForm']['q' + i].value;
    var question = "#question" + i;
    if(q == null || q == ""){
      alert("Question  " + i + " has not been answered");
      $(question).addClass('emptyQuestion');
      return false;
      } else {

        //Display Results Tab
        $('#results').show('slow');

        //Remove Empty Question Highlight
        $(question).removeClass('emptyQuestion');

        //Submit Button Fade Out on Click
        $('#submitBtn').fadeOut('slow');

        //Scroll to Results on Submit
        $('html, body').stop().animate({
          scrollTop: $('header').offset().top
        }, 1000);  

      }
  };

  // Set correct answers
  var answers = ["b","a","b","c","a","b","b","b","a","a"];

  //Check answers
  for(i = 1; i <= total; i++){
    var q = document.forms['quizForm']['q' + i].value;
    if(q == answers[i - 1]){
      score++;
    }
  }

  //Display results
  var results = document.getElementById('resultspan');
  results.innerHTML = "<h3>You scored <span>" + score + "</span> out of <span>" + total + "</span></h3>"
  return false;
}



//Jquery 
$(document).ready(function() {

  //Submit Button Fade
  $('#submitBtn').mouseenter(function() {
    $('#submitBtn').fadeTo('fast', 1);
  });
  $('#submitBtn').mouseleave(function() {
    $('#submitBtn').fadeTo('fast', 0.5);
  });

  //User Info Slide on Load
  $('#userInfo').slideToggle('slow');
});

