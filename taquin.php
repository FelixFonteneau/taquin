<?php
  //récupération de la dimension du jeu
  $grid = $_GET["jeu"];

  //si le paramètre passé n'est pas correct, on redirige vers l'index
  if(!(isset($_GET["jeu"]) && preg_match('/^[2-3]x[2-3]$/',$grid))){
    header('Location: index.html');
    exit;
  }


  $array = glob("image/$grid/part-*.jpeg");
	shuffle($array);




 ?>
