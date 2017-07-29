/***  Load Iniital Screen  ***/
document.getElementById('content').onload = loadWindow('login', 'content');


/***  Function Used To Load Various Screens  ***/
function loadWindow(file, div) {
     xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById(div).innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET",file+".html",true);
    xmlhttp.send();    
}