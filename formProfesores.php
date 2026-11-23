<?php

   $nombre=$_POST['nombre_php']; 
   $ap1=$_POST['ap1_php']; 
   $ap2=$_POST['ap2_php'];   
   $curp =$_POST['curp_php'];
   $formacion=$_POST['form_php'];
   $area=$_POST['area_php'];
   $carrera =$_POST['carr_php'];
   $turno=$_POST['turno_php'];
   $contrasena=$_POST['contra_php'];

   $cn = new mysqli("localhost","root","12345678","universidad");

   if( $cn->connect_errno ==0 ) {
      // echo("Conexión exitosa");
      
      $matricula=substr($curp,0,9);

      $buscar=$cn->query("SELECT matricula FROM profesores WHERE matricula ='".$matricula."'");
      $registro=$buscar->fetch_array();

      if($registro[0]==$matricula){
         echo("Matricula ya registrada");
      }else{

         $indatos=$cn->query("Insert into profesores values('".$matricula."','".$nombre."','".$ap1."','".$ap2."','".$curp."','".$formacion."','".$area."','".$carrera."','".$turno."')");
         $incont = $cn->query("Insert into contrasenaProf values('".$matricula."','".$contrasena."')"); 
     
         if($indatos==1 & $incont==1){           //& $incont==1
            echo("El registro se guardo  correctamente=".!$cn->connect_errno. "Insertar =". $indatos); 
         }
         else{
            echo("No se guardo el registro".$cn->error."insertar=".$indatos); //$insertar no devulve ningun valor cuando falla la consulta de la linea 13
         }

      $cn->close(); 
      
      }
  
   }
   else 
      //2054 es el valor que devuelve $cn->connect_errno Si la conexión falla 
      echo("Fallo la Conexión". $cn->connect_errno); 
      //Error(500) interno del servidor, checar sintaxis en php
    
?>