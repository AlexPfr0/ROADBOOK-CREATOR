// Gère la conception de l'annexe

var Annexe = function () {

    this.enregAnnexecookie = function () {

        var cookieValidite = actionCookies.litCookie('_RBC_CookiesValidite');

        actionCookies.creeCookie('_RBK_annexe', this.serializeAnnexe(), cookieValidite);
    };


    this.recupAnnexeCookie = function () {
        
        construireAnnexe.depuisCookie();

    };

    this.serializeAnnexe = function () {


        var conseil = '';
        var enigmes = new Array();
        var annexe = new Array();



        $(".enigme").each(function (index) {

            var enigme = $(this).text();

            if (enigme === '') {
                enigme = '';

            }
            enigmes[index] = enigme;
        });

        for (var i = 0; i < enigmes.length; i++) {

            annexe[i] = {'enigme': enigmes[i]};
        }

        var titre = $('.titre-annexe').text();
        conseil = $('.conseil-annexe').text();

        annexe[i] = {'titreAnnexe': titre, 'conseilAnnexe': conseil};


        return JSON.stringify(annexe);

    };
};


