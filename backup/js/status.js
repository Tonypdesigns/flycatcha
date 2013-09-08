$(document).ready(function () {
	var image_id;
	var title;
	var body;
	var image;
	var status="";
	var nid;
	var uid;
	var menus ="";
	var c="";
	var author_id = new Array();
	var node = new Array();
	var profile_picture = "";
	var flycatchas;
	var flypoints;
	var status_count;
	var report_id;
	var DELAY = 250, clicks = 0, timer = null;
	var flycatchas = new Array();
	var flypoints = new Array();
	
	//STORE USER SESSION	
	$.ajax({
		  url: "../rest/system/connect",
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
			url: "../rest/status/",
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
			    console.log(data);
				status_count = data.nodes.lenght;
				for(var i = 0; i<=data.nodes.length; i++){
					if(data.nodes[i]){
					// FORMAT DATE
					pubDate = new Date(data.nodes[i].node.created);
					var month = pubDate.getMonth()+1;
					pubDate = month+'.'+pubDate.getDate()+'.'+pubDate.getFullYear();
					title = data.nodes[i].node.title;
					body = data.nodes[i].node.body;
					image = data.nodes[i].node.image;
					if(image)
						image='<img src='+image+' width="100%"/>';
					else
						image="";
					author = data.nodes[i].node.author;
					author_id[i] = data.nodes[i].node.author;
					nid = data.nodes[i].node.nid;
					node[i] = data.nodes[i].node.nid; 
					// ONLY ALLOW AUTHOR TO DELETE THEIR OWN POSTS
					//if(author==uid){
						//<h2>"+title+"</h2>"+
						status += 
						"<div id='post-"+i+"'>"
						+'<div class="ui-grid-b">'
						+'<div class="ui-block-a"><div class="ui-bar ui-bar-e author-img-'+i+'" style="height:60px;"></div></div>'
						+'<div class="ui-block-b"><div class="ui-bar ui-bar-e author-'+i+'" style="height:60px"></div></div>'
						+'<div class="ui-block-c" align="right"><div class="ui-bar ui-bar-e" style="height:60px">'+pubDate+'</div></div>'
						+'</div>'
						//+'<img src='+image+' width="100%"/>'
						+image
						+'<p>'+body+'</p>'
						+"</div>"  
						 +'<div class="ui-grid-b">'
						+'<div class="ui-block-a"><div class="ui-bar ui-bar-e" style="height:60px">'
						+'<a href="#" class="fc icon-fc-logo" id='+nid+'></a></div></div>'
						+'<div class="ui-block-b align="center" ><div class="ui-bar ui-bar-e flydata-'+i+'" style="height:60px"></div></div>'
						+'<div class="ui-block-d" align="right"><div class="ui-bar ui-bar-e" style="height:60px">'
						+"<a href='comments.html?id="+nid+"' class='comment icon-bubble' data-ajax='false'><span class='txt'></span></a><br>"
						+"<a href='#reportMenu' id='rmenu-"+nid+"' class='report-menu icon-dot-dot-dot' data-rel='popup' data-transition='slideup'></a>"
						+'</div></div>'
						 +'</div><hr>' 
				}//End if statement
				}//End for loop
				$('.post').append(status);
				//$('.content-menu').append(menus).listview('refresh');
			},  
		}); 
	// END RETREIVE STATUS POSTS	

	// LOAD AUTHOR INFORMATION
	for (var i = 0; i < author_id.length; i++) {
	$.ajax({
			url: "../rest/user/"+author_id[i],
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
				if(data.picture)
					profile_picture = '<img src="../sites/default/files/pictures/'+data.picture.filename+'" width="75"/>';
				else	
					profile_picture = '<img src="../sites/default/files/pictures/default-fallback-user-photo.png" width="75"/>';
				$('.author-'+i).append('<div class="author">@'+data.name+'</div>');
				$('.author-img-'+i).append(profile_picture);
			}//End success
	}); //End ajax call
	}//END LOOP	*/	
	// END RETREIVE AUTHOR INFORMATION
	
	
	/*LOAD FLYCATCHAS*/
	for (var i = 0; i < node.length; i++) {
	$.ajax({
			url: "../rest/flag/countall.json",
			type: 'post',
			dataType: 'json',
			data: 'flag_name=flycatcha&content_id='+node[i],
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//('#post-'+i).append(flycatchas[i]);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {
				if(data.count<1){
					'<div class="flycatchas-count">Flycatchas: 0 </div>';
				}
				else{	
					flycatchas[i] = '<div class="flycatchas-count">'+data.count+' Flycatchas</div>';
				}
				$('.flydata-'+i).append(flycatchas[i]);
			}//End success
	}); //End ajax call
	}//END LOOP	
	
	/*LOAD FLYPOINTS*/
	for (var i = 0; i < node.length; i++) {
	$.ajax({
			url: "../rest/flag/countall.json",
			type: 'post',
			dataType: 'json',
			data: 'flag_name=flypoint&content_id='+node[i],
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//('#post-'+i).append(flycatchas[i]);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {
				if(data.count<1){
					'<div class="flypoint-count">Flypoints: 0 </div>';
				}
				else{	
					flycatchas[i] = '<div class="flypoint-count">'+data.count+' Points</div>';
				}
				$('.flydata-'+i).append(flycatchas[i]);
			}//End success
	}); //End ajax call
	}//END LOOP	 
	
	// LOAD AUTHOR INFORMATION
	for (var i = 0; i < status_count; i++) {
	$.ajax({
			url: "../rest/user/"+author_id[i],
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
				/* profile_picture = '<img src="../sites/default/files/pictures/'+data.picture.filename+'" width="75"/>';
				$('#post-'+i).prepend('<div class="author_img">'+profile_picture+data.name+'<br>@'+data.name+'</div>'); */
			}//End success
	}); //End ajax call
	}//END LOOP	*/	
	// END RETREIVE AUTHOR INFORMATION
	
	
	
	 //DELETE STATUS POSTS
	$('.delete-post').click(function(){
		var post_id = $(this).attr('id');
		if(confirm("Are you sure you would like to delete this status update")){
		$.ajax({
		  url: "../rest/node/"+post_id,
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
			  url: "../rest/node.json",
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
			//url: "../rest/userpoints/add",
			url: "../rest/flag/flag.json",
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
	
		
	

	$(".fc").on('vclick',function() {
		var fly_id = $(this).attr('id');
		if (timer == null) {
		$(this).css( "color", "Red" );
			timer = setTimeout(function() {
			   clicks = 0;
				timer = null;
				// single click code
				$.ajax({
					type: "POST",
					url: "../rest/flag/flag.json",
					data: 'flag_name=flypoint&content_id='+fly_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(errorThrown);
						console.log(JSON.stringify(XMLHttpRequest));
						console.log(JSON.stringify(textStatus));
						console.log(JSON.stringify(errorThrown));
					},
					success: function(data){
						alert( "Added FlyPoint To This Status Post Successfully");
						refreshPage();
					},
				});
			}, DELAY);
		}//End if statement

		if(clicks === 1) {
			 clearTimeout(timer);
			 timer = null;
			 clicks = -1;
			 // double click code
			 $(this).css( "color", "GoldenRod" );
			 $.ajax({
				type: "POST",
				url: "../rest/flag/flag.json",
				data: 'flag_name=flycatcha&content_id='+fly_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
					console.log(JSON.stringify(XMLHttpRequest));
					console.log(JSON.stringify(textStatus));
					console.log(JSON.stringify(errorThrown));
				},
				success: function(data){
					alert( "Added FlyCatcha to this Status Post Successfully");
					refreshPage();
				},
			}); 
		}//End if statement
		clicks++;
	});	//End FC click and double click operations

	/*BAD CONTENT MENU*/
	$('.report-menu').click(function(){
		//RETRIEVE MENU ITEM FROM BUTTON CLICKED
		report_id = this.id;
		report_id = report_id.split('rmenu-');
		report_id = report_id[1];
		
		//FLAG BAD POST
		$('.flag-content').click(function(){
		$.ajax({
			type: "POST",
			url: "../rest/flag/flag.json",
			data: 'flag_name=bad_content&content_id='+report_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				//console.log(data);
				alert( "Content has been flagged inappropriate");
				refreshPage();
			},
		});//end ajax call
		});//end flag content click
		
		//REPORT USER
		$('.flag-user').click(function(){
		$.ajax({
			type: "POST",
			url: "../rest/flag/flag.json",
			data: 'flag_name=bad_user&content_id='+report_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				//console.log(data);
				alert( "User has been reported");
				refreshPage();
			},
		});//end ajax call
		});//end flag content click
	});//End bad content menu
	
	
	//FLAG BAD CONTENT
	$(".bad-content").click(function () {
		var content_id = $(this).attr('id');
		$.ajax({
			type: "POST",
			//url: "../rest/userpoints/add",
			url: "../rest/flag/flag.json",
			data: 'flag_name=bad_content&content_id='+content_id+'&action=flag&uid='+uid+'&skip_permission_check=true',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
				console.log(JSON.stringify(XMLHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				console.log(data);
				alert( "This post has been flagged. A message has been sent to the app administrator");
				refreshPage();
			},
		});
	});//End login btn
});//End ready function