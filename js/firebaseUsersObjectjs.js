function usersObject() {
    this.objectArray = [];
    
    this.addUser = function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        /*** Verify There Are No Blank Fields ***/
        var usernameValidation = this.validation(username);
        var passwordValidation = this.validation(password);
        if(usernameValidation == false || passwordValidation == false) {
            alert('Username Or Password field cannot be blank');
            return false;
        } else {

            var unique = this.verifyUser(username);
            if(unique) {
                this.addUserRecord(username, password);
            } else {
                alert('User Exist');
                this.prototype.loadView("inc/login", "content");
            }
            return true;
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
    
    this.addUserRecord = function (username, password) {
        var newUserKey = fireUsers.push().key;
        
        fireUsers.child(newUserKey);
        fireUsers.child(newUserKey).child('id').set(newUserKey);
        fireUsers.child(newUserKey).child('user').set(username);
        fireUsers.child(newUserKey).child('password').set(password);
        fireUsers.child(newUserKey).child('loggedin').set(true);
        
        this.prototype.deleteCookie();
        document.cookie = 'username='+username;
        window.location = 'chatroom.html';
    }
    
    this.signInUser = function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        /*** Verify There Are No Blank Fields ***/
        var usernameValidation = this.validation(username);
        var passwordValidation = this.validation(password);
        if(usernameValidation == false || passwordValidation == false) {
            alert('Username Or Password field cannot be blank');
            return false;
        } else {
        
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
                var userID;
                var updateObject;
                for(var objectCounter=0; objectCounter < this.objectArray.length; objectCounter++) {
                    if(username == this.objectArray[objectCounter]['user']) {
                        if(password == this.objectArray[objectCounter]['password']){
                            validateUser = true;
                            userID = this.objectArray[objectCounter]['id']
                        }
                    }
                }
                
                updateObject = {
                    id: userID,
                    user: username,
                    password: password,
                    loggedin: true
                }
                
                if(validateUser) {
                    this.prototype.deleteCookie();
                    document.cookie = 'username='+username;
                    fireUsers.child(userID).set(updateObject);
                    window.location = 'chatroom.html';
                } else {
                    alert('Either Username or Password is Incorrect');
                }
            }
            return true;
        }
    }
    
    this.signOut = function(username) {
        for(var objectCounter=0; objectCounter < this.objectArray.length; objectCounter++) {
            if(username == this.objectArray[objectCounter]['user']) {
                var userid = this.objectArray[objectCounter]['id'];
                var password = this.objectArray[objectCounter]['password'];
            }
        }
        var updateUserObject = {};
        updateObject = {
            id: userid,
            user: username,
            password: password,
        }
        fireUsers.child(userid).set(updateObject);
        this.prototype.deleteCookie();
        window.location = 'index.html';
    }
    
    this.validation = function(fieldValue) {
        if(fieldValue == '') {
            return false;
        } else {
            return true;
        }

    }
}