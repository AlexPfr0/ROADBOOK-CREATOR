
var Evenements = function () {
    
    // Fontion permettant le glissé déposé des images dans le roadbook
    // Toutes les images dans un container de class draggable sont mobiles
    // Tous les conteneurs de class droppable peuvent recevoir une image.

    this.DragDropImage = function (md = false) {
// Si le mode déplacement (md) est inactif
// On ne peut déplacer les pictos que du panel vers le roadbook
// Si md est true, on ne peut déplacer les pictos que dans le roadbook (d'une case à l'autre)
if(md === false){
            $(function () {
            
            
        // Les images dans le panel
            $(".draggable img").draggable({
                revert: "invalid",
                revertDuration: 200,
                helper : 'clone',
               
                snap: ".droppable",
                snapTolerance: 20,
                cursor: 'move',
                opacity: 0.5
              });
            
        // Cellules du tableau    
            $(".droppable").droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                tolerance: 'pointer',
                accept: '.img-pan',

                
                drop: function (event, ui) {
                  

                      $(this).append(ui.draggable.clone().removeClass().removeAttr('style').addClass('img-tab'));
                      
evenement.console("Pictogramme ajouté", 'okA');                  
                    
             evenement.supprimeImageDirection();
 }
                
            });

            
        });
    
}else{
            $(function () {
            
                // Mode déplacement dans le cas d'une seule colonne
                $(".direction-image-1Col img").draggable({
                revert: "invalid",
                revertDuration: 200,
                helper : 'clone',
               
                snap: ".droppable",
                snapTolerance: 20,
                cursor: 'move',
                opacity: 0.5
                });

                // Mode déplacement dans le cas de 2 colonnes
                $(".direction-image img").draggable({
                    revert: "invalid",
                    revertDuration: 200,
                    helper: 'clone',

                    snap: ".droppable",
                    snapTolerance: 20,
                    cursor: 'move',
                    opacity: 0.5
                });
            
        // Cellules du tableau    
            $(".droppable").droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                tolerance: 'pointer',
                accept: '.img-tab',

                
                drop: function (event, ui) {
                  
               $(this).append(ui.draggable);
  
 evenement.console("Pictogramme déplacé", 'okA');                    
             evenement.supprimeImageDirection();
 }
                
            });

            
        });
}

};


// Cette fonction permet de recharger les pictogrammes dans le 
// panel concerné après uploud d'image
this.rafraichirPanelImages = function(categorie){
  
$.ajax({
            url: "JSON-get_images.php?categorie=" + categorie,
            dataType: "json",
            success: function (data) {
                $('#onglet-' + categorie + ' .panel .draggable').empty();
                    
                $.each(data, function(i,filename) {

                    $('#onglet-' + categorie + ' .panel .draggable').prepend('<img class="img-pan" src="./Pictogrammes/'+ categorie +'/'+ filename +'">');
                });
                
                evenement.DragDropImage();

            }
        });
evenement.console("Le panel '" + categorie + "' a été rechargé", 'okA');   
    
};

    
    // Un simple double clic sur une image dans le roadbook suffit pour la supprimer

    this.supprimeImageDirection = function () {
        


        $('.direction-image img').dblclick(function () {

            var title = $(this).attr('title');
evenement.console("Pictogramme '" + title + "' supprimé", 'okA');    
            
        $(this).remove();
            
        });
        $('.direction-image-1Col img').dblclick(function () {

            var title = $(this).attr('title');
            evenement.console("Pictogramme '" + title + "' supprimé", 'okA');

            $(this).remove();

        });


    };


    // Simulation du clic de la zone de drag & drop pour l'import des fichiers RBK
    // Depuis le v.2021-03, on ne peut plus d&d les fichiers (inutile)
    this.clicImporter = function () {

        $('#uploadZone').trigger('click');
        

    };
    this.clicImporter_picto = function () {

        $('#uploadImagesZone').trigger('click');


    };
    
    // Prépare le PDF (mousedown)
    // Génère le PDF (mouseup)
    this.imprimerRoadbook = function () {

        $("#export-button").mousedown(function () {

            // Génération du nom
            if ($('#nom_roadbook').val() === "") {
                $('#nom_roadbook').val('Nouveau Roadbook');
            }
            
            // Initialisation 
            $('#html-brut').val('');
            $('#nom_roadbook_2').val('');
            $('#CSS-perso').val('');
            var data = $('#feuille-roadbook').html().replace(/<div>/g, '');
            var css  = 'td {border: ' + $('#borderColor').text() + ';}';
            css     += '.d_restante{color: ' + $('#dRestanteFontColor').text() + ';}';
            css     += '.d_parcourue{color: ' + $('#dParcouruesFontColor').text() + ';}';
            css     += '.d_inter{color: ' + $('#dInterFontColor').text() + ';}';
            css     -= '.commentaire{color: ' + $('#commentaireFontColor').text() + ';}';

            data = data.replace(/<\/div>/g, '<br>');

            $('#html-brut').val(data);
            
            $('#CSS-perso').val(css);
            
            $('#nom_roadbook_2').val($('#nom_roadbook').val());
});

        $("#export-button").mouseup(function () {
            document.forms['creerPDF'].submit();
            $('#html-brut').val('');
        });



    };
    
        this.imprimerAnnexe = function () {

        $("#export-annexe-button").mousedown(function () {



            $('#html-brut-annexe').val('');

            var data = $('#feuille-roadbook').html();

            $('#html-brut-annexe').val(data);
            
        });

    };


