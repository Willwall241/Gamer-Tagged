// Get references to form elements
var $userName = $("#user-name");
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $psnName = $("#psn-name");
var $gamerTag = $("#xbox-name");
var $steam = $("#steam-name");
var $password = $("#inputPassword");
var $email = $("#email-input");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $gamelibrary = $("#search-game");

// Game library search function
function handleLibrarySearch() {
  var game = $("#search-input")
    .val()
    .trim();
  console.log("Game: " + game);
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    crossDomain: true,
    jsonp: "json_callback",
    url:
      "https://www.giantbomb.com/api/search/?format=jsonp&api_key=" +
      "47d89cf2776025d8ace3e66e641a4eb8bd066fc5&query=" +
      game
  }).done(function(data) {
    var gameData = {
      games: []
    };
    var results = data.results;
    console.log(results);
    $("#search-results").html("");
    // clear search array
    searchResults = [];
    for (i = 0; i < 10; i++) {
      gameData.games.push(results[i]);
      console.log(gameData);
    }
  });
}

// add game to library

$(document).on("click", "#add-game", function(event) {
  event.preventDefault();
  var gameGUID = $(this).val(); //grabs api's game id
  var id = gameGUID.toString();
  console.log(id);

  var library = {
    userID: 1,
    gameID: id
  };
  API.saveGame(library);
});

// The API object contains methods for each kind of request we'll make
var API = {
  saveProfile: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/",
      data: JSON.stringify(example)
    });
  },
  saveGame: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/library",
      data: JSON.stringify(example)
    });
  },
  getProfile: function(name) {
    return $.ajax({
      url: "api/profile/" + name,
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/example/" + id,
      type: "DELETE"
    });
  },
  gameLibrary: function(game) {
    return $.ajax({
      url: "api/library/" + game,
      type: "GET"
    });
  }
};

// save a new profile
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    userName: $userName.val().trim(),
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    psn: $psnName.val().trim(),
    gamerTag: $gamerTag.val().trim(),
    steam: $steam.val().trim(),
    password: $password.val().trim(),
    email: $email.val().trim()
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveProfile(user);

  $userName.val("");
  $firstName.val("");
  $lastName.val("");
  $email.val("");
};

// handleDeleteBtnClick is called when a delete button is clicked
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$gamelibrary.on("click", handleLibrarySearch);
