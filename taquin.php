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
     <h1>Le Taquin : grille <?php echo $grid?></h1>

     <div id="band">

     <ul id="bandeau">
      <li><a class="bouton" href="taquin.php?jeu=2x2"><b>2x2</b></a></li>
      <li><a class="bouton" href="taquin.php?jeu=3x2"><b>3x2</b></a></li>
      <li><a class="bouton" href="taquin.php?jeu=2x3"><b>2x3</b></a></li>
      <li><a class="bouton" href="taquin.php?jeu=3x3"><b>3x3</b></a></li>
    </ul>

    </div>

    <div id="message" style="visibility: hidden"></div>

     <div id="jeu">
        <?php

        // génération de la grille aléatoire.
       	  for($i = 0; $i < $lig; $i++ ) {
            echo "<div class=\"ligne\">";

            //partitionnement des colonnes.
            for($j = 0; $j < $col; $j++){
              $indice = $col*$i + $j;
              $nom = getNom($listImage[$indice]);
              echo "<img class=\"grille\" name=\"$nom\" src=\"$listImage[$indice]\" />\n";
            }


            echo "</div>";
       	  }
        ?>
     </div>
   </body>
</html>
