<?php

ini_set('display_errors', 1);

include 'fonctions/fonctions.php';

// Initialisation des paramètres
require 'reglages.php';
$reglage = new reglages();

// 
$langage_COOKIE                 = filter_input(INPUT_COOKIE, '_RBC_Langage');
$decimal_COOKIE                 = filter_input(INPUT_COOKIE, '_RBC_nbDecimales');
$couleurLignes_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_borderColor');
$couleurD_inter_COOKIE          = filter_input(INPUT_COOKIE, '_RBC_dInterColor');
$couleurD_parcourue_COOKIE      = filter_input(INPUT_COOKIE, '_RBC_dParcourueColor');
$couleurD_restante_COOKIE       = filter_input(INPUT_COOKIE, '_RBC_dRestanteColor');
$couleurPied_page_COOKIE        = filter_input(INPUT_COOKIE, '_RBC_piedPage');
$couleurCommentaires_COOKIE     = filter_input(INPUT_COOKIE, '_RBC_commentairesColor');
$nom_utilisateur_COOKIE         = filter_input(INPUT_COOKIE, '_RBC_User');
$validite_cookies_COOKIE        = filter_input(INPUT_COOKIE, '_RBC_CookiesValidite');
$unite_mesure_COOKIE            = filter_input(INPUT_COOKIE, '_RBC_UniteMesure');
$colonne_unique_COOKIE          = filter_input(INPUT_COOKIE, '_RBC_ColonneUnique');

$valeur_case_1_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_ValCase_1');
$valeur_case_2_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_ValCase_2');
$valeur_case_3_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_ValCase_3');

// Si le cookie existe, alors on règle le paramètre avec ce dernier.



if (isset($langage_COOKIE)) {
    $reglage->langage = $langage_COOKIE;   
}

if (isset($decimal_COOKIE)) {
    $reglage->decimal = $decimal_COOKIE;
}
if (isset($couleurLignes_COOKIE)) {
    $reglage->couleur_lignes = $couleurLignes_COOKIE;
}
if (isset($couleurD_inter_COOKIE)) {
    $reglage->couleur_d_inter = $couleurD_inter_COOKIE;
}
if (isset($couleurD_parcourue_COOKIE)) {
    $reglage->couleur_d_parcourue = $couleurD_parcourue_COOKIE;
}
if (isset($couleurD_restante_COOKIE)) {
    $reglage->couleur_d_restante = $couleurD_restante_COOKIE;
}
if (isset($couleurPied_page_COOKIE)) {
    $reglage->pied_page = $couleurPied_page_COOKIE;
}
if (isset($couleurCommentaires_COOKIE)) {
    $reglage->couleur_commentaires = $couleurCommentaires_COOKIE;
}
if (isset($nom_utilisateur_COOKIE)) {
    $reglage->nom_utilisateur = $nom_utilisateur_COOKIE;
}
if (isset($validite_cookies_COOKIE)) {
    $reglage->validite_cookies = $validite_cookies_COOKIE;
}
if (isset($unite_mesure_COOKIE)) {
    $reglage->unite_mesure = $unite_mesure_COOKIE;
    
    if($unite_mesure_COOKIE === 'imperial'){
    $reglage->unite_abbrev = 'mi';}
        else{
    $reglage->unite_abbrev = 'km'; 
        }
    
}
if (isset($colonne_unique_COOKIE)) {
    $reglage->colonne_unique = $colonne_unique_COOKIE;
}
if (isset($valeur_case_1_COOKIE )) {
     $reglage->valeur_case_1 = $valeur_case_1_COOKIE;
}
if (isset($valeur_case_2_COOKIE )) {
    $reglage->valeur_case_2 = $valeur_case_2_COOKIE;
}
if (isset($valeur_case_3_COOKIE )) {
     $reglage->valeur_case_3 = $valeur_case_3_COOKIE;
}


