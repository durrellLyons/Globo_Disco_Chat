/***  Load Iniital Screen  ***/
function index() {
    /*** Initialize XMLHttpRequest object ***/
    var xmlhttp;
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    } else {    
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }        
    
    /***  Function Used To Load Various Screens  ***/
    this.loadView = function(file, div) {
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                document.getElementById(div).innerHTML=xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET",file+".php",true);
        xmlhttp.send();    
    }
    
    this.deleteCookie = function() {
        var availableCookie = decodeURIComponent(document.cookie);
        document.cookie = availableCookie + ';expires=01 Jan 1970 00:00:01 GMT;expires=01 Jan 1970 00:00:01 GMT;';
        console.log(availableCookie);
        
    }
}