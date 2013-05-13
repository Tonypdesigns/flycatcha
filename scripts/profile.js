$(document).ready(function () {
	var username;
	var profile_img;
	//var photos = [];
	var total_points;
	var uid;
	var friend_id = [];
	var friend_name = [];
	var friend_list;
	var rid = [];
	var grid = ['a', 'b', 'c', 'd', 'e'];
	var g;
	var photo="";
	var friends="";
	var points="";
  //CONNECT TO SYSTEM
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
		//console.log(data);
	}
	});//END CONNECT TO SYSTEM 
	
	
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
				for(var i = 0; i<3; i++){
					friend_id.push(data[i].requestee_id);
					rid.push(data[i].rid);
				}//End for loop
			console.log(rid);	
			//console.log(data[1].requestee_id);
			}//End success
	}); //End ajax call
	// END RETREIVE RELATIONSHIPS
	
	
	// RETREIVE ALL USERS WHICH HAVE A RELATIONSHIP 
	// WITH THE CURRENT LOGGED IN USER
	friends +="<div align='center' class='ui-grid-b'>";
	for(var i = 0; i <3; i++){
	
		if(i > friend_id.length)
			break;
	
		$.ajax({
				url: "http://flycatcha.com/rest/user/"+friend_id[i],
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
					friends += "<div class='ui-block-"+grid[i]+"'>"
					+"<img src=http://www.flycatcha.com/sites/default/files/pictures/"+data.picture.filename+" width='50' height='50'/>"
					//+"<p class='friend-name'>"+data.name+"</p>"
					+"</div>";
				}//End success
		}); //End ajax call
		}//End for statement
	friends += "</div>";	
	//END RETREIVE ALL RELATIONSHIPS 
	
	
	
	// LOAD USER POINTS
	$.ajax({
		  url: "http://flycatcha.com/rest/userpoints/"+uid,
		  type: 'get', 
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {
			//console.log(data);	
			points = "<div align='center' class='user-points'><img src='http://www.flycatcha.com/sites/default/files/images/fc-logo.png' width='75' height='75'/><span>"
			+data+" Points</span></div>";
		}//End success
	});//End ajax function call	
	
	
	// LOAD PHOTOS UPLOADED BY USER
	$.ajax({
		  url: "http://flycatcha.com/rest/profile/"+uid,
		  type: 'get', 
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {
			console.log(data);	
			photo +="<div align='center' class='ui-grid-b'>";
			for(var i = 0; i <= 2; i++) {
				photo += "<div class='ui-block-"+grid[i]+"'><img src='"+data.nodes[i].node.image+"' width='50' height='50'/></div>";
			}//End each
			photo += "</div>";
		}//End success
	});//End ajax function call	
	
	
	//LOAD USER INFO
	$.ajax({
      url: "http://flycatcha.com/rest/user/"+uid,
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
		username = data.name;
		profile_img = "http://flycatcha.com/sites/default/files/pictures/"+data.picture.filename;
		$(".profile").html("<h2 align='center'>"+username+"</h2><h3 align='center'>Wall of Fame</h3>"+"<div>"
		+"<div align='center'><img src='"+profile_img+"' width='150' height='150' /></div>"+"</div>"
		+photo
		+points
		+"<h3 align='center'>Friends</h3>"+friends);
		}
	});
	
});