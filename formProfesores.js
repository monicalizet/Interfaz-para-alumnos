    let dato;

    let enviar; 

    let nombre; 
    let apellido1; 
    let apellido2; 
    let curp; 

    let contador=0; 

    let bandera=0; 
    let carrera;  
    let turno; 
    let semestre;
    
    let formacion; 
    let area; 

    let limpiar;

    let registrar; 

	addEvent(window,'load',cargar, false);

	function addEvent(ele,eve,fun,cap){
		if(window.attachEvent)
			addAttachEvent('on'+eve,fun);
		else
			ele.addEventListener(eve,fun,cap);
	}

	function cargar(){      
                
        nombre = document.getElementById("nomEst");
        apellido1 = document.getElementById("apeEst1");
        apellido2 = document.getElementById("apeEst2");
        curp = document.getElementById("curp");
        formacion = document.getElementById("form"); 
        contrasena = document.getElementById("contrProf");
        lista_carreras= document.getElementById("slt_carreras"); 
        registrar = document.getElementById("enviar"); 
        limpiar = document.getElementById("limpiar"); 

        cajas_radios = document.getElementsByTagName("input");
                  
        addEvent(document.getElementById("slt_carreras"),'change',definirCarrera,false);
        addEvent(document.getElementById("comboTurno"),'change',definirTurno,false);
        addEvent(document.getElementById("comboArea"),'change',definirArea,false);

        addEvent(nombre,'keypress',validaNombre,false);
        addEvent(apellido1,'keypress',validaLetras,false);
        addEvent(apellido2,'keypress',validaLetras,false);
        addEvent(registrar,'click',conexionServidor,false);
        addEvent(limpiar,'click',limpiarCajas,false); 

        conexionServidor1();

	}

    function conexionServidor(){

        if(validaDatosCompletos()==true){

            let vnom=nombre.value;
            let vap1=apellido1.value; 
            let vap2=apellido2.value; 
            let vcurp=curp.value;   
            let vcont=contrasena.value; 
            let vfor=formacion.value;

            conexion = xmlhttprequest();
			conexion.onreadystatechange = esperaRespuesta;
			conexion.open("POST","formProfesores.php",true);   
            conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
			conexion.send("nombre_php="+vnom+"&ap1_php="+vap1+"&ap2_php="+vap2+"&curp_php="+vcurp+"&form_php="+vfor+"&area_php="+area+"&carr_php="+carrera+"&turno_php="+turno+"&contra_php="+vcont);

        }
        else{

            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Por favor, ingrese todos los datos",
                confirmButtonText: "Aceptar"
            });

        }

    }

    function conexionServidor1(){

        conexion = xmlhttprequest();
        conexion.onreadystatechange = esperaRespuesta1;
        conexion.open("POST","obtenerCarrera.php",true);   
        conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
        conexion.send();

    }
               
    function esperaRespuesta(){
                 
        if(conexion.readyState == 4){

            var dato = conexion.responseText;

            Swal.fire({
                title: "Estatus de su registro:",
                text: dato,
            });

        }  
    }  
               
    function esperaRespuesta1(){ 

        if(conexion.readyState == 4){

            dato = eval(conexion.responseText);
            agregarOpciones();     
        
        }
            
    }  
  
    function agregarOpciones(){
              
        let fragment1=document.createDocumentFragment();

        for(let i=1;i<=dato[0]["tam"];i++){
            let opcion1=document.createElement('OPTION');
            opcion1.setAttribute('value',dato[0]["clave"+i]);
            opcion1.textContent=dato[0]["clave"+i]+ " "+ dato[0]["carrera"+i] ;
            fragment1.appendChild(opcion1);
        }

        lista_carreras.appendChild(fragment1);

    }
               
    function xmlhttprequest(){
		return new XMLHttpRequest();
	}

    function validaDatosCompletos(){

        validaContrasena(); 

        if( nombre.value=="" || apellido1.value=="" || apellido2.value==""  || !carrera ||curp.value=="" || bandera==0 || document.getElementById("slt_carreras").selectedIndex==0 || document.getElementById("comboTurno").selectedIndex==0 || document.getElementById("comboArea").selectedIndex==0){
            return false; 
        }
        else{
            return true; 
        }
              
    }

    function validaLetras(){

        if( (event.keyCode>=65 & event.keyCode<=90) | (event.keyCode>=97 & event.keyCode<=122) )       
            event.returnValue=true
        else
            event.returnValue=false

    }

    function validaNombre(){  
                  
        if( (event.keyCode>=65 & event.keyCode<=90) | (event.keyCode>=97 & event.keyCode<=122) || (event.keyCode==32 && contador++==0))       
            event.returnValue=true
        else
            event.returnValue=false
                   
    }

    function definirCarrera(){
            
        opcion=parseInt(document.getElementById("slt_carreras").value);
                    
        if(opcion==2112){
            carrera="Ingenieria en Tecnologias de la Informacion";
        }
        else if(opcion==2113){
            carrera="Ingenieria en Energias Renovables";
        }
        else if(opcion==2114){
            carrera="Ingenieria en Tecnología Ambiental";
        }
        
    }

    function definirTurno(){
            
        opcion=parseInt(document.getElementById("comboTurno").value);
                    
        if(opcion==1){
            turno="Matutino";
        }
        else if(opcion==2){
            turno="Vespertino";
        }
        
    }

    function definirArea(){
            
        opcion=parseInt(document.getElementById("comboArea").value);
                    
        if(opcion==1){
            area="Informatica";
        }
        else if(opcion==2){
            area="Tecnologia ambiental";
        }
        
    }


    function validaContrasena() {
        let contr = document.getElementById("contrProf").value;
        let message = document.getElementById("message");
            
        if (contr.length >= 8 && contr.length <= 12) {
            message.textContent = "Contraseña válida";
            message.style.color = "green";
            bandera=1; 
            return true;
        } else {
            message.textContent = "La contraseña debe tener entre 8 y 12 caracteres";
            message.style.color = "red";
            return false; 
        }

    }
        
    function limpiarCajas(){
            
        for(var i = 0; i<=5; i++){
                cajas_radios[i].value="";
        }

        document.getElementById("slt_carreras").selectedIndex=0;
        document.getElementById("comboTurno").selectedIndex=0;
        document.getElementById("comboArea").selectedIndex=0;

        contador=0; 
        bandera=0;

        message.textContent = "";

    }

    //quitar value en la interfaz 