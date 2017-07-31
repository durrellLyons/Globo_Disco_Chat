/***  Firebase Chatroom  ***/
function chatroomObject() {
    this.usersArray = [];
    this.messageArray = [];
    this.messageCount;
    this.currentUser;
    this.toUser;
    
    this.getUserList = function(usersArray) {
        var list = '<ul>';
        for( usersCounter=0; usersCounter < usersArray.length; usersCounter++) {
            list += '<li onclick=" chatroom.updateCookie(\''+usersArray[usersCounter]+'\')">'+ usersArray[usersCounter] +'</li>';
        }
        list += '</ul>';
        return list;
    }
    
    this.chatroomMessages = function(messageArray) {
        var messages = '<div>';
        for( messageCounter=0; messageCounter < messageArray.length; messageCounter++) {
            messages+='<p class="" id=' + messageArray[messageCounter]['mid'] + '>';
            messages+='<span class="">' + messageArray[messageCounter]['messageSender'] + ': </span>';
            messages+='<span class="">' + messageArray[messageCounter]['messageText'] + ' </span>';
            messages+='</p>';
        }
        messages += '</div>';
        return messages;
    }
    
    this.updateCookie = function(name) {
        document.cookie='to='+name;
        this.getCurrentCookies();
    }
    
    this.getCurrentCookies = function() {
        var cookieArray = [];
        var currentCookies = document.cookie.split(';');
        
        var currentUserCookie = currentCookies[0];
        this.currentUser = currentUserCookie.slice(9);
        cookieArray[0] = this.currentUser;
        
        
        if(currentCookies.length > 1) {
            var toUserCookie = currentCookies[1];
            this.toUser = toUserCookie.slice(4);
            cookieArray[1] = this.toUser;
        }
        return cookieArray;
    }
    
    this.sendMessage = function() {
        console.log(this.getCurrentCookies());
        var message = document.getElementById('message').value;
        var messageId = this.messageCount+1;
        
        console.log('To User: '+this.toUser);
        console.log('This User: '+this.currentUser);
        console.log('Message: '+message);
        console.log(this.messageCount);
        console.log(messageId);
        
        fireMessages.child(messageId);
        fireMessages.child(messageId).child('mid').set(messageId);
        fireMessages.child(messageId).child('messageSender').set(this.currentUser);
        fireMessages.child(messageId).child('messageText').set(message);
    }
}

