<?php
ini_set('display_errors', 1);

require '../reglages.php';
$reglage = new reglages();
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>PICTO-CREATOR</title>
        <link href="../images/logoRBC.png" rel="shortcut icon" type="image/x-icon" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="../jQuery.src/jquery-3.5.1.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <!--<script type="text/javascript" src="https://cdn.rawgit.com/prashantchaudhary/ddslick/master/jquery.ddslick.min.js" ></script>-->



        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> 


        <script src="../jQuery.src/bootstrap-3.3/js/bootstrap.js"></script>
        <link rel="stylesheet" href="../jQuery.src/bootstrap-3.3/css/bootstrap.css">



        <link rel="stylesheet" href="../css/style.css" type="text/css" />
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/ddmenu.css">

        <!--<link rel="stylesheet" href="jQuery/colorPicker/la_color_picker.css">-->

        <script src="dessin.js"></script>
        <script src="evenements.js"></script>
        <script src="pictogrammes.js"></script>
<!--        <script>var canvas1 = new dessin('canvas1');</script>
        <script>var canvas2 = new dessin('canvas2');</script>
        <script>var canvas3 = new dessin('canvas3');</script>
        <script>var canvas1_sup = new dessin('canvas1_sup');</script>
        <script>var canvas1_inf = new dessin('canvas1_inf');</script>
        <script>var calque1 = new dessin('calque1');</script>
        <script>var calque1_sup = new dessin('calque1_sup');</script>
        <script>var calque1_inf = new dessin('calque1_inf');</script>
        <script>var calque2 = new dessin('calque2');</script>-->

        <script>var ev = new Evenement();</script>
        <script>var elsupp = new elementSupp();</script>

        <style>



        </style>
    </head>
    <body style="background-color: ">
        <!--Barre suppérieure-->
        <h1 id="titre_site" class="titre_site">
            <img alt="" height="50" style="float: left; margin-right: 10px" src="./images/logoRBC.png"/>
            <b><a style="border: none" href="">PICTO CREATOR</a></b> <span style="font-size: 0.5em">by Alex</span>
            <br>
            <span style="font-size: 0.3em;margin-left:50px; margin-bottom: 100px"><a id="RBCversion">v. <?= $reglage->POC_version ?></a></span>
        </h1>




        <table id="principal">
            <tr>
                <th class="col-gauche">OUTILS</th>

                <th class="col-droite">APERCU</td>
            </tr>
            <tr>
                <td><table id="reglages">

