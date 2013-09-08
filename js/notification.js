$(document).ready(function () {
	var uid;
	var tid;
	var date;
	var nid = new Array();
	var months = ['Janurary','Feburary','March','April','May','June','July','August','September','October','November','December'];
	var friend_id = [];
	var friend_name = [];
	var mid = new Array();//Message id
	var message="";
	var requestee_id = new Array();
	var friend_requests = "";
	var friend_request_img = "";
	var new_comments_count = new Array();
	var new_comment_nodes = new Array();
	var user_comments = "";
	var user_comments_date = "";
	var user_comments = "";
	var user_comments_date = ""
	var cid = new Array();
	

	
	// GET CURRENT USER UID
	$.ajax({
      url: "http://flycatcha.com/rest/system/connect",
      type: 'post',
      dataType: 'json',
	  async: false,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {	
		uid = data.user.uid;
		//alert(uid);
    }//End success
	});//End ajax call
	
		
	//RETREIVE ALL PRIVATE MESSAGES
	// LOAD CURRENT USERS MESSAGE THREADS
    $.ajax({
      url: "http://flycatcha.com/rest/usermsg/"+uid,
      type: 'get',
      dataType: 'json',
	  async: false,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(error);
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {	
		$.each(data, function(key, value){
			if(value.is_new==1){
				 pubDate = new Date(value.last_updated*1000);
				 var year = pubDate.getFullYear();
				 var month = months[pubDate.getMonth()];
				 var date = pubDate.getDate();
				 var hour = pubDate.getHours();
				 hour = hour % 12;
				 var minutes = pubDate.getMinutes();
				 minutes = (minutes < 10 ? "0":"")+minutes;
				 var sec = pubDate.getSeconds();
				 var ampm = hour >= 12 ? 'PM' : 'AM';
				 var formatted_date = month+' '+date+', '+year+' '+hour+':'+minutes+" "+ampm;
				 $("<hr><h2>"+value.subject+"</h2><p>"+formatted_date+"</p>"+
				"<div class=''><a href='#' id='"+value.thread_id+"' class='reply'>Reply</a> | "+
				"<a href='#' id='"+value.thread_id+"' class='delete-message'>Delete</a></div><br>").appendTo('.message-thread');
			 }//End if is new
		});//End loop
		}//End success
	}); //End ajax call
	
	//RETREIVE ALL NEW FRIEND REQUESTS
	$.ajax({
      url: "http://flycatcha.com/rest/user/"+uid+"/relationshipsuser/",
      type: 'get',
      dataType: 'json',
	  async: false,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
		//console.log(data);
		$.each(data, function(key, value){
			if(value.approved==1){
				requestee_id[key] = value.requestee_id;
			}//End if statement
		});//End each statement
		}//End success
	});//End ajax call
	
	// LOAD ALL FRIEND REQUEST
	for(var i = 0; i < requestee_id.length; i++){
		$.ajax({
		  url: "http://flycatcha.com/rest/user/"+requestee_id[i],
		  type: 'get',
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			//alert('page_dashboard - failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {
			friend_requestee = '<div class="requestee"><img src="../sites/default/files/pictures/'+data.picture.filename+'" width="75"/><br>'
			+data.name+'</div><br>'
			+"<button class='approve-friend' data-theme='a'>Approve Friend</button>"
			+"<button class='disapprove-friend' data-theme='a'>Disapprove Friend</button><br>";
			$('.friends-thread').append(friend_requestee).trigger('create');
		 //console.log(data);
		}//End success
		});//End ajax call
	}//End for loop
	
	
	//LOAD NEW COMMENTS
	//LOAD NODES CREATED BY USER
	$.ajax({
			async: false,
			type: "get",
			url: "../rest/status/",
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
			    console.log(data);
				$.each(data.nodes, function(key, value){
					if(value.node.author == uid){
						nid[key] = value.node.nid;
					}//End if statement
				});//End if statement
			}, 
	}); 
	// END RETREIVE STATUS POSTS	

	//DETERMINE HOW MANY COMMENTS ARE NEW
	for(var i = 0; i < nid.length; i++){
		$.ajax({
			async: false,
			type: "post",
			url: "../rest/comment/countNew/",
			data: "nid="+nid[i],
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				new_comments_count[i] = data.replace(/^.*(\d+).*$/i,'$1');
			}, 
		}); 
	}//end for loop
	
	//SHOW USER THE FIRST COMMENT FROM THREAD OF COMMENTS
	//LINK TITLE OF TOP COMMENT TO THREAD
	//RETREIVE COMMENTS FOR NODE
	$.ajax({
		  url: "../rest/comment",
		  type: 'get',
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('page_dashboard - failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {
		  console.log(data);
 			for(var i = 0; i < data.length; i++){
				if(data[i].nid==nid[i] && new_comments_count[i]>0){
					user_comments += "<a href='comments.html?id="+nid[i]+"' data-ajax='false'>"+data[i].subject+"</a><br>";
				}//end if statement
			}//end for loop */
			$('.comments-thread').append(user_comments);
		  },//end success function
	});//End ajax call
	
});//End document ready function