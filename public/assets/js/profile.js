$(document).ready(function() {
  var $firstName = $("#firstName");
  var $lastName = $("#lastName");
  var $gamerTag = $("#gamerTag");
  var $psn = $("#psn");
  var $steam = $("#steam");

  editProfile.on("submit", function() {
    var user = {
      firstName: $firstName.val().trim(),
      lastName: $lastName.val().trim(),
      gamerTag: $gamerTag.val().trim(),
      psn: $psn.val().trim(),
      steam: $steam.val().trim()
    };
    API.saveProfile(user);
  });
});

var API = {
  saveProfile: function(user) {
    return $.ajax({
      url: "/api/edit/",
      type: "PUT",
      data: user
    });
  }

  // populateLibrary: function(){
  //   return $.ajax({
  //     url: "/api/library/",
  //     type: "GET",
  //   }).then(function(data){
  //     console.log(data.results);
  //     var gameResults = data.results;

  //     $.ajax({
  //       type: "GET",
  //       dataType: "jsonp",
  //       crossDomain: true,
  //       jsonp: "json_callback",
  //       url:
  //         "https://www.giantbomb.com/api/game/" + result.gameID + "/?api_key=47d89cf2776025d8ace3e66e641a4eb8bd066fc5"
  //     }).then(function(data){

  //     })
  //   })
  // }
};

// https://www.giantbomb.com/api/game/[guid]/?api_key=[YOUR API KEY]
