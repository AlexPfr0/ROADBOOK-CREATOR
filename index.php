<?php
ini_set('display_errors', 1);

include 'fonctions/fonctions.php';

// Initialisation des paramètres
// Récupération des cookies
require 'reglages.php';
$reglage = new reglages();

$langage_COOKIE = filter_input(INPUT_COOKIE, '_RBC_Langage');
$decimal_COOKIE = filter_input(INPUT_COOKIE, '_RBC_nbDecimales');
$couleurLignes_COOKIE = filter_input(INPUT_COOKIE, '_RBC_borderColor');
$couleurD_inter_COOKIE = filter_input(INPUT_COOKIE, '_RBC_dInterColor');
$couleurD_parcourue_COOKIE = filter_input(INPUT_COOKIE, '_RBC_dParcourueColor');
$couleurD_restante_COOKIE = filter_input(INPUT_COOKIE, '_RBC_dRestanteColor');
$couleurPied_page_COOKIE = filter_input(INPUT_COOKIE, '_RBC_piedPage');
$couleurCommentaires_COOKIE = filter_input(INPUT_COOKIE, '_RBC_commentairesColor');
$nom_utilisateur_COOKIE = filter_input(INPUT_COOKIE, '_RBC_User');
$validite_cookies_COOKIE = filter_input(INPUT_COOKIE, '_RBC_CookiesValidite');
$unite_mesure_COOKIE = filter_input(INPUT_COOKIE, '_RBC_UniteMesure');
$colonne_unique_COOKIE = filter_input(INPUT_COOKIE, '_RBC_ColonneUnique');

$valeur_case_1_COOKIE = filter_input(INPUT_COOKIE, '_RBC_ValCase_1');
//$valeur_case_2_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_ValCase_2');
//$valeur_case_3_COOKIE           = filter_input(INPUT_COOKIE, '_RBC_ValCase_3');
// Si le cookie existe, alors on règle le paramètre avec ce dernier.

if (isset($langage_COOKIE) && !empty($langage_COOKIE)) {
    $reglage->langage = $langage_COOKIE;
}

