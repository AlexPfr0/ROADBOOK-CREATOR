<?php
// Contient les paramètres par défaut
// Est intanciée en haut du fichier index.php
// Reçoit les paramètres contenus dans les cookies s'ils existent
class reglages {
    
    public $langage = "fr_FR";
    public $langages_liste  = array('Français' => 'fr_FR',
                                    'English' => 'en_EN', 
                                    'Deutch' => 'de_DE',
                                    );
    
    public $decimal = 3;
    public $couleur_lignes = "#666";
    public $couleur_d_inter = "#000";
    public $couleur_d_parcourue = "#000";
    public $couleur_d_restante = "#000";
    public $couleur_commentaires = "#000";
    public $pied_page = "";
    public $nom_utilisateur = "Inconnu";
    public $validite_cookies = 15;
    public $BRC_version = "2020.12";
    
    public $unite_mesure = "metric" ;
    public $unite_abbrev = "km";
    
    public $colonne_unique = "non";
    
    public $valeurs_distances = array("Intermediaire","Restante","Parcourue");
    
    public $valeur_case_1 = "Partielle";
    public $valeur_case_2 = "Restante";
    public $valeur_case_3 = "Parcourue";
    
    public function verif($cookie, $defaut) {
        
        $reglage = "";
        
        if(isset($cookie)){
            $reglage = $cookie;
        } else {
          $reglage = $defaut;  
        }
        
        return $reglage;
    }
    
            
}
