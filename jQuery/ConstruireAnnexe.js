
var ConstruireAnnexe = function () {
    
    this.depuisCookie = function (){
      
        var annexeCookie = actionCookies.litCookie('_RBK_annexe');
        
         // Vidage du tableau
                $("#feuille-roadbook").empty();

                // Création du tableau qui accueillera chaque étape dans un objet
                var Enigme = new Array();
                var Annexe = new Object();
               
                $("#feuille-roadbook").append(elementTable.enteteAnnexe('Après chaque énigme, ajustez votre tripmeter.'));
                
                
                    
                $.each($.parseJSON(annexeCookie), function (i, annexe) {
                    
                    
                    if(typeof(annexe.enigme) !== 'undefined'){
                        $("#feuille-annexe").append(elementTable.ligneEnigme(annexe.enigme));
                    }else{
                        $(".titre-annexe").text(annexe.titreAnnexe);
                        $(".conseil-annexe").text((annexe.conseilAnnexe));
                    }
  
                });
                
                
        
    };
    
    
};

