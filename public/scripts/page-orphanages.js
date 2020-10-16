// tipos de dados
// String ""
// Number 1
// Object {}
// Boolean true or false
// Array []

const orphanagesSpan = document.querySelectorAll('.orphanages span')
var lat = 0, lng = 0, count = 0;

orphanagesSpan.forEach(span => {
  lat = lat + parseFloat(span.dataset.lat);
  lng = lng + parseFloat(span.dataset.lng);
  count++;
})

//Create map
const map = L.map('mapid').setView([(lat/count),(lng/count)], 15);

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