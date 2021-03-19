//Like Button Alert
function likeIt() {
  alert("Thanks! You're OK too");
}

//Who are you - Get name with prompt and send user a welcome message in welcomeUser div
function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById("welcomeuser").innerHTML =
    "<p> Hello, " +
    username +
    ", looking forward to hearing your playlists! Click this message to close it. </p>";
  welcomeUserDiv.style.cursor = "pointer";
}

//Hides welcome message
let hideWelcome = _ =>
  (document.getElementById("welcomeuser").style.display = "none");

//Toggles Read More div (default = hidden)
function showHide() {
  let readMoreDiv = document.getElementById("readMore");

  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
    readMoreDiv.style.color = "red";
    readMoreDiv.style.fontWeight = "bold";
  }
}

function getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("You gave a rating of: ");
    for (let i=0; i < userRating; i++){
        $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}

$(".deleteBuilding").click(() => confirm('Are you sure you want to delete this building?'));
$(".deleteCampus").click(() => confirm('Are you sure you want to delete this campus?'));
$(".deleteRoom").click(() => confirm('Are you sure you want to delete this room?'));
