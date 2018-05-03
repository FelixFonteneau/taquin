/*
  Ce code javascript va permettre à l'utilisateur d'intéragir avec le jeu.

  Dans un premier temps, au premier clique, le jeu va se mélanger
  aléatoirement jusqu'à ce que l'utilisateur arrète le mélange.

  Puis le code va échanger les cases adjacentes au trou jusqu'à ce que
  l'utilisateur termine.
*/

window.onload = function() {


////----- définition des variables -----////

  let trou_l ;    // la ligne où se trouve le trou
  let trou_c;  // la colonne où se trouve le trou
  let nbClick = 0;  // le nombre de chiffres déplacés

  let nbLig;
  let nbCol;

  let tabImg = document.getElementsByClassName('grille');

  let grid;

  let debut = true;
  let melanger = false;
  let fini = false;

  let timer;


////----- définition des fonctions -----////


    //++ Fonctions élémentaires ++//

      //retourne la place de l'element dans la liste
      function getPlace(element) {
        for(var i = 0; i < tabImg.length ; i++){
          if(element == tabImg[i] ) return i;
        }
      }

      //retourne la ligne de l'element
      function getLigne(element){
        return Math.floor((getPlace(element))/nbCol);
      }

      //retourne la colonne de l'element
      function getColonne(element) {
        return getPlace(element)%nbCol;
      }

      //donne le DOM de l'image ayant des coordonnées passées en paramètre
      function getImage(lig, col){
        return document.getElementsByClassName('grille')[col+nbCol*lig];
      }

      //verifie si une case est adjacente au trou
      function estAlligne(ligne,colonne) {
         return( ((Math.abs(ligne - trou_l) != 0) && (colonne - trou_c == 0)) || ((ligne - trou_l == 0) && (Math.abs(colonne - trou_c) != 0)) );
      }


      //convertit les chemins d'accès aux images.
      function baseName(chemin) {
        img = chemin.split('/').reverse()[0];
        return "images/"+grid+"/"+img;
      }




//++ Fonctions de gestion du jeu ++//

  //=== Fonction de gestion de click sur une case.

    //Cette méthode est appelée à chaque click sur une image, on verifie si l'utilisateur a bien cliqué sur une case valide.
    //puis on échange les deux cases.
    function testClick(){
      //au premier click on mélange le jeu.
      if(debut){
        if(!melanger){
          melange();
          return;
        }
        //si on melanger et que l'utilisateur clique une nouvelle fois, on arrete la melange.
        clearInterval(timer);
        //on fait commencer le jeu.
        debut = false;
        return;
      }

      //tant que le jeu n'est pas fini et qu'il a commencé :
      if( !fini){

        let lig = getLigne(this);
        let col = getColonne(this);
        if( estAlligne(lig,col) ){
          decalageLigne(lig, col);
          nbClick ++;
          verif();
        }
      }
    }



  //=== Fonction de mélange au début du jeu.

    // dans cette méthode, on va appeler la fonction deplacementAleatoire toute les 10ms pour mélanger le jeu.
    function melange() {
      melanger = true;
      //toutes les demi-secondes, on mélange aléatoirement l'image.
      timer = setInterval(deplacementAleatoire, 1);
    }


    //dans cette méthode, on va aléatoirement déplacer une case adjacente au trou.
    function deplacementAleatoire() {
      //on choisit une case adjacente aléatoirement.
      let lig;
      let col;
      if( Math.floor(Math.random()*2) == 1){

        //on s'assure que le trou n'est pas sur les bords, sinon on le décale vers l'intérieur
          if(trou_l == nbLig-1){
            lig = trou_l - 1;
          } else if (trou_l == 0) {
            lig = trou_l + 1;
          }else {
            lig = trou_l - 1 + 2 * Math.floor(Math.random() * 2);
          }
          col = trou_c;

      } else {

          if(trou_c == nbCol-1){
            col = trou_c - 1;
          } else if (trou_c == 0) {
            col = trou_c + 1;
          }else {
            col = trou_c - 1 + 2 * Math.floor(Math.random() * 2);
          }
          lig = trou_l;
      }
      //on effectue le déplacement.
      decalage(lig, col);
    }


  //=== Fonctions de décallage de cases

    function decalageLigne(lig, col){
      if(Math.abs(lig - trou_l) == 0){
        for(let dec = Math.abs(col - trou_c) - 1; dec >= 0; dec--){
          if(col - trou_c < 0){
            //le trou se trouve sur la droite de la case cliquée
            decalage(lig, col + dec);
          }else{
            //le trou se trouve à gauche
            decalage(lig, col - dec);
          }
        }
      }else{
        for(let dec = Math.abs(lig - trou_l) - 1; dec >= 0; dec--){
          if(lig - trou_l < 0){
            //le trou se trouve sur la droite de la case cliquée
            decalage(lig + dec, col);
          }else{
            //le trou se trouve à gauche
            decalage(lig - dec, col);
          }
        }
      }
    }


    //cette méthode va effectuer le décalage d'une case à coté du trou.
    function decalage(lig, col) {
      let image = getImage(lig,col);
      let trou = document.getElementsByName('trou')[0]

      //on echange les sources des images.
      let buffer = baseName(image.src);
      image.src = baseName(trou.src);
      trou.src = buffer;

      //on echange les noms.
      buffer = image.name;
      image.name = trou.name;
      trou.name = buffer;

      //on change les indices
      trou_c = col;
      trou_l = lig;
    }



  //=== Fonctions de Fin de partie

    //dans cette fonction, on verifie si l'utilisateur a reussi le jeu
    function verif(){
      //raffraichissement
      tabImg = document.getElementsByClassName('grille');

      for(let i = 0; i < tabImg.length - 1; i++){
          if(tabImg[i].name.split('.')[0] != i+1)return;
      }
      estTermine();
    }

    //on arrete le jeu et on affiche un message si quand le jeu est terminé
    function estTermine(){
      let message = document.getElementById('message');
      message.style.visibility = "visible";
      message.innerHTML = "Bravo !\nTu as reussi ce taquin en "+nbClick+" mouvements.\nNouvelle partie : <a class=\"bouton\" href=\"taquin.php?jeu="+grid+"\">Jouer</a>";

      fini = true;
    }



////---- initialisation des différentes variables ----////

  nbLig = document.getElementsByClassName('ligne').length;
  nbCol = tabImg.length/nbLig;

  grid = nbCol+"x"+nbLig;

  trou_l = getLigne(document.getElementsByName('trou')[0]);
  trou_c = getColonne(document.getElementsByName('trou')[0]);


  //liaison des images cliquées à la fonction testClick
  for(let i = 0; i < tabImg.length ; i++){
    tabImg[i].onclick = testClick;

  }
};
