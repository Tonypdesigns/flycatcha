$(document).ready(function () {
	var image;
	var thumbnail;
	var title;
	var photo = "";
	//RETREIVE RECENT UPLOADED PHOTOS
	$.ajax({
		  url: "http://flycatcha.com/rest/flycatchas",
		  type: 'GET',
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
			for(var i = 0; i <= data.nodes.length-1; i++){
				//Display only images
				if(data.nodes[i].node.image){
				image = data.nodes[i].node.image;
				thumbnail = data.nodes[i].node.thumbnail;
				title = data.nodes[i].node.title;
				photo += '<li><a href="'+image+'" rel="external"><img src="'+thumbnail+'" alt="'+title+'"/></a></li>';
				}//End if stateent
			}//End for loop*/
			$('#Gallery').append(photo);
		}//End success
	});//END RETREIVE RECENT UPLOADED PHOTOS	
});