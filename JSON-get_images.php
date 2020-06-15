<?php
// Permet de lister les images et de les afficher dans 
// le panel concerné.
// Ce script php est appelé avec ajax lors de l'upload de pictogrammes
$categorie = filter_input(INPUT_GET, 'categorie');
$categorie = 'Pictogrammes/' . $categorie;
$liste_picto = [];

$scan = scandir($categorie,SCANDIR_SORT_ASCENDING);

foreach ($scan as $picto){
       
       if(!is_dir($picto)){
           $liste_picto[] = $picto;
       }
   }
rsort($liste_picto, SORT_FLAG_CASE | SORT_NATURAL);
echo json_encode($liste_picto);


