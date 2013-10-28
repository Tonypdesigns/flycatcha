$(document).ready(function () {
	$(".login").click(function () {

		var username = $("#username").val();
		var password = $('#password').val();
		
		//Check if user filled out username
		if(!username){alert('Please enter username'); return false;}
		
		//Check if user filled out password
		if(!password){alert('Please enter password'); return false;}
	
		$.ajax({
			type: "POST",
			url: "http://flycatcha.com/rest/user/login.json",
			data: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
			dataType: 'json',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				//console.log(data);
				alert( "Logged in as: " + data.user.name );
				$.mobile.changePage("status.html", "slideup");
			},
		});
	});//End login btn
	return false;
});//End ready function