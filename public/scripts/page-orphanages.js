// tipos de dados
// String ""
// Number 1
// Object {}
// Boolean true or false
// Array []

const orphanagesSpan = document.querySelectorAll('.orphanages span')
var lat = 0, lng = 0, count = 0, fitBounds = [[Infinity,Infinity],[-Infinity,-Infinity]];

orphanagesSpan.forEach(span => {
  var aux = parseFloat(span.dataset.lat);
  fitBounds[0][0] = Math.min(aux, fitBounds[0][0]);
  fitBounds[1][0] = Math.max(aux, fitBounds[1][0]);
  aux = parseFloat(span.dataset.lng);
  fitBounds[0][1] = Math.min(aux, fitBounds[0][1]);
  fitBounds[1][1] = Math.max(aux, fitBounds[1][1]);
})

//var zoom = lat;

//Create map
const map = L.map('mapid').fitBounds(fitBounds);

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