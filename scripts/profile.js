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
	var occupation="";
	var location="";
	var website="";
	var user_data="";
	var photo_count;
	var friends_count;
	var fly_points;
	var fly_catchas;
	var member_uid = getUrlVars()["uid"];
	
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
		if(member_uid){
			uid = member_uid;
		}
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
			//alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {
			friends_count = data.length;
				for(var i = 0; i<friends_count; i++){
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
	// friends +="<div align='center' class='ui-grid-b'>";
	friends +="<div align='center'>";
	for(var i = 0; i <friends_count; i++){
	
		if(i > friend_id.length)
			break;
	
		$.ajax({
				url: "http://flycatcha.com/rest/user/"+friend_id[i],
				type: 'get',
				dataType: 'json',
				async: false,
				error: function (XMLHttpRequest, textStatus, errorThrown) {
				//alert(error);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
				},
				success: function (data) {	
					console.log(data);
					//friend_name.push(data.name);
					friends +="<a href='profile.html?uid="+data.uid+"' data-ajax='false'><img src=http://www.flycatcha.com/sites/default/files/pictures/"+data.picture.filename+" width='150' height='150'/></a>"
					//+"<p class='friend-name'>"+data.name+"</p>"
					/* friends += "<div class='ui-block-"+grid[i]+"'>"
					+"<img src=http://www.flycatcha.com/sites/default/files/pictures/"+data.picture.filename+" width='50' height='50'/>"
					//+"<p class='friend-name'>"+data.name+"</p>"
					+"</div>"; */
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
			fly_points = data;
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
			photo_count = data.nodes.length;
			// photo +="<div align='center' class='ui-grid-b'>";
			photo +="<div align='center'>";
			for(var i = 0; i < photo_count; i++) {
				if(data.nodes[i].node.image){
				// photo += "<div class='ui-block-"+grid[i]+"'><img src='"+data.nodes[i].node.image+"' width='50' height='50'/></div>";
				photo += "<img src='"+data.nodes[i].node.image+"' width='150' height='150'/>";
				}//end if statement
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
		location = data.location.city+" / "+data.location.province+" / <span class='country'>"+data.location.country+"</span>";
		occupation = "<br> Occupation: "+data.field_occupation['und'][0]['value'];
		website = "<br>Website: <a href='"+data.field_website['und'][0]['value']+"'>"+data.field_website['und'][0]['value']+"</a>";
		profile_img = "<img src='http://flycatcha.com/sites/default/files/pictures/"+data.picture.filename+"' width='100' height='100'/>";
		user_data = "<br><div class='user-data'>"+photo_count+" Photos</div><div class='user-data'>"+fly_points+" Fly Points</div><div class='user-data'>"+fly_points+" Fly Catchas</div>";
		$(".profile").html(
			"<div class='profile-image'>"+profile_img+"<br><span class='edit-profile'><a href='edit-profile.html'>Edit Profile</a></span></div>"
			+"<div class='profile-info'><span class='username'>"+username+"</span><br>"
			+location
			+occupation
			+website
			+user_data
			+"</div>"
			+"<div class='uploads'>"+photo+"</div>"
			+"<br><strong>Top Friends:</strong> "+friends_count+"<br><div class='top-friends'>"+friends+"</div>"
		);
		/*$(".profile").html("<h2 align='center'>"+username+"</h2><h3 align='center'>Wall of Fame</h3>"+"<div>"
		+"<div align='center'><img src='"+profile_img+"' width='150' height='150' /></div>"+"</div>"
		+photo
		+points
		+"<h3 align='center'>Friends</h3>"+friends);*/
		}//End Success
	});//End Ajax
});//End Document Ready