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
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    crossDomain: true,
    jsonp: "json_callback",
    url:
      "https://www.giantbomb.com/api/search/?format=jsonp&api_key=47d89cf2776025d8ace3e66e641a4eb8bd066fc5&query=" +
      game
  }).done(function(data) {
    var results = data.results;
    console.log(results);
    $("#search-results").html("");
    // clear search array
    searchResults = [];
    for (i = 0; i < 10; i++) {
      var imageId = results[i].image.small_url;
      //  game icon
      var gameImg = results[i].image.small_url;
      var image = $("<img src='" + gameImg + "' height='300px';width:auto/>");
      //  game name
      var gameName = $("<h3>").text(results[i].name);
      //  is there a release date available? if so...
      if (results[i].original_release_date !== undefined) {
        //  format release date
        var date = new Date(results[i].original_release_date);
        var newDate = date.toString("dd-MM-yy");
        // gets rid of unnecessary data
        newDate = newDate.replace(/00:00.*/, "");
        // save the release date
        var gameRelease = $("<p>").text("Release date: " + newDate);
        // if there is no release date, return 'unknown'
      } else if (results[i].original_release_date === undefined) {
        var gameRelease = $("<p>").text("Release date: unknown");
      }
      //  game description
      var gameInfo = $("<p>").text("Description: " + results[i].deck);
      //  add library button
      var newButton = $("<button>" + "add to library" + "</button>");
      newButton.attr("id", "add-game");
      newButton.val(imageId);
      //  create a horizontal line
      var hr = $("<hr>");
      //  push game to search array
      searchResults.push(results[i].image.small_url);
      $("#search-results").append(
        gameName,
        image,
        gameInfo,
        gameRelease,
        newButton,
        hr
      );
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
  saveGame: function(game) {
    console.log(game);
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/library",
      data: JSON.stringify(game)
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
    }).then(function(results) {
      console.log(results);
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
