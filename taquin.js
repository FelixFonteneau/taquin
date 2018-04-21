

window.onload = function() {

  let hole_row ;    // la ligne où se trouve le trou
  let hole_column;  // la colonne où se trouve le trou
  let nbClick = 0;  // le nombre de chiffres déplacés


  function clickAt(ligne,colonne,image) {

  }

  function getPlace(element) {
    for(let i = 0; i < tabImg.length ; i++){
      if(element == tabImg[i] ) return i;
    }
  }

  function testClick(){
    let place = getPlace(this);
    let clig =
    let ccol =

  }

  let tabImg x = document.getElementsTagName('img');
  var hole document.getElementsByName('z')[0];         // l'image qui contient la case vide

  let nbLig = document.getElementsByClassName('ligne').length;

  for(let i = 0; i < tabImg.length ; i++){
    tabImg[i].onclick = testClick;
  }
  ok.onclick = okayClick;
};
