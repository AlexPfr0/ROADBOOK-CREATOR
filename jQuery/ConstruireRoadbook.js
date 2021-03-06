// Cette classe permet de construire le roadbook sur DEUX COLONNES. Elle contient les fonctions pour
// 3 cas différents :
//        - Quand on veux faire un roadbook à partir des données brutes venant du site Kurviger
//        - Quand on veux faire un roadbook à partir d'un fichier RBK, fichier de sauvegarde
//            généré par l'application elle-même.
//        - On peut également construire le roadbook depuis l'enregistrement dans les cookies (lourd et peu fiable)


var ConstruireRoadbook = function () {
    
    this.getCookie = function(name) {
	    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	    return v ? v[2] : null;
	};

    //
    this.motCleInit = function(langage){
        
        var mots = new Array();
        
        switch(langage){
            
            case 'fr_FR':
                mots.depart = 'Départ';
                mots.escale = 'Escale';
                mots.arrivee = 'Arrivée';
                
                break;
            case 'de_DE':
                mots.depart = 'Abfahrt';
                mots.escale = 'Wegpunkt';
                mots.arrivee = 'Ziel';
                
                
                break;
            case 'en_EN':
                mots.depart = 'Start';
                mots.escale = 'Waypoint';
                mots.arrivee = 'Arrive';
               
                
                break;
                
        }
        
        return mots;
        
    };
    
    this.detecteLangage = function(mot){
        
        var langage = '';
                switch(mot){
            
            case 'Escale':
                langage = 'fr_FR';
                
                break;
            case 'Wegpunkt':
                langage = 'de_DE';
                
                
                break;
            case 'Waypoint':
                langage = "en_EN";
               
                
                break;
                
        }
        
        return langage;
        
    };
    
    // Cette fonction permet de formater les data brutes pour ne pas être embêté avec la langue de l'utilsateur de Kurviger.
    this.formateData = function(dataBrute){
        
        // Suivant la langue utlisée dans Kurviger, le pattern pris en compte pour récupérer les 
        // données diffère. 
        // Ainsi je transforme le pattern de chaque pays en un pattern universel.
        var data;
        var motEscale   = ['Escale', 'Wegpunkt', 'Waypoint', 'Pasando', 'Marker', 'Σημείο'];
        var motArrivee  = ['Arrivée', 'Ziel', 'Arrive', 'recorrido', 'Bestemming', 'Άφιξη'];

        // Forcing pour remplacer les mot par des codes bien spécifiques à moi
        var modelEscale     = '5x#';
        var modelArrivee = '02#15%';

        // Je parcours le tableau de termes  et je les replace par mes codes.
        // Quand je tombe sur la bonne langue, je remplace et je sors de la boucle
        for (var i = 0; i < motEscale.length; i++) {
            
            var regex   = new RegExp(motEscale[i],"ig");
            var regex2  = new RegExp(motArrivee[i],"ig");
            var test    = regex.test(dataBrute);
            if(test){
                data = dataBrute.replace(regex, modelEscale);
                data = data.replace(regex2, modelArrivee);
                break;}
            
          
        }

        return data;
        
    };

    // - La fonction "depuisDonneesBrutes" récupère les donnees depuis l'interface
    // - Elle splite puis range dans un tableau d'objects les données calculées
     
    this.depuisDonneesBrutes = function () {

        var epp = 24;  // nombre d'étapes par page
        var nb_col = 2; // nombre de colonne
        var nbl = epp / nb_col; // nombre de ligne
        
        $("td.ir-right span").css('opacity', 1);
        $("td.ir-right input").css('opacity', 1);
        
evenement.console("Importation données brutes", 'infoA');        

        // Récupération des données

        var data_brute = this.formateData($("#data-brute").val());
        var cookieUnite = actionCookies.litCookie("_RBC_UniteMesure");

        // Calcul suivant le choix de l'unité de mesure (métrique (m) ou impériale (mi))
        var unite = 1;
        if (cookieUnite === "imperial"){
            unite = 1.609;
        }

        try {

            // Splite des donnees ligne par ligne (\n). Récupération de chaque ligne dans le tableau "lignes".
        
            var lignes = data_brute.split("\n");
            var e = 1;  // Incrémentation pour le numéro d'étape
        
        // Initialisation du tableau d'objets. Ici on aura à tableau d'étapes.
        // Chaque étape sera composé des distances calculées, de son image de direction
        // et de son commentaire

            var Etape   = new Array();
            Etape[0]    = new Object();
            Etape[0].numero     = 0;
            Etape[0].escale     = '';//this.motCleInit(this.getCookie("_RBC_Langage")).depart;;
            
            Etape[0].dParcourue = 0;
            Etape[0].dPartielle = 0;
            
            var dTotale = (lignes[lignes.length - 1]).replace("\t\t", "\t").split("\t")[2] / 1000;
            dTotale = calculerDistance.TotalDepart(dTotale, unite);
            
            Etape[0].dRestante      = dTotale;
            Etape[0].commentaire    = '';
            Etape[0].direction      = '';
            
            // Parcours du tableau "lignes" issu du split 
evenement.console("Parsing ...", 'infoA');            
            for (var i = 0; i < lignes.length; i++) {
                
                // Split de chaque ligne. Le shema est la tabulation (soit 4 espaces)
                // La variable "ligne" permet de réduire les doubles tabulations en simple tabulation.
                // La variable "mots" est un tableau contenant chaque mots de chaque ligne

                var ligne = lignes[i].replace("\t\t", "\t");
                var termes = ligne.split("\t");
                
                
                
                // Pour le roadbook, on ne gardera que les étapes marquée "Escale" ou "Arrivée"
                // Ce sont les étapes que l'utilsateur à placées sur la carte de Kurviger.
                
                if (termes[1].indexOf('5x#') > -1 || termes[1].indexOf('02#15%') > -1) {
                    
                    // Remplisssage du tableau d'étapes. Chaque étape représente un nouvel objet.
                    Etape[e] = new Object();
                    Etape[e].numero         = e;
                    Etape[e].escale = termes[1];
                    Etape[e].dParcourue = calculerDistance.Parcourue(termes[2], unite, 'data-brute');
                    Etape[e].dPartielle     = calculerDistance.Partielle(Etape[e].dParcourue, Etape[e - 1].dParcourue, 'data-brute');
                    Etape[e].dRestante      = calculerDistance.Restante(dTotale, Etape[e].dParcourue);
                    Etape[e].commentaire    = '';
                    Etape[e].direction      = '';
                    e++;

                }
            }
            
            // La variable nb_page_entiere permet de créer la boucle pour générer le roadbook par page.
            // La variable epp (étapas par page) détermine le nombre de page entière à créer suivant
            // le nombre total d'étape
            // reste_etape représente le nombre d'étapes restantes (pas assez pour construire une page entière)

            var reste_etape = Etape.length % epp;
            var nb_page_entiere = (Etape.length - (Etape.length % epp)) / epp;
            
            // La variable "modeCorrection" permet de spécifier depuis l'interface 
            // si on créer un nouveau roadbook ou bien si on modifie les valeurs d'un roadbook 
            // déja édité.
            
            // modeCorrection actif   => On ne remplit que les cases de "distances"
            // modeCorrection inactif => On génére tout le roadbook, tu le HTML, toutes les données présentes sont écrasées
            
            var modeCorrection = $('#mode-correction').val();
            
            // Initialisation du roadbook au niveau du HTML
            
            $('#nb_km a').empty();
            $('#nb_etapes a').empty();
            $('#nb_pages a').empty();

            if (modeCorrection === 'inactif') {
                $('#nom_roadbook').val('');
                $("#feuille-roadbook").empty();
            }
            var abbrUnite;
                if(cookieUnite === 'imperial'){
                    abbrUnite = 'mi';
                }else if(cookieUnite === 'metric'){
                    abbrUnite = 'km';
                }

           $('#nb_km a').append(dTotale + ' ' + abbrUnite);
            
            
            $('#nb_etapes a').append(Etape.length - 1 + " " + expression.etapes);
            var pages = ' ' + expression.page;
                if (nb_page_entiere > 1) {
                    pages = ' ' + expression.pages;
                }
            $('#nb_pages a').append(nb_page_entiere + 1 + pages);

            // C'est parti pour les boucles
            
            // La variable "t" sert à sauter d'index à chaque nouvelle page
            // Elle est incrémentée de 24 à chaque fin de page
            var t = 0;
            var q = 1;

            // Boucle pour chaque page
            if (reste_etape === 0) {
                q = 0;
            }
            
            for (var n = 1; n <= nb_page_entiere + q; n++) {
evenement.console("Calculs page " + n +" ...", 'alertA');

                // Si modeCorrection est inactif, inutile de créer l'entête du tableau

                if (modeCorrection === 'inactif') {
                    $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                    $("#page-" + n).append(elementTable.entete());
                    
evenement.console("Entête générée", 'okA');

evenement.console("Mode correction inactif, ajout des données ...", 'alertA');


                }else{
evenement.console("Mode correction actif, modification des données ...", 'alertA');
                }

            // Boucle pour remplir chaque étape de la page courante
            
                for (var i = t; i < nbl + t; i++) {
                    
                    // Initilaisation des variables

                    var eNumero = i;
                    var edPartielle         =
                            edRestante      =
                            edParcourue     =
                            eCommentaire    =
                            eDirection      = '';

                    var eNumero2 = i + nbl;
                    var edPartielle2        =
                            edRestante2     =
                            edParcourue2    =
                            eCommentaire2   =
                            eDirection2     = '';
                    
                    // Si l'index de "Etape" est undefined, c'est 
                    // que l'index n'existe pas. On ne remplit le tableau qu'avec des données
                    
                    // Première colonne du tableau (du roadbook)
                    if (typeof Etape[i] !== 'undefined') {

                        var eNumero         = Etape[i].numero;
                        var edPartielle     = Etape[i].dPartielle;
                        var edRestante      = Etape[i].dRestante;
                        var edParcourue     = Etape[i].dParcourue;
                        var eCommentaire    = Etape[i].commentaire;
                        var eDirection      = Etape[i].direction;
                    }
                    
                    // Deuxièmre colonne du tableau (du roadbook)
                    if (typeof Etape[i + nbl] !== 'undefined') {
                        var eNumero2 = Etape[i + nbl].numero;
                        var edPartielle2 = Etape[i + nbl].dPartielle;
                        var edRestante2 = Etape[i + nbl].dRestante;
                        var edParcourue2 = Etape[i + nbl].dParcourue;
                        var eCommentaire2 = Etape[i + nbl].commentaire;
                        var eDirection2 = Etape[i + nbl].direction;

                    }
                    
                    
// Si le mode correction des distances n'est pas activé, on crée une nouvelle ligne HTML.
                    if (modeCorrection === 'inactif') {

                        // La fonction "nouvelleLigne() se trouve dans la classe elementTable (./jQuery/ElementTable.js)
                        $("#page-" + n)
                                .append(elementTable.nouvelleLigne(
                                        eNumero, edPartielle, edRestante, edParcourue, eDirection, eCommentaire,
                                        eNumero2, edPartielle2, edRestante2, edParcourue2, eDirection2, eCommentaire2));

// Si le mode correction est activé, on ne remplace que les valeurs dans les cases adéquates.                
                    } else if (modeCorrection === 'actif') {


                        // Si la page existe 
                        if ($('#page-' + n).length) {
;                           
                            // Correction des valeurs uniquement (on ne touche pas aux images ni aux commentaires)

                            elementTable.corrigeDistances(eNumero, edParcourue, edRestante, edPartielle,
                                    eNumero2, edParcourue2, edRestante2, edPartielle2);
                        
                            // Si dParcourue est vide, on est à la fin du tableau, on peut supprimer les pages inutiles
                            if(edParcourue === '')$('#page-' + parseInt(n+1)).remove();

// Sinon, on doit recréer une nouvelle page. C'est le cas si la correction contient plus d'étapes   
                        } else {

                            //console.log(eNumero);
                            // Nouvelle page, dans le cas d'une correction
                            $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                            $("#page-" + n).append(elementTable.entete());

                            
                            // Nouvelle boucle pour créer la dernière page dans le cas d'une correction
                            for (var i = (n - 1) * epp; i < ((n - 1) * epp) + nbl; i++) {


                                //console.log(i);
                                var eNumero     = i;
                                var edPartielle         =
                                        edRestante      =
                                        edParcourue     =
                                        eCommentaire    =
                                        eDirection      = '';

                                var eNumero2 = i + nbl;
                                var edPartielle2        =
                                        edRestante2     =
                                        edParcourue2    =
                                        eCommentaire2   =
                                        eDirection2     = '';

                                if (typeof Etape[i] !== 'undefined') {

                                    var eNumero         = Etape[i].numero;
                                    var edPartielle     = Etape[i].dPartielle;
                                    var edRestante      = Etape[i].dRestante;
                                    var edParcourue     = Etape[i].dParcourue;
                                    var eCommentaire    = Etape[i].commentaire;
                                    var eDirection      = Etape[i].direction;
                                }

                                if (typeof Etape[i + nbl] !== 'undefined') {
                                    var eNumero2 = Etape[i + nbl].numero;
                                    var edPartielle2 = Etape[i + nbl].dPartielle;
                                    var edRestante2 = Etape[i + nbl].dRestante;
                                    var edParcourue2 = Etape[i + nbl].dParcourue;
                                    var eCommentaire2 = Etape[i + nbl].commentaire;
                                    var eDirection2 = Etape[i + nbl].direction;
                                }
                                $("#page-" + n)
                                        .append(elementTable.nouvelleLigne(
                                                eNumero, edPartielle, edRestante, edParcourue, eDirection, eCommentaire,
                                                eNumero2, edPartielle2, edRestante2, edParcourue2, eDirection2, eCommentaire2));

                            }

                            // On casse la boucle quand à la fin de la dernière page en mode correction (modeCorrection = actif)
                            // Fin du tableau en cas de odeCorrection = actif
                                $("#page-" + n).append(elementTable.ligneVide(2, 'Page ' + n + ' - Généré avec ROADBOOK CREATOR by Alex', 'https://roadbook.alexp.fr'));
                                $("#page-" + n).append('</table>');
                            break;
                        }
                            
                                
                    }


                }
                t += epp;

                // Fin du tableau en cas de odeCorrection = inactif
                if (modeCorrection === 'inactif') {
                    $("#page-" + n).append(elementTable.ligneVide(2, 'Page ' + n + ' - Généré avec ROADBOOK CREATOR by Alex', 'https://roadbook.alexp.fr'));
                    $("#page-" + n).append('</table>');
                }
                
evenement.console("Page " + n + " générée...", 'okA');
                
            }
//        drag_drop_image();
//        edit_commentaire();

//evenement.imprimerRoadbook();
//evenement.DragDropImage();
//evenement.supprimeImageDirection();
oNotif.success('Données importées, roadbook généré.');

        } catch (erreur) {
            
evenement.console("Données mal formatées", 'critiqueA');
$("#feuille-roadbook").append(elementTable.ligneErreur(erreur));
oNotif.error('Un problème est survenue lors de l\'importation des données.');

        }
        
evenement.DragDropImage(false);
evenement.imprimerRoadbook();

    };

    //#######################################################################################"
    
    // La fonction "depuisFichierRBK lit les données dans un fichier créer par la l'application
    // L'utlisateur uploade le fichier sur le serveur. Ce fichier est détruit à la fin de son utlisation
    // Le fichier RBK de contient que la distance initiale (distance parcourue), l'image de la direction
    // et le commentaire de l'étape.
    // La distance intermédiaire et la distance restante sont recalculées
    // Lors de l'importation d'un projet, le roadbook déjà présent dans l'interface est écrasé

    this.depuisFichierRBK = function (fichierRBK) {

        $("td.ir-right span").css('opacity', 1);
        $("td.ir-right input").css('opacity', 1);
        
//        var cookieUnite = actionCookies.litCookie("_RBC_UniteMesure");
//        console.log(cookieUnite);
        var uniteX = 1;
//        if (cookieUnite === "imperial"){
//            uniteX = 1.609;
//        }else{
//           uniteX = 1; 
//        }
        var auteur = '';
                var date    = '';
                var langage = '';
                var version = '';
        var unite = '';
        var KurvUrl = '';

        try {

evenement.console("Récupération des données depuis le serveur", 'infoA');
            // Récupération du contenu du fichier envoyé       
            $.get("./upload/" + fichierRBK, function (data) {

                var roadbook = data;

                // Vidage du tableau
                $("#feuille-roadbook").empty();

                // Création du tableau qui accueillera chaque étape dans un objet
                var Etape = new Array();

evenement.console("Calculs ...", 'infoA');
//        Parcours du fichier RBK au format JSON
                $.each($.parseJSON(roadbook), function (i, nouvelleLigne) {
                    
                    if (typeof nouvelleLigne.RBKauteur === 'undefined') {
                     //            Pour chaque nouvelle entrée, on crée un nouveau object Etape + son index
                    Etape[i] = new Object();

                    Etape[i].distance       = nouvelleLigne.d;
                    Etape[i].direction      = nouvelleLigne.i;
                    Etape[i].commentaire    = nouvelleLigne.c;
                    }else{
                       
                        auteur  = nouvelleLigne.RBKauteur;
                        date    = nouvelleLigne.RBKdate;
                        langage = nouvelleLigne.RBKlangage;
                        version = nouvelleLigne.RBKversion;
                        unite = nouvelleLigne.RBKunite;
                        KurvUrl = nouvelleLigne.KurvUrl;
                        
                       
                    }



                });
    

            

// Initialisation des variables
                var D_partielle     = '';
                var num_etape       = 0;
                var D_restante      = '';

                var D_parcourue     = '';
                var direction       = '';
                var commentaire     = '';

                var D_partielle2    = '';
                var num_etape2      = 0;
                var D_restante2     = '';

                var D_parcourue2    = '';
                var direction2      = '';
                var commentaire2    = '';

// Cette variable servira dans la boucle pour parcourir le tableau d'objet.
// Le modulo n'est pas vraiment indispensable, il a surtout servi pour générer
// le fichier
                var nb_page_entiere = (Etape.length - (Etape.length % 24)) / 24;

                var D_totale = 0;

// Triage du tableau d'objet, préparation pour le parcourir
// J'utlise 9999 pour ignorer les étapes vides. Ce 9999 est généré
// quand la case est vide quand on sauvegarde. Il vaut mieux prendre un
// nombre si on veut le remplacer.
                for (var d = 0; d < Etape.length; d++) {

                    if (Etape[d].distance !== '9999') {
                        if (D_totale - Etape[d].distance < 0) {
                            D_totale = Etape[d].distance;
                        }
                    }
                }

// Triage à proprement dit du tablleau
                Etape.sort(function (a, b) {
                    const distance1 = a.distance;
                    const distance2 = b.distance;

                    return distance1 - distance2;
                });

// La variable t permet de se décaler dans le tableau après chaque feuille générée
// Le fait de mettre les données sur deux colonnes a demandé un peu de gymnastique ^^
                var t = 0;
                var nb_etape = -1;

// La variable n est la représentation du nombre de page.
// On l'initialise à un pour pouvoir afficher le numéro sans 
// bidouillage. Ici, pour chaque page (nb_page_entiere, cf plus haut)
                for (var n = 1; n <= nb_page_entiere; n++) {
evenement.console("Calculs page " + n +" ...", 'infoA');
// Création de l'entête de la page
                    $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                    
evenement.console("Entête générée", 'okA');                    
                    $("#page-" + n).append(elementTable.entete());
                    
evenement.console("Ajout des données dans le roadbook...", 'infoA');
// Nous allons mettre 24 étapes par page, sur deux colonnes, soit 12 lignes
                    for (var i = t; i < 12 + t; i++) {
                        
// On ignore les valeurs distance à 9999 (cf plus haut)
                        if (Etape[i].distance !== '9999') {
                            nb_etape++;
// Les fonctions de calculs se situent dans le fichier "calculerDistances.js" 
// GENERATION DE LA PREMIERE COLONNE DE LA FEUILLE
                            D_parcourue = calculerDistance.Parcourue(Etape[i].distance, uniteX, 'rbk');

// Si i = t c'est qu'on est à la première ligne de la feuille.
// Il faudra donc se décaler dans le tableau pour certains calculs.
                            if (i === t) {
                                if (t === 0) {
                                    D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i].distance, 'rbk');

                                } else {
                                    D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i - 1].distance, 'rbk');
                                }


                            } else {

                                D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i - 1].distance, 'rbk');
                            }

                            D_restante = calculerDistance.Restante(D_totale, D_parcourue);

                            (Etape[i].direction === 'null') ? direction = '' : direction = elementTable.creerImageDirection(Etape[i].direction);
                            ;

                            commentaire = Etape[i].commentaire;

                        }
// Si la la distance est 9999 (soit vide à la génération),
// on initialise les valeur à rien, soit vide. (sauf pour le n° d'étape)
                        else {

                            D_restante  = '';
                            D_parcourue = '';
                            D_partielle = '';
                            direction   = '';
                            commentaire = '';
                        }

                        num_etape = i;

// GENERATION DE LA SECONDE COLONNE DE LA FEUILLE                 
                        if (Etape[i + 12].distance !== '9999') {
                            nb_etape++;
                            D_parcourue2    = calculerDistance.Parcourue(Etape[i + 12].distance, uniteX, 'rbk');
                            D_partielle2    = calculerDistance.Partielle(Etape[i + 12].distance, Etape[i + 12 - 1].distance, 'rbk');
                            D_restante2     = calculerDistance.Restante(D_totale, D_parcourue2);

                            (Etape[i + 12].direction === 'null') ? direction2 = '' : direction2 = elementTable.creerImageDirection(Etape[i + 12].direction);

                            //direction2 = elementTable.creerImageDirection(Etape[i+12].direction);
                            commentaire2 = Etape[i + 12].commentaire;

                        } else {
                            D_restante2     = '';
                            D_parcourue2    = '';
                            D_partielle2    = '';
                            direction2      = '';
                            commentaire2    = '';
                            
                           
                        }

                        num_etape2 = num_etape + 12;

                        $("#page-" + n).append(elementTable.nouvelleLigne(num_etape,
                                D_partielle, D_restante, D_parcourue, direction, commentaire,
                                num_etape2, D_partielle2, D_restante2, D_parcourue2, direction2, commentaire2));

                    }

                    t += 24;

                    num_etape   += 12;
                    num_etape2  += 12;
                    $("#page-" + n).append(elementTable.ligneVide(2, 'Page ' + n + ' - Généré avec ROADBOOK CREATOR by Alex', 'https://roadbook.alexp.fr'));
                    $("#page-" + n).append('</table>');

                }

                $('#nb_km a').empty();
                $('#nb_etapes a').empty();
                $('#nb_pages a').empty();
                
                $('#RBKlangage').text(langage);
                $('#RBKauteur').text(auteur);
                $('#RBKdate').text(date);
                $('#RBKversion').text(version);
                if (KurvUrl !== '') {
                    evenement.chargeCarteKurviger(KurvUrl);
                }
                
                
                $('#unite-mesure option[value="'+unite+'"]').prop('selected', true);
                
                var abbrUnite;
                if(unite === 'imperial'){
                    abbrUnite = 'mi';
                }else if(unite === 'metric'){
                    abbrUnite = 'km';
                }else{
                    abbrUnite = 'km';
                    evenement.console('Unité de mesure absente');
                    evenement.console('-> unité métrique par défaut');
                    $('#unite-mesure option[value="metric"]').prop('selected', true);
                    
                }
                
                $('#nb_km a').append(D_totale + ' ' + abbrUnite);
                $('#nb_etapes a').append(nb_etape + " " + expression.etapes);

                $('#nom_roadbook').val(fichierRBK.replace('.rbk', ''));

                var pages = ' ' + expression.page;
                if (nb_page_entiere > 1) {
                    pages = ' ' + expression.pages;
                }
                $('#nb_pages a').append(nb_page_entiere + pages);
                
            evenement.DragDropImage(false);
            evenement.supprimeImageDirection();
            evenement.imprimerRoadbook();
            });

            evenement.console("Terminé ...", 'okA');
            oNotif.success('Données importées, roadbook généré.');
        } catch (erreur) {

            console.log('Une erreur est survenue');
            $("#feuille-roadbook").append(elementTable.ligneErreur(erreur));
            oNotif.error('Un problème est survenue lors de l\'importation des données.');
        }

    };
    
    
        this.depuisCookie = function () {
        
        $("td.ir-right span").css('opacity', 1);
        $("td.ir-right input").css('opacity', 1);
        
        var uniteX = 1;

                var auteur  = '';
                var date    = '';
                var langage = '';
                var version = '';
                var unite   = '';

        try {
            
evenement.console("Récupération des données depuis les cookies", 'infoA');
                
                // Récupération et fusion des données stockées dans
                // les cookies.
                var roadbook = oRBK.fusionneData();

                // Vidage du tableau
                $("#feuille-roadbook").empty();

                // Création du tableau qui accueillera chaque étape dans un objet
                var Etape = new Array();

evenement.console("Calculs ...", 'infoA');
//        Parcours des données JSON
                $.each($.parseJSON(roadbook), function (i, nouvelleLigne) {
                    
                    if (typeof nouvelleLigne.RBKauteur === 'undefined') {
                     //            Pour chaque nouvelle entrée, on crée un nouveau object Etape + son index
                    Etape[i] = new Object();

                    Etape[i].distance       = nouvelleLigne.d;
                    Etape[i].direction      = nouvelleLigne.i;
                    Etape[i].commentaire    = nouvelleLigne.c;
                    }else{
                       
                        auteur  = nouvelleLigne.RBKauteur;
                        date    = nouvelleLigne.RBKdate;
                        langage = nouvelleLigne.RBKlangage;
                        version = nouvelleLigne.RBKversion;
                        unite   = nouvelleLigne.RBKunite;
                        
                       
                    }



                });
    

            

// Initialisation des variables
                var D_partielle     = '';
                var num_etape       = 0;
                var D_restante      = '';

                var D_parcourue     = '';
                var direction       = '';
                var commentaire     = '';

                var D_partielle2    = '';
                var num_etape2      = 0;
                var D_restante2     = '';

                var D_parcourue2    = '';
                var direction2      = '';
                var commentaire2    = '';

// Cette variable servira dans la boucle pour parcourir le tableau d'objet.
// Le modulo n'est pas vraiment indispensable, il a surtout servi pour générer
// le fichier
                var nb_page_entiere = (Etape.length - (Etape.length % 24)) / 24;

                var D_totale = 0;

// Triage du tableau d'objet, préparation pour le parcourir
// J'utlise 9999 pour ignorer les étapes vides. Ce 9999 est généré
// quand la case est vide quand on sauvegarde. Il vaut mieux prendre un
// nombre si on veut le remplacer.
                for (var d = 0; d < Etape.length; d++) {

                    if (Etape[d].distance !== '9999') {
                        if (D_totale - Etape[d].distance < 0) {
                            D_totale = Etape[d].distance;
                        }
                    }
                }

// Triage à proprement dit du tablleau
                Etape.sort(function (a, b) {
                    const distance1 = a.distance;
                    const distance2 = b.distance;

                    return distance1 - distance2;
                });

// La variable t permet de se décaler dans le tableau après chaque feuille générée
// Le fait de mettre les données sur deux colonnes a demandé un peu de gymnastique ^^
                var t = 0;
                var nb_etape = -1;

// La variable n est la représentation du nombre de page.
// On l'initialise à un pour pouvoir afficher le numéro sans 
// bidouillage. Ici, pour chaque page (nb_page_entiere, cf plus haut)
                for (var n = 1; n <= nb_page_entiere; n++) {
evenement.console("Calculs page " + n +" ...", 'infoA');
// Création de l'entête de la page
                    $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                    
evenement.console("Entête générée", 'okA');                    
                    $("#page-" + n).append(elementTable.entete());
                    
evenement.console("Ajout des données dans le roadbook...", 'infoA');
// Nous allons mettre 24 étapes par page, sur deux colonnes, soit 12 lignes
                    for (var i = t; i < 12 + t; i++) {
                        
// On ignore les valeurs distance à 9999 (cf plus haut)
                        if (Etape[i].distance !== '9999') {
                            nb_etape++;
// Les fonctions de calculs se situent dans le fichier "calculerDistances.js" 
// GENERATION DE LA PREMIERE COLONNE DE LA FEUILLE
                            D_parcourue = calculerDistance.Parcourue(Etape[i].distance, uniteX, 'rbk');

// Si i = t c'est qu'on est à la première ligne de la feuille.
// Il faudra donc se décaler dans le tableau pour certains calculs.
                            if (i === t) {
                                if (t === 0) {
                                    D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i].distance, 'rbk');

                                } else {
                                    D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i - 1].distance, 'rbk');
                                }


                            } else {

                                D_partielle = calculerDistance.Partielle(Etape[i].distance, Etape[i - 1].distance, 'rbk');
                            }

                            D_restante = calculerDistance.Restante(D_totale, D_parcourue);

                            (Etape[i].direction === 'null') ? direction = '' : direction = elementTable.creerImageDirection(Etape[i].direction);
                            ;

                            commentaire = Etape[i].commentaire;

                        }
