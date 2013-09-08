/**
 * @author Tony
 */
// Wait for Cordova to load
//
// Wait for PhoneGap to load
// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
}

function takePhoto(){
	// Retrieve image file location from specified source
	navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	}, {
		quality : 50,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.CAMERA
	});
}

function takePhotoFromLibrary(){
	// Retrieve image file location from specified source
	navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	}, {
		quality : 50,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}

/*
function libraryPhoto(){
	// Retrieve image file location from specified source
	navigator.camera.getPicture(uploadPhotoFromLibrary, function(message) {
		alert('get picture failed');
	}, {
		quality : 50,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}*/



// Upload image from source
function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://flycatcha.com/upload/upload.php"), win, fail, options);
}

// Upload image from source
function uploadPhotoFromLibrary(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1)+".jpg";
	options.mimeType = "image/jpeg";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://flycatcha.com/upload/upload.php"), win, fail, options);
}


// Print success message
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
}

// Print fail message
function fail(error) {
	alert("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
}

