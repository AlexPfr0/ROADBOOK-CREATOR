// Classe contenant principalement tout ce qui concerne l'enregistrement

var RBK = function (){
    
    
// Supprime le fichier RBK distant après génération et téléchargement

    this.supprime = function (fichierRBK){
        
         var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

           }
        };

        xmlhttp.open("GET", "supprimeRBK.php?fichierRBK=" + fichierRBK , true);

        xmlhttp.send();
        
    };
    
    
//   Obsoète  
    
//    this.creer = function (){
//        
//         var xmlhttp = new XMLHttpRequest();
//
//        xmlhttp.onreadystatechange = function () {
//
//            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//
//            }
//        };
//
//        xmlhttp.open("GET", "sauvegarde.php?action=creer&data=" + this.serializeDatas(), true);
//
//        xmlhttp.send();
//        };
//        
        
    
    // Enregistrement de données par serialisation JSON
    this.serializeDatas = function (){
        
        var directions = new Array();
        var commentaires = new Array();
        var distances = new Array();
        
        var roadbook = new Array();
        
        $(".d_parcourue").each(function (index) {

            var d_parcourue = $(this).text();
            
            if(d_parcourue === ''){
                d_parcourue = '9999';
                
            }
            distances[index] = d_parcourue;
        });
        
        $( ".commentaire" ).each(function( index ) {
            
            var commentaire = $(this).html(); //.html() pour garder le formatage (à la place de .text())
            commentaires[index] = commentaire;
        });
        
         $( ".direction-image" ).each(function( index ) {
            
           // roadbook[index] = new Array();  A voir
            
            if ($(this).html().length > 0){
//                var html = $(this).html();
//                var img = html.split('"');
//                var pathimg = img[3]; // A amélirorer
                var pathimg = $('#' +this.id + ' img').attr('src');
                directions[index] = pathimg;
                
//               directions[index] =  $(this + ' img').attr('src');
               
                
            }else{
                  directions[index] = 'null';
            }
            
        });
        
        for(var i = 0; i < distances.length; i++){
            
            roadbook[i] = {"d" : distances[i], "i" : directions[i], "c" : commentaires[i]};
        }
        
        var auteur = $('#nom_utilisateur').text();
        var date = new Date();
        var langage = $('#langage').val();
        var version = $('#RBCversion').text();
        roadbook[i] = {'RBKdate' : date, 'RBKlangage' : langage, 'RBKauteur' : auteur, 'RBKversion' : version};
      
        
      return JSON.stringify(roadbook) ;
        
        
    };

// ### GENERATION ET TELECHARGEMENT DU FICHIER

    this.prepare = function(data, fileName, type="text/plain"){
    // Création d'un lien <a> invisible
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob([data], { type })
  );

  // Use download attribute to set set desired file name
  a.setAttribute("download", fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
    
};  

// ### TELECHARGEMENT DU FICHIER
this.telecharge = function(filename){
    
    var nom_roadbook = prompt("Nom du projet: ", filename);
    $('#nom_roadbook').val(nom_roadbook);
   
        filename = nom_roadbook.replace(/ /g, "_",);
        this.prepareFichier(this.serializeDatas(),filename + '.rbk');
    
};

// ###  Permet de charger un fichier RBK généré par l'application elle-même.
// Le fichier .rbk est envoyé sur le serveur puis lu.
// Après l'opération, le fichier est supprimé
this.charge = function(){
    
    Dropzone.autoDiscover = false;
    $(document).ready(function () {
        
        var uploadZone = $("#uploadZone");
        
        
            uploadZone.dropzone({
            url: "uploadRBK.php", 
            addRemoveLinks: true,
            maxFiles: 1,
            acceptedFiles: ".rbk",
            maxFilesize: 2,
            dictDefaultMessage : expression.defautMessageEnvoiRBK,
            dictRemoveFile: expression.removeFile,
           
           
            success: function (file, response) {
                //Animation
                file.previewElement.classList.add("dz-success");
                //Pour ajouter id à les prévisualisations
                file.previewElement.id = response.id;
                
                // Construction du roadbook
                
                construireRoadbook.depuisFichierRBK(file.name);
                
                // Suppression du fichier envoyé
                // après 5 seconde pour avoir le temps de le lire.
                
                setTimeout(function(){oRBK.supprime(file.name);; }, 5000);
                
                
                
                
                
                }
            });

        });
    };
    




    
    
};


