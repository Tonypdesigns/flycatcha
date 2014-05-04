$( document ).ready(function() {
  // Handler for .ready() called.
  var auth_user = "flycatch";
  var auth_pass = "Catcha123";

  $('.login-btn').click(function(){
    var username = $("#username").val();
    var password = $('#password').val();

    //Check if user filled out username
    if(!username){alert('Please enter username'); return false;}

    //Check if user filled out password
    if(!password){alert('Please enter password'); return false;}

    $.ajax({
      type: "POST",
      url: "http://flycatcha.com/drupal/rest/user/login.json",
      data: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
      dataType: 'json',
      beforeSend : function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + make_base_auth(auth_user, auth_pass));
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function(data){
        //console.log(data);
        alert( "Logged in as: " + data.user.name );
        //window.location.replace('feed.html');
      },
    });
  });//End login btn
  return false;
});

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}



