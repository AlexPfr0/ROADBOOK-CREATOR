//Cette classe permet de construire le roadbook. Elle contient deux fonctions pour
//cas différents : 
//        - Quand on veux faire un roadbook à partir des données brutes venant du site Kurviger
//        - Quand on veux faire un roadbook à partir d'un fichier RBK, fichier de sauvegarde
//            généré par l'application elle-même.


var construireRoadbook = function () {
    
    this.getCookie = function(name) {
	    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	    return v ? v[2] : null;
	};
    
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
    
    // Cette fonction permet de formater les data brutes pour ne pas être embêté avec le langage.
    this.formateData = function(dataBrute){
        
        // Suivant la langue utlisée dans Kurviger, le pattern pris en compte pour récupérer les 
        // données diffère. 
        // Ainsi je transforme le pattern de chaque pays en un pattern universel.
        var data;
        var motEscale   = ['Escale', 'Wegpunkt', 'Waypoint', 'Pasando', 'Marker', 'Σημείο'];
        var motArrivee  = ['Arrivée', 'Ziel', 'Arrive', 'recorrido', 'Bestemming', 'Άφιξη'];
        
        var modelEscale     = '5x#';
        var modelArrivee    = '02#15%';
        
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

    // - La fonction "depuisDonneesBrutes récupère les donnees depuis l'interface
    // - Les splite puis range dans un tableau d'objects les données calculées
     
    this.depuisDonneesBrutes = function () {
        
        

        // Récupération des données

        var data_brute = this.formateData($("#data-brute").val());

        try {

        // Splite des donnees. Récupération de chaque ligne dans le tableau "lignes".
        
            var lignes = data_brute.split("\n");
//            var KurvigerLangage = '';
            var e = 1;
        
        // Initialisation du tableau d'objets. Ici on aura à tableau d'étapes.
        // Chaque étape sera composé des distances calculées, de son image de direction
        // et de son commentaire

            var Etape   = new Array();
            Etape[0]    = new Object();
            Etape[0].numero     = 0;
            Etape[0].escale     = '';//this.motCleInit(this.getCookie("_RBC_Langage")).depart;;
            var dParcourue      = 0;
            Etape[0].dParcourue = dParcourue;
            Etape[0].dPartielle = 0;
            
            var dTotale = (lignes[lignes.length - 1]).replace("\t\t", "\t").split("\t")[2] / 1000;
            
            Etape[0].dRestante      = dTotale;
            Etape[0].commentaire    = '';
            Etape[0].direction      = '';
            
            // Parcours du tableau "lignes" issu du split 
            
            for (var i = 0; i < lignes.length; i++) {
                
                // Split de chaque ligne. Le shema est la tabulation (soit 4 espaces)
                // La variable "ligne" permet de réduire les doubles tabulations en simple tabulation.
                // La variable "mots" est un tableau contenant chaque mots de chaque ligne

                var ligne = lignes[i].replace("\t\t", "\t");
                var mots = ligne.split("\t");
                
                
                
                // Pour le roadbook, on ne gardera que les étapes marquée "Escale" ou "Arrivée"
                // Ce sont les étapes que l'utilsateur à placées sur la carte de Kurviger.
                
//                var escale = this.motCleInit(this.getCookie("_RBC_Langage")).escale;
//                var arrivee = this.motCleInit(this.getCookie("_RBC_Langage")).arrivee;
                
                if (mots[1].indexOf('5x#') > -1 || mots[1].indexOf('02#15%') > -1) {
                    
                    // Remplisssage du tableau d'étapes. Chaque étape représente un nouvel objet.
                    Etape[e] = new Object();
                    Etape[e].numero         = e;
                    Etape[e].escale         = mots[1];
                    Etape[e].dParcourue     = calculerDistance.Parcourue(mots[2], 'data-brute');
                    Etape[e].dPartielle     = calculerDistance.Partielle(Etape[e].dParcourue, Etape[e - 1].dParcourue, 'data-brute');
                    Etape[e].dRestante      = calculerDistance.Restante(dTotale, Etape[e].dParcourue);
                    Etape[e].commentaire    = '';
                    Etape[e].direction      = '';
                    e++;

                }
            }
            
            // La variable nb_page_entiere permet de créer la boucle pour générer le roadbook par page.
            // Dans la cas présent, il y aura 24 étapes par feuille.
            // /!\ Modifier cette formule entrainera une modification obligatoire de la suite du code.

            var nb_page_entiere = (Etape.length - (Etape.length % 24)) / 24;
            
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
            
            

            $('#nb_km a').append(dTotale + ' km');
            $('#nb_etapes a').append(Etape.length - 1 + " " + expression.etapes);
            var pages = ' ' + expression.page;
                if (nb_page_entiere + 1 <= 1) {
                    pages = ' ' + expression.pages;
                }
            $('#nb_pages a').append(nb_page_entiere + 1 + pages);

            // C'est parti pour les boucles
            
            // La variable "t" sert à sauter d'index à chaque nouvelle page
            // Elle est incrémentée de 24 à chaque fin de page
            var t = 0;
            
            // Boucle pour chaque page
            
            for (var n = 1; n <= nb_page_entiere + 1; n++) {
                
                // Si modeCorrection est inactif, inutile de créer l'entête du tableau

                if (modeCorrection === 'inactif') {
                    $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                    $("#page-" + n).append(elementTable.entete());
                }

            // Boucle pour remplir chaque étape de la page courante
            
                for (var i = t; i < 12 + t; i++) {
                    
                    // Initilaisation des variables

                    var eNumero = i;
                    var edPartielle         =
                            edRestante      =
                            edParcourue     =
                            eCommentaire    =
                            eDirection      = '';

                    var eNumero2 = i + 12;
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
                    if (typeof Etape[i + 12] !== 'undefined') {
                        var eNumero2        = Etape[i + 12].numero;
                        var edPartielle2    = Etape[i + 12].dPartielle;
                        var edRestante2     = Etape[i + 12].dRestante;
                        var edParcourue2    = Etape[i + 12].dParcourue;
                        var eCommentaire2   = Etape[i + 12].commentaire;
                        var eDirection2     = Etape[i + 12].direction;

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
                            for (var i = (n - 1) * 24; i < ((n - 1) * 24) + 12; i++) {


                                //console.log(i);
                                var eNumero     = i;
                                var edPartielle         =
                                        edRestante      =
                                        edParcourue     =
                                        eCommentaire    =
                                        eDirection      = '';

                                var eNumero2    = i + 12;
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

                                if (typeof Etape[i + 12] !== 'undefined') {
                                    var eNumero2        = Etape[i + 12].numero;
                                    var edPartielle2    = Etape[i + 12].dPartielle;
                                    var edRestante2     = Etape[i + 12].dRestante;
                                    var edParcourue2    = Etape[i + 12].dParcourue;
                                    var eCommentaire2   = Etape[i + 12].commentaire;
                                    var eDirection2     = Etape[i + 12].direction;
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
                t += 24;

                // Fin du tableau en cas de odeCorrection = inactif
                if (modeCorrection === 'inactif') {
                    $("#page-" + n).append(elementTable.ligneVide(2, 'Page ' + n + ' - Généré avec ROADBOOK CREATOR by Alex', 'https://roadbook.alexp.fr'));
                    $("#page-" + n).append('</table>');
                }

                
            }
//        drag_drop_image();
//        edit_commentaire();

//evenement.imprimerRoadbook();
//evenement.DragDropImage();
//evenement.supprimeImageDirection();

        } catch (erreur) {

            $("#feuille-roadbook").append(elementTable.ligneErreur(erreur));

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
        
                var auteur  = '';
                var date    = '';
                var langage = '';
                var version = '';

        try {
            // Récupération du contenu du fichier envoyé       
            $.get("./upload/" + fichierRBK, function (data) {

                var roadbook = data;

                // Vidage du tableau
                $("#feuille-roadbook").empty();

                // Création du tableau qui accueillera chaque étape dans un objet
                var Etape = new Array();


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

// Création de l'entête de la page
                    $("#feuille-roadbook").append('<table class="page" id="page-' + n + '">');
                    $("#page-" + n).append(elementTable.entete());

// Nous allons mettre 24 étapes par page, sur deux colonnes, soit 12 lignes
                    for (var i = t; i < 12 + t; i++) {
                        nb_etape++;
// On ignore les valeurs distance à 9999 (cf plus haut)
                        if (Etape[i].distance !== '9999') {

// Les fonctions de calculs se situent dans le fichier "calculerDistances.js" 
// GENERATION DE LA PREMIERE COLONNE DE LA FEUILLE
                            D_parcourue = calculerDistance.Parcourue(Etape[i].distance, 'rbk');

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
                            D_parcourue2    = calculerDistance.Parcourue(Etape[i + 12].distance, 'rbk');
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
                
                $('#nb_km a').append(D_totale + ' km');
                $('#nb_etapes a').append(nb_etape + " " + expression.etapes);

                $('#nom_roadbook').val(fichierRBK.replace('.rbk', ''));

                var pages = ' ' + expression.page;
                if (nb_page_entiere + 1 <= 1) {
                    pages = ' ' + expression.pages;
                }
                $('#nb_pages a').append(nb_page_entiere + pages);
                
            evenement.DragDropImage(false);
            evenement.supprimeImageDirection();
            evenement.imprimerRoadbook();
            });
            


        } catch (erreur) {  
            console.log('Une erreur est survenue');
            $("#feuille-roadbook").append(elementTable.ligneErreur(erreur));

        }

    };



};


