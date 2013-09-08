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
	/*RETREIVES GET VARIABLE FROM URL*/
	function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}