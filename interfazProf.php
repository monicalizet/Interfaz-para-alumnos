<?php

   session_start();
   //$_SESSION['nombre'];

   $largo=strlen($_SESSION['nombre']);
   $nom=substr($_SESSION['nombre'],10,$largo-10);

   echo($nom);//Recuperamos el valor de la variable 'nombre' que se habia guardado en otra página.
   //echo($_SESSION['nombre']);
   
?>