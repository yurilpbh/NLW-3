// tipos de dados
// String ""
// Number 1
// Object {}
// Boolean true or false
// Array []

var jsonEstados = [];
$.getJSON('./json/estados.json', function(data) {
  $.each(data, function(key,val){
    jsonEstados[key] = val; 
  }); 
});

var jsonCidades = [];
$.getJSON('./json/municipios.json', function(data) {
  $.each(data, function(key,val){
    jsonCidades[key] = val; 
  }); 
});

var geoJsonMunicipio = [];
$.getJSON('./json/municipio.json', function(data) {
  $.each(data, function(key,val){
    geoJsonMunicipio[key] = val; 
  }); 
});

const orphanagesSpan = document.querySelectorAll('.orphanages span')
var lat = 0, lng = 0, count = 0, fitBounds = [[Infinity,Infinity],[-Infinity,-Infinity]], ultimoEstado;
var latitude=-14.9, longitude=-49.5, layerGeoJson;;

function getLatLngEstados(){
  if(document.getElementById("estado").value != ""){
    map.setView([latitude, longitude],6);
    if(ultimoEstado != document.getElementById("estado").value){
      ultimoEstado = document.getElementById("estado").value;
      var estado = jsonEstados.find(estado => estado.uf == document.getElementById("estado").value)
      if(latitude != estado.latitude || longitude != estado.longitude){
        latitude = estado.latitude;
        longitude = estado.longitude;
        map.setView([latitude, longitude],6);

        var first = true, geoJsonCidades;
        geoJsonMunicipio.features.forEach(function (a) {
          if(a.properties.UF == document.getElementById("estado").value){
            if(first){
              geoJsonCidades = [a];
              first = false;
            }else{
              geoJsonCidades = geoJsonCidades.concat(a);
              return;
            }
          }
        })
        if(map.hasLayer(layerGeoJson)){
          map.removeLayer(layerGeoJson);
        }
        layerGeoJson = L.geoJSON(geoJsonCidades);
        map.addLayer(layerGeoJson)
      }
    }
  }
}

function getLatLngCidades(){
  if(document.getElementById("cidade").value != ""){
    var cidadeSelecionada;
    jsonEstados.find(function (estado) {
      if(estado.uf == document.getElementById("estado").value){
        jsonCidades.find(function (cidade) {
          if(estado.codigo_uf == cidade.codigo_uf && cidade.nome == document.getElementById("cidade").value){
            cidadeSelecionada = cidade;
            return;
          }
        })
      }
    })
    latitude = cidadeSelecionada.latitude;
    longitude = cidadeSelecionada.longitude;
    map.setView([latitude, longitude],12);
  }
}

orphanagesSpan.forEach(span => {
  var aux = parseFloat(span.dataset.lat);
  fitBounds[0][0] = Math.min(aux, fitBounds[0][0]);
  fitBounds[1][0] = Math.max(aux, fitBounds[1][0]);
  aux = parseFloat(span.dataset.lng);
  fitBounds[0][1] = Math.min(aux, fitBounds[0][1]);
  fitBounds[1][1] = Math.max(aux, fitBounds[1][1]);
})

var myStyle = {
  "color": "blue",
  "weight": 1,
  "opacity": 0.01
};

//Create map
const map = L.map('mapid').setView([latitude, longitude],4);

// Create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170,2]
})

//Pode passar as {} direto quando é somente 1 objeto, estamos desestruturando o objeto
function addMarker({id, name, lat, lng}) {
  
  //Create popup overlay
  const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidth: 240,
    minHeight: 240
  }).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg" > </a>`)

  //Create and add marker
  L.marker([lat,lng], {icon})
    .addTo(map)
    .bindPopup(popup)
    
}

orphanagesSpan.forEach( span => {
  //dataset se refere a qualquer "data-" feito lá no html
  const orphanage = {
    id: span.dataset.id,
    name: span.dataset.name,
    lat: span.dataset.lat,
    lng: span.dataset.lng
  }
  addMarker(orphanage)
})

let marker;

//Create and add marker
map.on('click',(event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // Remove icon
  marker && map.removeLayer(marker)

  // Add icon layer
  marker = L.marker([lat, lng], {icon})
  .addTo(map)
})

