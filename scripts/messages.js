$(document).ready(function () {
	var uid;
	var tid;
	var date;
	var months = ['Janurary','Feburary','March','April','May','June','July','August','September','October','November','December'];
	var friend_id = [];
	var friend_name = [];
	
	// GET CURRENT USER UID
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
    }//End success
	});//End ajax call
	
	// LOAD CURRENT USERS MESSAGE THREADS
    $.ajax({
      url: "http://flycatcha.com/rest/usermsg/"+uid,
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
		$.each(data, function(key, value){
			 pubDate = new Date(value.last_updated*1000);
			 var year = pubDate.getFullYear();
			 var month = months[pubDate.getMonth()];
			 var date = pubDate.getDate();
			 var hour = pubDate.getHours();
			 hour = hour % 12;
			 var minutes = pubDate.getMinutes();
			 minutes = (minutes < 10 ? "0":"")+minutes;
			 var sec = pubDate.getSeconds();
			 var ampm = hour >= 12 ? 'PM' : 'AM';
			 var formatted_date = month+' '+date+', '+year+' '+hour+':'+minutes+" "+ampm;
			$("<hr><h2>"+value.subject+"</h2><p>"+formatted_date+"</p>"+
			//"<a href='#' id='"+value.thread_id+"' class='reply'>Reply</a> | "+
			"<a href='#' id='"+value.thread_id+"' class='delete'>Delete</a><br>").appendTo('.messages');
		});//End loop
		}//End success
	}); //End ajax call
	
	

	
	
	// DELETE MESSAGE
	$('.delete').click(function(){
		if(confirm('Are you sure you would like to delete this message')){
			tid= $(this).attr('id');
			//alert(tid);
			$.ajax({
			url: "http://flycatcha.com/rest/msg/"+tid,
			type: 'delete',
			dataType: 'json',
			async: false,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(error);
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
			},
			success: function (data) {	
				alert('Message deleted successfully');
				//Refreshes current page
				refreshPage();
			}//End success
			}); //End ajax call
		}//End if statement
	});//End delete
	
	
	
	
});//End document ready