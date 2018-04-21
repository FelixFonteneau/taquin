<?php


  //récupération de la dimension du jeu
  $grid = $_GET["jeu"];

  function getNom($path) {
    $a = explode(".",basename($path));
    return  $a[0];
  }


  //si le paramètre passé n'est pas correct, on redirige vers l'index
  if(!(isset($_GET["jeu"]) && preg_match('/^[2-3]x[2-3]$/',$grid))){
    header('Location: index.html');
    exit;
  }

  $listImage = glob("images/$grid/*");


	//shuffle($listImage);

  $dim = explode("x",$grid);
  $col = $dim[0];
  $lig = $dim[1];
 ?>

 <!DOCTYPE html>
 <html lang="en">

 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf8">
     <title>Le Taquin</title>
     <meta name="author" content="Félix Fonteneau et Saveria Frati--Peraldi">
     <link rel="stylesheet" type="text/css" href="taquin.css">
     <script language="javascript" src="taquin.js"></script>
 </head>

 <body>
     <h1>Le Taquin</h1>
     <hr>


     <div id="jeu">
        <?php

        // génération de la grille aléatoire.
       	  for($i = 0; $i < $lig; $i++ ) {
            echo "<div class=\"ligne\">";

            //partitionnement des collonnes.
            for($j = 0; $j < $col; $j++){
              $indice = $col*$i + $j;
              $nom = getNom($listImage[$indice]);
              echo "<img name=\"$nom\" src=\"$listImage[$indice]\" />\n";
            }


            echo "</div>";
       	  }
        ?>
     </div>


     <div id="message" style="visibility: hidden">
     </div>

   <div id='choix'>
   	<p>Veuillez choisir la taille de la grille: 2x2, 2x3, 3x2 ou 3x3. </p>

     <form action="/action_page.php">
       <input type="radio" name="jeu" value="2x2" checked="unchecked"> 2x2 <br/>
       <input type="radio" name="jeu" value="2x3" checked="unchecked"> 2x3 <br/>
       <input type="radio" name="jeu" value="3x2" checked="unchecked"> 3x2 <br/>
       <input type="radio" name="jeu" value="3x3" checked="checked"> 3x3   <br/>
       <input type="submit" value="JOUER">
     </form>
   </div>
