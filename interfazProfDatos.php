<?php

  session_start();
   
  $matricula = substr($_SESSION['nombre'],0,9);  

  $cn = new mysqli("localhost","root","12345678","universidad");

    if( $cn->connect_errno ==0 ) {

    $buscar = $cn->query("SELECT * FROM profesores WHERE matricula ='".$matricula."'");
	$regt = $buscar->fetch_array();

    $datos='[{"v1":"'.$regt[0].'","v2":"'.$regt[1].'","v3":"'.$regt[2].'","v4":"'.$regt[3].'","v5":"'.$regt[4].'","v6":"'.$regt[5].'","v7":"'.$regt[6].'","v8":"'.$regt[8].'"}]';

    echo($datos);

    }
    else 
      //2054 es el valor que devuelve $cn->connect_errno Si la conexión falla 
      echo("Fallo la Conexión". $cn->connect_errno);
    
?>