// Initialisation de la langue côté serveur.
// Si le langage n'est pas fourni dans les paramètres, 
// La valeur par défaut est celle du paramètre initial (fr_FR)
require 'langages/' . $reglage->langage . '.php';
$expression = new expressions();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!--<script src="https://code.jquery.com/jquery-3.5.1.js"  integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>-->
        <script src="jQuery.src/jquery-3.5.1.js"></script>
        
        <!--        LIEN DE LA PALETTE DE COULEURS
                https://flatuicolors.com/palette/defo    -->
        <!--            GLYPHICON
                https://getbootstrap.com/docs/3.3/components/  -->



        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        
        <link rel="stylesheet" href="jQuery/colorPicker/la_color_picker.css">

        <script src="jQuery/vertical-tabs.js"></script>

<!--Initialisation des classes javascript-->
        <script src="jQuery/RBK.js"></script>
        <script>var oRBK = new RBK();</script>
        
        <script src="jQuery/pictogramme.js"></script>
        <script>var oPictogramme = new Pictogramme();</script>

        <script src="jQuery/ElementTable.js"></script>
        <script>var elementTable = new elementTable();</script>

        <script src="jQuery/ConstruireRoadbook.js"></script>
        <script>var construireRoadbook = new construireRoadbook();</script>


        <script src="jQuery/calculerDistances.js"></script>
        <!-- La fonction calculerDistance() peut prendre un paramètre 
        pour régler le nb de chiffres après la virgule. Par défaut : 3 
        Cette option est réglée dans les paramètres-->
        <script>var calculerDistance = new calculerDistance(<?= $reglage->decimal ?>);</script>

        <script src="jQuery/Evenements.js"></script>
        <script>var evenement = new Evenements();</script>

        <script src="jQuery/ActionCookies.js"></script>
        <script>actionCookies = new ActionCookie();</script>
        
      
        
<!--       Initialisation de la langue côté client.
       Pour tout ce qui est généré avec javascript-->
        <script src="langages/<?= $reglage->langage ?>.js"></script>
        <script>expression = new Langage();</script>


        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <link rel="stylesheet" href="css/vertical-tabs.css" type="text/css" />
        <link rel="stylesheet" href="css/tableau_parametres.css" type="text/css" />
        <link rel="stylesheet" href="css/choix_liste_cat.css" type="text/css" />
        <link rel="stylesheet" href="css/console.css" type="text/css" />

        <script src="jQuery/dropzone/dropzone.js"></script>
        <link rel="stylesheet" href="jQuery/dropzone/dropzone.css" type="text/css" />

        <title>ROADBOOK CREATOR - by Alex</title>
        <link href="images/logoRBC.png" rel="shortcut icon" type="image/x-icon" />
        
        <style>
            .d_restante{
                    color: <?= $reglage->couleur_d_restante?>;
            }
            .d_inter{
                    color: <?= $reglage->couleur_d_inter?>;
            }
            .d_parcourue{
                    color: <?= $reglage->couleur_d_parcourue?>;
            }
            .page td{
                    border-color: <?= $reglage->couleur_lignes?>;
            }
            .commentaires{
                    color: <?= $reglage->couleur_commentaires?>;
            }
            
        </style>
       
    </head>     

    <body>
<!--Barre suppérieure-->
        <h1 id="titre_site" class="titre_site">
            <img height="50" style="float: left; margin-right: 10px" src="./images/logoRBC.png"/>
            <b><a style="border: none" href="">ROADBOOK CREATOR</a></b> <span style="font-size: 0.5em">by Alex</span>
            <br>
            <span style="font-size: 0.3em;margin-left:50px; margin-bottom: 100px"><a id="RBCversion">v. <?= $reglage->BRC_version ?></a></span>
        </h1>
