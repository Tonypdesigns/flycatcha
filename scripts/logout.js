$(document).ready(function () {
	 $.ajax({
		 url: "http://flycatcha.com/rest/user/logout.json",
		 type: 'post',
		 dataType: 'json',
		 error: function (XMLHttpRequest, textStatus, errorThrown) {
		   alert('button_logout - failed to logout');
		   console.log(JSON.stringify(XMLHttpRequest));
		   console.log(JSON.stringify(textStatus));
		   console.log(JSON.stringify(errorThrown));
		 },
		 success: function (data) {
			console.log(data);
			alert("You have been logged out.");
			$.mobile.changePage("index.html",{reloadPage:false},{allowSamePageTranstion:true},{transition:'none'},{changeHash: false}, {type: "post"});
		 }
	 });
});//End ready function