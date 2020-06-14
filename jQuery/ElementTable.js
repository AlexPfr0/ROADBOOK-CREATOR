// Classe permettant de générer le HTML

var elementTable = function (){
    
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
        
        
        $('#console').append('<b style="color:#9b59b6;">Génération de l\'entête.....fait</b></br>');
        
        
        return ligne_entete; 
        
        
        
    };
    
    this.imageElement = function(){
        
        var div = '';//<div class="droppable element" style="margin:46px 5px 5px 120px;height:25px;width:25px;border: 1px #666 dotted"></div>';
       
        return div;
    };
    
    // Génération de chaque ligne d'étape. 
    // Prend en paramètre les données calculées pour l'étape n et n+12
    
    this.nouvelleLigne = function(num_etape, D_inter, D_restante, D_parcourue, direction, commentaire,
                                    num_etape2, D_inter2, D_restante2, D_parcourue2, direction2, commentaire2)
                                    
    {
     
       if(isNaN(D_parcourue)){
            D_parcourue = D_restante = D_inter ='';
            
        }
        if(isNaN(D_parcourue2)){
            D_parcourue2 = D_restante2 = D_inter2 ='';
            
        }
        $('#console').append('<b style="color:#9b59b6;">Génération des étapes : <br/>');
        $('#console').append('<b style="color:#9b59b6;"> --> Etape ' + num_etape + 
                ' avec les valeurs <span style="color: #fff">' + D_parcourue + ', '+D_inter+', '+D_restante+'</span></b><br />');
        $('#console').append('<b style="color:#9b59b6;"> --> Etape ' + num_etape2 + 
                ' avec les valeurs <span style="color: #fff">' + D_parcourue2 + ', '+D_inter2+','+D_restante2+'</span>....</b>');
        
        var ligne_RB = '<tr>';
        
         
        ligne_RB += '<td id="dI-'+num_etape+'" class="d_inter" colspan="3">' + D_inter + '</td>';
        ligne_RB += '<td id="dir-'+ num_etape +'" class="direction-image droppable" rowspan="2" >' + direction + '</td>';
        
        ligne_RB += '<td class="commentaire editable" contenteditable="true" id="com-'+ num_etape +'" class="commentaire" rowspan="2">' + commentaire + elementTable.imageElement() + '</td>';
        ligne_RB += '<td class="milieuG"  rowspan="2"></td>';
        ligne_RB += '<td class="milieuD"  rowspan="2"></td>';
        ligne_RB += '<td id="dI-'+num_etape2+'" class="d_inter" colspan="3">' + D_inter2 + '</td>';
        ligne_RB += '<td id="dir-'+ num_etape2 +'" class="direction-image droppable" rowspan="2">' + direction2 + '</td>';
        ligne_RB += '<td class="commentaire editable" contenteditable="true" id="com-'+ num_etape2 +'" class="commentaire" rowspan="2">' + commentaire2 + '</td>';
        ligne_RB += '</tr>';

        ligne_RB += '<tr>';
        ligne_RB += '<td class="num_etape">' + num_etape + '</td>';
        ligne_RB += '<td id="dR-'+num_etape+'" class="d_restante">' + D_restante + '</td>';
        ligne_RB += '<td id="dP-'+num_etape+'" class="d_parcourue">' + D_parcourue + '</td>';

        ligne_RB += '<td class="num_etape">' + num_etape2 + '</td>';
        ligne_RB += '<td id="dR-'+num_etape2+'" class="d_restante">' + D_restante2 + '</td>';
        ligne_RB += '<td id="dP-'+num_etape2+'" class="d_parcourue">' + D_parcourue2 + '</td>';

        ligne_RB += '</tr>';
        
        $('#console').append('<b style="color:#9b59b6;">fait</b></br>');
        
        return ligne_RB;
    };

    // Cette fonction ne produit pas de HTML, elle remplace juste les valeurs 
    this.corrigeDistances = function(nEtape, dParcourue, dRestante, dInter, nEtape2, dParcourue2, dRestante2, dInter2){
        $('#dP-'+nEtape).text(dParcourue);
        $('#dR-'+nEtape).text(dRestante);
        $('#dI-'+nEtape).text(dInter);
        $('#dP-'+nEtape2).text(dParcourue2);
        $('#dR-'+nEtape2).text(dRestante2);
        $('#dI-'+nEtape2).text(dInter2);
        
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
    
};


