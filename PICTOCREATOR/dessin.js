var dessin = function (canvasId) {

    this.image = function (source, x, y, L, H) {
        var context = document.getElementById(canvasId).getContext('2d');

        var img = new Image();
        img.src = source;

        img.onload = function (e) {
            context.drawImage(img, x, y, L, H);
        };
    };



    this.fusionneCanvas = function () {

        var context = document.getElementById('canvas1').getContext('2d');
        var can1 = document.getElementById('canvas1').getContext('2d');
        var img = new Image();
        img.src = can1;

        img.onload = function (e) {
            context.drawImage(img, 0, 0, 500, 500);
        };
    };




    this.rectanglePlein = function (x, y, l, h, couleur) {
        var context = document.getElementById(canvasId).getContext('2d');
        context.fillStyle = couleur;
        context.fillRect(x, y, l, h);
    };

    this.rectangleBords = function (x, y, l, h, w, couleur = '#000') {
        var context = $('#' + canvasId)[0].getContext('2d');
        context.lineWidth = w;
        context.strokeStyle = couleur;
        context.strokeRect(x, y, l, h);
    };

    this.rectangleBordsTirets = function (x, y, l, h, w = 1, couleur = '#000') {
        var context = $('#' + canvasId)[0].getContext('2d');

        context.setLineDash([6]);
        context.strokeStyle = couleur;
        context.lineWidth = w;
        context.strokeRect(x, y, l, h, w);
//        

//        context.strokeRect(x, y, l, h);
    };

    this.degTorad = function (angle) {
        return (angle - 90) * Math.PI / 180;
    };


    this.elipseContours = function (x, y, xRayon, yRayon, rotation, angDep, angFin, epaisseur, couleur = '#000', antihoraire) {
        var context = document.getElementById(canvasId).getContext('2d');
        
        context.beginPath();
        context.strokeStyle = couleur;
        context.lineWidth = epaisseur;
        
        context.ellipse(x, y, xRayon, yRayon, rotation,
                this.degTorad(angDep), this.degTorad(angFin),
                antihoraire);
        context.stroke();
    };

    this.elipsePleine = function (x, y, xRayon, yRayon, rotation, angDep, angFin, couleur = '#000', antihoraire) {
        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.fillStyle = couleur;
//        context.lineWidth = epaisseur;

        context.ellipse(x, y, xRayon, yRayon, rotation,
                this.degTorad(angDep), this.degTorad(angFin),
                antihoraire);
        context.fill();
    };

    this.cercle = function (x, y, rayon, angDep, angFin, w, couleur = '#000', antiH = true) {
        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.lineWidth = w;
        context.strokeStyle = couleur;
        context.arc(x, y, rayon, (angDep - 90) * Math.PI / 180, (angFin - 90) * Math.PI / 180, antiH);
        context.stroke();
    };

    this.disque = function (x, y, rayon, angDep, angFin, couleur = '#000') {

        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.fillStyle = couleur;
        context.arc(x, y, rayon, (angDep - 90) * Math.PI / 180, (angFin - 90) * Math.PI / 180, true);
        context.fill();
    };



    this.trait = function (xDep, yDep, xFin, yFin, w, couleur = '#000') {
        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.lineWidth = w;
        context.strokeStyle = couleur;
        context.moveTo(xDep, yDep);
        context.lineTo(xFin, yFin);

        context.stroke();

    };

    this.polygonePlein = function (pts, couleur) {

        var context = document.getElementById(canvasId).getContext('2d');
        context.beginPath();

//        const pts = Coords;
//        const object = { a: 1, b: 2, c: 3 };
        context.moveTo(pts.A.x, pts.A.y);
        for (const pt in pts) {
            var x = pts[pt]['x'];
            var y = pts[pt]['y'];
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStyle = couleur;
        context.fill();
    };



    this.trianglePlein = function (xA, yA, xB, yB, xC, yC, couleur = '#000') {
        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.moveTo(xA, yA);
        context.lineTo(xB, yB);
        context.lineTo(xC, yC);
        context.closePath();

        context.fillStyle = couleur;
        context.fill();

    };

    this.triangleBords = function (xA, yA, xB, yB, xC, yC, w = 10, couleur = '#000') {
        var context = document.getElementById(canvasId).getContext('2d');

        context.beginPath();
        context.moveTo(xA, yA);
        context.lineTo(xB, yB);
        context.lineTo(xC, yC);
        context.closePath();
        context.lineWidth = w;
        context.strokeStyle = couleur;
        context.stroke();

    };
    
    this.caracteresBords = function (xPos, yPos, texte, police, couleur = '#000') {
        var context = document.getElementById(canvasId).getContext('2d');
        context.lineWidth = 7;
        context.font = police; //"bold 20px Vardena, Arial, serif";
        context.strokeStyle = couleur;
        context.strokeText(texte, xPos, yPos);
    };
    
        this.caracteresPleins = function (xPos, yPos, texte, police, couleur = '#000', align = 'left') {
        var context = document.getElementById(canvasId).getContext('2d');
        context.lineWidth = 7;
        context.textAlign = align;
        context.textBaseline = 'middle';
        context.font = police; //"bold 20px Vardena, Arial, serif";
        context.fillStyle = couleur;
        context.fillText(texte, xPos, yPos);
    };



    this.efface = function () {
        var context = document.getElementById(canvasId).getContext('2d');
        context.clearRect(0, 0, 500, 500);
    };

    this.getMouse = function (e, canvasId) {
        var bounds = canvasId.get(0).getBoundingClientRect();

            return {
            x: Math.round(e.clientX - bounds.left),
            y: Math.round(e.clientY - bounds.top)
            };
//            console.log(e.clientY - bounds.top);
//            console.log(e.clientX - bounds.left);
    };


    };


        



