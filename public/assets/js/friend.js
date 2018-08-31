// We need a way to retrieve user id after signing in
// for this to fully work

// inputs
var $friendInput = $("#friend-input");

// buttons
var $friendSearch = $("#friend-submit");
var $friendAdd = $("#add-friend-test");

var handleFriendSearch = function() {
  var name = $friendInput.val().trim();
  console.log(name);
  API.searchFriend(name);
};

var handleFriendAdd = function() {
  var friend = {
    friendId: $friendAdd.val()
  };
  console.log(friend);
  API.addFriend(friend);
};

var displayFriends = function() {
  API.allFriends(2);
};
var API = {
  searchFriend: function(name) {
    return $.ajax({
      url: "/api/friend/search/" + name,
      type: "GET"
    });
  },
  addFriend: function(friend) {
    return $.ajax({
      url: "/api/friend/add/",
      type: "POST",
      data: friend
    });
  },
  allFriends: function(id) {
    return $.ajax({
      url: "/api/friend/list/" + id,
      type: "GET"
    });
  }
};

$friendSearch.on("click", handleFriendSearch);
$friendAdd.on("click", handleFriendAdd);
displayFriends();
