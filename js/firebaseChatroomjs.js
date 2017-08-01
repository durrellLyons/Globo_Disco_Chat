/***  Firebase Chatroom Object ***/
function chatroomObject() {
    this.usersArray = [];
    this.messageArray = [];
    this.messageCount;
    this.currentUser;
    this.toUser;
    
    this.displayUser = function() {
        if(this.currentUser != '') {
            document.getElementById('currentUser').innerHTML ='Welcome '+this.currentUser+'<a href="/Global_Disco_Chat">Sign Out</a>';
        }
    }
    
    this.getUserList = function(usersArray) {
        var list = '<ul>';
        for( usersCounter=0; usersCounter < usersArray.length; usersCounter++) {
            list += '<li onclick=" chatroom.directChat(\''+usersArray[usersCounter]+'\')">'+ usersArray[usersCounter] +'</li>';
        }
        list += '</ul>';
        return list;
    }
    
    this.directChat = function(name) {
        var currentMessageText = document.getElementById('message').value;
        message = '';
        message += '@'+name+ ' ' +currentMessageText;
        document.getElementById('message').value = message;
    }
    
    this.chatroomMessages = function(messageArray) {
        var messages = '<div id="messageContainer">';
        for( messageCounter=0; messageCounter < messageArray.length; messageCounter++) {
            messages+='<p class="" id=' + messageArray[messageCounter]['mid'] + '>';
            messages+='<span class="username">' + messageArray[messageCounter]['messageSender'] + ': </span>';
            messages+='<span class="message">' + messageArray[messageCounter]['messageText'] + ' </span>';
            messages+='</p>';
        }
        messages += '</div>';
        return messages;
    }
    
    this.getCurrentCookies = function() {
        var cookieArray = [];
        var currentCookies = document.cookie.split(';');
        
        var currentUserCookie = currentCookies[0];
        this.currentUser = currentUserCookie.slice(9);
        cookieArray[0] = this.currentUser;
        
        return cookieArray;
    }
    
    this.sendMessage = function() {
        var message = document.getElementById('message').value;
        var messageId = this.messageCount+1;
        
        fireMessages.child(messageId);
        fireMessages.child(messageId).child('mid').set(messageId);
        fireMessages.child(messageId).child('messageSender').set(this.currentUser);
        fireMessages.child(messageId).child('messageText').set(message);
        
        document.getElementById('message').value = '';
        this.scrollView();
    }
    
    this.scrollView = function() {
        var div = document.getElementById('messageContainer');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
}

