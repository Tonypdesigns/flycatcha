	/*REFRESH CURRENT PAGE*/
	function refreshPage() {
	  $.mobile.changePage(
		window.location.href,
		{
		  allowSamePageTransition : true,
		  transition              : 'none',
		  showLoadMsg             : false,
		  reloadPage              : true
		}
	  );
	}
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
    return vars;
	}