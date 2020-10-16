const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false
}

//Get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng

//Create map
const map = L.map('mapid', options).setView([lat,lng], 15);

// Create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170,2]
})

//Create and add marker
L.marker([lat,lng], {icon})
  .addTo(map)

/* Image gallery */

function selectImage(event){
  const button = event.currentTarget
  
  //Remove all .active classes 
  const buttons = document.querySelectorAll(".images button")
  buttons.forEach(removeActiveClass)

  function removeActiveClass(button){
    button.classList.remove("active")
  }

  //Select the clicked image
  const image = button.children[0]
  const imageContainer = document.querySelector(".orphanage-details > img")

  //Update the image container
  imageContainer.src = image.src

  //Add .active class to this button
  button.classList.add("active")
}