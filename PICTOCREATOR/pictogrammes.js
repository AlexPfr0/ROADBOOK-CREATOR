var picto = function (canvasLargeur, canvasHauteur) {
    
    this.xCentre = canvasLargeur / 2;
    this.yCentre = canvasHauteur / 2;

    
};

var Globale = function () {
    
    this.calculCoteFleche = function (base) {
        var cote = Math.sqrt((Math.pow(base,2))/2);
        return cote;
    };
};

var RondPoint = function () {
    
    var rayon = 100;
    var xCentre = picto.xCentre;
    var yCentre = picto.yCentre;
    var epaisseur = 40;
    var couleur = '#000';
    var baseFleche = 100;
    var lTrait = 100;
    
    
    function dessineRoute(angleFin) {
        
        canvas1.cercle(xCentre, yCentre, rayon, 180, angleFin, epaisseur, couleur);
    };
    
        function correction (rayon) {
        var correction = new Object();
        correction[125] = 8;
        correction[100] = 14;
        correction[150] = 2;

        return correction[rayon];
    };
    
    
    function calculCoteFleche(base) {
        var cote = Math.sqrt((Math.pow(base,2))/2);
        return cote;
    }
    ;

    function dessinePointeFleche(xA, yA, xB, yB, xC, yC) {

        canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);


    }
    
    function dessineSortie(angleFin) {

        switch (angleFin) {
            case '180':
            
                var xPtDep = xCentre;
                var yPtDep = yCentre + rayon - (epaisseur / 2);
                var xPtFin = xCentre;
                var yPtFin = yCentre + rayon + lTrait;

                break;
            case '135':
                
                
                var xPtDep = xCentre + (rayon / 2) + (epaisseur / 2) - correction(rayon);
                var yPtDep = yCentre + (rayon / 2) + (epaisseur / 2) - correction(rayon);
                var xPtFin = xCentre + (rayon / 2) + (epaisseur / 2) + 65;
                var yPtFin = yCentre + (rayon / 2) + (epaisseur / 2) + 65;

                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                                
                var xA = xPtFin + 34;
                var yA = yPtFin - 36;
                var xB = xA;
                var yB = yA + calculCoteFleche(baseFleche);
                var xC = xB - calculCoteFleche(baseFleche);
                var yC = yB;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
                                
                
                break;
            
            case '90':
                var xPtDep = xCentre + rayon - (epaisseur / 2);
                var yPtDep = yCentre;
                var xPtFin = xCentre + rayon - (epaisseur / 2) + lTrait;
                var yPtFin = yCentre;
                

                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xCentre + rayon + lTrait - epaisseur / 2;
                var yA = yPtDep - baseFleche / 2;
                var xB = xA + 40;
                var yB = yPtDep;
                var xC = xA;
                var yC = yPtDep + baseFleche / 2;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur);
                                              
                break;
                
            case '45':
                
                var xPtDep = xCentre + (rayon / 2) + (epaisseur / 2) - correction(rayon);
                var yPtDep = yCentre - (rayon / 2) - (epaisseur / 2) + correction(rayon);
                var xPtFin = xCentre + (rayon / 2) + (epaisseur / 2) + 65;
                var yPtFin = yCentre - (rayon / 2) - (epaisseur / 2) - 65;


                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                                                
                var xA = xPtFin - 36;
                var yA = yPtFin - 34;
                var xB = xA + calculCoteFleche(baseFleche);
                var yB = yA;
                var xC = xB;
                var yC = yB + calculCoteFleche(baseFleche);
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
                                  
                                    
                break;
                
            case '0':
                var xPtDep = xCentre;
                var yPtDep = yCentre - rayon + (epaisseur / 2);
                var xPtFin = xCentre;
                var yPtFin = yCentre - rayon - lTrait + (epaisseur / 2);
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
               
                var xA = xPtFin - 50;
                var yA = yPtFin;
                var xB = xA + 50;
                var yB = yA - 40;
                var xC = xB + 50;
                var yC = yB + 40;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur);
                                
                break;
            
            case '315':
                
                var xPtDep = xCentre - (rayon / 2) - (epaisseur / 2) + correction(rayon);
                var yPtDep = yCentre - (rayon / 2) - (epaisseur / 2) + correction(rayon);
                var xPtFin = xCentre - (rayon / 2) - (epaisseur / 2) - 65;
                var yPtFin = yCentre - (rayon / 2) - (epaisseur / 2) - 65;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xPtFin - 34;
                var yA = yPtFin + 36;
                var xB = xA;
                var yB = yA - calculCoteFleche(baseFleche);
                var xC = xB + calculCoteFleche(baseFleche);
                var yC = yB;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
               
                break;
                
            case '270':
                
                var xPtDep = xCentre - rayon + (epaisseur / 2);
                var yPtDep = yCentre;
                var xPtFin = xCentre - rayon + (epaisseur / 2) - lTrait;
                var yPtFin = yCentre;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, '#000');
                
                var xA = xPtFin;
                var yA = yPtFin + 50;
                var xB = xA - 40;
                var yB = yA - 50;
                var xC = xB + 40;
                var yC = yB - 50;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur, '#000');
                                
                break;
                                
            case '225':
                
                var xPtDep = xCentre - (rayon / 2) - (epaisseur / 2) + correction(rayon);
                var yPtDep = yCentre + (rayon / 2) + (epaisseur / 2) - correction(rayon);
                var xPtFin = xCentre - (rayon / 2) - (epaisseur / 2) - 65;
                var yPtFin = yCentre + (rayon / 2) + (epaisseur / 2) + 65;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xPtFin + 36;
                var yA = yPtFin + 34;
                var xB = xA - calculCoteFleche(baseFleche);
                var yB = yA;
                var xC = xB;
                var yC = yB - calculCoteFleche(baseFleche);
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
                
                break;
                
            default:
                
             break;
        }
        
    };
    
    function dessineEntree (){

        
        var xPtDep = xCentre;
        var yPtDep = yCentre + rayon - (epaisseur / 2);
        var xPtFin = xCentre;
        var yPtFin = yCentre + rayon + lTrait;
        

        canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
        canvas1.disque(xPtFin, yPtFin, 45, 360, 0.1);
};

    function dessineNumSortie(numSortie) {
        

            var xPos = xCentre;
            var yPos = yCentre;
            var police = "bold 150px Arial";
            var couleur ='gray';
            var align = 'center';
        canvas1.caracteresPleins(xPos, yPos + 10, numSortie, police, couleur, align);

    }


    
    this.creeRondPoint = function (angleFin, numSortie) {
        canvas1.efface();
        canvas2.efface();
        dessineEntree();
        dessineRoute(angleFin);
        dessineSortie(angleFin);
        dessineNumSortie(numSortie);
        
        
    };
    
     
    
    
    
};

