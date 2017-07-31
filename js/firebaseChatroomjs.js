/***  Firebase Chatroom  ***/
function chatroomObject() {
    this.usersArray = [];
    this.currentUser;
    
    this.getUserList = function(usersArray) {
        var list = '<ul>';
        for( usersCounter=0; usersCounter < usersArray.length; usersCounter++) {
            list += '<li onclick=" chatroom.updateCookie(\''+usersArray[usersCounter]+'\')">'+ usersArray[usersCounter] +'</li>';
        }
        list += '</ul>';
        return list;
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
            var toUser = toUserCookie.slice(4);
            cookieArray[1] = toUser;
        }
        return cookieArray;
    }
}

