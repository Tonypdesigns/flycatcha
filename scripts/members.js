$(document).ready(function () {
	var uid;
	var username;
	var user_id = [];
	var user_name = [];
	var user_list;
	var list;
	 
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
			url: "http://flycatcha.com/rest/user/",
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
					if(value!=0){
						user_id.push(value.uid);
					}
					//rid.push(value.rid);
					
				});//End each statement
			}//End success
	}); //End ajax call

	//alert(user_id.length);
	
	//LIST OF MEMBERS
	for(var i=0; i<=10; i++){
		$.ajax({
			url: "http://flycatcha.com/rest/user/"+user_id[i],
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
				 list += '<tr><td class="member">'+'<img src="images/red-silouette.png" width="100%"/>'+data.name+'<button data-theme="a" id="'
				 +data.uid+'" class="add-friend">Add Friend</button>'+'</td></tr>';
				//$('.members').append(list);
				//alert('test');
			}//End success
	}); //End ajax call
	}//End for loop
	$('.members').append(list).trigger("create");
	//alert(list);
	
	/*
	// RETREIVE ALL USERS WHICH HAVE A RELATIONSHIP 
	// WITH THE CURRENT LOGGED IN USER
	$.each(user_id, function(key, value){
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
				 list += '<tr><td class="member">'+'<img src="images/red-silouette.png" width="100%"/>'+data.name+'<button data-theme="a" id="'+data.uid+
				'" class="add-friend">Add Friend</button>'+'</td></tr>';
				//alert('test');
			}//End success
	}); //End ajax call
	});//End each statement
	$('.members').append(list);
	alert('test');
	
	/*
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
	*/
	
	
	$(".add-friend").click(function () { 
		var member_id = $(this).attr('id');
		$.ajax({
			url: "http://flycatcha.com/rest/user/"+member_id+"/relationship/friend",
			type: 'post',
			dataType: 'json',
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				alert('Friend added successfully');
				refreshPage();
			}//End success
		}); //End ajax call
	});//End click method
	
});//End document ready function