<!--                        <tr><td class="choix-picto-type" id="L1">

                            </td>
                            <td>Quel type de pictogramme voulez-vous créer ?</td>
                            <td><select class="" id="type-picto">

                                    <option value="rp">ROND POINT</option>
                                    <option value="dnp">DIRECTION NON PRIORITAIRE</option>
                                    <option value="dp">DIRECTION PRIORITAIRE</option>
                                    <option value="pp">PICTO PERSONALISE</option>
                                </select>
                                <script>
                                    ev.regleTypePicto();
                                </script>
                            </td>
                        </tr>-->
                        <?php $class_off = 'glyphicon glyphicon-off'; ?>
                        <tr >
                            <td id="L2" class="col-1 choix-picto-type non-selectionne" >
                                <span class="<?= $class_off ?>"></span>
                            </td>
                            <td class="L2 reglage"><img src="./img/rp.jpg" width="100"/></td>
                            <td class="col-2 L2 reglage">
                                <p>La sortie est à <select class="" id="angle-rp" >

                                        <option value="135">135°</option>
                                        <option value="90">90°</option>
                                        <option value="45">45°</option>
                                        <option value="0">0°</option>
                                        <option value="315">315°</option>
                                        <option value="270">270°</option>
                                        <option value="225">225°</option>
                                    </select></p>
                                    <script>
                                        ev.regleAngleRP();
                                    </script>
                                    <p>C'est la <select class="" id="sortie-rp" >

                                        <option value="1">première</option>
                                        <option value="2">deuxième</option>
                                        <option value="3">troisième</option>
                                        <option value="4">quatrième</option>
                                        <option value="5">cinquième</option>

                                        </select> sortie</p>
                                    <script>
                                                ev.regleNumSortie();
                                    </script></td>
                            <td colspan="" style="border: 0px" class="col-3">
                                <div id="outils">
                                    <span class="glyphicon glyphicon-download-alt" id="telecharge"> </span>
                                    <script>ev.telechargePicto();</script>
                                    <span class="glyphicon glyphicon-trash" id="effaceCalque"> </span>
                                </div>


                                <div id="calques">
                                    <canvas etat="nonSel" class="calqNonSel calque" id="calque1_sup" height="50" width="50" style=""></canvas>
                                    <canvas etat="nonSel" class="calqNonSel calque" id="calque1" height="50" width="50" style=""></canvas>
                                    <canvas etat="nonSel" class="calqNonSel calque" id="calque1_inf" height="50" width="50" style=""></canvas>
                                    <canvas etat="nonSel" class="calqNonSel calque" id="calque2" height="50" width="50" style=""></canvas>
                                </div>
                                <script>ev.selectionneCalque();</script>
                                <script>ev.effaceCalque();</script>

                            </td>
                        </tr>
                        <tr >
                            <td  class="choix-picto-type non-selectionne" id="L3">
                                <span class="<?= $class_off ?>"></span>
                            </td>
                            <td class="L3 reglage"><img src="./img/dnp.jpg" width="100"/>
                            </td>
                            <td class="L3 reglage">
                                <p>La direction va à <select class="" id="angle-dnp" >

                                        <option value="135">135°</option>
                                        <option value="90">90°</option>
                                        <option value="45">45°</option>
                                        <option value="0">0°</option>
                                        <option value="315">315°</option>
                                        <option value="270">270°</option>
                                        <option value="225">225°</option>
                                    </select> degrés</p>

                                <script>ev.regleAngleDirNonPrio();</script>
                            </td>

                        </tr>

                        <tr id="dirP">
                            <td  class="choix-picto-type non-selectionne" id="L4">
                                <span class="<?= $class_off ?>"></span>
                            </td>
                            <td class="L4 reglage"><img src="./img/dp.jpg" width="100"/>
                            </td>
                            <td class="L4 reglage">
                                <p>

                                    La direction va à <select class="" id="cote-dirprio" >
                                        <option value="Gauche">Gauche</option>
                                        <option value="Droite">Droite</option>

                                    </select> </p>
                                    <p id="dirLargeurSlider" ></p>
                                    <p id="dirHauteurSlider" ></p>
                            </td>
                            <td class="col-4 L4 reglage">
                                <p class="sliderAAA">
                                    <label for="dirLargeur">L. : </label>
                                    <input type="text" id="dirLargeur" readonly style="" class="coords">

                                </p>

                                <p class="sliderAAA">
                                    <label for="dirHauteur">H. : </label>
                                    <input type="text" id="dirHauteur" readonly style="" class="coords">

                                </p>
                                <script>
//                        var cote =  ev.regleCote();
                        ev.sliderDirPrio('dirLargeurSlider', 'dirLargeur');
                        ev.sliderDirPrio('dirHauteurSlider', 'dirHauteur');
                        ev.regleCote();
                                </script>

                            </td>
                        </tr>
                        <tr> <td  class="choix-picto-type non-selectionne" id="L5">
                                <span class="<?= $class_off ?>"></span>
                            </td>
                            <td class="L5 reglage"><img src="./img/di.jpg" width="100"/>
                            </td>
                            <td class="L5 reglage">
                                <p>La direction va à <select class="" id="angle-dir-rouge">

                                        <option value="135">135°</option>
                                        <option value="90">90°</option>
                                        <option value="45">45°</option>
                                        <option value="0">0°</option>
                                        <option value="315">315°</option>
                                        <option value="270">270°</option>
                                        <option value="225">225°</option>
                                    </select> degrés (préréglé)</p>

                                <script>ev.regleAngleDirRouge();</script>


