$(document).ready(function () {
	//RETREIVE ALL NEWS ITEMS
	//alert('ts');
		$.ajax({
		  url: "http://flycatcha.com/rest/news",
		  type: 'get', 
		  dataType: 'json',
		  async: false,
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Failed to system connect');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		  },
		  success: function (data) {
			console.log(data);	
			$.each(data.nodes, function(key, value ) {
				$('<h2>'+value.node.title+'</h2>'+'<div class="news-body">'+value.node.body+'</div><hr>').appendTo('.news');
			});//End each
		}//End success
		});//End ajax function call	
});//End document ready function