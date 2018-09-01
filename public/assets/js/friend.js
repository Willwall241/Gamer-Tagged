$(document).ready(function() {
  // inputs
  var $friendInput = $("#friend-input");
  var $friendSearch = $("#friend-search");

  $friendSearch.on("click", function(event) {
    event.preventDefault();
    var name = $friendInput.val().trim();
    console.log(name);
    API.getFriend(name);
  });

  var API = {
    getFriend: function(name) {
      return $.ajax({
        url: "/api/friend/search/" + name,
        type: "GET"
      }).then(function(data) {
        $("#friend-div").append(br);
        var friendResults = data;
        for (i = 0; i < friendResults.length; i++) {
          var br = $("<br>");
          var fullName =
            friendResults[i].firstName + " " + friendResults[i].lastName;
          $("#friend-div").append(fullName);
          $("#friend-div").append(br);
          var img = $("<img>");
          img.attr("src", friendResults[i].image);
          $("#friend-div").append(br);
          $("#friend-div").append(img);
          var button = $("<button>add friend</button>");
          button.val(friendResults[i].image);
          button.attr("id", "add-friend");
          $("#friend-div").append(br);
          $("#friend-div").append(button);
        }
      });
    },
    addFriend: function(name) {
      return $.ajax({
        url: "/api/friend/add/",
        type: "POST",
        data: name
      }).then(function() {
        console.log("friend added!");
      });
    }
  };

  $(document).on("click", "#add-friend", function() {
    var name = $(this).val();
    var friend = {
      name: name
    };
    API.addFriend(friend);
  });
});
