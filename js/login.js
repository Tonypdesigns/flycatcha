$(function() {
// Handler for .ready() called.
// alert('Login page');

//Initialize 
$.ajaxSetup({
  headers: {
    'Authorization': "Basic Zmx5Y2F0Y2g6Q2F0Y2hhMTIz"
  }
});

$.ajax
  ({
    type: "POST",
    url: "http://flycatcha.com/drupal/rest/system/connect",
    dataType: 'json',
    success: function (data){
        console.log(data);
    }
});


});