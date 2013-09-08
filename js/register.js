$(document).ready(function () {
	$(".register").click(function () {

		var username = $("#username").val();
		var password = $('#password').val();
		var email = $('#email').val();
		//var confemail = $('#email').val();
		
		//Check if user filled out username
		if(!username){alert('Please enter username'); return false;}
		
		//Check if user filled out password
		if(!password){alert('Please enter password'); return false;}
		
		//Check if user filled out password
		if(!email){alert('Please enter email'); return false;}
	
		$.ajax({
			type: "POST",
			url: "http://www.flycatcha.com/rest/user/register.json",
			data: 'name=' + encodeURIComponent(username) + '&pass=' + encodeURIComponent(password)
			+ '&mail=' + encodeURIComponent(email),
			
			
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Registered Account Successfully");
				$.mobile.changePage("index.html", "slideup");
			},
		});
	});//End login btn
	return false;
});//End ready function