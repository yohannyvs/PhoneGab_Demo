//El evento deviceready le indica a la App que las APIs de cordova están listas para accesar.
document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
    }

//La función onSuccess me posiciona en el mapa y me asigna un marcador.
function onSuccess(position) {

        hideLoading();
        
        var altoVentana =  window.innerHeight;
        
        $("div#map_canvas").css("height" , altoVentana - 220);
        
        var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        var myOptions = {
                center: myLocation,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            
            map_element = document.getElementById("map_canvas");
            map = new google.maps.Map(map_element, myOptions);
        
        var image = 'img/me.png';
        
        var meinfo = new google.maps.InfoWindow({
              content: "Usted está aquí"
          });
        
        
        var me = new google.maps.Marker({
            position: myLocation,
            icon : image ,
            map: map,
            animation: google.maps.Animation.BOUNCE
        });
        
        
        google.maps.event.addListener( me , 'click', function() {
                meinfo.open(map,me);
         });
        
        
         //Aquí iniciamos la carga de los datos desde JSON
         $.getJSON('http://www.asesorastic.cl/jsonproject/landmarks3.php', function(data) {
             
             $.each( data , function( key, val) {
                 
                 var officeLocation = new google.maps.LatLng( val.Latitud , val.Longitud );

                 var infowindow = new google.maps.InfoWindow({
                      content: val.Direccion + " Teléfono: " + val.Telefono
                  });
                 
                 var image2 = 'img/markerPlace.png';
                 
                 var markerTwo = new google.maps.Marker({
                        title: 'Cajero cercano!',
                        position: officeLocation,
                        icon : image2 ,
                        map: map
                    });
             
                 
                 google.maps.event.addListener( markerTwo, 'click', function() {
                        infowindow.open(map,markerTwo);
                 });
                    
              }); //Fin de la lectura del JSON
         });
    }

    //Esta funciona maneja algún error en la ubicación.
    function onError(error) {
        alert('Lo sentimos, es imposible obtener su ubicación , pongase en un espacio exterior.');
    }
    
    //Esta función cierra la App, es llamada por el botón Salir.
    function closeApp() {
        navigator.app.exitApp(); 
    }
    
    //Esta función me localiza y es llamada por el botón Localizar.
     function getLocation() {        
        
        var options = { 
                frequency: 1000, enableHighAccuracy:true 
        };
        
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        loading();
    }  

    //Nos muestra la animación de carga mientras prepara el mapa. 
    function loading(){
        $.mobile.loading( 'show', {
              text: "Obteniendo ubicación",
              textVisible: true,
              theme: "a",
              textonly: false,
              html: ""
              });
    }
         
    //Oculta la animación de carga.
    function hideLoading(){
        $.mobile.loading( "hide" );
    }