<?php

//file_put_contents('test.txt', 'jjjjjjjj');
$target_dir = "upload/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
file_put_contents('test.txt', $_FILES["file"]["tmp_name"]);
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$_FILES['file']['name'])) {
   $status = 1;
   chmod($target_dir . $_FILES['file']['name'], 0777);
//    file_put_contents('test.txt', 'ouiuiii');
} else {
//    file_put_contents('test.txt', 'nonnn');
}

