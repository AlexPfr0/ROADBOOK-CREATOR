
var Evenements = function () {
    
    // Fontion permettant le glissé déposé des images dans le roadbook
    // Toutes les images dans un container de class draggable sont mobiles
    // Tous les conteneurs de class droppable peuvent recevoir une image.

    this.DragDropImage = function (md = false) {
                 
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
            
        // Les images dans le panel
            $(".direction-image img").draggable({
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


    };
    
    // Fonction pour ajouter un textarea pour éditer les commentaires
    // Obsolète => remplacé par l'attribut HTML "contentEditable"
    // Erreur volontaire (editCommentair[e])
    this.editCommentair = function () {

        $(".commentaire").mousedown(function () {

            if ($('#edit-' + this.id).length === 0) {
                $(this).append('<textarea class="txt" id="edit-' + this.id + '"></textarea>');
                $(this).append('<p id="act-' + this.id + '"><span id="val-' + this.id + '" class="rb_button glyphicon glyphicon-check"></span>');



                $('#edit-' + this.id).val($('#' + this.id).text().replace("<br>", /\n/g));
            }


            $(".rb_button").mouseup(function () {


                var btn_Id = this.id.split("-");
                var comId = btn_Id[1] + '-' + btn_Id[2]; // com-0

                // $('#edit-' + comId).val(('rrrr'));

                if (btn_Id[0] === 'val') {

                    var commentaire = $('#edit-' + comId).val();

                    var commentaire_ = commentaire.replace(/\n/g, "<br>");
                    $('#' + comId).html(commentaire_);

                    $('#edit-' + comId).remove();
                    // alert('rere');

                }

            });

        });


    };

    // Simulation du clic de la zone de drag & drop pour l'import des fichiers RBK
    this.clicImporter = function () {

        $('#uploadZone').trigger('click');

    };
    
    
    this.imprimerRoadbook = function () {

        $("#export-button").mousedown(function () {

            
            if ($('#nom_roadbook').val() === "") {
                $('#nom_roadbook').val('Nouveau Roadbook');
            }

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
    this.selectCategorie = function () {
        $('#cat-select').change(function () {
            var value = $(this).children("option:selected").val();
            $('#categorie_hid').val(value);

        });
    };

    // Cette fonction permet de rechercher les fichiers (pictogrammes) déjà existantes.
    // De toute façon les photos uploadées ne peuvent écraser celles déjà existantes.
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
            
console.log($('#validite_cookies').text()) ;
        });
    };
    
    this.ajouteEnteteForm = function (){
        $('#ajouter-entete').click(function(){
            $("#feuille-roadbook").append(elementTable.enteteFormulaire());
        });
    };
    this.ajouteEnigme = function (){
        $('#ajouter-enigme').click(function(){
            $("#feuille-roadbook").append(elementTable.ligneEnigme($('#form-enigme').val()));
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
    
};