<!--                                <p>La direction va de
                                    <input type="text" value="0" class="coords" id="coords-dep"> px à
                                    <input type="text" value="0" class="coords" id="coords-fin"> px</p>-->

                                <script>ev.regleAngleDirRouge();</script>
                            </td>
                            <td>
                                Il est aussi possible de tracer une direction rouge manuellement directement sur le pictogramme
                            </td>

                        </tr>

                        <tr> <td  class="choix-picto-type non-selectionne" id="L6">
                                <span class="<?= $class_off ?>"></span>
                            </td>
                            <td class="L6 reglage">
                                <img src="./img/arb.jpg" width="100"/>
                            </td>
                            <td class="L6 reglage">

                                <?php
                                $liste_elem_sup = scandir('./images/');

                                $elmt_p = '';
                                $elmt;

                                foreach ($liste_elem_sup as $element) {

                                    if ($element != '.' AND $element != '..') {
                                        $elmt = explode("_", $element)[0];

                                        if ($elmt !== $elmt_p) {
                                            if ($elmt_p !== '') {
                                                echo "</div>";
                                                echo '</div>';
                                            }

                                            echo '<div class="dropdown">';
                                            
                                            echo ' <img class="dropbtn elem_supp" onclick="ev.afficheElmtSupp(\'' . $elmt . '\')"  width="80" src="https://roadbook.alexp.fr/PICTOCREATOR/images/' . $element . '"/>';
                                            echo '<div id="' . $elmt . '" class="dropdown-content">';
                                            echo '<h5>' . $elmt . '</h5>';
//                                            echo '<select id="poi">';
                                        }

                                        $elmt_p = $elmt;
                                        echo '<img class="elem_supp" id="" width="40" src="https://roadbook.alexp.fr/PICTOCREATOR/images/' . $element . '"/>';
//                                        echo '<option style="' . $style . '"><img class="elem_supp" id="' . $element . '" width="30" src="./images/' . $element . '"/>' . $element . '</option>';
                                    }
                                    
                                }echo '</div>';
                                ?>
                                <script>

                                </script>
                            </td>
                            <td class="L6 reglage">

                                <p>
                                    <input type="radio" id="c1" name="canvas" value="canvas1_sup"
                                           checked>
                                    <label for="c1">Au-dessus</label>
                                    <span class="glyphicon glyphicon-erase"></span>
                                </p>
                                <p>
                                    <input type="radio" id="c2" name="canvas" value="canvas1_inf"
                                           checked>
                                    <label for="c2">En-dessous</label>
                                    <span class="glyphicon glyphicon-erase"></span>
                                </p>
                                <hr class="panel-separateur">

                                <p id="pannonceau">
                                    <input type="radio" id="p1" name="pannonceau" value="RN"
                                           checked>
                                    <label for="c1">RN</label>
                                    <input type="radio" id="p2" name="pannonceau" value="RD"
                                           checked>
                                    <label for="c1">RD</label>
                                    <input type="button" id="creePannonceau" />
                                    <input type="text" id="num_route"/>
                                </p>
                                <script>ev.creePannonceau();</script>
                            </td>
                            <td class="L6 reglage">
                                <p class="">
                                        <label for="xElemSupp">x : </label>
                                    <input type="number" id="xElemSupp" onchange="alert(this.value)" min="0" max="500" step="10" style="" class="coords" >
                                </p>
                                <p>
                                    <label for="yElemSupp">y : </label>
                                    <input type="number" id="yElemSupp" readonly style="" class="coords">

                                </p>
                                <p>
                                    <label for="taille">L : </label>
                                    <input type="number" min="100" max="500" step="25" id="taille"  style="" class="coords" value="200">
                                </p>
                                </td>

                        <script>

                            ev.ajouteElement();
                        </script>
                    </tr>


                    </table>


<!--                    <input type="number" min="1" max="5" />
                    <input type="text" value="" id="imgsrc"/>-->
                </td>


                <td style="vertical-align: top;">
                    <div class="" id="x_y-souris">
                        <span class="active" id="xSouris" >x : 0</span>
                        <span> / </span>
                        <span id="ySouris" >y : 0</span>
                    </div>

                    <div class="conteneur">

                        <canvas id="canvas1_sup" height="500" width="500" onclick="" style=""></canvas>
                        <canvas id="canvas1" height="500" width="500" onclick="" style=""></canvas>
                        <canvas id="canvas1_inf" height="500" width="500" onclick="" style=""></canvas>
                        <canvas id="canvas2" height="500" width="500" onclick="" style=""></canvas>
                        <canvas id="canvas3" height="500" width="500" onclick=""  style=""></canvas>



                    </div>

                </td>
            </tr>



        </table>
        <canvas id="canvasFinal" height="500" width="500" onclick=""  style="display: none"></canvas>

        <script>
                   //  document.getElementById("canvas").addEventListener("click", maFonction('click'));
//                   ev.recupCoordsSouris($('#canvas1_sup'));
ev.topCanvasAction();
                    ev.choixPicto();

                   

                     var canvasLargeur = $('#canvas1').width();
                     var canvasHauteur = $('#canvas1').height();

                     var picto = new picto(canvasLargeur, canvasHauteur);
                     var oDirection = new Direction();
                     var oDirectionRouge = new DirectionRouge();

                     var rp = new RondPoint();

    

//                     var pts = {A:{x : 180, y : 130},B:{x : 150, y : 200}, C:{x : 10, y : 10}, D:{x:300, y:100}};
//                     var pts;
//                     pts.A.x = 10;
//                     pts.A.y = 10;
//                     pts.B.x = 200;
//                     pts.B.y = 20;
//                     pts.C.x = 150;
//                     pts.C.y =150;
//                     canvas1.polygonePlein(pts, 'red');
                     
                     
                     




        </script>
        <script>
                $( "canvas" ).each(function( index ) {
window[this.id] = new dessin(this.id);

        });</script>


    </body>
</html>
