$(document).ready(function () {
	var uid;
	var username;
	var friend_id = [];
	var friend_name = [];
	var friend_list;
	
	// GET CURRENT USER UID
	$.ajax({
      url: "http://flycatcha.com/rest/system/connect.json",
      type: 'post',
      dataType: 'json',
	  async: false,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {	
		uid = data.user.uid;
		//alert(uid);
    }//End success
	});//End ajax call
	
	// RETREIVE ALL USERS WHICH HAVE A RELATIONSHIP 
	// WITH THE CURRENT LOGGED IN USER
	$.ajax({
			url: "http://flycatcha.com/rest/user/"+uid+"/relationships",
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
					friend_id.push(value.requestee_id);
					//alert(friend_id);
				});//End each statement
			}//End success
	}); //End ajax call
	
	
	// RETREIVE ALL USERS WHICH HAVE A RELATIONSHIP 
	// WITH THE CURRENT LOGGED IN USER
	$.each(friend_id, function(key, value){
	$.ajax({
			url: "http://flycatcha.com/rest/user/"+value,
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
				friend_name.push(data.name);
				var list = '<option class="friend" value="'+data.name+'">'+data.name+'</option>';
				//$('<option class="friend" value="'+data.name+'">'+data.name+'</option>').appendTo('#friend-list');
				$('#friend-list').append(list);
			}//End success
	}); //End ajax call
	});//End each statement\
	
	//alert(friend_name[1]);
	
	
	$('.send').click(function() {
		var msg_recipient = $('.friend').html();
		var msg_subject = $('.subject').val();
		var msg_body = $('.body').val();
		$.ajax({
			url: "http://flycatcha.com/rest/msg",
			type: 'post',
			dataType: 'json',
			data:'subject=' + encodeURIComponent(msg_subject) + '&body=' + encodeURIComponent(msg_body) + '&recipient=' + encodeURIComponent(msg_recipient),
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				alert('Message sent succesfully');
				$.mobile.changePage("messages.html");
			}//End success
		}); //End ajax call
	});
});