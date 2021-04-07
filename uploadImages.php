<?php
$categorie = '';
$nom_picto = basename($_FILES["file"]["name"]);

//if (filter_input(INPUT_POST, 'categorie') === '') {
$typePicto = explode('-', $nom_picto)[1];
    switch ($typePicto) {

        case 'RP':
            $categorie = 'rondpoints/';
            break;

        case 'DNP':
            $categorie = 'directions/';
            break;
        case 'DP':
            $categorie = 'directions/';
            break;
        default:
            $categorie = 'non-classe/';
            break;
    }
    //}

    $target_dir = "Pictogrammes/$categorie/";


$target_file = $target_dir . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$_FILES['file']['name'])) {
   $status = 1;
   
   // Le fichier
$filename = $target_file;
$pixel = 250;

// Content type
//header('Content-Type: image/jpeg');

// Calcul des nouvelles dimensions
list($width, $height) = getimagesize($filename);
$new_width = $pixel;
$new_height = $pixel;

// Redimensionnement
$image_p = imagecreatetruecolor($new_width, $new_height);
$image = imagecreatefromjpeg($filename);
imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);


   chmod($target_dir.$_FILES['file']['name'], 0444); 

}