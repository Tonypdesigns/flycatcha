
$(document).ready(function () {
	var image_id;
	var title;
	var body;
	var image;
	var status="";
	var nid;
	var uid;
	
	/*UPLOAD IMAGE*/
	/* 
	$("#image").change(function (){
	   var img_num = Math.floor((Math.random()*100000)+1);
       var fileName = 'fc-user-upload-'+ img_num;
	   var file = btoa(fileName);
	   var filepath = 'public://'+fileName;
	   $.ajax({
			async: false,
			type: "POST",
			url: "http://www.flycatcha.com/rest/file.json",
			data: 'file=' + encodeURIComponent(file) + '&filename=' + encodeURIComponent(fileName) + '&filepath=' + encodeURIComponent(filepath),
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				//alert('An error has occured');
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				alert(data.fid);
				image_id = data.fid;
			},
		});
       //$(".filename").html(fileName);
     }); 
	 */
		
	//STORE USER SESSION	
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
		}
		});	
	 
	//RETREIVE ALL STATUS POSTS
	$.ajax({
			async: false,
			type: "get",
			url: "http://www.flycatcha.com/rest/status/",
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){	
				for(var i = 0; i<=4; i++){
					// FORMAT DATE
					pubDate = data.nodes[i].node.created;
					title = data.nodes[i].node.title;
					body = data.nodes[i].node.body;
					image = data.nodes[i].node.image;
					author = data.nodes[i].node.author;
					nid = data.nodes[i].node.nid;
					// ONLY ALLOW AUTHOR TO DELETE THEIR OWN POSTS
					if(author==uid){status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>"+
					"<p><a href='#' class='delete'"+" id='"+nid+"'>"+"Delete</a></p>";}
					else{status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>";}
				
					//alert(author);
					//status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>";
				}//End for loop
				$('.post').append(status);
			}, 
		}); 
	// END RETREIVE STATUS POSTS	 
	
	
	 //DELETE STATUS POSTS
	$('.delete').click(function(){
		var post_id = $(this).attr('id');
		if(confirm("Are you sure you would like to delete this status update")){
		$.ajax({
		  url: "http://flycatcha.com/rest/node/"+post_id,
		  type: 'delete',
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('page_dashboard - failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {	
			alert('Status post deleted successfully');
			//Refreshes current page
			refreshPage();
			}//End success
		});	//End ajax call
		}//End if statement
	});
	// END DELETE STATUS POSTS
	
	/*CREATE STATUS UPDATE*/
	$(".status").click(function () {
		var status = $("#status_update").val();
		alert(image_id);
		//Check if user filled out username
		//if(!status){alert('Please enter status'); return false;}
		
		$.ajax({
			type: "POST",
			url: "http://www.flycatcha.com/rest/node.json",
			data: 'type=status&title='+ encodeURIComponent(status) + '&language=und + field_image[und][0][fid]=' + encodeURIComponent(image_id),
			
			//type=status&title=test&language=und&body[und][0][value]=test&image[und][0][fid]=72
			
			/* 'name=' + encodeURIComponent(username) + '&pass=' + encodeURIComponent(password)
			+ '&mail=' + encodeURIComponent(email), */
			
			
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Created New Status Updated Successfully");
				$.mobile.changePage("status.html", "slideup");
			},
		});
	});//End login btn
});//End ready function