if (isset($decimal_COOKIE) && !empty($decimal_COOKIE)) {
    $reglage->decimal = $decimal_COOKIE;
}
if (isset($couleurLignes_COOKIE) && !empty($couleurLignes_COOKIE)) {
    $reglage->couleur_lignes = $couleurLignes_COOKIE;
}
if (isset($couleurD_inter_COOKIE) && !empty($couleurD_inter_COOKIE)) {
    $reglage->couleur_d_inter = $couleurD_inter_COOKIE;
}
if (isset($couleurD_parcourue_COOKIE) && !empty($couleurD_parcourue_COOKIE)) {
    $reglage->couleur_d_parcourue = $couleurD_parcourue_COOKIE;
}
if (isset($couleurD_restante_COOKIE) && !empty($couleurD_restante_COOKIE)) {
    $reglage->couleur_d_restante = $couleurD_restante_COOKIE;
}
if (isset($couleurPied_page_COOKIE) && !empty($couleurPied_page_COOKIE)) {
    $reglage->pied_page = $couleurPied_page_COOKIE;
}
if (isset($couleurCommentaires_COOKIE) && !empty($couleurCommentaires_COOKIE)) {
    $reglage->couleur_commentaires = $couleurCommentaires_COOKIE;
}
if (isset($nom_utilisateur_COOKIE) && !empty($nom_utilisateur_COOKIE)) {
    $reglage->nom_utilisateur = $nom_utilisateur_COOKIE;
}
if (isset($validite_cookies_COOKIE) && !empty($validite_cookies_COOKIE)) {
    $reglage->validite_cookies = $validite_cookies_COOKIE;
}
if (isset($unite_mesure_COOKIE) && !empty($unite_mesure_COOKIE)) {
    $reglage->unite_mesure = $unite_mesure_COOKIE;

    if ($unite_mesure_COOKIE === 'imperial') {
        $reglage->unite_abbrev = 'mi';
    } else {
        $reglage->unite_abbrev = 'km';
    }
}
if (isset($colonne_unique_COOKIE) && !empty($colonne_unique_COOKIE)) {
    $reglage->colonne_unique = $colonne_unique_COOKIE;
}
if (isset($valeur_case_1_COOKIE) && !empty($valeur_case_1_COOKIE)) {
    $reglage->valeur_case_1 = $valeur_case_1_COOKIE;
}
//if (isset($valeur_case_2_COOKIE ) && !empty($valeur_case_2_COOKIE)) {
//    $reglage->valeur_case_2 = $valeur_case_2_COOKIE;
//}
//if (isset($valeur_case_3_COOKIE ) && !empty($valeur_case_3_COOKIE)) {
//     $reglage->valeur_case_3 = $valeur_case_3_COOKIE;
//}
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

        <script src="jQuery/Annexe.js"></script>
        <script>var oAnnexe = new Annexe();</script>

        <script src="jQuery/pictogramme.js"></script>
        <script>var oPictogramme = new Pictogramme();</script>

        <script src="jQuery/ElementTable.js"></script>
        <script>var elementTable = new ElementTable();</script>

        <script src="jQuery/ConstruireRoadbook.js"></script>
        <script>var construireRoadbook = new ConstruireRoadbook();</script>

        <script src="jQuery/ConstruireRoadbook_1Colonne.js"></script>
        <script>var construireRoadbook_1Col = new ConstruireRoadbook_1Col();</script>

        <script src="jQuery/ConstruireAnnexe.js"></script>
        <script>var construireAnnexe = new ConstruireAnnexe();</script>


        <script src="jQuery/calculerDistances.js"></script>
        <!-- La fonction calculerDistance() peut prendre un paramètre 
        pour régler le nb de chiffres après la virgule. Par défaut : 3 
        Cette option est réglée dans les paramètres-->
        <script>var calculerDistance = new CalculerDistance(<?= $reglage->decimal ?>);</script>

        <script src="jQuery/Evenements.js"></script>
        <script>var evenement = new Evenements();</script>

        <script src="jQuery/ActionCookies.js"></script>
        <script>actionCookies = new ActionCookie();</script>

        <!--https://www.jqueryscript.net/other/Highly-Customizable-jQuery-Toast-Message-Plugin-Toastr.html-->
        <link href="./jQuery/notifications/toastr.scss" rel="stylesheet">
        <script src="./jQuery/notifications/toastr.js"></script>
        <script src="jQuery/Notifications.js"></script>
        <script>oNotif = new Notification();</script>

        <!--       Initialisation de la langue côté client.
               Pour tout ce qui est généré avec javascript-->
        <script src="langages/<?= $reglage->langage ?>.js"></script>
        <script>expression = new Langage();</script>


        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <link rel="stylesheet" href="css/vertical-tabs.css" type="text/css" />
        <link rel="stylesheet" href="css/tableau_parametres.css" type="text/css" />
        <link rel="stylesheet" href="css/choix_liste_cat.css" type="text/css" />
        <link rel="stylesheet" href="css/console.css" type="text/css" />
        <link rel="stylesheet" href="css/annexe.css" type="text/css" />

        <script src="jQuery/dropzone/dropzone.js"></script>
        <link rel="stylesheet" href="jQuery/dropzone/dropzone.css" type="text/css" />

        <title>ROADBOOK CREATOR - by Alex</title>
        <link href="images/logoRBC.png" rel="shortcut icon" type="image/x-icon" />

        <style>
            .d_restante{
                color: <?= $reglage->couleur_d_restante ?>;
            }
            .d_inter{
                color: <?= $reglage->couleur_d_inter ?>;
            }
            .d_parcourue{
                color: <?= $reglage->couleur_d_parcourue ?>;
            }
            .page td{
                border-color: <?= $reglage->couleur_lignes ?>;
            }
            .commentaires{
                color: <?= $reglage->couleur_commentaires ?>;
            }

        </style>

    </head>     

    <body id="main-body">


        <!--Barre suppérieure-->
        <h1 id="titre_site" class="titre_site">
            <img height="50" style="float: left; margin-right: 10px" src="./images/logoRBC.png"/>
            <b><a style="border: none" href="">ROADBOOK CREATOR</a></b> <span style="font-size: 0.5em">by Alex</span>
            <br>
            <span style="font-size: 0.3em;margin-left:50px; margin-bottom: 100px"><a id="RBCversion">v. <?= $reglage->RBC_version ?></a></span>
        </h1>

        <script>

            // Notifie la présence d'un roadbook dans les cookies
            var nomRBK = actionCookies.litCookie('_RBK_nom');

            var f = function () {
                construireRoadbook.depuisCookie(actionCookies.litCookie('_RBK_DernierRB'));
            };
            if (nomRBK !== null) {
                oNotif.warning('Le projet <u>' + nomRBK + '</u> est en attente ! Cliquez pour le charger.', 
                {onclick: f});

                if (actionCookies.litCookie('_RBK_annexe') !== null) {
                    oNotif.warning('Une annexe est aussi en attente !');
                }
            }
            ;
        </script>


        <!--2nd barre (infos sur le roadbook)-->
        <div id="infos_roadbook">
            <table id="toolbar">
                <tr>
                    <td class="ir-left" >
                        <a href="#toolbar" title="<?= $expression->IB_plein_ecran ?>"><span class="glyphicon glyphicon-fullscreen"></span></a>
                        <a id="affiche-outil" title="<?= $expression->IB_afficher_outils ?>"><span class="glyphicon glyphicon-plus"></span></a>
                        <script>evenement.afficheOutils();</script>

                        <span><a id="RBCuser"><b><?= $reglage->nom_utilisateur ?></b></a></span>
                    </td>

                    <td class="ir-right">
                        <span class="glyphicon glyphicon-file" id="fichier"></span>
                        <span class="aaa"><span class="label">auteur</span><br/><span class="" id="RBKauteur"></span></span>
                        <span class="aaa"><span class="label">version</span><br/><span class="" id="RBKversion"></span></span>
                        <span class="aaa"><span class="label">date</span><br/><span class="" id="RBKdate"></span></span>
                        <span class="aaa"  style="border-right: none"><span  class="label">langue</span><br/><span class="" id="RBKlangage"></span></span>

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
            <span title="<?= $expression->IB_activer_DPR ?>" class="outil glyphicon glyphicon-move"><input type="text" id="mode-correction-picto"  value="inactif" hidden="" />
                <label class="switch" style="margin-bottom: 0px;top: -2px;bottom: 0px;">
                    <input  id="corriger-picto" type="checkbox" value="" >
                    <span class="slider"></span>
                </label><script>
                    evenement.activeCorrectionPicto();
                </script>
            </span>
            <span title="<?= $expression->IB_sauvegarde_RB_cookies ?>" class="outil glyphicon glyphicon-floppy-disk" onclick="oRBK.enregRBKcookie();"> </span>
            <span title="<?= $expression->IB_recuperer_RB_cookies ?>" class="outil glyphicon glyphicon-time" onclick="construireRoadbook.depuisCookie(actionCookies.litCookie('_RBK_DernierRB'))"> </span>
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
                            <!--<li><a id="elements" class="onglet"><span class="glyphicon glyphicon-tree-conifer"></span><?= $expression->ELEMENTS ?></a></li>-->
                            <li><a id="parametres" class="onglet" ><span class="glyphicon glyphicon-wrench"></span><?= $expression->PARAMETRES ?></a></li>
                            <li><a id="annexe" class="onglet" ><span class="glyphicon glyphicon-list-alt"></span><?= $expression->ANNEXE ?></a></li>
                            <!--<li><a id="editeur" class="onglet"><span class="glyphicon glyphicon-user"></span>EDITEUR (wip)</a></li>-->
                            <li><a id="aide" class="onglet"><span class="glyphicon glyphicon-education"></span><?= $expression->AIDE ?></a></li>
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
                                            <textarea title="<?= $expression->IB_collerPP ?>" id="data-brute"></textarea>
                                        </td>
                                        <td>
                                            <input type="text" id="mode-correction"  value="inactif" hidden="" />
                                            <label title="<?= $expression->IB_activer_correction_distance ?>" class="switch-v" style="margin-bottom: 0px;top: -2px;bottom: 0px;">
                                                <input  id="corriger-distances" type="checkbox" value="" >
                                                <span class="slider-v" > </span>
                                            </label>
                                            <script>
                                                evenement.activeCorrectionPicto();
                                            </script>

                                        </td>

                                    </tr>
                                    <tr><td colspan="3">
                                            <p style="">

                                                <input type="text" id="url" value="" placeholder="URL Kurviger"/>
                                                <!--<input type="button" value="R" id="valideUrl" />-->
                                            <!--<button >-->
                                            <span id="valideUrl" class="glyphicon glyphicon-globe"
                                                  onmouseup="evenement.chargeCarteKurviger($('#url').val())"></span>
                                            <!--</button>-->
                                            </p>
                                        </td></tr>
                                </table>
                                <script>
                                    evenement.activeCorrection();
                                </script>
                                <script>
                                    var oConstruireRB;
                                    if (actionCookies.litCookie('_RBC_ColonneUnique') === 'non') {
                                        oConstruireRB = construireRoadbook;
                                    } else {

                                        oConstruireRB = construireRoadbook_1Col;

                                    }
                                </script>
                                <div id="import-button" class="bouton noselect"onclick="oConstruireRB.depuisDonneesBrutes()">
                                    <span class="glyphicon glyphicon-cog"></span><?= $expression->generer_roadbook ?>
                                </div>

                                <hr class="panel-separateur">


                                <div onclick="evenement.clicImporter()" id="import-rbk" class="bouton noselect">
                                    <span class="glyphicon glyphicon-floppy-open"></span><?= $expression->depuis_rbk ?>
                                </div>
                                <form id="uploadZone" class="dropzone" action="" enctype="multipart/form-data" method="POST"></form>

                                <script>
                                    oRBK.charge();

                                </script>


                                <hr class="panel-separateur">


                                <div onclick="evenement.clicImporter_picto()" id="import-picto" class="bouton noselect">
                                    <span class="glyphicon glyphicon-picture" style="margin-left: 2px"></span><?= $expression->importer_picto ?>
                                </div>
                                <p><a target="_blank" href="./PICTOCREATOR/"><?= $expression->creer_nouv_picto ?></a></p>

                                <form action="uploadImages.php" enctype="multipart/form-data" method="POST">

                                    <div  id="uploadImagesZone" class="dropzone" ></div>

                                </form>

                                <script>
                                    oPictogramme.upload();
                                </script>

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
                                <div class="bouton noselect" id="bouton-sauver-projet" onclick="oRBK.telecharge($('#nom_roadbook').val())">

                                    <span class=" glyphicon glyphicon-floppy-save ">
                                    </span><?= $expression->sauvegarder_projet ?></div>

                                <hr class="panel-separateur">

                                <p class="infos"><img style="width: 50px; margin-right: 15px;float: left" src="images/pdf.png" /><?= $expression->export_pdf ?></p>

                                <form id="creerPDF" name="creerPDF" action="creerPDF.php" method="post" target="_blank">

                                    <textarea  id="html-brut" name="HTML_BRUT" hidden=""></textarea>
                                    <input id="nom_roadbook_2" type="text" name="NOM_ROADBOOK" hidden="" />
                                    <input id="CSS-perso" type="text" name="CSS_PERSO" hidden="" />

                                    <div id="export-button" class="bouton noselect" onmouseup="document.forms['creerPDF'].submit();
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

                        <div id="onglet-annexe" class="tab">
                            <div class="panel">

                                <h4><b><?= $expression->ANNEXE ?></b></h4>

                                <hr class="panel-separateur">

                                <div id="ajouter-entete" class="bouton noselect">
                                    <span class=" glyphicon glyphicon-plus glyphicon "></span><?= $expression->creer_annexe ?>
                                </div>

                                <hr class="panel-separateur">
                                <span><?= $expression->numero_enigme ?> </span><input id="id_enigme" type="number" name="ID_ENIGME"  value="0"/>

                                <div id="ajouter-enigme" class="bouton noselect">
                                    <span class=" glyphicon glyphicon-plus glyphicon"></span><?= $expression->ajouter_enigme ?>
                                </div>

                                <hr class="panel-separateur">

                                <div id="supprimer-enigme" class="bouton noselect">
                                    <span class=" glyphicon glyphicon-minus glyphicon "></span><?= $expression->retirer_enigme ?>
                                </div>

                                <form id="creerPDFannexe" name="creerPDFannexe" action="creerPDFannexe.php"
                                      accept-charset=""method="post" target="_blank">
                                    <textarea  id="html-brut-annexe" name="HTML_BRUT_ANNEXE" hidden=""></textarea>
                                    </form>

                                    <hr class="panel-separateur">

                                    <div id="export-annexe-button"
                                         class="bouton noselect"
                                         onmouseup="document.forms['creerPDFannexe'].submit();
                                            $('#html-brut-annexe').val('');" >

                                        <span class="glyphicon glyphicon-save-file"></span><?= $expression->export_pdf_btn ?>
                                    </div>

                                    <hr class="panel-separateur">

                                    <div id="save-annexe-button" class="bouton noselect" onclick="oAnnexe.enregAnnexecookie()">
                                    <span class="glyphicon glyphicon-list-alt"></span><?= $expression->enregistrer_annexe ?>
                                </div>

                                <hr class="panel-separateur">

                                <div id="import-annexe-button" class="bouton noselect" onclick="construireAnnexe.depuisCookie()">
                                    <span class="glyphicon glyphicon-list-alt"></span><?= $expression->recuperer_annexe ?>
                                </div>
                            </div>
                        </div>

                        <script>
                            evenement.imprimerAnnexe();
                            evenement.ajouteEnteteForm();
                            evenement.ajouteEnigme();
                            evenement.supprimeEnigme();
                        </script>

                        <div id="onglet-aide" class="tab">
                            <div class="panel">

                                <p class="infos"><a href="https://roadbook.alexp.fr/wiki/" target="_blank">Documentation Roadbook Creator</a></p>

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
        <!--Minimap kurviger-->
        <div id="mapframe" hidden="">

            <iframe id="iframeMap" src="https://kurviger.de/fr" width="1024" height="768" scrolling="no">

            </iframe>
        </div>

        <script type="text/javascript">
            
//            $('#valideUrl').mouseup(function () {
//
//                $('#iframeMap').attr('src', $('#url').val());
//                $('#mapframe').show();
//jQuery(document).ready(function () {
//                $("#mapframe").scrollTop(0).scrollLeft(1000);
//            });
//            });
            
        </script>
    </body>

</html>
