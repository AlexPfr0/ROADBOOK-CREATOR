// Classe pour uploader les pictogrammes


var Pictogramme = function () {

    this.upload = function () {

        Dropzone.autoDiscover = false;
        $(document).ready(function () {

            var uploadZone = $("#uploadImagesZone");

    // Options d'upload
            uploadZone.dropzone({
                url: "uploadImages.php",
                addRemoveLinks:     true,
                maxFiles: 50,
                acceptedFiles: ".png",
                maxFilesize:        2,
                dictDefaultMessage: expression.defautMessageEnvoiImages,
                dictRemoveFile:     expression.removeFile,
                resizeWidth: 250,
                resizeHeight: 250,
                thumbnailMethod:    'crop',
                resizeQuality:      1,
    // Quand le fichier est uploadé            
                    success: function (file, response) {
                    //Animation
                    file.previewElement.classList.add("dz-success");
                    //Pour ajouter id à les prévisualisations
                    file.previewElement.id = response.id;


    // Rafraichissement de la liste de pictogrammes dans l'onglet visé
                    var categorie = $('#categorie_hid').val();
                    evenement.rafraichirPanelImages(categorie);

                },
    
                init: function () {
                    this.on("sending", function (file, xhr, formData) {
                        formData.append("categorie", $('#categorie_hid').val());

                    });
                }
            });
        });
    };
};
