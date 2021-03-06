$(document).ready(function() {
  // for edit profile
  var $firstName = $("#firstName");
  var $lastName = $("#lastName");
  var $gamerTag = $("#gamerTag");
  var $psn = $("#psn");
  var $steam = $("#steam");
  var $status = $("#status");
  var editProfile = $("form.editProfile");


  $(document).on("click", "#profile-edit", function(event) {
    event.preventDefault();
    var user = {
      firstName: $firstName.val().trim(),
      lastName: $lastName.val().trim(),
      gamerTag: $gamerTag.val().trim(),
      psn: $psn.val().trim(),
      steam: $steam.val().trim(),
      status: $status.val().trim()
    };
    API.saveProfile(user);
  });
 
  var API = {
    saveProfile: function(user) {
      console.log("saving...");
      return $.ajax({
        url: "/api/edit/",
        type: "PUT",
        data: user
      }).then(function(){
        location.reload();
      })
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
          img.attr("width", "256px");
          img.attr("height", "256px");
          img.css("margin", "15px");
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
          // $("#friend-dump").append(br);
          var img = $("<img>");
          img.attr("src", friends[i].image);
          img.css("margin", "15px");
          // $("#friend-dump").append(br);
          $("#friend-dump").append(img);
        }
      });
    }
  };
  API.populateLibrary();
  API.populateFriendList();
});
// https://www.giantbomb.com/api/game/[guid]/?api_key=[YOUR API KEY]
