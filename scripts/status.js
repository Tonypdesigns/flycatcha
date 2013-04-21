
$(document).ready(function () {

     // Called when capture operation is finished
    //
    function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }       
    }

    // Called if something bad happens.
    // 
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }

    // A button will call this function
    //
    function captureImage() {
        // Launch device camera application, 
        // allowing user to capture up to 2 images
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 2});
    }

    // Upload files to server
    function uploadFile(mediaFile) {
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

        ft.upload(path,
            "http://my.domain.com/upload.php",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });   
    }
 


	var image_id;
	
	/*UPLOAD IMAGE*/
	$("#image").change(function (){
	   var img_num = Math.floor((Math.random()*100000)+1);
       var fileName = 'fc-user-upload-'+ img_num;
	   var file = btoa(fileName);
	   var filepath = 'public://'+fileName;
	   /*alert(fileName);
	   alert(file);
	   alert(filepath);
	   //alert();*/
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
	return false;
});//End ready function


