$(document).ready(function () {
	var image;
	var thumbnail;
	var title;
	var photo = "";
	
	//RETREIVE RECENT UPLOADED PHOTOS
	$.ajax({
		  url: "http://flycatcha.com/rest/uploads",
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
			for(var i = 0; i <= data.nodes.length-1; i++){
				image = data.nodes[i].node.image;
				thumbnail = data.nodes[i].node.thumbnail;
				title = data.nodes[i].node.title;
				photo += '<li><a href="'+image+'"><div class="photo"><img src="'+thumbnail+'" alt="'+title+'"/></a></div></li>';
			}//End for loop
			//alert(photo); 
			$('#Gallery').append(photo);
		}//End success
	});//END RETREIVE RECENT UPLOADED PHOTOS	


});