/***  Firebase Reference To Users  ***/
var fireUsers = firebase.database().ref().child('Users');
var users = new usersObject();
var chatroom = new chatroomObject();
var cookieArray = chatroom.getCurrentCookies();


fireUsers.on('value', function(data){
    var objectArray = [];
    var usersArray = [];

    //store each object in the object array
    //store users in users array
    data.forEach(function(childData){
        objectArray.push(childData.val());
        var username = childData.val()['user'];
        if(cookieArray[0] !== username){
            usersArray.push(childData.val());
        }
    });
    users.objectArray = objectArray;
    chatroom.usersArray = usersArray;
    if(document.getElementById('users_div_container')) {
        document.getElementById('users_div_container').innerHTML = chatroom.getUserList(chatroom.usersArray);
    }
});
