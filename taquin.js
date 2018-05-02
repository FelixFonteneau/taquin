
/*
  Ce code javascript permet à l'utilisateur de pouvoir intéragir avec le jeu.
 */

window.onload = function() {

//--- définition des variables ---//

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




//--- définition des fonctions ---//

  //convertit les chemins d'accès aux images.
  function baseName(chemin) {
    img = chemin.split('/').reverse()[0];
    return "images/"+grid+"/"+img;
  }


  //cette méthode retourne la place de l'element dans la liste
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


  //dans cette fonction, on verifie si l'utilisateur a bien cliqué sur une case valide.
  //puis on échange les deux cases.
  function testClick(){
    //si on se trouve au début du jeu, on va mélanger le jeu
    if(debut){
      if(!melanger){
        melange();
        return;
      }
      //si on melange et que l'utilisateur clique une nouvelle fois, on arrete la generation.
      clearInterval(timer);
      //on fait commencer le jeu.
      debut = false;
      return;
    }

    //tant que le jeu n'est pas fini et qu'il a commencé :
    if( !fini){

      let lig = getLigne(this);
      let col = getColonne(this);
      if( estAdjacent(lig,col) ){
        decalage(lig, col, this);
        nbClick ++;
        //à chaque déplacement de l'utilisateur on vérifie si le jeu est terminé.
        verif();
      }
    }
  }



  //dans cette méthode, on va mélanger le jeu, en effectuant des déplacements alèatoires
  // toutes les 10 ms.
  function melange() {
    melanger = true;
    //toutes les demi-secondes, on effectue un déplacement aléatoirement d'image.
    timer = setInterval(deplacementAleatoire, 10);
  }



  //dans cette méthode, on va echanger ou déplacer le trou.
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
    decalage(lig, col, document.getElementsByClassName('grille')[col+nbCol*lig]);
  }


  //verifie si une case est adjacente au trou
  function estAdjacent(ligne,colonne) {
     return( ((Math.abs(ligne - trou_l) == 1) && (colonne - trou_c == 0)) || ((ligne - trou_l == 0) && (Math.abs(colonne - trou_c) == 1)) );
  }



  //cette méthode va décaler une case avec le trou.
  function decalage(lig, col, image) {
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



  //dans cette fonction, on verifie si l'utilisateur a reussi le jeu
  function verif(){
    //raffraichissement
    tabImg = document.getElementsByClassName('grille');

    for(let i = 0; i < tabImg.length - 1; i++){
        if(tabImg[i].name.split('.')[0] != i+1)return;
    }
    estTermine();
  }

  //on arrete le jeu et on affiche un message
  function estTermine(){
    let message = document.getElementById('message');
    message.style.visibility = "visible";
    message.innerHTML = "Bravo !\nTu as reussi ce taquin en "+nbClick+" mouvements.\nNouvelle partie : <a class=\"bouton\" href=\"taquin.php?jeu="+grid+"\">Jouer</a>";

    fini = true;
  }


  //initialisation des différentes variables

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
