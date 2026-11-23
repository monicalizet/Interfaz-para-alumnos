<?php

    $matricula = $_POST["mat_php"];
    $contrasena   = $_POST["cont_php"];

    session_start(); 

    $cn = new mysqli("localhost","root","12345678","universidad");

    if( $cn->connect_errno ==0 ) {

    $buscar = $cn->query("SELECT matricula, contrasena FROM contrasenaEst WHERE matricula ='".$matricula."'");
	$mat = $buscar->fetch_array();
	
	if($mat[0]==$matricula && $mat[1]==$contrasena){

        $datos=$cn->query("SELECT nombre, apellido_paterno FROM estudiante WHERE matricula ='".$matricula."'");  

        $registro=$datos->fetch_array();
        $nombre = $registro[0]." ".$registro[1];

        $_SESSION['nombre']=$nombre;
        echo("correcto");
		//echo "<script> alert('Bienvenido $nombre'); window.location='formProfesores.html' </script>";

	}else
	{
		echo("matricula o contraseña incorrectos");
	}

   }

?>