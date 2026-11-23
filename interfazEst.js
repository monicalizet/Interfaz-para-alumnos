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
	        agregarEvento(document.getElementById("calcular"),'click',calcularResultado,false);   
            cajas_radios = document.getElementsByTagName("input");  
            enviarValoresServidor();
            
            
}  
                   	  
       function enviarValoresServidor(){                                     
             conexion = xmlhttprequest();
	         conexion.onreadystatechange = esperaResultado; 
	         conexion.open("POST","interfazEst.php",true);
	         conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	         conexion.send();
       }
       function esperaResultado(){
            if(conexion.readyState == 4){

		        var dato =conexion.responseText;
                let nombre = document.getElementById("nombre");

                nombre.textContent = "Bienvenid@ "+dato;

                   
              }  
       } 
       
       function xmlhttprequest(){
           return new XMLHttpRequest();
       } 

function calcularResultado(){
    var suma = 0;
    var promedio; 

    for(let i = 0; i<=6; i++){

        suma=suma+parseInt(cajas_radios[i].value); 
                                 
    }  

    promedio=suma/7; 
    document.getElementById("promedio").value=promedio.toFixed(2); 

 } 