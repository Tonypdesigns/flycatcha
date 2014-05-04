$(function() {
  //Log user into the system
  var post = $('#status').val();
 // post = 'asjfklasjdfklasdfj';
  var post = {node:{type:'status', title:post, language:'und', body:post}};
  post = jQuery.param(post);
  console.log(post);
  $('#post-status').click(function(){
    if(!post){alert('Enter Post'); return false;}
    $.ajax
      ({
        type: "POST",
        url: "http://flycatcha.com/drupal/rest/node.json",
        dataType: 'json',
        data: post,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert("Could not post your status at this time please try again");
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data){
          console.log(data);
          alert('Post created successfully');
          window.location = "feed.html";
        },
      });
      return false;
    });
  return false;
});
