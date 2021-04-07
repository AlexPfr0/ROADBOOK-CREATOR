// Cette classe gère tous les évènements
// Elle est instanciée dans le <head> de l'index sous le nom de 'ev'


var Evenement = function () {

// draw permet de déclencher de traçage l'apercu des route interdites (rouge)
// ligneID stocke L2 L3 ou L4 pour déterminer quel type de picto on crée.
//          On s'en servira pour générer le nom du picto.
    var draw = false;
    var ligneID = '';

    // Toutes les actions de l'utilisateurs sont récupérées avec
    // le calque le plus au-dessus (canvas maitre) ( #canvas1_sup)

    this.topCanvasAction = function () {


        var topCanvas = $('#canvas1_sup');
        var coordSouris = '';
        var x, y;

        // évènements quand la souris bouge sur le canvas maitre
        topCanvas.mousemove(function (e) {

            // Coordonnées de la souris
            // getMouse est dévellopée dans la classe dessin (dessin.js)
            x = canvas1_sup.getMouse(e, topCanvas).x;
            y = canvas1_sup.getMouse(e, topCanvas).y;

            // Affichage des coordonnées en temps réel (panneau de droite)
            $('#xSouris').html('x : ' + x);
            $('#ySouris').html('y : ' + y);

            // Affichage de la ligne d'aperçu pour les routes interdites
            if ($('#L5').hasClass('selectionne')) {
                if(draw===true){
                    canvas3.efface();
                    canvas3.trait(coordSouris.x, coordSouris.y, x, y, 30, '#f29191');
                }
            }

            // Affichage du cadre d'aperçu pour les éléments supplémentaires (images)
            if ($('#L6').hasClass('selectionne')) {

                $('#xElemSupp').val(x);
                $('#yElemSupp').val(y);

                var taille = $('#taille').val();

                var xApercu = x - taille / 2;
                var yApercu = y - taille / 2;

                // Aperçu du cadre
                canvas3.efface();
                canvas3.rectangleBordsTirets(xApercu, yApercu, taille, taille);

                // Aperçu de l'image (lien relatif)
                var imgsrc = $('#imgsrc').val();
                elsupp.ajouteImage(imgsrc, canvas3, xApercu, yApercu, taille, taille);

            }
        });

        // évènements quand le bouton gauche de la souris est enfoncé sur le canvas maitre
        topCanvas.mousedown(function (e) {

            // récup des coordonnées de la souris
            var x = canvas1_sup.getMouse(e, topCanvas).x;
            var y = canvas1_sup.getMouse(e, topCanvas).y;

            // stockage des coordonnées de départ
            coordSouris = {x: x, y: y};

            // Début de traçage de l'aperçu de la ligne rouge (route interdite)
            if ($('#L5').hasClass('selectionne')) {
                draw = true;
            }
        });

        // évènement quand le bouton gauche de la souris est relaché
        topCanvas.mouseup(function (e) {

            // récup des coordonnées de la souris
            var x = canvas1_sup.getMouse(e, topCanvas).x;
            var y = canvas1_sup.getMouse(e, topCanvas).y;

            // Ligne rouge
            if ($('#L5').hasClass('selectionne')) {

                // traçage de la route interdite (rouge)
                canvas2.trait(coordSouris.x, coordSouris.y, x, y, 30, 'red');

                // réinitialise le canvas3 (le canvas 3 gère tout ce qui concerne les aperçus)
                canvas3.efface();
                draw = false;

                // Affichage de la miniature (pour gérer les suppressions)
                elsupp.copieCalque('canvas2');

            }

            // Dessin de l'élément supplémentaire (image)
            if ($('#L6').hasClass('selectionne')) {

                var taille = $('#taille').val();

                var xApercu = x - taille / 2;
                var yApercu = y - taille / 2;

                canvas3.efface();

                // lien relatif de l'élément supplementaire (stocké dans un textbox caché)
                var img = $('#imgsrc').val();

                // pour donner un ordre, il y a deux canvas pour gérer les éléments supplémentaires
                // canvas1_sup est au dessus de canvas1
                // canvas1_inf est en dessous de canvas1
                var canvasIdchoix = $('input[name=canvas]:checked').val();
                var canvasId;

                // Suivant le choix fait ci-dessus, on choisit le canvas instancié
                // /!\ canvas1_inf et canvas1_sup sont des objets (de la classe dessin)
                if (canvasIdchoix === 'canvas1_inf') {
                    canvasId = canvas1_inf;
                }
                if (canvasIdchoix === 'canvas1_sup') {
                    canvasId = canvas1_sup;
                }

                // Ajoute l'élement supplementaire sur le canvas (le picto)
                // Ajoute l'élément supplementaire sur le calque
                elsupp.ajouteImage(img, canvasId, xApercu, yApercu, taille, taille);
                elsupp.copieCalque(canvasIdchoix);

                }
        });


        // Réinitialise le canvas3 (d'aperçu)
        topCanvas.mouseleave(function () {
            canvas3.efface();
        });
    };

    // Gére le dépacement des sliders pour la forme de la flèche
    // des directions prioritaires (forme arrondie)
    this.sliderDirPrio = function (sliderID, labelId) {

        $(function () {
            $("#" + sliderID).slider({
                value: 150,
                min: 100,
                max: 180,
                step: 10,

                slide: function (event, ui) {
                    $("#" + labelId).val(ui.value + ' px');

                    var x, y, cote;

                    //  Pour le slider 1 qui gère la largeur de la courbe
                    if (sliderID === "dirLargeurSlider") {
                        x = ui.value;
                        y = parseInt($('#dirHauteur').val().split(' ')[0]);
                        cote = ev.regleCote();

                    } else

                    //  Pour le slider 2 qui gère la hauteur de la courbe
                    if (sliderID === "dirHauteurSlider") {
                        y = ui.value;
                        x = parseInt($('#dirLargeur').val().split(' ')[0]);
                        cote = ev.regleCote();

                    }

                    // Si L4 (direction prioritaire) est sélectionnée
                    // on dessine la flèche
                    if ($('#L4').hasClass('selectionne')) {
                        oDirection.Prioritaire(cote, x, y);
                        elsupp.copieCalque('canvas1');
                    }

                }
            });

            // Affichage des dimensions de la flèche
            // Elles servent aux calculs ci-dessus
            $("#" + labelId).val($("#" + sliderID).slider("value") + ' px');
        });

    };

    // Dessine la flèche en temps réel par rapport aux choix droite / gauche (liste déroulante)
    this.regleCote = function () {

        var cote = $('#cote-dirprio').val();

        // Quand le choix dans la liste est changé
        $('#cote-dirprio').change(function () {

            cote = $('#cote-dirprio').val();

            var x = parseInt($('#dirLargeur').val().split(' ')[0]);
            var y = parseInt($('#dirHauteur').val().split(' ')[0]);

            if ($('#L4').hasClass('selectionne')) {
                calque2.efface();
                oDirection.Prioritaire(cote, x, y);
                elsupp.copieCalque('canvas1');

            }
        });
        return cote;
    };



    // Direction de sortie d'un rond-point
    // Elle se fait suivant des valeurs déterminées
    // à 45° d'intervalle
    this.regleAngleRP = function () {

        $('#angle-rp').change(function () {

            var angle = $(this).val();
            var numSortie = $('#sortie-rp').val();

            // Si le choix est fait, on peut dessiner le rond-point
            // et le copier sur le calque de la vignette
            if ($('#L2').hasClass('selectionne')) {
                calque2.efface();
                rp.creeRondPoint(angle, numSortie);
                elsupp.copieCalque('canvas1');
            }
            
        });
    };

    // Dessine le numéro de la sortie du rond-point
    // Elle se fait suivant des valeurs déterminées (de 1 à 5)
    this.regleNumSortie = function () {
        $('#sortie-rp').change(function () {

            var numSortie = $(this).val();
            var angle = $('#angle-rp').val();

            // Si le choix est fait, on dessine le rond-point
            if ($('#L2').hasClass('selectionne')) {
                calque2.efface();
                rp.creeRondPoint(angle, numSortie);
                elsupp.copieCalque('canvas1');
            }

        });
    };

    // Direction de sortie d'un rond-point
    // Elle se fait suivant des valeurs déterminées
    // à 45° d'intervalle
    this.regleAngleDirNonPrio = function () {
        $('#angle-dnp').change(function () {

            var angle = $(this).val();

            // Si le choix est fait, on dessine la direction
            if ($('#L3').hasClass('selectionne')) {
                oDirection.NonPrioritaire(angle);
                calque2.efface();
                elsupp.copieCalque('canvas1');
            }

        });
    };

    // Dessine les directions interdites à des valeurs déterminée
    // La manière manuelle sera le plus souvent utilisée
    this.regleAngleDirRouge = function () {
        $('#angle-dir-rouge').change(function () {

            var angle = $(this).val();
            
            if ($('#L5').hasClass('selectionne')) {
                oDirectionRouge.creeDirection(angle);
                elsupp.copieCalque('canvas2');
            }
        });
    };


// Obsolète
    this.ajouteElement = function () {

        var L;
        var H;
        var x;
        var y;
        var elemSource;
//

        $('.elem_supp').dblclick(function () {
            canvas3.efface();
            L = $('#taille').val();
            H = L;
            var canvasIdchoix = $('input[name=canvas]:checked').val();
            var canvasId;

            if (canvasIdchoix === 'canvas1_inf') {
                canvasId = canvas1_inf;
            }
            if (canvasIdchoix === 'canvas1_sup') {
                canvasId = canvas1_sup;
            }


            x = ($('#xElemSupp').val()) - L / 2;
            y = ($('#yElemSupp').val()) - H / 2;


            if ($('#L6').hasClass('selectionne')) {
                L = $('#taille').val();
                H = L;
                elemSource = $(this).attr('src');
                elsupp.ajouteImage(elemSource, canvasId, x, y, L, H);
                elsupp.copieCalque(canvasIdchoix);

            }



        });

        $('.elem_supp').mouseover(function () {
            elemSource = $(this).attr('src');
            L = $('#taille').val();
            H = L;
            x = ($('#xElemSupp').val()) - L / 2;
            y = ($('#yElemSupp').val()) - H / 2;
//            canvas3.efface();
//            elsupp.ajouteImage(elemSource, canvas3, x, y, L, H);
        });

        $('.elem_supp').mouseup(function () {
            elemSource = $(this).attr('src');
            $('#imgsrc').val(elemSource);
//            L = $('#taille').val();
//            H = L;
//            x = ($('#xElemSupp').val()) - L / 2;
//            y = ($('#yElemSupp').val()) - H / 2;

        });




    };

    // Crée le nom du picto suivant un shéma précis
    // Ca permet le classement auto des pictos ils sont
    // envoyé dans Roadbook Creator
    // La fonction en argument l'id de la ligne selectionnée (ligneID stockée
    // au début de cette classe
    function genereNomPicto(ligneID) {
        var type, sens, numSortie;
        var time = Date.now();
        var nomPicto;

        switch (ligneID) {

            // Nom d'un rond-point
            case 'L2':
                type = 'RP';
                sens = $('#angle-rp').val();
                numSortie = $('#sortie-rp').val();
                nomPicto = sens + '-' + type + '-' + numSortie + '-' + time;

                break;

                // Nom d'une direction non prioritaire
            case 'L3':

                type = 'DNP';
                var angle = $('#angle-dnp').val();

                if (angle > 180 && angle < 360) {
                    sens = 'G';
                } else
                if (angle > 0 && angle < 179) {
                    sens = 'D';
                } else if (angle == 0) {
                    sens = 'TD';
                }

                nomPicto = sens + '-' + type + '-' + angle + '-' + time;

                break;

                // Nom d'une direction prioritaire
            case 'L4':

                type = 'DP';
                var cote = $('#cote-dirprio').val();
                if (cote === 'Droite') {
                    sens = 'D';
                } else
                if (cote === 'Gauche') {
                    sens = 'G';
                } else {
                    sens = 'TD';
                }

                nomPicto = sens + '-' + type + '-' + time;

                break;

            default:

                nomPicto = 'Nouveau picto';

                break;
        }

        return nomPicto;

    }

    // Evnt pour télécharger le pictogramme
    this.telechargePicto = function () {
        
        $('#telecharge').click(function (){
            
            preparePicto();

        });
    };


    function preparePicto() {

        // Le canvas final reçoit le dessin de chaque canvas
        // listé dans le tableau canvasListe.
        // /!\ L'ordre des noms des canvas est important
        var canvasFinalId = document.getElementById('canvasFinal');
        var canvasFinal = canvasFinalId.getContext('2d');
        var can = new dessin('canvasFinal');
        can.efface();
        var canvasListe = ['canvas2', 'canvas1_inf', 'canvas1', 'canvas1_sup'];

        // boucle qui récupère le dessin de chaque canvas et le transfère
        // sur le canvas final
        canvasListe.forEach(canvasItem => {
        var canvas = document.getElementById(canvasItem);
                canvasFinal.drawImage(canvas, 0, 0);
        });

        // Nom du picto généré plus haut
        var nom_picto = prompt("Nom du picto: ", genereNomPicto(ligneID));

        // création du lien et téléchargement du pictogramme
        if (nom_picto !== null) {

            var link = document.createElement('a');
        link.download = nom_picto + '.png';
        link.href = canvasFinalId.toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();

        }
    }

//
    this.choixPicto = function () {

        var caseSelection = $('td.choix-picto-type');

        caseSelection.click(function () {
            canvas3.efface();

            var idChoix = $(this).attr('id');

            // ligneID est déclarée en début de classe pour être accessible
            if(idChoix==='L2' || idChoix==='L3' ||idChoix==='L4' ){
                ligneID = idChoix;
            }


            // Switch d'affichage
            var glyphOff = 'glyphicon glyphicon-off';
            var glyphOn = 'glyphicon glyphicon-pencil';

// si la case n'est pas sélectionnée
            if ($(this).hasClass('non-selectionne')) {

                $('.choix-picto-type').removeClass('selectionne').addClass('non-selectionne');
                $('.choix-picto-type').children().removeClass(glyphOn).addClass(glyphOff).css('color', '#000');

                $('.reglage').removeClass('L-selectionne').addClass('L-non-selectionne');
                $('.' + idChoix + '.reglage').removeClass('L-non-selectionne').addClass('L-selectionne');

                $(this).addClass('selectionne');
                $(this).removeClass('non-selectionne');

                $(this).children().removeClass(glyphOff).addClass(glyphOn).css('color', '#fff');

            } else
            // Si la case est sélectionnée
            if ($(this).hasClass('selectionne')) {

                $('.reglage').removeClass('L-selectionne');

                $(this).addClass('non-selectionne');
                $(this).removeClass('selectionne');

                $(this).children().removeClass(glyphOn).addClass(glyphOff).css('color', '#000');
            }
        });
    };

    // Gère la sélection des calques (miniature)
    // Ajout d'un attribut etat (pour tester)
    this.selectionneCalque = function () {

        var calqueSelection = $('#calques .calque');


        calqueSelection.mouseup(function () {
            var etat = $(this).attr('etat');
            
            
            if (etat === 'nonSel') {
                $(this).addClass('calqSel');
                $(this).removeClass('calqNonSel');
                $(this).attr('etat', 'Sel');
                
            } else
            if (etat === 'Sel') {
                $(this).addClass('calqNonSel');
                $(this).removeClass('calqSel');
                $(this).attr('etat', 'nonSel');

            }
        });

    };


    // Gère la suppression des dessins faits sur les canvas
    // Les calques sont les miniatures, les canvas sont l'aperçu du picto
    this.effaceCalque = function () {

        // Relaché de bouton de la souris
        $('#effaceCalque').mouseup(function () {

            // déselection de tous les calques
            $( "canvas.calque" ).each(function( index ) {
                if ($(this).attr('etat') === 'Sel') {
                    window[this.id] = new dessin(this.id);
                    window[this.id].efface();
                    var canvas = this.id.replace('calque', 'canvas');

                    window[canvas].efface();

                    $(this).attr('etat', 'nonSel');
                    $(this).addClass('calqNonSel');
                    $(this).removeClass('calqSel');

                }
                ;
            });
        });
        

    };

    // Gère l'affichage des élements supplémentaires
    // S'affiche sous forme de liste déroulante
    // Cette fonction est directement appelé dans le onClick de la balise <img>
    this.afficheElmtSupp = function (elmt) {

        // Cache les listes déroulées
        $('.dropdown-content').removeClass('show');
        // Affiche la liste sélectionnée
        $('#' + elmt).addClass('show');


        // Ferme les listes quand on clique n'importe où ailleurs.
        window.onclick = function (event) {

            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };
    };

    this.creePannonceau = function () {
        

    };
};


