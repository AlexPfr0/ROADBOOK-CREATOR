// Classe contenant principalement tout ce qui concerne l'enregistrement

var RBK = function () {


// Supprime le fichier RBK distant après génération et téléchargement

    this.supprime = function (fichierRBK) {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            }
        };

        xmlhttp.open("GET", "supprimeRBK.php?fichierRBK=" + fichierRBK, true);

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
    this.serializeDatas = function () {

        var directions = new Array();
        var commentaires = new Array();
        var distances = new Array();

        var roadbook = new Array();

        $(".d_parcourue").each(function (index) {

            var d_parcourue = $(this).text();

            if (d_parcourue === '') {
                d_parcourue = '9999';

            }
            distances[index] = d_parcourue;
        });

        $(".commentaire").each(function (index) {

            var commentaire = $(this).html(); //.html() pour garder le formatage (à la place de .text())
            commentaires[index] = commentaire;
        });

        $(".direction-image").each(function (index) {

            if ($(this).html().length > 0) {

                var pathimg = $('#' + this.id + ' img').attr('src');
                directions[index] = pathimg;

            } else {
                directions[index] = 'null';
            }

        });

        for (var i = 0; i < distances.length; i++) {

            roadbook[i] = {"d": distances[i], "i": directions[i], "c": commentaires[i]};
        }

        var auteur = $('#nom_utilisateur').text();
        var date = new Date();
        var langage = $('#langage').val();
        var version = $('#RBCversion').text();
        var unite = $('#unite-mesure').val();
        roadbook[i] = {'RBKdate': date, 'RBKlangage': langage, 'RBKauteur': auteur, 'RBKversion': version, 'RBKunite': unite};


        return JSON.stringify(roadbook);


    };
    
    // Fonction permettant de couper le roadbook pour l'enregistrer dans les cookies.
    // La taille maxi d'un cookie dans un navigateur ne peut pas dépasser 4096 octets.
    // Avec cette fonction on peut enregistrer 9192 octets de roadbook (8Mo)
    this.coupeData = function (data, part){
        var longueur = data.length;
        var part1 = data.substr(0, 4000);
        var part2 = data.substr(4000,4000);
        
        if(part === 1 ){
             return  part1;
        }else if(part === 2 ){
            return part2;
        }
       
    };
    
    // Fonction qui récupère les cookies stockant le roadbook.
    // Elle prend tout simplement les deux cookies (coupés avec la fonction ci-dessus "coupeData)
    // et les fusionne.
    // Ces deux fonctions permettent la sauvegarde rapide du roadbook.
    this.fusionneData = function (){
        var part1 = actionCookies.litCookie('_RBK_part1');
        var part2 = actionCookies.litCookie('_RBK_part2');
        var dataCookie = part1 + part2;
        
        return dataCookie;
    };
    
    this.enregRBKcookie = function (){

        actionCookies.creeCookie('_RBK_nom', $('#nom_roadbook').val(), 365);
        actionCookies.creeCookie('_RBK_part1', this.coupeData(this.serializeDatas(), 1), 365);
        actionCookies.creeCookie('_RBK_part2', this.coupeData(this.serializeDatas(), 2), 365);
    };

// ### GENERATION ET TELECHARGEMENT DU FICHIER

    this.prepare = function (data, fileName, type = "text/plain") {
        // Création d'un lien <a> invisible
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = window.URL.createObjectURL(
                new Blob([data], {type})
                );

        // Use download attribute to set set desired file name
        a.setAttribute("download", fileName);

        // Trigger the download by simulating click
        a.click();
        
actionCookies.creeCookie('_RBK_nom', fileName,365);        
actionCookies.creeCookie('_RBK_part1',this.coupeData(data,1), 365);
actionCookies.creeCookie('_RBK_part2',this.coupeData(data,2), 365);


        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);

    };

// ### TELECHARGEMENT DU FICHIER
    this.telecharge = function (filename) {

        var nom_roadbook = prompt("Nom du projet: ", filename);
        $('#nom_roadbook').val(nom_roadbook);

        filename = nom_roadbook.replace(/ /g, "_", );
        this.prepare(this.serializeDatas(), filename + '.rbk');

    };

// ###  Permet de charger un fichier RBK généré par l'application elle-même.
// Le fichier .rbk est envoyé sur le serveur puis lu.
// Après l'opération, le fichier est supprimé
    this.charge = function () {

        Dropzone.autoDiscover = false;
        $(document).ready(function () {

            var uploadZone = $("#uploadZone");


            uploadZone.dropzone({
                url: "uploadRBK.php",
                addRemoveLinks: true,
                maxFiles: 1,
                acceptedFiles: ".rbk",
                maxFilesize: 2,
                dictDefaultMessage: expression.defautMessageEnvoiRBK,
                dictRemoveFile: expression.removeFile,

                success: function (file, response) {
                    //Animation
                    file.previewElement.classList.add("dz-success");
                    //Pour ajouter id à les prévisualisations
                    file.previewElement.id = response.id;

                    // Construction du roadbook
evenement.console('Fichier RBK chargé','infoA');
                    construireRoadbook.depuisFichierRBK(file.name);
//                    $("td.ir-right span").css('opacity', 1);
//                    $("td.ir-right input").css('opacity', 1);
                    // Suppression du fichier envoyé
                    // après 5 secondes pour avoir le temps de le lire.

                    setTimeout(function () {
                        oRBK.supprime(file.name);
                        ;
                    }, 5000);

                }
            });

        });
    };

};