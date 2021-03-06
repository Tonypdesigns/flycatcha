$(function() {
  $.support.cors = true;
  //Initialize password protected headers
  $.ajaxSetup({
    headers: {
      'Authorization': "Basic Zmx5Y2F0Y2g6Q2F0Y2hhMTIz"
    }
  });

  //Log user into the system
  $('#login-btn').click(function(){
    var user = $('#username').val();
    var pass = $('#password').val();
    var loginCredentials = {username: user, password: pass};
    loginCredentials = jQuery.param(loginCredentials);
    if(!user){alert('Enter username'); return false;}
    if(!pass){alert('Enter password'); return false;}
    $.ajax
      ({
        type: "POST",
        url: "http://flycatcha.com/drupal/rest/user/login",
        dataType: 'json',
        data: loginCredentials,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert("Incorrect login credentials please try again.");
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data){
          console.log(data);
          alert('Logged in successfully');
          window.location = "feed.html";
        },
      });
      return false;
    });
  return false;
});