var Direction = function (){
    
    var G = new Globale();
    var xCentre = picto.xCentre;
    var yCentre = picto.yCentre;
    var epaisseur = 40;
    var couleur = '#000';
    var baseFleche = 100;
    var lTrait = 150;
    var yDecentre = 30;
    

    function dessineEntreeLongue(correction = 0) {
        

        var xPtDep = xCentre;
        var yPtDep = yCentre + 200;
        var xPtFin = xCentre;
        var yPtFin = yCentre - yDecentre + correction;

        canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
        
        canvas1.disque(xPtDep, yPtDep, 45, 360, 0.1);

    }
    ;

    function dessineEntreeCourte() {


        var xPtDep = xCentre;
        var yPtDep = yCentre + 200;
        var xPtFin = xCentre;
        var yPtFin = yCentre;

        canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);

        canvas1.disque(xPtDep, yPtDep, 45, 360, 0.1);

    }
    ;
    
    function calculCoteFleche(base) {
        var cote = Math.sqrt((Math.pow(base,2))/2);
        return cote;
    };
    
    function dessineDirectionNonPrio(angle) {



switch (angle) {

            case '135':
            case 'SE':

                var xPtDep = picto.xCentre - 6;
                var yPtDep = picto.yCentre - yDecentre - 14;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep + lTrait;

                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                
                                
                var xA = xPtFin + 34;
                var yA = yPtFin - 36;
                var xB = xA;
                var yB = yA + G.calculCoteFleche(baseFleche);
                var xC = xB - G.calculCoteFleche(baseFleche);
                var yC = yB;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
                                
                
                break;
            
            case '90':
            case 'E':
                
                var xPtDep = picto.xCentre - (epaisseur / 2);
                var yPtDep = picto.yCentre - yDecentre ;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep;
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xPtFin;
                var yA = yPtFin - baseFleche / 2;
                var xB = xA + 40;
                var yB = yPtDep;
                var xC = xA;
                var yC = yPtDep + baseFleche / 2;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur);
                                              
                break;
                
            case '45':
            case 'NE':
                
                var xPtDep = picto.xCentre - 6;
                var yPtDep = picto.yCentre - yDecentre + 14;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep - lTrait;


                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                                                
                var xA = xPtFin - 36;
                var yA = yPtFin - 34;
                var xB = xA + calculCoteFleche(baseFleche);
                var yB = yA;
                var xC = xB;
                var yC = yB + calculCoteFleche(baseFleche);
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);

                var xD = xPtDep;
                var yD = yPtDep;
                var xE = xPtDep - epaisseur / 2;
                var yE = yD;
                var xF = xPtDep - 14;
                var yF = yPtDep - 14;

