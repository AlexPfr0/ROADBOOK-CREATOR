<?php
//Supprimer le fichier .rbk uploadé pour le chargement d'un projet
//Est appelé par la fonction supprime() de la classe RBK (RBK.js)
$fichierRBK = '.upload/' . filter_input(INPUT_GET, 'fichierRBK');

unlink($fichierRBK);
