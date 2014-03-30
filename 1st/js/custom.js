/* custom behavior *//* custom behavior */
(function  () {
	window.addEventListener("load", function() {
		var script = document.getElementsByTagName('head')[0].getElementsByTagName('script')[0];
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	}, false);		
})();

$(function(){
	//Add Footer
	$("#slides").prepend(function  () {
		var link = $("<div>", {
			"class" : "left",
		}).append($("<a>", {
			target  : "_blank",
			href 	: "https://twitter.com/numa08",
			text    : "@numa08"
		}));

		var hashtag = $("<ul>")
		.append($("<li>",{
			"class" : "hashtag"
		})
		.append($("<img>", {
			"src"	: "https://g.twimg.com/Twitter_logo_blue.png",
			"class" : "logo"
		}))
		.append($("<a>", {
			"href" : "https://twitter.com/intent/tweet?text=Git%20With%20SVN&hashtags=real_dvcs&url=" + encodeURIComponent(window.location.origin  +window.location.pathname),
			"text" : "#read_dvcs"
		}))
		);

		var footer = $("<div>", {
			"class" : "footer",
		}).append(link)
		.append(hashtag);

		return footer;
	}());

	//Add Header
	$("#slides").prepend(function  () {
		var slideTitle = $("<div>", {
			"class" : "left"
		}).append($("<a>", {
			"class" : "topbar_link",
			text : "Git With SVN",
			href : "http://numa08.net"
		}));
		var eventTitle = $("<a>", {
			"class" : "topbar_link right",
			text : "【svn/git/hg】バージョン管理システム 運用&Tips勉強会",
			href : "http://connpass.com/event/5412/"
		});
		var topbar = $("<div>", {
			"class" : "topbar"
		}).append(slideTitle)
		.append(eventTitle);

		return topbar;
	}());
});