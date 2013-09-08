$(document).ready(function () {
	var uid;
	var username;
	var friend_id = [];
	var friend_name = [];
	var friend_list;
	var rid = [];
	
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
					rid.push(value.rid);
					
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
				//friend_name.push(data.name);
				var list = '<tr><td class="friend">'
				+'<img src="images/red-silouette.png" width="100%"/>'
				+data.name
				+'<a data-theme="a" href="message-create.html" data-role="button">Send Message</a>'
				+'<button data-theme="a" id="'+rid[key]+'" class="remove-friend">Remove Friend</button>'
				+'</td></tr>';
				$('.friends').append(list).trigger("create");
				
			}//End success
	}); //End ajax call
	});//End each statement\
	
	
	$(".remove-friend").click(function () { 
		if(confirm('Are you sure you would like to remove friend')){
		var remove_rid = $(this).attr('id');
		$.ajax({
			url: "http://flycatcha.com/rest/relationships/delete",
			type: 'post',
			dataType: 'json',
			data: 'rid='+remove_rid+'&reason=remove',
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				//friend_name.push(data.name);
				//alert();
				var list = '<tr><td class="friend">'
				+'<img src="images/red-silouette.png" width="100%"/>'
				+data.name+
				'<br><button data-theme="a" id="'+rid[key]+'" class="remove-friend">Remove Friend</button>'
				+'</td></tr>';
				$('.friends').append(list).trigger("create");
				
				alert('User deleted successfully');
				//Refreshes current page
				refreshPage();
			}//End success
		}); //End ajax call
		}//End if statement
	});//End click method
	
});//End document ready function