$(document).ready(function () {
	var nid = getQueryVariable("id");
	// RETREIVE PAGE DATA
		$.ajax({
		  url: "http://flycatcha.com/rest/nodes",
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
			if(value.node.nid==nid)
			 //alert(value.node.nid);
					$('<h2>'+value.node.title+'</h2>'+'<div class="page-body">'+value.node.body+'</div>').appendTo('.page-content');
			});//End each 
		}//End success
		});//End ajax function call	
});//End document ready function