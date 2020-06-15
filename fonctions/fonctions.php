<?php


// Récupère les images pour chaque catégorie de pictogrammes
// Prend en paramètre le nom du dossier.
// Cette fonction est appelée pour chaque panel
// Et placée dans un <div> de classe draggable pour permettre le glissé.
// Retourne une liste html

function get_image($dossier) {

    $images_liste = scandir($dossier, SCANDIR_SORT_ASCENDING);
    
    sort($images_liste, SORT_FLAG_CASE | SORT_NATURAL);
    
    $html_liste = '<div class="draggable">';

    foreach ($images_liste as $image) {

        if (!is_dir($image)) {
            $html_liste .= '<img src="' . $dossier . $image . '" class="img-pan"  title="' . $image . '" />';
        }
    }
    
    $html_liste .= "</div>";
    
    return $html_liste;
}

// Obsolète

function get_image_name($dossier){
    
   $fichiers_liste = scandir($dossier,SCANDIR_SORT_ASCENDING); 
   sort($fichiers_liste, SORT_FLAG_CASE | SORT_NATURAL);
   $html_liste = '<div class="liste-fichiers">';
   
   foreach ($fichiers_liste as $fichier){
       
       if(!is_dir($fichier)){
           $html_liste .= $fichier . ' ';
       }
   }
   $html_liste .= "</div>";
   return $html_liste;
   
}

// Récupère le nom des fichiers de chaque catégorie
// 

function indexeImages(){
    $racine = 'Pictogrammes/';
    $dossiers = ['directions', 'elements', 'enigmes', 'panneaux', 'rondpoints', 'non-classe' ];
    
    
    
    $html_index_images = '';
    
    foreach ($dossiers as $dossier){
        
        $imgs = scandir($racine.$dossier);
        
        foreach($imgs as $img){
            if(!is_dir($img)){
            $html_index_images .= $img . ' ';
            }
        } 
           
    }
    $html_index_images.= "";
    
    return $html_index_images;
    
    
}

// Génère le style des bordures droites dans le tableau des paramètres

function generer_style($cookie) {
    $style = '';
    if (isset($cookie)) {
        $style = ' style="border-right:15px solid ' . $cookie . '"';
    }

    return $style;
}

//function get_version(){
//    $derniere_version = @file_get_contents("http://roadbook.alexp.fr/version/.version");
//    if ($derniere_version == '') {
//        $derniere_version = $reglage->BRC_version;
//    }
//    if ($APIversion - $derniere_version < 0) {
//        echo '<p style="font-size:0.8em;color:#fff">' . $expression->maj_dispo . '<br />'
//        . '<a class="link" href="http://games.alex-box.net/aws-wrd-rcon-gerer-un-serveur-wargame/aws-wrd-rcon-telechargement/" target="_blank">' . $expression->telecharge_maj . ' (' . $derniere_version . ')</a>.</p>';
//    }
//}
