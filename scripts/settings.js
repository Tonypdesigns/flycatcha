$(document).ready(function () {
	//Initialize uid variable
	var uid;
	
	/* CONNECT TO SYSTEM AND OBTAIN LOGGED IN USERS INFORMATION */
	try {
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
		curr_name = data.user.name;
		curr_mail = data.user.mail;
	}
	});
	}//End try block
	catch (error) { alert("page_dashboard - " + error);}
	/* END CONNECT OPERATION */
	
	/*PREFILL FIELDS WITH CURRENT VALUES*/
	document.getElementById("username").value = curr_name;
	document.getElementById("email").value = curr_mail;
	/* END PREFILL FIELDS OPERATION */
	
	/* UPDATE USER DATA FORM HANDLER */
	$(".update").click(function () {
		var username = $("#username").val();
		//var email = $('#email').val();
		
		//Check if user filled out username
		if(!username){alert('Please enter username'); return false;}
		
		//Check if user filled out password
		if(!email){alert('Please enter email'); return false;}
	
		$.ajax({
			type: "PUT",
			url: "http://www.flycatcha.com/rest/user/"+uid+".json",
			dataType: 'json',
			data: "name=" + encodeURIComponent(username)
			+ '&mail=' + encodeURIComponent(email),
		
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
		});
	});//End update btn
	return false;
	
	/* END UPDATE USER DATA FORM HANDLER */
});//End ready function