
$(document).ready(function () {
	var image_id;
	var title;
	var body;
	var image;
	var status="";
	var nid;
	var uid;
		
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
					if(author==uid){
						status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>"+
					//"<a href='#' class='delete' id='"+nid+"'>Delete</a>";}
					"<a href='#' class='delete-post' id='"+nid+"'>Delete</a>"+
					" | <a href='#'>Report Abuse</a>";}
					else{status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>";}
				}//End for loop
				$('.post').append(status);
			}, 
		}); 
	// END RETREIVE STATUS POSTS	 
	
	
	 //DELETE STATUS POSTS
	$('.delete-post').click(function(){
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
		if(!status){alert('Please enter status'); return false;}
		$.ajax({
			type: "POST",
			url: "http://www.flycatcha.com/rest/node.json",
			data: 'type=status&title='+ encodeURIComponent(status),
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Created New Status Updated Successfully");
				refreshPage();
			},
		});
	});//End login btn
});//End ready function


