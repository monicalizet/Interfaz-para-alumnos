let dato; 
let enviar; 

let matricula;
let contrasena; 

addEvent(window,'load',cargar, false);

function addEvent(ele,eve,fun,cap){
   if(window.attachEvent)
     addAttachEvent('on'+eve,fun);
     else
      ele.addEventListener(eve,fun,cap);
}

function cargar(){      
    
  matricula = document.getElementById("matricula"); 
  contrasena = document.getElementById("contrasena"); 
  enviar = document.getElementById("enviar"); 
      
  addEvent(enviar,'click',conexionServidor,false); 


}

function conexionServidor(){

  if(validaDatosCompletos()==true){

    let vmat=matricula.value; 
    let vcont=contrasena.value; 

    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta;
    conexion.open("POST","inicioEst.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send("mat_php="+vmat+"&cont_php="+vcont);
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor ingrese todos los campos",
      confirmButtonText: "Aceptar"
  }); 
  }

}
   
function esperaRespuesta(){
     
  if(conexion.readyState == 4){

    var dato = conexion.responseText;

    if (dato == "correcto") {
      window.location.href = "interfazEst.html"; 
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos incorrectos",
        text: dato,
        confirmButtonText: "Aceptar"
    }); 
    }

  }  

}   
   
function xmlhttprequest(){
  return new XMLHttpRequest();
}


function validaDatosCompletos(){

  if( matricula.value=="" || contrasena.value==""){
    return false; 
  }
  else{
    return true; 
  }
} 
