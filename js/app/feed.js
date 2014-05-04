$(function(){
  $.ajaxSetup({
    headers: {
      'Authorization': "Basic Zmx5Y2F0Y2g6Q2F0Y2hhMTIz"
    }
  });
  //Load user status posts
  $.ajax({
        type: "POST",
        url: "http://flycatcha.com/drupal/rest/status",
        dataType: 'json',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(errorThrown);
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data){
          console.log(data);
          postStatusBtn =
          '<div class="btn-group btn-group-justified">'
          +'<div class="btn-group">'
          +'<button type="button" class="btn btn-danger"><i class="fa fa-pencil-square-o"></i>Status</button>'
          +'</div>'
          +'<div class="btn-group">'
          +'<button type="button" class="btn btn-danger"><i class="fa fa-camera"></i>Photo</button>'
          +'</div>'
          +'</div>';
          $('#feed').append(postStatusBtn);
          $.each(data.nodes,function(key, value){
            openRow = "<div class='row status-post'>";
            closeRow = "</div>";
            nid = value.node.nid;
            body = value.node.body;
            description = value.node.body;
            author = value.node.author;
            likeBtn = "<div class='col-xs-7'><img src='images/icons/star.png' width='40' />";
            starRatings = "<img src='images/rate-bar.png' width='75' /></div>";
            commentBtn = "<div class='col-xs-5'><img src='images/icons/comment.png' width='30' class='pull-right'/>";
            replyBtn = "<img src='images/icons/reply.png' width='30' class='pull-right'/>";
            menuBtn = "<img src='images/icons/menu.png' width='30' class='pull-right'/></div>";
            image = value.node.image ? "<div class='col-xs-12 status-post'><img src='"+value.node.image+"' class='img-responsive' width='100%'/></div>" : '';
            if(image){description = "<div class='col-xs-9 text-justify'>"+description+"</div>"; body="";}
            else{body = "<div class='col-xs-12 text-justify'>"+body+"</div>"; description = ''}
            //Gather author information - profile name and image
            $.ajax({
              type: "GET",
              url: "http://flycatcha.com/drupal/rest/user/"+author,
              dataType: 'json',
              success: function(data){
                //Load author data
                var fileFolder = "http://flycatcha.com/drupal/sites/default/files/pictures/";
                authorThumb = (data.picture) ? fileFolder+data.picture.filename : '';
                authorThumb = (data.picture) ? "<div class='col-xs-2'><img src='"+authorThumb+"' width='100%'/></div>" : '';
                authorName = data.name;
                authorName = "<div class='col-xs-2 red authorName'>"+authorName+"</div>";
                //Print feed data
                $('#feed').append(
                  openRow
                  +image
                  +body
                  +authorThumb
                  +authorName
                  +description
                  +closeRow
                  +openRow
                  +likeBtn
                  +starRatings
                  +commentBtn
                  +replyBtn
                  +menuBtn
                  +closeRow);
              },
            });
          });
        },
  });
});
