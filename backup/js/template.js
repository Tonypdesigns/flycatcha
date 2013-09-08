$.support.cors = true;
//$.mobile.ajaxEnabled = false;
var header = {
	about_url: "about.html",
	messages_url: "messages.html",
	friends_url: "friends.html",
	email_url: "mailto:contactus@flycatcha.com",
	news_url: "news.html",
	privacy_url: "privacy-policy.html",
}
var header_template = '<div data-role="panel" id="panelMenu" data-theme="b" data-position="right" data-display="push"><div data-role="controlgroup"><a href="{{about_url}}" data-role="button" data-theme="b">About</a><a href="{{messages_url}}" data-role="button" data-theme="b" >Messages</a><a href="members.html" data-role="button" data-theme="b">Members</a><a href="{{friends_url}}" data-role="button" data-theme="b">Friends</a><a href="{{email_url}}" data-role="button" data-theme="b" >Contact</a><a href="{news_url}" data-role="button" data-theme="b" >News</a><a href="{{privacy_url}}" data-role="button" data-theme="b">Privacy Policy</a><a href="settings.html" data-role="button" data-theme="b">Settings</a><a href="logout.html" data-role="button" data-theme="b" >Logout</a></div></div><div data-role="panel" id="fcMenu" data-theme="d"><div data-role="controlgroup"></div></div><div data-role="header" data-position="fixed"><div data-role="popup" id="popupMenu" data-theme="d"><ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d"><li data-role="divider" data-theme="d">Choose an action</li><li><a href="" onclick="takePhoto();" data-theme="d">Upload from camera</a></li><li><a href="" onclick="takePhotoFromLibrary();" data-theme="d">Upload from memory</a></li></ul></div><div align="center"><a href="index.html" ><img src="img/logo-white.png" width="150" height="65"/></a></div><div data-role="navbar" id="navbar"><ul><li><a href="#" data-ajax="none" data-theme="b" ><span aria-hidden="true" class="icon-home"></span></a></li><li><a href="#" data-theme="b"><span aria-hidden="true" class="icon-images"></span></a></li><li><a href="#popupMenu" data-rel="popup" data-theme="b"><img class="logo" src="img/fc-icon.png" width="50" height="50"/></a></li><li><a href="#" data-theme="b" ><span aria-hidden="true" class="icon-user"></span></a></li><li><a href="#" data-theme="b" ><span aria-hidden="true" class="icon-cart"></span></a></li></ul><div align="right" class="ui-btn-right"><a href="#"  data-role="none" data-theme="c"><span aria-hidden="true" class="icon-search" data-role="none"></span></a><a href="#panelMenu" data-role="none" data-theme="c"><span aria-hidden="true" class="icon-list" data-role="none"></span></a></div></div></div>';
var header_html = Mustache.to_html(header_template, header);
$('#header-template').html(header_html);

var footer_template = '<div data-role="footer" data-position="fixed"><h4>Copyright © 2013 FlyCatcha</h4></div>';
var footer_html = Mustache.to_html(footer_template);
$('#footer-template').html(footer_html);
