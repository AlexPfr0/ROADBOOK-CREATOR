// Cette classe permet de calculer les distance Intermédiaire (dPartielle) et restante (dRestante)
// La distance parcourue (dParcourue) est récupérée dans les données de Kurviger
// Elle prend en paramètre le nombre de chiffres après la virgule par défaut. Cette option sera disponible dans le paramètres


    // Changer cette variable pour arrondir la distance (de 0 à 3)

var calculerDistance = function(nbDecimales = 3){
    

// Calcul de la distance intermédiare
// dActu est la distance de l'étape en cours, 
// dPrec est la distance de l'étape précédente.
// from fournit si les données viennent d'un fichier .rbk ou bien des données brutes (variable bientôt obsolète)


    this.Partielle = function(dActu, dPrec, from){
        
        if(from === 'rbk'){
            var div = 1;
            
        }else if ( from === 'data-brute'){
            
            var div = 1;
        }
        
        
        var dPartielle;
        
        dPartielle = ((dActu - dPrec)/div).toFixed(nbDecimales);
    
    // Pour la première étape, il n'existe pas d'étape -1, elle est NaN, donc on l'initie manuellement
        if(isNaN(dPartielle)){
            
                dPartielle = (0.000).toFixed(nbDecimales);
         }
         
//         $('#console').append('<b style="color:#2ecc71">Calcul dPartielle :</b> ' + dActu + '-' + dPrec + '->' + dPartielle + '<br>');
         
        return dPartielle;
    
    };
    
// Calcul de la distance restante
// dTotale est récupérée dans le dernier index du tableau d'objet
// dParcourue est récupéré dans le fichier rbk ou des données de Kurviger
    this.Restante = function(dTotale, dParcourue){
;
        
        var dRestante = (dTotale - dParcourue).toFixed(nbDecimales);
        
//        $('#console').append('<b style="color:#ecf0f1">Calcul dRestante :</b> ' + dTotale + '-' + dParcourue + '->' + dRestante + '<br>');
         
        return dRestante;
    };
    
// Calcul et formatage de la valeur de départ (1ère ligne, 1ère colonne)
    this.TotalDepart = function(dTotal,unite){
        var dTotalDepart = (dTotal / unite).toFixed(nbDecimales);
        return  dTotalDepart;
    };

// Calcul de la distance parcourue
// La distance parcourue est la base des calculs 
// Elle se trouve dans les données récupérées sur Kurviger
// La variable 'unite' permet de convertir le résultat en unité impériale, le mile.
    this.Parcourue = function(dActu, unite, from){
        
        if(from === 'rbk'){
            var div = 1;
            
        }else if ( from === 'data-brute'){
            
            var div = 1000;
        }
        
        var dParcourue = (dActu/div/unite).toFixed(nbDecimales);
//        $('#console').append('<b style="color:#f1c40f">Calcul dParcourue :</b> ' + dActu + '/' + div + '->' + dParcourue + '<br>');
         
        return dParcourue;
        
    };
    
    
    
};


