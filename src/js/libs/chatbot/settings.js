/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * @author Yuri Panshin
 */
 
var ochatWidgetSettings = {
    uri: 'ws://129.158.71.78:8888/chat/ws',// bot chat server uri
    channel: 'F085BAEB-A7AF-4356-B957-B34133BB7A5E',// bot channel id
    userId: '1',// bot chat server user id
    isDebugMode: false,// enable / disable logging
    chatTitle: 'ECA Enablement Bot',// chat title
    miniTitle: '',// chat title when it minimized
    // chatInputPlaceholder: '',// chat input placeholder text by default this text is: "Message"
    // robotIcon: '',// optional url or base64 format icon for bot profile picture
    // personIcon: '',// optional url or base64 format icon for user profile picture
    // closeIcon: '',// optional url or base64 format close button icon
    // sendIcon: '',// optional url or base64 format send button icon
     openIcon: 'css/images/chat-bubble_orng.png',// optional url or base64 format open button icon
    // position: { // position of the widget by default this position is: bottom: 0, left 20px
     // left: 0, // can't be used in combination with "right".
     right: 0, // can't be used in combination with "left".
    //  top: // can't be used in combination with "bottom".
      bottom: 0, // can't be used in combination with "top".
    // },
    // useCustomStyle: false// enable / disable custom styling.
    // When this flag is true, widget does not load default style and relay on custom styles.
    embeddedVideo: false// enable / disable video links embedding
    //
};

