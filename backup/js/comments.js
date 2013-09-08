$(document).ready(function () {
	var image_id;
	var title;
	var body;
	var image;
	var status="";
	var nid = getQueryVariable("id");
	var uid;
	var author_id = new Array();
	var profile_picture = "";
	var flycatchas;
	var flypoints;
	var status_count;
	var user_comments = "";
	var user_comments_date = "";
	var user_comments = "";
	var user_comments_date = "";
	
	//STORE USER SESSION	
	$.ajax({
		  url: "../rest/system/connect.json",
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
		  },//end success function
	});
		
	/*POST COMMENT*/	
	$('.comment').click(function(){
		var comment = $('#comment_post').val();
		$.ajax({
			url: "../rest/comment",
			type: 'post',
			dataType: 'json',
			data: 'nid='+nid+'&subject='+comment+'&comment_body[und][0][value]='+comment,
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				console.log(data);
				alert("Comment posted successfully");
				refreshPage();
			},
		});//End ajax call
	});//End comment click
	
	//RETREIVE COMMENTS FOR NODE
	$.ajax({
		  url: "../rest/comment",
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
 			for(var i = 0; i < data.length; i++){
				if(data[i].nid==nid){
					user_comments += '<li>'+data[i].subject+"</li>";
				}//end if statement
			}//end for loop */
			$('.comments').append(user_comments);
		  },//end success function
	});
});//End ready function