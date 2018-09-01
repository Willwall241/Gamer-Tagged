$(document).ready(function() {
  // for edit profile
  // var $firstName = $("#firstName");
  // var $lastName = $("#lastName");
  // var $gamerTag = $("#gamerTag");
  // var $psn = $("#psn");
  // var $steam = $("#steam");

  // editProfile.on("submit", function() {
  //   var user = {
  //     firstName: $firstName.val().trim(),
  //     lastName: $lastName.val().trim(),
  //     gamerTag: $gamerTag.val().trim(),
  //     psn: $psn.val().trim(),
  //     steam: $steam.val().trim()
  //   };
  //   API.saveProfile(user);
  // });

  var API = {
    saveProfile: function(user) {
      return $.ajax({
        url: "/api/edit/",
        type: "PUT",
        data: user
      });
    },

    populateLibrary: function() {
      console.log("populating...");
      return $.ajax({
        url: "/api/library/",
        type: "GET"
      }).then(function(data) {
        var gameResults = data;
        for (i = 0; i < gameResults.length; i++) {
          var img = $("<img>");
          img.attr("src", gameResults[i].gameID);
          $("#lib-game-list").append(img);
        }
      });
    },

    populateFriendList: function() {
      return $.ajax({
        url: "/api/friend/list",
        type: "GET"
      }).then(function(data) {
        console.log(data);
        var friends = data;
        for (i = 0; i < friends.length; i++) {
          var br = $("<br>");
          var fullName = friends[i].firstName + " " + friends[i].lastName;
          $("#friend-dump").append(fullName);
          $("#friend-dump").append(br);
          if (friends[i].image !== null) {
            var img = $("<img>");
            img.attr("src", friends[i].image);
            $("#friend-dump").append(br);
            $("#friend-dump").append(img);
          }
        }
      });
    }
  };
  API.populateLibrary();
  API.populateFriendList();
});
// https://www.giantbomb.com/api/game/[guid]/?api_key=[YOUR API KEY]
