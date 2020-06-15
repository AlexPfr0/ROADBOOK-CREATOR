<!--Bloc html du tableau des paramètres-->

<table id="parametres">
    <tr>
        <td class="descriptions">

            <?= $expression->nom_utilisateur ?>
        </td>
        <td id="nom_utilisateur" class="valeurs" contenteditable="true"><?= $reglage->nom_utilisateur ?></td>
    </tr>
    <tr>
        <td class="descriptions">
            <span><?= $expression->langage ?></span>
        </td>
        <td class="valeurs"> 
            <select id="langage">
                <?
                $langages = $reglage->langages_liste;
                $option = '';
                foreach ($langages as $l => $langue){
                    $option .= '<option';
                    if ($reglage->langage == $langue) {
                    $option .= ' selected="selected" ';
                }
                    $option .= ' value="'.$langue.'">';
                    $option .= $l;
                    $option .= '</option>';
                    
                }
                echo $option;
                
                ?>
            </select>

        </td>
    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->unite_mesure ?> (wip)
        </td>
        <td>
            <select id="unite-mesure">
                <option <?php
                if ($reglage->unite_mesure == 'metric') {
                    echo ' selected="selected" ';
                }
                ?> value="metric"><?= $expression->unites[0] ?></option>
                <option <?php
                if ($reglage->unite_mesure == 'imperial') {
                    echo ' selected="selected" ';
                }
                ?> value="imperial"><?= $expression->unites[1] ?></option>

            </select></td>
    </tr>
    <tr>
        <td class="descriptions">
            <span><?= $expression->chiffres_virgule ?></span>
        </td>
        <td class="valeurs" > 
            <select id="nb-decimales">
                <option <?php
                if ($reglage->decimal == 1) {
                    echo ' selected="selected" ';
                }
                ?> value="1">1</option>
                <option <?php
                if ($reglage->decimal == 2) {
                    echo ' selected="selected" ';
                }
                ?> value="2">2</option>
                <option <?php
                if ($reglage->decimal == 3) {
                    echo ' selected="selected" ';
                }
                ?> value="3">3</option>
            </select>
        </td>
    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->colonne_unique ?> (wip)
        </td>
        <td class="valeurs"> 

            <select id="colonne-unique">
                <option <?php
                if ($reglage->colonne_unique == 'non') {
                    echo ' selected="selected" ';
                }
                ?> value="non"><?= $expression->non ?></option>
                <option <?php
                if ($reglage->colonne_unique == 'oui') {
                    echo ' selected="selected" ';
                }
                ?> value="oui"><?= $expression->oui ?></option>

            </select>
        </td>

    </tr>   



    <tr>
        <td colspan="2" class="section">

            <?= $expression->couleurs ?>
        </td>


    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->lignes_rb ?>
        </td>
        <td id="couleur-bordure" class="valeurs"> 

            <input <? echo generer_style($reglage->couleur_lignes) ?>
                type="text" id="borderColor" class="colorPicker target-page" value="<?php echo $reglage->couleur_lignes ?>" />
            <div class="palette" id="Palette-borderColor"></div>
        </td>

    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->d_inter ?>
        </td>
        <td class="valeurs"> 
            <input <? echo generer_style($reglage->couleur_d_inter) ?>
                type="text" id="dInterFontColor" class="colorPicker target-d_inter" value="<?php echo $reglage->couleur_d_inter ?>" />
            <div class="palette" id="Palette-dInterFontColor"></div>

        </td>


    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->d_restante ?>
        </td>
        <td class="valeurs"> 
            <input <? echo generer_style($reglage->couleur_d_restante) ?> 
                type="text" id="dRestanteFontColor" class="colorPicker target-d_restante" value="<?php echo $reglage->couleur_d_restante ?>"/>
            <div class="palette" id="Palette-dRestanteFontColor"></div>

        </td>


    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->d_parcourue ?>
        </td>
        <td class="valeurs"> 
            <input 
                <? echo generer_style($reglage->couleur_d_parcourue) ?> type="text" id="dParcouruesFontColor" class="colorPicker target-d_parcourue" value="<?php echo $reglage->couleur_d_parcourue ?>"/>
            <div class="palette" id="Palette-dParcouruesFontColor"></div>
 </td>
 </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->commentaires ?>
        </td>
        <td class="valeurs"> 
            <input <? echo generer_style($reglage->couleur_commentaires) ?> 
                type="text" id="commentaireFontColor" class="colorPicker target-commentaire" value="<?php echo $reglage->couleur_commentaires ?>"/>
            <div class="palette" id="Palette-commentaireFontColor"></div>

        </td>


    </tr>


    <tr>
        <td class="descriptions">
            <?= $expression->pied_page ?> (wip)
        </td>
        <td class="valeurs" id="piedPage" contenteditable="true"><?php echo $reglage->pied_page ?></td>
    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->validite_cookies ?>  
        </td>
        <td id="validite_cookies" class="valeurs" contenteditable="true"><?= $reglage->validite_cookies ?></td>
    </tr>
    <tr>
        <td class="descriptions">
            Valeur case 1 (wip)
        </td>
        <td id="" class="valeurs" contenteditable="true"></td>
    </tr>
    <tr>
        <td class="descriptions">
            Valeur case 2 (wip) 
        </td>
        <td id="" class="valeurs" contenteditable="true"></td>
    </tr>
    <tr>
        <td class="descriptions">
            Valeur case 3 (wip)
        </td>
        <td id="" class="valeurs" contenteditable="true"></td>
    </tr>
    <tr>
        <td  colspan="2" >
            <div id="appliqueParametres"><?= $expression->appliquer ?></div>

            <script>evenement.appliqueParametres();</script>
        </td>

    </tr>

    <tr>
        <td  colspan="2" class="section" >
            A faire
        </td>
    </tr> 
    <tr>
        <td  colspan="2" >

        </td>
    </tr> 
    <tr>
        <td  colspan="2" >
            <?= $expression->liste_cookies ?>
        </td>
    </tr>
    <tr>
        <td class="descriptions">

        </td>
        <td class="valeurs"> 

        </td>
    </tr>
    <tr>
        <td class="descriptions">
            <?= $expression->liste_cookies ?>
        </td>
        <td class="valeurs"> 
            Oui
        </td>
    </tr>
</table>