<!--2nd barre (infos sur le roadbook)-->
<div id="infos_roadbook">
    <table id="toolbar">
        <tr>
            <td class="ir-left" >
                <a href="#toolbar" title="\"\Plein écran""><span class="glyphicon glyphicon-fullscreen"></span></a>
                <a id="affiche-outil" title="Afficher les outils supplémentaires"><span class="glyphicon glyphicon-plus"></span></a>
                <script>evenement.afficheOutils();</script>
                <!--<span><a id="RBCversion">v. <?= $reglage->BRC_version ?></a></span>-->
                <span><a id="RBCuser"><b><?= $reglage->nom_utilisateur ?></b></a></span>
            </td>

            <td class="ir-right">
                <span class="glyphicon glyphicon-file" id="fichier"></span>
                <span title="Auteur du roadbook chargé" class="aaa"><span class="label">auteur</span><br/><span class="" id="RBKauteur"></span></span>
                <span title="Version du roadbook chargé" class="aaa"><span class="label">version</span><br/><span class="" id="RBKversion"></span></span>
                <span title="Date du roadbook chargé" class="aaa"><span class="label">date</span><br/><span class="" id="RBKdate"></span></span>
                <span  title="Langue du roadbook chargé" class="aaa"  style="border-right: none"><span   class="label">langue</span><br/><span class="" id="RBKlangage"></span></span>

                <input class="" placeholder="<?= $expression->nom_rb ?>" id="nom_roadbook" type="text" value="" />
                <span style="font-size:1.1em">
                    <span class="label glyphicon glyphicon-flag" id="nb_etapes"><a></a></span>
                <span class="label glyphicon glyphicon-road" id="nb_km"><a></a></span>
                <span class="label glyphicon glyphicon-list-alt" id="nb_pages"><a></a></span>
                </span>
            </td>
        </tr>
    </table>
</div>

<!--Barre d'outils (cachée par défaut)-->
<div id="outil">
    <span title="Activer pour permettre le déplacement des pictogrammes dans le roadbook." class="outil glyphicon glyphicon-move"><input type="text" id="mode-correction-picto"  value="inactif" hidden="" />
        <label class="switch" style="margin-bottom: 0px;top: -2px;bottom: 0px;">
            <input  id="corriger-picto" type="checkbox" value="" >
            <span class="slider"></span>
        </label><script>
            evenement.activeCorrectionPicto();
        </script>
    </span>
    <span title="Sauvegarde rapide. Le roadbook est enregistré dans les cookies." class="outil glyphicon glyphicon-floppy-disk" onclick="oRBK.enregRBKcookie()"> </span>
    <span title="Récupérer les dernier roadbook sauvegardé (depuis les cookies)." class="outil glyphicon glyphicon-time" onclick="construireRoadbook.depuisCookie(actionCookies.litCookie('_RBK_DernierRB'))"> </span>
</div>

<table>
    <tr>
        <td style="vertical-align: top; width: 1000px ">

            <div class="tabs">
                <ul>
                    <li><a id="imports" class="onglet active"><span class="glyphicon glyphicon-import"></span><?= $expression->IMPORTS ?></a></li>
                    <li><a id="exports" class="onglet"><span class="glyphicon glyphicon-export"></span><?= $expression->EXPORTS ?></a></li>
                    <li><a id="directions" class="onglet "><span class="glyphicon glyphicon-hand-right"></span><?= $expression->DIRECTIONS ?></a></li>
                    <li><a id="rondpoints" class="onglet"><span class="glyphicon glyphicon-record"></span><?= $expression->RONDS_POINTS ?></a></li>
                    <li><a id="panneaux" class="onglet"><span class="glyphicon glyphicon-warning-sign"></span><?= $expression->PANNEAUX ?></a></li>
                    <li><a id="enigmes" class="onglet"><span class="glyphicon glyphicon-question-sign"></span><?= $expression->ENIGMES ?></a></li>
                    <li><a id="elements" class="onglet"><span class="glyphicon glyphicon-tree-conifer"></span><?= $expression->ELEMENTS ?></a></li>
                    <li><a id="parametres" class="onglet" ><span class="glyphicon glyphicon-wrench"></span><?= $expression->PARAMETRES ?></a></li>
                    <!--<li><a id="formulaire" class="onglet" ><span class="glyphicon glyphicon-list-alt"></span><?= $expression->FORMULAIRE ?> (wip)</a></li>-->
                    <!--<li><a id="editeur" class="onglet"><span class="glyphicon glyphicon-user"></span>EDITEUR (wip)</a></li>-->
                    <li><a id="aide" class="onglet"><span class="glyphicon glyphicon-education"></span>AIDE</a></li>
                </ul>
            <div id="onglet-imports" class="tab">

            <div class="panel">

                <hr class="panel-separateur">
                    <h4><b><?= $expression->depuis_kurviger ?></b></h4>
                        <table class="data-container">
                            <tr>
                                <td style="width: 40%">
                                    <span id="vider-data-brute" class="glyphicon glyphicon-erase"></span>
                                    <span id="coller-donnees" class="glyphicon glyphicon-paste"></span>
            <script>
    evenement.collerDonnees();
    evenement.viderDataBrute();
            </script> 
                                </td>
                                <td>
                                    <textarea title="Coller le contenu du presse-papier ici" id="data-brute"></textarea>
                                </td>
                                <td>
