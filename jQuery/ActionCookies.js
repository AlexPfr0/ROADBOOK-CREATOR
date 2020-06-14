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

        document.cookie = name + "=" + value + expires + "; path=/" + "; SameSite=Strict";
    };
};
        