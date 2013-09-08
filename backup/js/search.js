$(document).ready(function () {
	var image_id;
	var title="";
	var body;
	var image;
	var status="";
	var nid = new Array();
	var uid;
	var search_user = getQueryVariable("searchuser");
	var search_node = getQueryVariable("searchnode");
	var result="";
	var user_result="";
	var username="";
	var search_uid = new Array();
	var uid="";
	var title="";
	var body="";

	//alert(search_node);
	//alert(search_user);
	
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
			//alert(uid);
			//console.log(data);
		}
	});//End store user session
	
	//LOAD USERS

		//Search 
		//RETREIVE USER FROM PAGE ARGUMENT
		if(search_user!=''){
		$.ajax({
			type: "GET",
			url: "http://flycatcha.com/rest/user",
			dataType: 'json',
			async: false,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
			console.log(data);
				for(var i = 0; i < data.length; i++){
					username = getQueryVariable("searchuser");
					/* username = username.split("(");
					username = username[0]; */
					if(username==data[i].name)
						search_uid = data[i].uid;
				}//End for loop
				//$('.search-results').append(result);
			},
		});
		//RETREIVE USER INFORMATION
		$.ajax({
			type: "GET",
			url: "http://flycatcha.com/rest/user/"+search_uid,
			dataType: 'json',
			async: false,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
			console.log(data);
			user_result = "<a href='profile.html?uid="+data.uid+"'><img src='../sites/default/files/pictures/"+data.picture.filename+"' width='100' /></a><br>"
			+data.name+"<hr>";
			$('.search-results').append(user_result);
			},
		});
		}//End search user
		
		if(search_node!=''){
		$.ajax({
			type: "GET",
			url: "http://flycatcha.com/rest/search_node/retreive.json",
			data: 'keys=' + encodeURIComponent(search_node),
			dataType: 'json',
			async: false,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function(data){
				//title = data[1].title;
				//alert(title);
				//console.log(data);
				for(var i = 0; i < data.length; i++){
					title = data[i].node.title;
					nid[i] = data[i].node.nid;
					title = "<div style=''><a href='page.html?id="+nid[i]+"' data-ajax='false'>"+title.replace(/(<([^>]+)>)/ig,"")+"</a></div>";
					body = data[i].node.body['und'][0]['value'];
					body = body.replace(/(<([^>]+)>)/ig,"")+"<hr><br />";
					result += title+body;
					//alert(result);
				}//End for loop
				$('.search-results').append(result);
			},
		});
		}//End search node 
});//End ready function