<!--                                    <div class="checkbox">
                                        <input type="text" id="mode-correction"  value="inactif" hidden="" />
                                        <input id="corriger-distances" type="checkbox" value="" disabled>
                                        <label id="for-corriger-distances" for="corriger-distances"><?= $expression->mode_correction ?></label>
                                    </div>-->
                                    
           
<input type="text" id="mode-correction"  value="inactif" hidden="" />
<label title="Activer pour basculer en mode correction de distance" class="switch-v" style="margin-bottom: 0px;top: -2px;bottom: 0px;">
            <input  id="corriger-distances" type="checkbox" value="" >
            <span class="slider-v" > </span>
        </label>
         
             

           
        <script>
            evenement.activeCorrectionPicto();
        </script>
    
                                </td>
                                
                            </tr>
                            <tr><td colspan="3"></td></tr>
                        </table>
            <script>
    evenement.activeCorrection();
            </script>               

                        <div id="import-button" onclick="construireRoadbook.depuisDonneesBrutes()">
                            <span class="glyphicon glyphicon-cog"></span><?= $expression->generer_roadbook ?>
                        </div>
            
                        <hr class="panel-separateur">

                        
                        <div onclick="evenement.clicImporter()" id="import-rbk">
                            <span class="glyphicon glyphicon-floppy-open"></span><?= $expression->depuis_rbk ?>
                        </div>
                        <form id="uploadZone" class="dropzone" action="" enctype="multipart/form-data" method="POST"></form>
                        
            <script>
    oRBK.charge();
      
            </script>    
                        

                        <hr class="panel-separateur">
                        
                        <h4><b><?= $expression->importer_picto ?></b></h4>

                        <form action="uploadImages.php" enctype="multipart/form-data" method="POST">
                            <div id="img_dest">

                                <select name="categorie" id="cat-select">
                                    <option value=''>- <?= $expression->CHOISIR_CATEGORIE ?> -</option>
                                    <option value="directions" id="cat-direction" class="cat glyphicon glyphicon-floppy-open"><span class="glyphicon glyphicon-hand-right"></span><?= $expression->DIRECTIONS ?></option>
                                    <option value="rondpoints" id="cat-rp" class="cat"><span class="glyphicon glyphicon-record"></span><?= $expression->RONDS_POINTS ?></option>
                                    <option value="panneaux" id="cat-panneaux" class="cat"><span class="glyphicon glyphicon-warning-sign"></span><?= $expression->PANNEAUX ?></option>
                                    <option value="enigmes" id="cat-enigmes" class="cat"><span class="glyphicon glyphicon-question-sign"></span><?= $expression->ENIGMES ?></option>
                                    <option value="elements" id="cat-elements" class="cat"><span class="glyphicon glyphicon-tree-conifer"></span><?= $expression->ELEMENTS ?></option>
                                </select>
                                
                                <input id="categorie_hid" hidden=""/>

            <script>
    evenement.selectCategorie();
            </script> 

                            </div>
                            <div  id="uploadImagesZone" class="dropzone" ></div>

                        </form>
                        
            <script>
    oPictogramme.upload();
            </script> 

                        <div>
                            <input class="check-file" type="text" id="rechercher_fichier" />
                            <span id="fichier_check" class="glyphicon check-file"/></span>
                        </div>
                        <div id="liste_fichiers">

                            <?php echo indexeImages() ?>

                        </div>  
             <script>
    evenement.chercheFichier();
            </script>

            </div>
        </div>        

                <div id="onglet-exports" class="tab">
                    <div class="panel">
                        <h4><b><?= $expression->titre_export ?></b></h4>
                        <hr class="panel-separateur">
                        <p class="infos"><img style="width: 50px; margin-right: 15px;float: left" src="images/rbk.png" /><?= $expression->export_rbk ?></p>
                        <div id="bouton-sauver-projet" onclick="oRBK.telecharge($('#nom_roadbook').val())">

                            <span class=" glyphicon glyphicon-floppy-save ">    
                            </span><?= $expression->sauvegarder_projet ?></div>

                        <hr class="panel-separateur">

                        <p class="infos"><img style="width: 50px; margin-right: 15px;float: left" src="images/pdf.png" /><?= $expression->export_pdf ?></p>

                        <form id="creerPDF" name="creerPDF" action="creerPDF.php" method="post" target="_blank">
                            
                            <textarea  id="html-brut" name="HTML_BRUT" hidden=""></textarea>
                            <input id="nom_roadbook_2" type="text" name="NOM_ROADBOOK" hidden="" />
                            <input id="CSS-perso" type="text" name="CSS_PERSO" hidden="" />
                            
                            <div id="export-button"  onmouseup="document.forms['creerPDF'].submit();
                                                                 $('#html-brut').val('');" >
                                <span class="glyphicon glyphicon-save-file"></span><?= $expression->export_pdf_btn ?></div>

                        </form>

                    </div>
                </div>
                
                <div id="onglet-directions" class="tab">
                    <div class="panel">
                        <p class="infos"></p>

                        <?php echo get_image("./Pictogrammes/directions/") ?>

                    </div>
                </div>

                <div id="onglet-rondpoints" class="tab">

                    <div class="panel">

                        <?php echo get_image("./Pictogrammes/rondpoints/") ?> 
                        
                    </div>
                </div>
                
                <div id="onglet-panneaux" class="tab">
                    <div class="panel">

                        <?php echo get_image("./Pictogrammes/panneaux/") ?>
                        
                    </div>
                </div>
                <div id="onglet-enigmes" class="tab">
                    <div class="panel">

                        <?php echo get_image("./Pictogrammes/enigmes/") ?>
                    
                    </div>
                </div>
                <div id="onglet-elements" class="tab">
                    <div class="panel">

                        <?php echo get_image("./Pictogrammes/elements/") ?>
                        
                    </div>
                </div>
                <div id="onglet-parametres" class="tab">
                    <div class="panel">
                        <h3><?= $expression->PARAMETRES ?>
                            <a href="" title="<?= $expression->doit_rafraichir ?>" class="glyphicon glyphicon-refresh refresh"></a>
                        </h3>
                        <? include 'includes/tableau_parametres.inc'; ?>
    <script src="jQuery/colorPicker/color_picker-mbA.js"></script>
                    </div>
                </div>
                
                <div id="onglet-formulaire" class="tab">
                    <div class="panel">

                        <p class="infos">Créer un formulaire</p>
                        <div id="ajouter-entete"  onmouseup="" >
                            <span class=" glyphicon glyphicon-plus glyphicon "></span><?= $expression->ajouter ?></div>
                    
                    <textarea id="form-enigme" value="question">qsdsd</textarea>
                    <div id="ajouter-enigme"  onmouseup="$('#html-brut').val('');" >
                        <span class=" glyphicon glyphicon-plus glyphicon "></span><?= $expression->ajouter ?></div>
                </div>
                </div>
                
        <script>
    evenement.ajouteEnteteForm();
    evenement.ajouteEnigme();
        </script>
                
                <div id="onglet-editeur" class="tab">
                    <div class="panel">

                        <p class="infos">Ici, on pourra créer ses propres pictogrammes</p>
                        
                    </div>
                </div>

                <div id="onglet-aide" class="tab">
                    <div class="panel">

                        <p class="infos">https://roadbook.alexp.fr/wiki/</p>
                        
                        <h3>Console d'activité</h3>
                        
                        <div id="console"></div>
                    </div>
                </div>
            </div>
        </td>
        
        <td>
            <div style="height: 800px;padding: 25px; overflow:auto" id="roadbook-editable">
                <div id="feuille-roadbook">       
                    <!--            Le contenu de cette balise est généré -->
                </div>                
            </div>
        </td>
    </tr>

</table> 

    </body>
    
</html>