//                canvas1.triangleBords(xD, yD, xE, yE, xF, yF, 1, 'red');

//                canvas1.cercle(xPtDep, yPtDep, 20, 0, 360, 2, 'green', false);
                                  
                                    
                break;
                
            case '0':
            case 'N':
                
                var xPtDep = picto.xCentre;
                var yPtDep = picto.yCentre - yDecentre ;
                var xPtFin = xPtDep;
                var yPtFin = yPtDep - lTrait;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
               
                var xA = xPtFin - 50;
                var yA = yPtFin;
                var xB = xA + 50;
                var yB = yA - 40;
                var xC = xB + 50;
                var yC = yB + 40;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur);
                                
                break;
            
            case '315':
            case 'NO':
                
                var xPtDep = picto.xCentre + 6;
                var yPtDep = picto.yCentre - yDecentre + 14;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep - lTrait;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xPtFin - 34;
                var yA = yPtFin + 36;
                var xB = xA;
                var yB = yA - calculCoteFleche(baseFleche);
                var xC = xB + calculCoteFleche(baseFleche);
                var yC = yB;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);

                var xD = xPtDep;
                var yD = yPtDep;
                var xE = xPtDep + epaisseur / 2;
                var yE = yD;
                var xF = xPtDep + 14;
                var yF = yPtDep - 14;

//                canvas1.trianglePlein(xD, yD, xE, yE, xF, yF);
               
                break;
                
            case '270':
            case 'O':
                
                var xPtDep = picto.xCentre + (epaisseur / 2);
                var yPtDep = picto.yCentre - yDecentre ;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, '#000');
                
                var xA = xPtFin;
                var yA = yPtFin + 50;
                var xB = xA - 40;
                var yB = yA - 50;
                var xC = xB + 40;
                var yC = yB - 50;
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC, epaisseur, '#000');
                                
                break;
                                
            case '225':
            case 'SO':
                
                var xPtDep = picto.xCentre + 6;
                var yPtDep = picto.yCentre - yDecentre - 14;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep + lTrait;
                
                
                canvas1.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur);
                
                var xA = xPtFin + 36;
                var yA = yPtFin + 34;
                var xB = xA - calculCoteFleche(baseFleche);
                var yB = yA;
                var xC = xB;
                var yC = yB - calculCoteFleche(baseFleche);
                
                canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
                
                break;
                
            default:
                alert('DIR NON PRIO : Veuillez entrer une des valeurs suivante :\n 0, 45, 90, 135, 225, 270, 315');
             break;
        }
        
    }
    ;


// Convertit le sens (littéral) en horaire / antihoraire (boolean)
function convCoteToBool(sens){
   if(sens === 'Gauche'){
       var bool = true;
   }else if(sens === 'Droite') {
       var bool = false;
    }
    return bool;

    }
    ;

