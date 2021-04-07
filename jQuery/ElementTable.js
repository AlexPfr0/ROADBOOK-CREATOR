// Classe permettant de générer le HTML

var ElementTable = function () {
    
    // Fonction pour afficher les erreurs récupérées dans le try catch
    
    this.ligneErreur  = function(message){
        
        var ligne_erreur = '<table id="message-erreur">';

        ligne_erreur += '<tr class="erreur">';
        
        ligne_erreur += '<td class="message" colspan="9">' + message + '</td>';
        ligne_erreur += '</tr>';
        ligne_erreur += '</table>';
        
        
        return ligne_erreur;
        
        
    };

    // Génération de chaque entête du roadbook
    // Le css est modifiable dans ./css/style.css
    
    this.entete = function(){
        
        
        var ligne_entete = '<tr class="entete">';
        
        ligne_entete += '<td class="kilometrage" colspan="3">' + expression.kilometrages + '</td><td class="direction">' + expression.directions + '</td><td class="commentaires">' + expression.commentaires + '</td>';
        ligne_entete += '<td class="milieu" ></td><td class="milieu"></td>';
        ligne_entete += '<td class="kilometrage" colspan="3">' + expression.kilometrages + '</td><td class="direction">' + expression.directions + '</td><td class="commentaires">' + expression.commentaires + '</td>';
        ligne_entete += '</tr>';
        
        
//        $('#console').append('<b style="color:#9b59b6;">Génération de l\'entête.....fait</b></br>');

        
        return ligne_entete; 
        
        
        
    };

    this.entete_1Col = function (n) {


        var ligne_entete = '<tr class="entete">';
        if(n===1){
                    ligne_entete += '<td class="kilometrage-1Col" colspan="3">' + expression.kilometrages 
                + '</td><td class="direction-1Col">' + expression.directions 
                + '</td><td class="commentaires-1Col">' + expression.commentaires 
                + '</td>';
        } else {
            ligne_entete += '<td class="kilometrage-1Col inv" colspan="3">' + expression.kilometrages
                    + '</td><td class="direction-1Col inv" style="">' + expression.directions
                    + '</td><td class="commentaires-1Col inv" style="">' + expression.commentaires
                    + '</td>';

        }


        ligne_entete += '</tr>';


//        $('#console').append('<b style="color:#9b59b6;">Génération de l\'entête.....fait</b></br>');


        return ligne_entete;



    };
    
    this.imageElement = function(){
        
        var div = '';//<div class="droppable element" style="margin:46px 5px 5px 120px;height:25px;width:25px;border: 1px #666 dotted"></div>';
       
        return div;
    };
    

    this.nouvelleLigne_1_Colonne = function (num_etape, D_partielle, D_restante, D_parcourue, direction, commentaire) {

        if (isNaN(D_parcourue)) {
            D_parcourue = D_restante = D_partielle = '';

        }

        var cookieAfficheMode = actionCookies.litCookie('_RBC_ValCase_1');

        var valeurCase1 = D_parcourue;
        var valeurCase2 = D_partielle;


        if (cookieAfficheMode === 'DPartielle') {

            valeurCase1 = D_partielle;
            valeurCase2 = D_parcourue;

        }


        var ligne_RB = '<tr>';


        ligne_RB += '<td id="dI-' + num_etape + '" class="d_inter-1Col" colspan="3">' + valeurCase1 + '</td>';
        ligne_RB += '<td id="dir-' + num_etape + '" class="direction-image-1Col droppable" rowspan="2" >' + direction + '</td>';

        ligne_RB += '<td class="commentaire-1Col editable" contenteditable="true" id="com-' + num_etape + '" class="commentaire" rowspan="2">' + commentaire + elementTable.imageElement() + '</td>';
//        ligne_RB += '<td class="milieuG"  rowspan="2"></td>';
//        ligne_RB += '<td class="milieuD"  rowspan="2"></td>';
        ligne_RB += '</tr>';

        ligne_RB += '<tr>';
        ligne_RB += '<td class="num_etape">' + num_etape + '</td>';
        ligne_RB += '<td id="dR-' + num_etape + '" class="d_restante-1Col">' + D_restante + '</td>';
        ligne_RB += '<td id="dP-' + num_etape + '" class="d_parcourue-1Col">' + valeurCase2 + '</td>';

        ligne_RB += '</tr>';

        $('.page td.commentaire').css('color', actionCookies.litCookie('_RBC_commentairesColor'));
        $('.page td.d_restante').css('color', actionCookies.litCookie('_RBC_dRestanteColor'));
        $('.page td.d_parcourue').css('color', actionCookies.litCookie('_RBC_dParcourueColor'));
        $('.page td.d_inter').css('color', actionCookies.litCookie('_RBC_dInterColor'));
        $('.page td').css('border-color', actionCookies.litCookie('_RBC_borderColor'));


        return ligne_RB;
    };
    
    // Génération de chaque ligne d'étape. 
    // Prend en paramètre les données calculées pour l'étape n et n+12
    
    this.nouvelleLigne = function(num_etape, D_partielle, D_restante, D_parcourue, direction, commentaire,
            num_etape2, D_partielle2, D_restante2, D_parcourue2, direction2, commentaire2) {

        if (isNaN(D_parcourue)) {
            D_parcourue = D_restante = D_partielle = '';

        }
        if (isNaN(D_parcourue2)) {
            D_parcourue2 = D_restante2 = D_partielle2 = '';

        }

        var cookieAfficheMode = actionCookies.litCookie('_RBC_ValCase_1');

        var valeurCase1 = D_parcourue;
        var valeurCase2 = D_partielle;
        var valeurCase1_2 = D_parcourue2;
        var valeurCase2_2 = D_partielle2;

        if (cookieAfficheMode === 'DPartielle') {
            valeurCase1 = D_partielle;
            valeurCase2 = D_parcourue;
            valeurCase1_2 = D_partielle2;
            valeurCase2_2 = D_parcourue2;
        }
        

        var ligne_RB = '<tr>';
        
         
        ligne_RB += '<td id="dI-' + num_etape + '" class="d_inter" colspan="3">' + valeurCase1 + '</td>';
        ligne_RB += '<td id="dir-'+ num_etape +'" class="direction-image droppable" rowspan="2" >' + direction + '</td>';
        
        ligne_RB += '<td class="commentaire editable" contenteditable="true" id="com-'+ num_etape +'" class="commentaire" rowspan="2">' + commentaire + elementTable.imageElement() + '</td>';
        ligne_RB += '<td class="milieuG"  rowspan="2"></td>';
        ligne_RB += '<td class="milieuD"  rowspan="2"></td>';
        ligne_RB += '<td id="dI-' + num_etape2 + '" class="d_inter" colspan="3">' + valeurCase1_2 + '</td>';
        ligne_RB += '<td id="dir-'+ num_etape2 +'" class="direction-image droppable" rowspan="2">' + direction2 + '</td>';
        ligne_RB += '<td class="commentaire editable" contenteditable="true" id="com-'+ num_etape2 +'" class="commentaire" rowspan="2">' + commentaire2 + '</td>';
        ligne_RB += '</tr>';

        ligne_RB += '<tr>';
        ligne_RB += '<td class="num_etape">' + num_etape + '</td>';
        ligne_RB += '<td id="dR-'+num_etape+'" class="d_restante">' + D_restante + '</td>';
        ligne_RB += '<td id="dP-' + num_etape + '" class="d_parcourue">' + valeurCase2 + '</td>';

        ligne_RB += '<td class="num_etape">' + num_etape2 + '</td>';
        ligne_RB += '<td id="dR-'+num_etape2+'" class="d_restante">' + D_restante2 + '</td>';
        ligne_RB += '<td id="dP-' + num_etape2 + '" class="d_parcourue">' + valeurCase2_2 + '</td>';

        ligne_RB += '</tr>';
        
        $('.page td.commentaire').css('color', actionCookies.litCookie('_RBC_commentairesColor'));
        $('.page td.d_restante').css('color', actionCookies.litCookie('_RBC_dRestanteColor'));
        $('.page td.d_parcourue').css('color', actionCookies.litCookie('_RBC_dParcourueColor'));
        $('.page td.d_inter').css('color', actionCookies.litCookie('_RBC_dInterColor'));
        $('.page td').css('border-color', actionCookies.litCookie('_RBC_borderColor'));
        
        
        return ligne_RB;
    };
    
    

    // Cette fonction ne produit pas de HTML, elle remplace juste les valeurs 
    this.corrigeDistances = function (nEtape, dParcourue, dRestante, dPartielle, nEtape2, dParcourue2, dRestante2, dPartielle2) {

        var cookieAfficheMode = actionCookies.litCookie('_RBC_ValCase_1');

        var valeurPrincipale;
        var valeurSecondaire;
        var valeurPrincipaleCol2;
        var valeurSecondaireCol2;

        if (cookieAfficheMode === 'DPartielle') {
            valeurPrincipale = dPartielle;
            valeurSecondaire = dParcourue;
            valeurPrincipaleCol2 = dPartielle2;
            valeurSecondaireCol2 = dParcourue2;
        }
        else if (cookieAfficheMode === 'DParcourue') {

            valeurPrincipale = dParcourue;
            valeurSecondaire = dPartielle;
            valeurPrincipaleCol2 = dParcourue2;
            valeurSecondaireCol2 = dPartielle2;
        }

        $('#dP-' + nEtape).text(valeurSecondaire);
        $('#dR-'+nEtape).text(dRestante);
        $('#dI-' + nEtape).text(valeurPrincipale);
        $('#dP-' + nEtape2).text(valeurSecondaireCol2);
        $('#dR-'+nEtape2).text(dRestante2);
        $('#dI-' + nEtape2).text(valeurPrincipaleCol2);
        
      //  console.log('#dP-'+nEtape);
    };

    // Cette fonction ne produit pas de HTML, elle remplace juste les valeurs
    this.corrigeDistances_1_Colonne = function (nEtape, dParcourue, dRestante, dPartielle) {

        var cookieAfficheMode = actionCookies.litCookie('_RBC_ValCase_1');

        var valeurPrincipale;
        var valeurSecondaire;


        if (cookieAfficheMode === 'DPartielle') {
            valeurPrincipale = dPartielle;
            valeurSecondaire = dParcourue;

        } else if (cookieAfficheMode === 'DParcourue') {

            valeurPrincipale = dParcourue;
            valeurSecondaire = dPartielle;

        }

        $('#dP-' + nEtape).text(valeurSecondaire);
        $('#dR-' + nEtape).text(dRestante);
        $('#dI-' + nEtape).text(valeurPrincipale);


        //  console.log('#dP-'+nEtape);
    };
    
    this.ligneVide = function(nbLigne = 0, texte='&nbsp;', texte2 =''){
        
        var ligne_vide = '<tr>';
        ligne_vide += '<td class="ligne_vide_H" colspan="12">'+ texte + ' - ' + texte2 +'</td>';
        
        for(var i = 1; i <= nbLigne; i++){
            
        ligne_vide += '</tr>';
        ligne_vide += '<tr>';
        ligne_vide += '<td class="ligne_vide_B" colspan="12">&nbsp;</td>';
        ligne_vide += '</tr>';
        }
        
        return ligne_vide;
    };

        
    this.creerImageDirection = function(imagePath){
        
        //var imageDirection = imagePath;
        var imgTemplate = '<img class="img-tab" src="{imgPath}" />';
        
        imgTemplate = imgTemplate.replace('{imgPath}',imagePath);
        
        return imgTemplate;
    };
    
    var td = function(classe='', content= '', colspan = '', rowspan = '', style = '', editable=false){
        var td = '<td class="' + classe + '"'
                + ' colspan="' + colspan + '"'
                + ' rowspan="' + rowspan + '"' 
                + ' style="' + style + '"'
                + ' contenteditable="'+editable+'"'
                + '>'
                + content + '</td>';
        return td;
    };
    
    this.enteteAnnexe = function(titreCourse = 'Saisir le titre ici', conseilAnnexe = 'aucun'){
        
        
        var entete = '<table id="feuille-annexe">';
        entete += '<tr class="npafficher">';
        for (let i = 1; i <= 8; i++) {
            entete += td('no-border ','');
        }
        entete += '</tr>';
        entete += '<tr>';
        entete += td('no-border titre-annexe', titreCourse, 8, 1, '', true);
        entete += '</tr>';
;
        entete += '<tr>';
        for (let i = 1; i <= 8; i++) {
            entete += td('no-border','');
        }
	entete += '</tr>';
        
        entete += '<tr>';
        entete += td('no-border prenom', 'Prénom');
        entete += td('champ');
        entete += td('no-border moto', 'Moto');
        entete += td('champ');
        entete += td('no-border kmdep', 'km départ');
        entete += td('champ');
        entete += td('no-border kmarr', 'km arrivée');
        entete += td('champ');
        entete += '</tr>';
        
        entete += '<tr>';
        for (let i = 1; i <= 8; i++) {
            entete += td('no-border','&nbsp;');
        }
	entete += '</tr>';
        
        entete += '<tr>';
        entete += td('no-border groupe', 'Groupe');
        entete += td('champ','&nbsp;', 7, 2);
        entete += '</tr>';

        entete += '<tr>';
        entete += td('no-border', '<br>');
        entete += '</tr>';
        
        entete += '<tr>';
        entete += td('no-border conseil', 'Conseil','','', 'text-align:center;');
        entete += td('no-border conseil-annexe', conseilAnnexe, 7, 1, '', true);
        entete += '</tr>';
        
              entete += '<tr>';
        for (let i = 1; i <= 8; i++) {
            entete += td('no-border','<br>');
        }
	entete += '</tr>';
        entete += '</table>';
        
        
         $('#id_enigme').val(1);

        return entete;
     };
     
     this.ligneEnigme = function(enigme){
         
        var idEnigme = $('#id_enigme').val();
        
        var ligneEnigme = '<tr class="enigme-'+idEnigme+'">';
        ligneEnigme += td('no-border','<img  class="img-enigme" src="./Pictogrammes/enigmes/EN-'+idEnigme+'.jpg"/>',1,2);
        ligneEnigme += td('no-border enigme', enigme,7,1,'', true);
        ligneEnigme += '</tr>';       
        
        ligneEnigme += '<tr class="enigme-'+idEnigme+'">';
        
        ligneEnigme += td('reponse', '', 7, 1);
        ligneEnigme += '</tr>';
        ligneEnigme += '<tr class="enigme-'+idEnigme+'">';
        ligneEnigme += td('no-border npafficher', '');
        ligneEnigme += '</tr>';
        
        ligneEnigme += '<tr class="enigme-'+idEnigme+'">';
        for (let i = 1; i <= 8; i++) {
            ligneEnigme += td('no-border npafficher','');
        }
	ligneEnigme += '</tr>';
        ligneEnigme += '<tr class="enigme-'+idEnigme+'">';
        for (let i = 1; i <= 8; i++) {
            ligneEnigme += td('no-border npafficher','');
        }
	ligneEnigme += '</tr>';
        
        if($('#id_enigme').val() > 0){
                    idEnigme++;
        $('#id_enigme').val(idEnigme);
        }

        
        return ligneEnigme;
     };
     

    
};


