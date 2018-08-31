var $newStatus = $("#status-input");
var $statusSubmit = $("#status-submit");

$statusSubmit.on("click", handleStatusChange);

var handleStatusChange = function() {
  var status = {
    status: $newStatus.val().trim()
  };
  API.statusChange(status);
};

var API = {
  statusChange: function(status) {
    return $.ajax({
      url: "/api/status/",
      type: "PUT",
      data: status
    });
  }
};
