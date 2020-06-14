<?php


$data = $_GET['data']; 
   $file ="projet.rbk";
   chmod("projet.rbk", 0755); 
   $fileopen=(fopen($file,'w+'));
   fwrite($fileopen, $data);

   fclose($fileopen); 
    










