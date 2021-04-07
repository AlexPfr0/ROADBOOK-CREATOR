var Langage = function(){
    
        this.kilometrages = "Kilométrages";
        this.directions = "Directions";
        this.commentaires = "Commentaires";
        
        this.defaultMessage = "Glissez les fichiers ici pour les envoyer (.rbk)";
        
        this.fallbackMessage = "Votre navigateur ne support pas ce plugin !";
        this.fallbackText = "Veuillez utiliser le formulaire ci-dessous pour envoyer vos fichier.";
        this.fileToBig = "Le fichier est trop lourd ({{filesize}}MiB). Taille maxi : {{maxFilesize}}MiB.";
        this.invalidFileType = "Vous ne pouvez pas envoyer le type de fichier.";
        this.responseError = "Le serveur a répondu avec le code erreur {{statusCode}}.";
        this.cancelUpload = "Annuler l'envoi";
        this.uploadCanceled = "Envoi annulé.";
        this.cancelUploadConfirmation = "Êtes-vous certain de vouloir abandonner l'envoi ?";
        this.removeFile = 'Vider la zone';
        this.removeFileConfirmation = null;
        this.maxFilesExceeded = "Vous ne pouvez pas envoyer autant de fichiers.";
        
    this.defautMessageEnvoiImages = "Seuls les fichiers .png sont acceptés";
        this.defautMessageEnvoiRBK = 'Glissez votre fichier pour charger un roadbook (.rbk)';
        
        this.etapes = "étapes";
        this.page = "page";
    this.pages = "pages";

    this.nomProjet = "Nom du projet";
    
};