// Fonction pour coller directement les données dans la zone.
// Ne fonctionne pas pour des raisons de sécurité.

    this.collerDonnees = function () {

        $('#coller-donnees').click(function () {

            alert('INFORMATION\n\n\
                Ce bouton servira à coller les données directement. \n\
                Il semblerait que cette fonctionalité soit désactivée \n\
                sur beaucoup navigateurs (pour des raisons de sécrité).\n\n\
                Vous pouvez toujours coller les données en faisant clic droit > coller.');

        });


    };
    
    // Active & désactive le mode correction
    // La fonction se trouve dans le fichier ConstruireRoadbook.js

    this.activeCorrection = function () {
        
            $('#data-brute').bind('input', function () {
            $('#corriger-distances').attr('disabled', false);
        });

        $('#corriger-distances').click(function () {

            if ($(this).prop("checked") === true) {
                $('#mode-correction').val('actif');
evenement.console("Mode 'Correction' des distances activé", 'infoA'); 

            } else if ($(this).prop("checked") === false) {
evenement.console("Mode 'Correction' des distances désactivé", 'infoA');
                $('#mode-correction').val('inactif');

            }

        });
    };
    
    // Gestion de la correction de l'ordre des pictogrammes
    // dans le roadbook. L'activation de ce mode désactive
    // le gissé-déposé depuis les panels
    this.activeCorrectionPicto = function () {
        

        $('#corriger-picto').click(function () {

            if ($(this).prop("checked") === true) {
                $('#mode-correction-picto').val('actif');
                evenement.DragDropImage(true);
evenement.console("Mode 'Déplacement' des pictogrammes activé", 'infoA');

            } else if ($(this).prop("checked") === false) {
                evenement.DragDropImage(false);
                $('#mode-correction-picto').val('inactif');
evenement.console("Mode 'Déplacement' des pictogrammes désactivé", 'infoA');

            }

        });
    };
    
    
    // Vide la zone de réception des données brute
    // Désactive la checkbox de correction des distances
    this.viderDataBrute = function () {
        $('#vider-data-brute').click(function () {
            $('#data-brute').val('');
            $('#corriger-distances').attr('checked', false);
            $('#corriger-distances').attr('disabled', true);
            
        });
    };
    
    
    // Récupération de la catégorie sélectionnée pour l'envoi de pictogrammes
    // OBSOLETE : la catégorie est automatiquement déduite depuis la v2021-03
    this.selectCategorie = function () {
        $('#cat-select').change(function () {
            var value = $(this).children("option:selected").val();
            $('#categorie_hid').val(value);

        });
    };

    // Cette fonction permet de rechercher les fichiers (pictogrammes) déjà existantes.
    // De toute façon les photos uploadées ne peuvent écraser celles déjà existantes.
    // OBSOLETE : la catégorie est automatiquement déduite depuis la v2021-03
    this.chercheFichier = function () {


        $('#rechercher_fichier').keyup(function () {

            var listeFichiers = $('#liste_fichiers');
            var recherche = $('#rechercher_fichier').val();
            ;

            var regex = new RegExp(recherche, "ig");

            var resultat = regex.test(listeFichiers.text());
            if (resultat === true) {
                $('#fichier_check').removeClass('glyphicon-ok');
                $('#fichier_check').addClass('glyphicon-minus-sign');

            } else {
                $('#fichier_check').removeClass('glyphicon-minus-sign');
                $('#fichier_check').addClass('glyphicon-ok');
            }

            listeFichiers.html(listeFichiers.text().replace(regex, '<b style="color:#d35400">' + recherche + '</b>'));

        });

    };
    
    this.afficheOutils = function(){
        

        $("#affiche-outil").click(function () {
            $("#outil").toggle("fast", function () {

            });
        });
    };
    
    
    
    // Permet de sauvegarder les paramètres.
    // Prend en paramètres le nombre de jours.

    this.appliqueParametres = function (nbJours = 15) {

        $('#appliqueParametres').click(function () {

            actionCookies.creeCookie('_RBC_nbDecimales', $('#nb-decimales').val(), nbJours);
            actionCookies.creeCookie('_RBC_borderColor', $('#borderColor').val(), nbJours);
            actionCookies.creeCookie('_RBC_dParcourueColor', $('#dParcouruesFontColor').val(), nbJours);
            actionCookies.creeCookie('_RBC_dRestanteColor', $('#dRestanteFontColor').val(), nbJours);
            actionCookies.creeCookie('_RBC_dInterColor', $('#dInterFontColor').val(), nbJours);
            actionCookies.creeCookie('_RBC_commentairesColor', $('#commentaireFontColor').val(), nbJours);
            actionCookies.creeCookie('_RBC_piedPage', $('#piedPage').text(), nbJours);
            actionCookies.creeCookie('_RBC_Langage', $('#langage').val(), nbJours);
            actionCookies.creeCookie('_RBC_User', $('#nom_utilisateur').text(), nbJours);
            $('#RBCuser').text($('#nom_utilisateur').text());
            actionCookies.creeCookie('_RBC_CookiesValidite', $('#validite_cookies').text(), $('#validite_cookies').text());
            
            actionCookies.creeCookie('_RBC_UniteMesure', $('#unite-mesure').val(), nbJours);

            actionCookies.creeCookie('_RBC_ColonneUnique', $('#colonne-unique').val(), nbJours);
            
            actionCookies.creeCookie('_RBC_ValCase_1', $('#valeur_case_1').val(), nbJours);
//            actionCookies.creeCookie('_RBC_ValCase_2', $('#valeur_case_2').val(), nbJours);
//            actionCookies.creeCookie('_RBC_ValCase_3', $('#valeur_case_3').val(), nbJours);
            

        });
        
    };
    
    this.supprimerCookies = function(){
        $('#supprimerCookies').dblclick(function () {
            actionCookies.supprimeTout();
        });
    };
    
    this.ajouteEnteteForm = function (){
        $('#ajouter-entete').click(function(){
            
            if($('#id_enigme').val() === '0'){
                $("#feuille-roadbook").append(elementTable.enteteAnnexe());
            }
            
        });
    };
    this.ajouteEnigme = function (){
        $('#ajouter-enigme').click(function(){
            $("#feuille-annexe").append(elementTable.ligneEnigme('Rédiger votre énigme ici'));
        });
    };
    
    this.supprimeEnigme = function () {

        $('#supprimer-enigme').click(function () {
            
            if($('#id_enigme').val() > 1){
                $('#id_enigme').val($('#id_enigme').val() - 1);
                
            }
            var enigmeID = $('#id_enigme').val();
                $(".enigme-" + enigmeID).remove();
            
            
            
        });
    };
    
         this.console = function(text, type){
         
         var date = new Date(Date.now());
       
         const heure = date.getHours() ;
         const min = date.getMinutes() ;
         const sec = date.getSeconds() ;
         const mill = date.getMilliseconds() ;
         
         var horo = heure +':'+min+':'+sec+'.'+mill;
         var consoleLigne = '<div ';
         consoleLigne += ' class="' + type + '">';
         consoleLigne += '<span style="color:#fff">'+ horo + ' : </span>';
         consoleLigne += text;
         consoleLigne += '</div>';
         
         $('#console').append(consoleLigne);
         
         
    };

    this.chargeCarteKurviger = function (KurvUrl) {
        
        if (KurvUrl !== ''){
                    $('#mapframe').show();
        $('#iframeMap').attr('src', KurvUrl);

        jQuery(document).ready(function () {
            $("#mapframe").scrollTop(0).scrollLeft(1000);
        });
        }

    };
    
};
