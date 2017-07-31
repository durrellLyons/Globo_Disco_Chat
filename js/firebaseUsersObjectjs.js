function usersObject() {
    this.amountOfRecords;
    this.objectArray = [];
    
    this.addUser = function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var unique = this.verifyUser(username);
        if(unique) {
            this.addUserRecord(username, password);
        } else {
            alert('User Exist');
            this.prototype.loadView("inc/login", "content");
        }
    }
    
    //check if the username is already listed in the previously created array
    this.verifyUser = function(username) {
        var userExist;
        for(var objectCounter=0; objectCounter < this.objectArray.length; objectCounter++) {
            if(username == this.objectArray[objectCounter]['user']) {
                userExist = true;
            }
        }
        if(userExist) {
            return false;
        }
        else {
            return true;
        }
    }
    
    this.createRecordNumber = function() {
        var highestNumber = 0;
        for(var objectCounter=0; objectCounter < this.objectArray.length; objectCounter++) {
            if(highestNumber < this.objectArray[objectCounter]['id']) {
                highestNumber = this.objectArray[objectCounter]['id'];
            }
        }
        var recordNumber = highestNumber+1;
        return recordNumber;
    }
    
    this.addUserRecord = function (username, password) {
        var newRecordNumber = this.createRecordNumber();
        
        fireUsers.child(newRecordNumber);
        fireUsers.child(newRecordNumber).child('id').set(newRecordNumber);
        fireUsers.child(newRecordNumber).child('user').set(username);
        fireUsers.child(newRecordNumber).child('password').set(password);
        
        document.cookie = 'username='+username;
        this.prototype.loadView("chatroom", "content");
    }
    
    this.signInUser = function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        /*** Verify Username Exist ***/
        var userCheck = this.verifyUser(username);
        if(userCheck) {
            alert('User Does Not Exist \n Please Create Your Account');
            this.prototype.loadView('inc/signup', 'content');
        } else {
            
            /*** Verify that the username and password from user input
             * matches a username and password pair of one of the User objects
             ***/
            var validateUser;
            for(var objectCounter=0; objectCounter < this.amountOfRecords; objectCounter++) {
                if(username == this.objectArray[objectCounter]['user']) {
                    if(password == this.objectArray[objectCounter]['password']){
                        validateUser = true;
                    }
                }
            }
            
            if(validateUser) {
                alert('User Verified');
                document.cookie = 'username='+username;
                window.location = 'chatroom.php';
            } else {
                alert('Either Username or Password is Incorrect');
            }
        }
    }
}