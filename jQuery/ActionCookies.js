// Cette classe ne contient qu'une seule fonction : 
// créer les cookies quand on applique les paramètres

var ActionCookie = function () {

    this.creeCookie = function (name, value, days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }

        document.cookie = name + "=" + value + expires + "; SameSite=Lax; path=/";
    };
    
    this.litCookie = function(name){

     if(document.cookie.length === 0)
       return null;

     var regSepCookie = new RegExp('(; )', 'g');
     var cookies = document.cookie.split(regSepCookie);

     for(var i = 0; i < cookies.length; i++){
       var regInfo = new RegExp('=', 'g');
       var infos = cookies[i].split(regInfo);
       if(infos[0] === name){
         return unescape(infos[1]);
       }
     }
     return null;
   
    };
};
        