/***  Firebase Reference To Users  ***/
var fireUsers = firebase.database().ref().child('Users');
var amountOfRecords;
var objectArray = [];

//var fireUsers = firebase.database().ref();
/**
 * Retrieve the number of users to apply a new user number when adding a new user
 * Retrieve all the usernames for to verify no duplicates exist when adding a new user
**/
fireUsers.on('value', function(data){
    amountOfRecords = data.numChildren();

    //stor each object in the object array   
    data.forEach(function(childData){
        objectArray.push(childData.val());
    });
    console.log(objectArray);
});
    
function addUser() {
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var unique = verifyUser(username);
    if(unique) {
        addUserRecord(username, password);
    } else {
        alert('User Exist');
        loadWindow("login", "content");
    }
}

//check if the username is already listed in the previously created array
function verifyUser(username) {
    var userExist;
    for(var objectCounter=0; objectCounter < amountOfRecords; objectCounter++) {
        if(username == objectArray[objectCounter]['user']) {
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

function addUserRecord(username, password) {
    var newRecordNumber;
    newRecordNumber = amountOfRecords+1;
    
    fireUsers.child(newRecordNumber);
    fireUsers.child(newRecordNumber).child('user').set(username);
    fireUsers.child(newRecordNumber).child('password').set(password);
    
    document.cookie = 'username='+username;
    loadWindow("chatroom", "content");
}

function signInUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    /*** Verify Username Exist ***/
    var userCheck = verifyUser(username);
    if(userCheck) {
        alert('User Does Not Exist \n Please Create Your Account');
        loadWindow('signup', 'content');
    } else {
        
        /*** Verify that the username and password from user input
         * matches a username and password pair of one of the User objects
         ***/
        var validateUser;
        for(var objectCounter=0; objectCounter < amountOfRecords; objectCounter++) {
            if(username == objectArray[objectCounter]['user']) {
                if(password == objectArray[objectCounter]['password']){
                    validateUser = true;
                }
            }
        }
        
        if(validateUser) {
            alert('User Verified');
            document.cookie = 'username='+username;
            loadWindow('chatroom', 'content');
        } else {
            alert('Either Username or Password is Incorrect');
        }
    }
}