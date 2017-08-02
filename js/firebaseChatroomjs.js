/***  Firebase Chatroom Object ***/
function chatroomObject() {
    this.usersArray = [];
    this.messageArray = [];
    this.currentUser;
    this.toUser;
    
    this.displayUser = function() {
        if(this.currentUser != '') {
            document.getElementById('currentUser').innerHTML = this.currentUser+'<br><a href="#" onclick="users.signOut(\''+this.currentUser+'\')">Sign Out</a>';
            document.getElementById('logo').innerText = 'Global Disco Chatroom';
            document.getElementById('logo').style.border = '2px groove #d5d5d5';
        }
    }
    
    this.getUserList = function(usersArray) {
        var list = '<ul>';
        for( usersCounter=0; usersCounter < usersArray.length; usersCounter++) {
            list += '<li onclick=" chatroom.directChat(\''+usersArray[usersCounter]['user']+'\')">';
            list+= '<em>' + usersArray[usersCounter]['user'] + '</em>';
            if(usersArray[usersCounter]['loggedin']) {
                list += '<i class="material-icons">visibility</i>';
            }
            list += '</li>';
        }
        list += '</ul>';
        return list;
    }
    
    this.directChat = function(name) {
        var currentMessageText = document.getElementById('message').value;
        message = '';
        message += '@'+name+ ' ' +currentMessageText;
        document.getElementById('message').value = message;
        
        /*** if selected on a mobile device, verify the mobile menu removes upon selection ***/
        document.getElementById('users_div_container').style.display = 'none';
    }
    
    this.chatroomMessages = function(messageArray) {
        var messages = '<div id="messageContainer">';
        for( messageCounter=0; messageCounter < messageArray.length; messageCounter++) {
            messages+='<p>';
            messages+='<span class="username">' + messageArray[messageCounter]['messageSender'] + ': </span>';
            messages+='<span class="message" id="message_' + messageArray[messageCounter]['mid'] + '" >' + messageArray[messageCounter]['messageText'] + ' </span>';
            if(messageArray[messageCounter]['messageSender'] == this.currentUser){
                messages+='<span>';
                messages+='<i class="material-icons" id="delete_' + messageArray[messageCounter]['mid'] + '" onclick="chatroom.deleteChat(this.id)">delete</i>';
                messages+='<i class="material-icons" id="edit_' + messageArray[messageCounter]['mid'] + '" onclick="chatroom.editChat(this.id)">mode_edit</i>';
                messages+='</span>';
            }
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
        var messageValidation = this.prototype.validation(message)
        if(!messageValidation) {
            alert('Message box cannot be blank');
            return false;
        } else {
            var newMessageKey = fireMessages.push().key;
            fireMessages.child(newMessageKey).child('mid').set(newMessageKey);
            fireMessages.child(newMessageKey).child('messageSender').set(this.currentUser);
            fireMessages.child(newMessageKey).child('messageText').set(message);
            
            document.getElementById('message').value = '';
            this.scrollView();

            return true;
        }
    }
    
    this.scrollView = function() {
        var div = document.getElementById('messageContainer');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
    
    this.deleteChat = function(id) {
        var deleteId = id.slice(7);
        var confirmDelete = confirm("Are You Sure You Want To Delete This Message");
        if(confirmDelete){
            fireMessages.child(deleteId).remove();        
        }
    }
    
    this.editChat = function(id) {
        var mid = id.slice(5);
        var spanid = 'message_'+mid;
        var currentText = document.getElementById('message_'+mid).innerText;
        var editTextBox = '<input type="text" id="updatingText_'+mid+'" class="updatingText" onblur="chatroom.submitEditChat(this.value, this.id)" />';
        document.getElementById(spanid).innerHTML = editTextBox;
        document.getElementById('updatingText_'+mid).value = currentText;
        document.getElementById('updatingText_'+mid).focus();
    }
    
    this.submitEditChat = function(text, id){
        var updateId = id.slice(13);
        var updateMessage = text;
        var spanid = 'message_'+updateId;
        var updates = {
            mid: updateId,
            messageText: updateMessage,
            messageSender: this.currentUser
        }
        fireMessages.child(updateId).set(updates);
        document.getElementById(spanid).innerText = updateMessage;
    }
    
    this.showMobileUsers = function() {
        var displayStatus = document.getElementById('users_div_container').style.display;
        if(!displayStatus || displayStatus == 'none') {
            document.getElementById('users_div_container').style.display = 'block';
        } else {
            document.getElementById('users_div_container').style.display = 'none';
        }
    }
}