// Si la la distance est 9999 (soit vide à la génération),
// on initialise les valeur à rien, soit vide. (sauf pour le n° d'étape)
                        else {

                            D_restante  = '';
                            D_parcourue = '';
                            D_partielle = '';
                            direction   = '';
                            commentaire = '';
                        }

                        num_etape = i;

// GENERATION DE LA SECONDE COLONNE DE LA FEUILLE                 
                        if (Etape[i + 12].distance !== '9999') {
                            nb_etape++;
                            D_parcourue2    = calculerDistance.Parcourue(Etape[i + 12].distance, uniteX, 'rbk');
                            D_partielle2    = calculerDistance.Partielle(Etape[i + 12].distance, Etape[i + 12 - 1].distance, 'rbk');
                            D_restante2     = calculerDistance.Restante(D_totale, D_parcourue2);

                            (Etape[i + 12].direction === 'null') ? direction2 = '' : direction2 = elementTable.creerImageDirection(Etape[i + 12].direction);

                            //direction2 = elementTable.creerImageDirection(Etape[i+12].direction);
                            commentaire2 = Etape[i + 12].commentaire;

                        } else {
                            D_restante2     = '';
                            D_parcourue2    = '';
                            D_partielle2    = '';
                            direction2      = '';
                            commentaire2    = '';
                            
                           
                        }

                        num_etape2 = num_etape + 12;

                        $("#page-" + n).append(elementTable.nouvelleLigne(num_etape,
                                D_partielle, D_restante, D_parcourue, direction, commentaire,
                                num_etape2, D_partielle2, D_restante2, D_parcourue2, direction2, commentaire2));

                    }

                    t += 24;

                    num_etape   += 12;
                    num_etape2  += 12;
                    $("#page-" + n).append(elementTable.ligneVide(2, 'Page ' + n + ' - Généré avec ROADBOOK CREATOR by Alex', 'https://roadbook.alexp.fr'));
                    $("#page-" + n).append('</table>');

                }

                $('#nb_km a').empty();
                $('#nb_etapes a').empty();
                $('#nb_pages a').empty();
                
                $('#RBKlangage').text(langage);
                $('#RBKauteur').text(auteur);
                $('#RBKdate').text(date);
                $('#RBKversion').text(version);
                
                
                $('#unite-mesure option[value="'+unite+'"]').prop('selected', true);
                
                var abbrUnite;
                if(unite === 'imperial'){
                    abbrUnite = 'mi';
                }else if(unite === 'metric'){
                    abbrUnite = 'km';
                }else{
                    abbrUnite = 'km';
                    evenement.console('Unité de mesure absente');
                    evenement.console('-> unité métrique par défaut');
                    $('#unite-mesure option[value="metric"]').prop('selected', true);
                    
                }
                
                $('#nb_km a').append(D_totale + ' ' + abbrUnite);
                $('#nb_etapes a').append(nb_etape + " " + expression.etapes);

                $('#nom_roadbook').val(actionCookies.litCookie('_RBK_nom').replace('.rbk', ''));

                var pages = ' ' + expression.page;
                
                if (nb_page_entiere > 1) {
                    pages = ' ' + expression.pages;
                }
                $('#nb_pages a').append(nb_page_entiere + pages);
                
            evenement.DragDropImage(false);
            evenement.supprimeImageDirection();
            evenement.imprimerRoadbook();
//            });
            
evenement.console("Terminé ...", 'okA');
            oNotif.success('Projet récupéré !');
        } catch (erreur) {
            console.log('Une erreur est survenue');
            $("#feuille-roadbook").append(elementTable.ligneErreur(erreur));
            oNotif.error('Un problème est survenue lors de l\'importation des données.');

        }
        

    };



};


