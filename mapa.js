// ...

// Crea un mapa Leaflet
var map = L.map('map', {
    minZoom: 11   // Nivel de zoom mínimo permitido
}).setView([-103.72714, 19.24997], 11);


// Agrega una capa de mapa base
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var control = L.Control.geocoder({
    position: 'topleft',
    defaultMarkGeocode: true,
    geocoder: L.Control.Geocoder.mapbox('pk.eyJ1Ijoic3Bpbm9uNjQiLCJhIjoiY2xvbjgwbmlqMHFmcDJrczZncGs1ejRnNCJ9._i-bNrmSZgkTubn6s64-cw', {
        proximity: L.latLng(19.2433, -103.7242), // Centro de Colima
       
    }),
}).addTo(map);

control.on('markgeocode', function (e) {
    map.setView(e.geocode.center, 15);
});

// Carga el archivo GeoJSON que contiene los polígonos
fetch('Pruebas1.json')  // Reemplaza 'Pruebas1.geojson' con la URL de tu archivo GeoJSON
    .then(response => response.json())  // Utiliza response.json() para analizar el archivo GeoJSON
    .then(data => {
        // Convierte el GeoJSON en una capa de polígonos en Leaflet
        var polygons = L.geoJSON(data, {
            style: function (feature) {
                var personas = feature.properties.personas;
                var nombre = feature.properties.name;
                console.log(personas);
                var fillColor;


                 // Define el color basado en el valor de "personas"
                if (nombre === "Municipio Colima") {
                    fillColor = 'transparent'; // Establece el relleno como transparente
                }

                if (personas === 3 && nombre === "060020001134A") {
                    fillColor = 'black';
                }
                
                if (personas <= 10){
                    fillColor = 'purple';
                } else if (personas <= 30 && personas >= 11) {
                    fillColor = "green";
                }

                console.log(nombre)

                return {
                    fillColor: fillColor,
                    color: 'blue',
                    weight: 0.5,
                    opacity: 1,
                    fillOpacity: 0.5
                };

            }
        });

      

     

        // Agrega los polígonos al mapa
        polygons.addTo(map);

        // Ajusta la vista del mapa para que muestre todos los polígonos
        map.fitBounds(polygons.getBounds());
    });
