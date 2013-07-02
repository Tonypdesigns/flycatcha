
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
			//console.log(data);
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
						//<h2>"+title+"</h2>"+
						status += "<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>"
						+"<div class='status-btns' align='center'><a href='#' id="+nid+" class='like typcn typcn-thumbs-up'></a>"
						+"<a href='comments.html' class='comment typcn typcn-messages'></a>"
						+"<a href='#' class='delete-post typcn typcn-trash' id='"+nid+"'></a>"
						+"<a href='#' class='abuse typcn typcn-th-menu'></a></div>";
					}//End if statement 
					else{
						status += "<h2>"+title+"</h2>"+"<p>"+pubDate+"</p>"+"<p>"+body+"</p>"+"<img src='"+image+"' width='100%'/>";
					}//End else statment
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
			  url: "http://flycatcha.com/rest/node.json",
			  type: 'post',
			  data: 'node[type]=status&node[title]=' + encodeURIComponent(status) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(status),
			  dataType: 'json',
			  error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('page_node_create_submit - failed to login');
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			  },
			  success: function (data) {
			   alert( "Created New Status Updated Successfully");
				refreshPage();
			  }//End success function
			});//End status post
			// END: drupal services node create
		return false;
	});//End login btn
	
	// LIKE POSTS
	$(".like").click(function () {
		var like_id = $(this).attr('id');
		$.ajax({
			type: "POST",
			//url: "http://www.flycatcha.com/rest/userpoints/add",
			url: "http://www.flycatcha.com/rest/flag/flag.json",
			data: 'flag_name=like&content_id='+like_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "Liked Status Post Successfully");
				refreshPage();
			},
		});
	});//End login btn
});//End ready function


