$(document).ready(function () {
	//Initialize uid variable
	var uid;
	var curr_name;
	var curr_mail;
	var user_occupation;
	var user_website;
	
	/* CONNECT TO SYSTEM AND OBTAIN LOGGED IN USERS INFORMATION */
	try {
	$.ajax({
	  url: "http://flycatcha.com/rest/system/connect.json",
	  type: 'post',
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
		uid = data.user.uid;
		curr_name = data.user.name;
		curr_mail = data.user.mail;
	}
	});
	
	}//End try block
	catch (error) { alert(error);}
	/* END CONNECT OPERATION */
	
	
	/*LOAD USER DATA*/
	$.ajax({
			url: "../rest/user/"+uid,
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
				console.log(data);
				user_website = data.field_website['und'][0]['value'];
				user_occupation = data.field_occupation['und'][0]['value'];
			}//End success
	}); //End ajax call
	
	/*PREFILL FIELDS WITH CURRENT VALUES*/
	document.getElementById("username").value = curr_name;
	document.getElementById("email").value = curr_mail;
	document.getElementById("website").value = user_website;
	document.getElementById("occupation").value = user_occupation;
	/* END PREFILL FIELDS OPERATION */
	
	/* UPDATE USER DATA FORM HANDLER */
	$(".update").click(function () {
		var username = $("#username").val();
		var email = $('#email').val();
		var occupation = $("#occupation").val();
		var website = $('#website').val();
		
		//Check if user filled out username
		if(!username){alert('Please enter username'); return false;}
		
		//Check if user filled out password
		if(!email){alert('Please enter email'); return false;}
	
		$.ajax({
			url: "../rest/user/101",
			type: 'put',
			data: "name=" + encodeURIComponent(username)
			+'&mail='+ encodeURIComponent(email)
			+'&field_occupation[und][0][value]=' + encodeURIComponent(occupation)
			+'&field_website[und][0][value]=' + encodeURIComponent(website),
			dataType: 'json',
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				console.log(data);
				alert( "Updated Account Successfully");
			}//End success
		}); //End ajax call
	
		/* $.ajax({
			type: "put",
			url: "http://www.flycatcha.com/rest/user/101",
			dataType: 'json',
			async: false,
			data: "username=" + encodeURIComponent(username),
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Updated Account Successfully");
				$.mobile.changePage("status.html", "slideup");
			},
		}); */
	});//End update btn
	
	
	/* DELETE USER DATA FORM HANDLER */
	$(".delete").click(function () {
		//Check if user filled out password
		//if(!email){alert('Please enter email'); return false;}
		if(confirm("Are you sure you want to delete your account")){
		$.ajax({
			type: "DELETE",
			url: "http://www.flycatcha.com/rest/user/"+uid+".json",
			dataType: 'json',
			/*data: "name=" + encodeURIComponent(username)
			+ '&mail=' + encodeURIComponent(email),*/
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Deleted Account Successfully");
				$.mobile.changePage("index.html", "slideup");
			},
		});
		}//End if statement
	});//End update btn
	
	//return false;
	
	/* END UPDATE USER DATA FORM HANDLER */
});//End ready function