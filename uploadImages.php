<?php
$categorie = '';
if($_POST['categorie'] === ''){
    $categorie = 'non-classe/';
}else{
    $categorie = $_POST['categorie'] . '/';
}


    
    $target_dir = "Pictogrammes/$categorie" ;
$target_file = $target_dir . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$_FILES['file']['name'])) {
   $status = 1;
   chmod($target_dir.$_FILES['file']['name'], 0444); 

}




