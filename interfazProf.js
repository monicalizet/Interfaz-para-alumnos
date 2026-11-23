
let cajas_radios; 

agregarEvento(window,'load',cargar,false);
       
function agregarEvento(ele,eve,fun,cap){
    //Depende del navegador para que se ejecuta if o else    
    if(window.attachEvent){	 // Detecta navegador y versión.
        addAttachEvent('on'+eve,fun);			 
	} 
	else{
	    ele.addEventListener(eve,fun,cap)                                   	 
	}    	    
        
}
        
function cargar(){      
           //Llamar a la funciòn agregarEvento.     
           
           cajas_radios = document.getElementsByTagName("input"); 
 
            enviarValoresServidor();
            enviarValoresServidorDatos();
            
            
}  
                   	  
       function enviarValoresServidor(){                                     
             conexion = xmlhttprequest();
	         conexion.onreadystatechange = esperaResultado; 
	         conexion.open("POST","interfazProf.php",true);
	         conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	         conexion.send();
       }

       function enviarValoresServidorDatos(){                                  
        conexion = xmlhttprequest();
        conexion.onreadystatechange = esperaResultadoDatos; 
        conexion.open("POST","interfazProfDatos.php",true);
        conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        conexion.send();
  }

       function esperaResultado(){
            if(conexion.readyState == 4){

		        var dato =conexion.responseText;
                let nombre = document.getElementById("nombre");

                nombre.textContent = "Bienvenid@ "+dato;

                enviarValoresServidorDatos();
                   
              }  
       } 

       function esperaResultadoDatos(){
        if(conexion.readyState == 4){

            //alert(conexion.responseText);

		    var dato = eval(conexion.responseText);

            var i = 0;

            for(const clave in dato[0]){
                cajas_radios[i].value = dato[0][clave];
                i++;
            }
              
        }  
   } 

       
       function xmlhttprequest(){
           return new XMLHttpRequest();
       } 
