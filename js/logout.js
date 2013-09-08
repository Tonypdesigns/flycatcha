$(document).ready(function () {
	 $.ajax({
			type: "POST",
			url: "http://flycatcha.com/rest/user/logout.json",
			dataType: 'json',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				//console.log(data);
				alert( "Logged out" );
				/* $.mobile.changePage("index.html", "slideup"); */
				window.location.href="index.html";
			},
		});
});//End ready function