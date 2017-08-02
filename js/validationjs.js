function validation() {
    this.username = document.getElementById('username');
    this.password = document.getElementById('password');
    this.message = document.getElementById('message');
    
    this.checkBlankFields = function(fieldId) {
        var field = document.getElementById(fieldId).value;
        alert(field)
        /*
        if(field == '' || field == ' ') {
            return false
        } else {
            return true;
        }
        */
    }
}