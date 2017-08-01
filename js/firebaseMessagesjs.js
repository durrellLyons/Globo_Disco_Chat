/***  Firebase Reference To Messages  ***/
var fireMessages = firebase.database().ref().child('Messages');
var chatroom = new chatroomObject();

fireMessages.on('value', function(data){
    var messageArray = [];
    data.forEach(function(childData){
        messageArray.push(childData.val())
    });
    chatroom.messageArray = messageArray;
    document.getElementById('messageList_div').innerHTML = chatroom.chatroomMessages(chatroom.messageArray);
    chatroom.scrollView();
});