// Dessine une intersection prioritaire
// Les angles sont arrondits
// Utilisation d'une portion d'ellipse
// La force de la courbe est définie pas le rayon x (abcisse) et le rayon y (ordonnée)

    function dessineDirectionPrio(cote, xRayon, yRayon) {


        var sens = convCoteToBool(cote);
        var epaisseur = 40;
        var couleur = '#000';
        var rotation = 0;

        var correction = 10;

        // Correspond aussi au diamètre du cercle contenant le triangle (flèche)
        var baseFleche = 100;

        if(cote === 'Droite'){
            

                var angDep = 270;
                var angFin = 345;

                var xCentre = picto.xCentre + xRayon;
                var yCentre = picto.yCentre;

            canvas1.elipseContours(xCentre, yCentre, xRayon, yRayon,
                        rotation, angDep, angFin,
                        epaisseur, couleur, sens);

            var xCentreFleche = Math.cos(canvas1.degTorad(angFin)) * (xRayon) + xCentre;
            var yCentreFleche = Math.sin(canvas1.degTorad(angFin)) * (yRayon) + yCentre;

            var xA = (Math.cos(canvas1.degTorad(angFin)) * (xRayon + baseFleche / 2) + xCentre) - correction;
            var yA = (Math.sin(canvas1.degTorad(angFin)) * (yRayon + baseFleche / 2) + yCentre) - correction;

            var xB = Math.cos(canvas1.degTorad(65)) * (baseFleche / 2) + xCentreFleche;  //  90 - coorection de 5 = 80
            var yB = Math.sin(canvas1.degTorad(65)) * (baseFleche / 2) + yCentreFleche;
            var xC = (Math.cos(canvas1.degTorad(155)) * (baseFleche / 2) + xCentreFleche) - correction;
            var yC = (Math.sin(canvas1.degTorad(155)) * (baseFleche / 2) + yCentreFleche) + correction;

            canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
            }else if(cote === 'Gauche') {
            
            var angDep = 90;
            var angFin = 15;

            var xCentre = picto.xCentre - xRayon;
            var yCentre = picto.yCentre;

            canvas1.elipseContours(xCentre, yCentre, xRayon, yRayon,
                        rotation, angDep, angFin,
                        epaisseur, couleur, sens);

            var xCentreFleche = Math.cos(canvas1.degTorad(angFin)) * (xRayon) + xCentre;
            var yCentreFleche = Math.sin(canvas1.degTorad(angFin)) * (yRayon) + yCentre;

            var xA = (Math.cos(canvas1.degTorad(angFin)) * (xRayon + baseFleche / 2) + xCentre) + correction;
            var yA = (Math.sin(canvas1.degTorad(angFin)) * (yRayon + baseFleche / 2) + yCentre) - correction;

            var xB = Math.cos(canvas1.degTorad(295)) * (baseFleche / 2) + xCentreFleche;
            var yB = Math.sin(canvas1.degTorad(295)) * (baseFleche / 2) + yCentreFleche;
            var xC = (Math.cos(canvas1.degTorad(205)) * (baseFleche / 2) + xCentreFleche) + correction;
            var yC = (Math.sin(canvas1.degTorad(205)) * (baseFleche / 2) + yCentreFleche) + correction;

            canvas1.trianglePlein(xA, yA, xB, yB, xC, yC);
            
        }






    };
    
    this.NonPrioritaire = function (angle) {
        canvas1.efface();
        canvas2.efface();
        dessineEntreeLongue();
        dessineDirectionNonPrio(angle);
    };

    this.Prioritaire = function (cote, xRayon, yRayon) {
        canvas1.efface();
        canvas2.efface();
        dessineEntreeCourte();
        dessineDirectionPrio(cote, xRayon, yRayon);
    };
    
};

var DirectionRouge = function (){
    
    var G = new Globale();
    var yDecentre = 50;
    var xCentre = picto.xCentre;
    var yCentre = picto.yCentre - yDecentre;
    var epaisseur = 30;
    var couleur = 'red';

    var lTrait = 100 + epaisseur / 2;
    
    var yDecentre = 30;

    
    function dessineDirection (angle) {



switch (angle) {

            case '135':
            case 'SE':

                var xPtDep = xCentre - 4;
                var yPtDep = yCentre + 17;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep + lTrait;

                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                
                break;
            
            case '90':
            case 'E':
                
                var xPtDep = picto.xCentre + epaisseur / 2;
                var yPtDep = yCentre + 15;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep;
                
                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                                               
                break;
                
            case '45':
            case 'NE':
                
                var xPtDep = picto.xCentre;
                var yPtDep = yCentre ;
                var xPtFin = xPtDep + lTrait;
                var yPtFin = yPtDep - lTrait;


                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                                    
                break;
                
            case '0':
            case 'N':
                
                var xPtDep = picto.xCentre;
                var yPtDep = yCentre;
                var xPtFin = xPtDep;
                var yPtFin = yPtDep - lTrait;
                
                
                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
               
               break;
            
            case '315':
            case 'NO':
                
                var xPtDep = picto.xCentre;
                var yPtDep = yCentre ;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep - lTrait;
                
                
                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                
                break;
                
            case '270':
            case 'O':
                
                var xPtDep = picto.xCentre;
                var yPtDep = yCentre + 15;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep;
                
                
                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                
                break;
                                
            case '225':
            case 'SO':
                
                var xPtDep = picto.xCentre;
                var yPtDep = yCentre;
                var xPtFin = xPtDep - lTrait;
                var yPtFin = yPtDep + lTrait;
                
                
                canvas2.trait(xPtDep, yPtDep, xPtFin, yPtFin, epaisseur, couleur);
                
                break;
                
            default:
                alert('Veuillez entrer une des valeurs suivante :\n 0, 45, 90, 135, 225, 270, 315' );
             break;
        }
        
    };
    
    this.creeDirection = function(angle){
        dessineDirection (angle);
    };


    
};

var elementSupp = function () {

    this.ajouteImage = function (source, canvas, x, y, L, H) {

        canvas.image(source, x, y, L, H);

    };

    this.copieCalque = function (canvasIdchoix) {

        setTimeout(function () {
            var c = canvasIdchoix.replace('canvas', 'calque');

            var calque = document.getElementById(c).getContext('2d');
            var src = document.getElementById(canvasIdchoix);

            if (canvasIdchoix === 'canvas1') {
                calque1.efface();
            }

            calque.drawImage(src, 0, 0, 50, 50);

        }, 1000);
    };
};
