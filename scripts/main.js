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