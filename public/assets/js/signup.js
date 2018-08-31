$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var userNameInput = $("input#username-input");
  var firstNameInput = $("input#firstname-input");
  var lastNameInput = $("input#lastname-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var gamerTag = $("input#xbox-input");
  var psn = $("input#playstation-input");
  var steamId = $("input#steam-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      userName: userNameInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      gamerTag: gamerTag.val().trim(),
      psn: psn.val().trim(),
      steam: steamId.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    userNameInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    return $.ajax({
      url: "/api/signup/",
      type: "POST",
      data: userData
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
