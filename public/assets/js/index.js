
// Get references to form elements
var $userName = $("#user-name");
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $email = $("#email-input");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $gamelibrary = $("#search-game");

// Get references to library search
var $gameSearch = $("#search-input");
var testSearch = "Tom";

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/",
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
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var searchTest = function(test) {
  API.getProfile(test).then(function(data) {
    console.log(data);
    // var $examples = data.map(function(example) {
    //   var $a = $("<a>")
    //     .text(example.text)
    //     .attr("href", "/profile/" + profile.id);

    //   var $li = $("<li>")
    //     .attr({
    //       class: "list-group-item",
    //       "data-id": profile.id
    //     })
    //     .append($a);

    //   var $button = $("<button>")
    //     .addClass("btn btn-danger float-right delete")
    //     .text("ｘ");

    //   $li.append($button);

    //   return $li;
    // });

    // $exampleList.empty();
    // $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    userName: $userName.val().trim(),
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    email: $email.val().trim()
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExample(user);

  $userName.val("");
  $firstName.val("");
  $lastName.val("");
  $email.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// The game library search function
var handleLibrarySearch = function() {
  var game = $gameSearch.val().trim();

  API.getExamples(game);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$gamelibrary.on("click", handleLibrarySearch);

searchTest(testSearch);
