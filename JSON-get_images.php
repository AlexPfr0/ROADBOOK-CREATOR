<?php
 //echo json_encode(get_image("./Pictogrammes/Directions/"));
$categorie = $_GET['categorie'];
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


