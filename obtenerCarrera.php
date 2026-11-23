<?php

     $conexion = new mysqli("localhost","root","12345678","universidad");
     $consulta = $conexion->query("SELECT * FROM carreras");

    if($consulta){ 
       $cadena="[{";//o  usar '[{' 
       $c=0;  
       while($datos = $consulta->fetch_array()){
         $c++; 
         $clave= 'clave'.$c;
         $carrera='carrera'.$c;
         //$cadena.='"clave":'.$datos[0].',"modelo":"'.$datos[1].'",';
         $cadena.='"'.$clave.'":'.$datos[0].',"'.$carrera.'":"'.$datos[1].'",';
       }

      //Nuevo
      $cadena.='"tam":'.$c.',';
      $largo=strlen($cadena);
      $cadena2=substr($cadena,0,($largo-1));
      $cadena2.="}]";
      $conexion->close(); 
      echo $cadena2;
    }
    
?>