/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 */
 var ssoemail;
 var email;
 var username;
 getemailfromcookie = function () {

        // debuglog('~~~~~~~~~~~~~~~  COOKIE  ~~~~~~~~~~~~~');
        // debuglog(document.cookie);
        // debuglog('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // get user email
        var user = document.cookie.split(';').map(function (x) {
          return x.trim().split('=');
        }).reduce(
          function (a, b) {
            a[b[0]] = b[1];
            return a;
          }, {})["ORA_UCM_INFO"];
        user = typeof user !== "undefined" ? user : "";
        var n = user.lastIndexOf("~");

        email = user.substr(n + 1, user.length);
		
        if (email) {
           username = email.substring(0, email.indexOf("."));
        } else {
           username = "1";
        }
      }
	  
	   
	    getemailfromcookie();
		
		
var ochatWidgetSettings = {
    uri: 'ws://129.158.71.78:8888/chat/ws',// bot chat server uri
    channel: 'F085BAEB-A7AF-4356-B957-B34133BB7A5E',// bot channel id
    userId: username,// bot chat server user id
    isDebugMode: false,// enable / disable logging
    chatTitle: 'ECA Enablement Bot',// chat title
    miniTitle: '',// chat title when it minimized
    // chatInputPlaceholder: '',// chat input placeholder text by default this text is: "Message"
     robotIcon: 'css/images/bot-lb.png',// optional url or base64 format icon for bot profile picture
     personIcon: 'css/images/person.png',// optional url or base64 format icon for user profile picture
     closeIcon: 'css/images/closeicon.png',// optional url or base64 format close button icon
    // sendIcon: '',// optional url or base64 format send button icon
     openIcon: 'css/images/chat-bubble_blue.png',// optional url or base64 format open button icon
    // position: { // position of the widget by default this position is: bottom: 0, left 20px
     // left: 0, // can't be used in combination with "right".
     right: 20, // can't be used in combination with "left".
    //  top: // can't be used in combination with "bottom".
      bottom: 0, // can't be used in combination with "top".
    // },
     //useCustomStyle: false//false// enable / disable custom styling.
    // When this flag is true, widget does not load default style and relay on custom styles.
    embeddedVideo: false// enable / disable video links embedding
    //
};



/*for resize

$(document).on('click', '.closeicon button', function () {
    // your function here
	document.getElementById('dragclass').style.position = 'fixed';
document.getElementById('dragclass').style.bottom = 0; //or whatever 
document.getElementById('dragclass').style.right = 0; // or whatever
document.getElementById('dragclass').style.left = 'auto';
	document.getElementById('dragclass').style.top = 'auto';
});
*/